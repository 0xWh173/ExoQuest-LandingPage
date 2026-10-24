"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "./Container";
import { useLegalModal } from "@/shared/components/legal/LegalModalContext";
import { PRACTICES_URL } from "@/shared/lib/config";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function WebsiteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function Footer() {
  const { openTerms, openPrivacy, openRefund } = useLegalModal();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/exploitxorg",
      icon: LinkedinIcon,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/exploitxorg/",
      icon: InstagramIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/ExploitX-org",
      icon: GithubIcon,
    },
    {
      name: "Website",
      href: "https://www.exploitx.org/",
      icon: WebsiteIcon,
    },
  ];

  return (
    <footer className="mt-auto border-t border-[var(--color-card-border)] bg-black/30 py-10">
      <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <h3 className="flex items-center gap-2.5 text-xl font-black text-[var(--color-foreground)]">
            <span>Exo<span className="text-[var(--color-primary)]">Quest</span></span>
          </h3>
          <p className="mt-1 text-xs text-[var(--color-muted)] opacity-80">
            Supported by ExploitX
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} ExoQuest - all rights reserved
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--color-primary)] opacity-80">
            <button
              type="button"
              onClick={openTerms}
              className="hover:opacity-100 hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={openPrivacy}
              className="hover:opacity-100 hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={openRefund}
              className="hover:opacity-100 hover:text-[var(--color-primary-hover)] transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-card-border)] bg-black/40 text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/10 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-5 h-5 transition-colors" />
                </motion.div>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </footer>
  );
}
