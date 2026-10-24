"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/shared/components/layout/Navbar";
import { Footer } from "@/shared/components/layout/Footer";
import { Container } from "@/shared/components/layout/Container";
import { GridBackground } from "@/shared/components/effects/GridBackground";
import { Filter } from "lucide-react";
import toast from "react-hot-toast";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  status?: "CONFIRMED" | "NEEDS CONFIRMATION";
}

const FAQ_DATA: FAQItem[] = [
  // 1. Account
  {
    id: "acc-1",
    category: "Account",
    question: "How do I create an ExoQuest account?",
    answer:
      "You can create an account on ExoQuest by registering with a username, valid email address, and password (minimum 8 characters), or by using OAuth single sign-on with GitHub or Google.",
    status: "CONFIRMED",
  },
  {
    id: "acc-2",
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "If you forgot your password, click 'Forgot Password' on the login page and enter your email address to receive a password reset link. If you are already logged in, you can update your password directly in your Account Security Settings.",
    status: "CONFIRMED",
  },
  {
    id: "acc-3",
    category: "Account",
    question: "How do I change my username/profile?",
    answer:
      "Go to your Profile Settings to update your username, bio, avatar image (preset, URL, or base64 file upload under 1MB), country/region, social links, preferred programming languages, and email notification preferences.",
    status: "CONFIRMED",
  },
  {
    id: "acc-4",
    category: "Account",
    question: "Can I delete my account?",
    answer:
      "Yes. You can permanently delete your ExoQuest account in your Account Settings by providing your current password to confirm deletion.",
    status: "CONFIRMED",
  },
  {
    id: "acc-5",
    category: "Account",
    question: "Why is my new username rejected?",
    answer:
      "A username will be rejected if it is shorter than 2 characters, longer than 24–30 characters, contains special characters other than underscores, or is already taken by another player.",
    status: "CONFIRMED",
  },

  // 2. Challenges
  {
    id: "chal-1",
    category: "Challenges",
    question: "How do I start a challenge?",
    answer:
      "For static challenges, view the description and attachments to start immediately. For containerized challenges, click 'Start Instance' to launch a dedicated Docker container environment with custom connection details and a live timer.",
    status: "CONFIRMED",
  },
  {
    id: "chal-2",
    category: "Challenges",
    question: "How do I submit a flag?",
    answer:
      "Enter your captured flag into the submission input box on the challenge page and click 'Submit'. Correct flags award XP and points, and mark the challenge as solved.",
    status: "CONFIRMED",
  },
  {
    id: "chal-3",
    category: "Challenges",
    question: "Why is my correct flag being rejected?",
    answer:
      "Flag submissions are strictly case-sensitive. Ensure exact casing without missing characters. If the challenge uses a dynamic Docker instance, ensure you submit the dynamic flag generated specifically for your active running instance.",
    status: "CONFIRMED",
  },
  {
    id: "chal-4",
    category: "Challenges",
    question: "How does hint point reduction work?",
    answer:
      "Unlocking hints does not reduce your total account XP. When you solve the challenge, the cost of unlocked hints is deducted from the challenge's earned points reward.",
    status: "CONFIRMED",
  },
  {
    id: "chal-5",
    category: "Challenges",
    question: "How are challenge difficulties determined?",
    answer:
      "Initial difficulty levels are assigned by challenge creators. After solving a challenge, players can vote on difficulty, which calculates the community average difficulty.",
    status: "CONFIRMED",
  },
  {
    id: "chal-6",
    category: "Challenges",
    question: "Can I report a broken challenge?",
    answer:
      "Direct in-app reporting is currently unlisted. Please notify platform staff or reach out through community channels if a challenge instance or description is broken.",
    status: "NEEDS CONFIRMATION",
  },
  {
    id: "chal-7",
    category: "Challenges",
    question: "Where can I find challenge writeups?",
    answer:
      "Official challenge solutions become available on the challenge page after you solve it. You can also explore community-contributed writeups in the Writeups section.",
    status: "CONFIRMED",
  },

  // 3. XP & Progress
  {
    id: "xp-1",
    category: "XP & Progress",
    question: "How do I earn XP?",
    answer:
      "You earn XP by solving challenges, completing your Daily Quests, solving the Challenge of the Day, finishing the onboarding tutorial, and unlocking achievements.",
    status: "CONFIRMED",
  },
  {
    id: "xp-2",
    category: "XP & Progress",
    question: "What happens when I solve a challenge?",
    answer:
      "Solving a challenge grants XP and points, updates your profile statistics, stops any running dynamic container instance for that challenge, updates daily quest progress, and sends a solve notification.",
    status: "CONFIRMED",
  },
  {
    id: "xp-3",
    category: "XP & Progress",
    question: "How does daily quest work?",
    answer:
      "Every day at 00:00 UTC, you receive 3 personalized daily quests matched to your skill level and preferred categories. Completing daily quest targets awards bonus XP.",
    status: "CONFIRMED",
  },

  // 4. Competitions
  {
    id: "comp-1",
    category: "Competitions",
    question: "How do I join a competition?",
    answer:
      "Browse the Competitions page and click 'Register'. Depending on the competition format, you can join individually or form/join a team.",
    status: "CONFIRMED",
  },
  {
    id: "comp-2",
    category: "Competitions",
    question: "How does competition scoring work?",
    answer:
      "Competitions use static points or dynamic scoring (where point values decrease as more teams solve the challenge). Ties on the scoreboard are broken by the timestamp of the last correct solve.",
    status: "CONFIRMED",
  },
  {
    id: "comp-3",
    category: "Competitions",
    question: "Can I participate in multiple competitions?",
    answer:
      "Yes. You can participate in multiple competitions. For team competitions, team memberships are managed per competition and reset after each event ends.",
    status: "CONFIRMED",
  },
  {
    id: "comp-4",
    category: "Competitions",
    question: "What happens when a competition ends?",
    answer:
      "When a competition reaches its end time, flag submissions close, final scores and rankings are locked, and official competition winners are finalized.",
    status: "CONFIRMED",
  },

  // 5. Platform
  {
    id: "plat-1",
    category: "Platform",
    question: "Why isn't a challenge loading?",
    answer:
      "A challenge may fail to load if your user level is lower than the challenge's required level, if the Docker container host is at capacity, or during scheduled maintenance.",
    status: "CONFIRMED",
  },
  {
    id: "plat-2",
    category: "Platform",
    question: "Why can't I submit a flag?",
    answer:
      "Submissions may fail if you are submitting flags too rapidly (rate limited), if your container instance has expired, or if your login session has timed out.",
    status: "CONFIRMED",
  },
  {
    id: "plat-3",
    category: "Platform",
    question: "What should I do if ExoQuest is down?",
    answer:
      "Check the status page or maintenance screen (/maintenance). If issues persist, clear your browser cache or try re-logging in.",
    status: "CONFIRMED",
  },
  {
    id: "plat-4",
    category: "Platform",
    question: "Which browsers are supported?",
    answer:
      "ExoQuest supports modern evergreen browsers (Chrome, Firefox, Edge, Safari) with JavaScript and WebSockets enabled.",
    status: "NEEDS CONFIRMATION",
  },
  {
    id: "plat-5",
    category: "Platform",
    question: "How do I report a technical issue?",
    answer:
      "Technical issues can be reported to administrators via community support channels or official repository issue boards.",
    status: "NEEDS CONFIRMATION",
  },

  // 6. Security
  {
    id: "sec-1",
    category: "Security",
    question: "How do I report a security vulnerability?",
    answer:
      "Security vulnerabilities should be reported directly to platform administrators. ExoQuest implements rate limiting, risk scoring, input sanitization, and strict media upload validation to protect platform security.",
    status: "NEEDS CONFIRMATION",
  },
  {
    id: "sec-2",
    category: "Security",
    question: "What activities are prohibited on ExoQuest?",
    answer:
      "Automated flag spamming, attempting to bypass level gates, uploading malicious code in profile settings, and disruptive platform attacks are strictly prohibited and automatically blocked by security filters.",
    status: "NEEDS CONFIRMATION",
  },

  // 7. Learning
  {
    id: "learn-1",
    category: "Learning",
    question: "I'm new to CTFs. Where should I start?",
    answer:
      "Start by completing the interactive Onboarding Tutorial, solving Easy difficulty challenges, and following your Daily Quests.",
    status: "CONFIRMED",
  },
  {
    id: "learn-2",
    category: "Learning",
    question: "Which challenge category should I choose?",
    answer:
      "Choose Web for web app security, Crypto for ciphers, Forensics for file/memory analysis, Reverse for binary analysis, Pwn for binary exploitation, OSINT for public intelligence gathering, and Misc for general puzzles.",
    status: "CONFIRMED",
  },
  {
    id: "learn-3",
    category: "Learning",
    question: "What are hints and writeups?",
    answer:
      "Hints give you clues while working on a challenge (deducting points on solve). Writeups are step-by-step guides explaining how challenges were solved.",
    status: "CONFIRMED",
  },
  {
    id: "learn-4",
    category: "Learning",
    question: "How can I improve my CTF skills?",
    answer:
      "Practice daily with the Challenge of the Day, complete Daily Quests, read community writeups, and participate in live CTF competitions.",
    status: "CONFIRMED",
  },
];

