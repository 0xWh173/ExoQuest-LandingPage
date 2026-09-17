import Link from "next/link";
import Image from "next/image";
import { 
  GraduationCap, Shield, ChevronRight, 
  Users, Building2, Flag, CheckCircle2
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background text-foreground">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-200 h-200 bg-purple-900/20 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-200 h-200 bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl w-full mx-auto animate-fade-up" style={{ animationDelay: "0s" }}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
              <Image src="/logo.png" alt="ExoQuest Logo" fill sizes="(max-width: 640px) 32px, 40px" className="object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" priority />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">ExoQuest</span>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link href="https://competitions.exoquest.dev/" className="text-sm font-medium bg-foreground text-background px-6 py-2.5 rounded-full hover:bg-white transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="grow flex flex-col">
        {/* 1. Hero Section (Left/Right Split) */}
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left pt-10">
              <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-8" style={{ animationDelay: "0.1s" }}>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                NEXT-GENERATION CTF PLATFORM
              </div>
              <h1 className="animate-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white via-white to-gray-500 mb-8 leading-[1.1]" style={{ animationDelay: "0.2s" }}>
                Learn. Hack.<br /> Compete.
              </h1>
              <p className="animate-fade-up text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed" style={{ animationDelay: "0.3s" }}>
                The cybersecurity CTF ecosystem for learning through hands-on challenges and running real competitions.
              </p>
              <div className="animate-fade-up flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" style={{ animationDelay: "0.4s" }}>
                <Link href="https://practices.exoquest.dev/" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition duration-300 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]">
                  Start Practicing
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="https://competitions.exoquest.dev/" className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-[#0a0e14]/80 border border-gray-700 hover:border-gray-500 text-foreground font-medium transition duration-300">
                  Host a Competition
                </Link>
              </div>
            </div>

            {/* Right Graphic: Logo */}
            <div className="flex-1 w-full animate-fade-up relative flex items-center justify-center h-100 sm:h-125 lg:h-150" style={{ animationDelay: "0.5s" }}>
              <div className="relative w-87.5 h-87.5 sm:w-125 sm:h-125 lg:w-150 lg:h-150">
                <div className="absolute inset-0 bg-purple-600/20 blur-[100px] rounded-full animate-pulse"></div>
                <Image src="/logo.png" alt="ExoQuest Logo" fill sizes="(max-width: 640px) 350px, (max-width: 1024px) 500px, 600px" className="object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.5)] relative z-10 hover:scale-105 transition-transform duration-500" priority />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Alternating Feature Blocks */}
        <section className="relative z-10 w-full py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 space-y-32">
            
            {/* Feature 1: Practice Platform (Image Left, Text Right) */}
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full"></div>
                <div className="relative bg-[#0a0e14] border border-gray-800 rounded-2xl p-6 shadow-2xl h-100 flex flex-col">
                  <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    <div className="ml-4 text-xs font-mono text-gray-500">exoquest_terminal</div>
                  </div>
                  <div className="font-mono text-sm space-y-4 text-gray-300 grow">
                    <p className="text-purple-400">$ connect practice-instance --category web</p>
                    <p>[+] Initializing isolated container...</p>
                    <p>[+] Target IP: 10.10.14.23</p>
                    <p>[+] Vulnerability detected in /api/v1/auth</p>
                    <p className="text-green-400 font-bold mt-8">&gt; EXOQ&#123;y0u_h4ck3d_th3_sys73m&#125;</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-mono">
                  01 / LEARN
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Practice Platform</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Build real cybersecurity skills. Practice hands-on CTF challenges across different categories, learn by solving problems, and track your progress in real-time.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Isolated vulnerable instances for safe hacking",
                    "Detailed analytics on your growth and solve rates",
                    "Progressive difficulty curves from beginner to advanced",
                    "No time limits—learn at your own pace"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-purple-500 shrink-0 mt-1" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6">
                  <Link href="https://practices.exoquest.dev/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium group transition-colors text-lg">
                    Explore Challenges <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 2: Competition Platform (Text Left, Image Right) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="flex-1 w-full relative">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full"></div>
                <div className="relative bg-[#0a0e14] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl h-100 flex flex-col">
                  {/* Dashboard Mock */}
                  <div className="bg-background border-b border-gray-800 p-4 flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-gray-400 tracking-wider">ORGANIZER PANEL</span>
                    <span className="flex items-center gap-2 text-xs text-green-400 font-mono"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> LIVE</span>
                  </div>
                  <div className="p-6 grow flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background border border-gray-800 rounded-lg p-4"><div className="text-xs text-gray-500 mb-1">PARTICIPANTS</div><div className="text-2xl font-bold">1,402</div></div>
                      <div className="bg-background border border-gray-800 rounded-lg p-4"><div className="text-xs text-gray-500 mb-1">FLAGS CAPTURED</div><div className="text-2xl font-bold text-blue-400">856</div></div>
                    </div>
                    <div className="grow bg-background border border-gray-800 rounded-lg p-4 space-y-4">
                      <div className="text-xs text-gray-500 mb-2">LIVE SCOREBOARD</div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden"><div className="w-[90%] h-full bg-blue-500"></div></div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden"><div className="w-[75%] h-full bg-purple-500"></div></div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden"><div className="w-[45%] h-full bg-gray-500"></div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono">
                  02 / COMPETE
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Competition Platform</h2>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Run your own CTF. Create, configure, and host cybersecurity competitions for colleges, companies, clubs, communities, and global events without worrying about infrastructure.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Launch custom competitions in minutes",
                    "Seamless team formation and participant management",
                    "Upload your own challenges or use our library",
                    "Real-time dynamic scoring and activity streams"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-1" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6">
                  <Link href="https://competitions.exoquest.dev/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium group transition-colors text-lg">
                    Create a Competition <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Target Audiences (For Everyone) */}
        <section className="relative z-10 w-full py-24 bg-[#0a0e14] border-y border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Built for Everyone</h2>
                <p className="text-gray-400 text-lg">Flexible enough to handle any format, from individual learning to massive global events.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2 lg:col-span-2 p-8 rounded-2xl bg-background border border-gray-800 flex flex-col justify-end min-h-62.5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-gray-800 group-hover:text-gray-700 transition-colors"><Building2 size={80} /></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Colleges & Universities</h3>
                  <p className="text-gray-400">Run CTFs for students and cybersecurity clubs seamlessly.</p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-background border border-gray-800 flex flex-col justify-end min-h-62.5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 text-gray-800 group-hover:text-gray-700 transition-colors"><Shield size={60} /></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Companies</h3>
                  <p className="text-gray-400 text-sm">Organize hiring challenges & training.</p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-background border border-gray-800 flex flex-col justify-end min-h-62.5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 text-gray-800 group-hover:text-gray-700 transition-colors"><GraduationCap size={60} /></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Students</h3>
                  <p className="text-gray-400 text-sm">Build practical career skills.</p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-background border border-gray-800 flex flex-col justify-end min-h-62.5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 text-gray-800 group-hover:text-gray-700 transition-colors"><Flag size={60} /></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Events</h3>
                  <p className="text-gray-400 text-sm">Host hackathon competitions.</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 p-8 rounded-2xl bg-background border border-gray-800 flex flex-col justify-end min-h-62.5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-blue-900/10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 p-8 text-gray-800 group-hover:text-blue-900/30 transition-colors"><Users size={80} /></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Security Communities</h3>
                  <p className="text-gray-400">Bring your community together around engaging cybersecurity challenges.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Final CTA block */}
        <section className="relative w-full overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-background to-[#0a0e14]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-125 bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-blue-900/40 via-purple-900/10 to-transparent blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-6 py-40 text-center">
            <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
              Reimagining How You<br />Learn Cybersecurity.
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to enter the arena? Join thousands of hackers and organizers building the future of security.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="https://practices.exoquest.dev/" className="w-full sm:w-auto px-10 py-5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition duration-300 shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]">
                Start Hacking for Free
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#0a0e14]/80 border border-gray-700 hover:border-gray-500 text-foreground font-bold text-lg transition duration-300">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-gray-800 bg-background pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-20">
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <Image src="/logo.png" alt="ExoQuest Logo" fill sizes="32px" className="object-contain" />
                </div>
                <span className="text-xl font-bold tracking-tight">EXOQUEST</span>
              </div>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                The next-generation platform for cybersecurity learning, practice, and competition hosting.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white mb-2">Practice</h4>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Challenges</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Leaderboard</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Writeups</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white mb-2">Compete</h4>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Host a CTF</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Upcoming Events</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white mb-2">Resources</h4>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Community</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Support</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white mb-2">Company</h4>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div>© {new Date().getFullYear()} ExoQuest. All rights reserved.</div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-700"></div>
              <div>Supported by <span className="text-gray-400 font-semibold tracking-wide">ExploitX</span></div>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