const CATEGORIES = [
  "All",
  "Account",
  "Challenges",
  "XP & Progress",
  "Competitions",
  "Platform",
  "Security",
  "Learning",
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // Email form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredFAQs.forEach((faq) => {
      allExpanded[faq.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  // Filtered FAQ items based on search and category
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error("Please fill in your email address and message.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Support ticket sent! Our team will respond shortly.");
      setFormData({
        name: "",
        email: "",
        category: "General Inquiry",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <main className="relative min-h-screen bg-[#08090d] text-white">
      <Navbar />
      <GridBackground />

      {/* Hero Header */}
      <section className="relative pt-20 pb-16 text-center border-b border-white/5">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              How can we <span className="text-purple-400">help you?</span>
            </h1>

            {/* Minimal Search Bar */}
            <div className="relative mx-auto mt-8 max-w-2xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, challenges, rules, flag submissions..."
                  className="w-full h-13 px-5 pr-10 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-white placeholder-gray-500 transition-all focus:border-purple-500/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 px-2 py-1 rounded text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>

              {searchQuery && (
                <div className="mt-2 text-left text-xs text-gray-400 px-1">
                  Found <span className="text-purple-400 font-bold">{filteredFAQs.length}</span> matching result{filteredFAQs.length === 1 ? "" : "s"}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <Container>
          {/* Category Filter Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Filter className="w-4 h-4 text-purple-400" />
                <span>Filter</span>
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter by Category"
                  className="h-10 px-4 pr-9 rounded-xl border border-white/10 bg-[#121520] text-xs font-medium text-white transition-all focus:border-purple-500/50 focus:outline-none cursor-pointer appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 whitespace-nowrap">
              <button
                onClick={expandAll}
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                onClick={collapseAll}
                className="hover:text-purple-400 transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Minimal FAQ Dropdown Accordion Section */}
          <div className="mx-auto max-w-4xl space-y-3">
            {filteredFAQs.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.01] p-12 text-center">
                <h3 className="text-lg font-bold text-white">No FAQ matches found</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Try adjusting your search query or switching categories.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-semibold hover:bg-purple-500/30 transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const isExpanded = !!expandedIds[faq.id];
                return (
                  <div
                    key={faq.id}
                    className={`group rounded-xl border transition-all duration-200 ${
                      isExpanded
                        ? "border-purple-500/40 bg-[#0e111a] shadow-lg shadow-purple-500/5"
                        : "border-white/10 bg-[#0b0d14] hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
                  >
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 mb-1">
                          {faq.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                          {faq.question}
                        </h3>
                      </div>

                      <div className="px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02] text-xs font-mono text-gray-400 shrink-0">
                        {isExpanded ? "−" : "+"}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </Container>
      </section>

      {/* Email Us Contact Section */}
      <section id="contact" className="py-16 border-t border-white/5 bg-gradient-to-b from-transparent to-purple-950/20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 md:grid-cols-5 items-start">
              {/* Contact Info Card */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-white">Still have questions?</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Can't find what you're looking for in our FAQ? Send us an email and our technical support team will get back to you within 24 hours.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 font-mono">Email Support</div>
                    <div className="text-sm font-bold text-white">support@exoquest.dev</div>
                    <div className="text-[11px] text-purple-400 mt-0.5">Average response time: &lt; 24h</div>
                  </div>
                  <div className="pt-3 border-t border-white/5">
                    <div className="text-xs text-gray-500 font-mono">Community Support</div>
                    <div className="text-sm font-bold text-white">ExoQuest Discord & Forums</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">24/7 operator assistance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
