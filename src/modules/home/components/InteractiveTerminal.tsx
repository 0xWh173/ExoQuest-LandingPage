"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLine {
  prompt: string;
  text: string;
  color: string;
  isOutput?: boolean;
}

const sequence: TerminalLine[] = [
  { prompt: "$", text: "nmap -sV -T4 10.0.42.1", color: "text-green-400" },
  { prompt: ">", text: "Scanning target...", color: "text-gray-500", isOutput: true },
  { prompt: ">", text: "PORT    STATE  SERVICE  VERSION", color: "text-gray-400", isOutput: true },
  { prompt: ">", text: "22/tcp  open   ssh      OpenSSH 8.9", color: "text-cyan-400", isOutput: true },
  { prompt: ">", text: "80/tcp  open   http     nginx 1.24", color: "text-cyan-400", isOutput: true },
  { prompt: ">", text: "443/tcp open   https    ExoQuest-V2", color: "text-cyan-400", isOutput: true },
  { prompt: "$", text: "python3 exploit.py --target 10.0.42.1 --port 80", color: "text-green-400" },
  { prompt: ">", text: "[*] Connecting to target...", color: "text-yellow-400", isOutput: true },
  { prompt: ">", text: "[*] Sending payload (stage 1/3)...", color: "text-yellow-400", isOutput: true },
  { prompt: ">", text: "[+] Buffer overflow triggered", color: "text-purple-400", isOutput: true },
  { prompt: ">", text: "[+] Shell spawned. Reverse connection active.", color: "text-green-400", isOutput: true },
  { prompt: "$", text: "whoami", color: "text-green-400" },
  { prompt: ">", text: "root@exoquest-node-7", color: "text-purple-300", isOutput: true },
  { prompt: "$", text: "cat /root/flag.txt", color: "text-green-400" },
  { prompt: ">", text: "EXOQ{Y0U_4R3_4N_3L1T3_H4CK3R}", color: "text-yellow-300", isOutput: true },
];

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "pause">("idle");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= sequence.length) {
      // Wait then restart
      const t = setTimeout(() => { setLines([]); setCurrentIndex(0); }, 4000);
      return () => clearTimeout(t);
    }

    const cmd = sequence[currentIndex];

    if (cmd.isOutput) {
      // Enter pause phase immediately (next tick) then show output after a short delay
      setTimeout(() => setPhase("pause"), 0);
      const delay = 200 + Math.random() * 300;
      const t = setTimeout(() => {
        setLines((prev) => [...prev, cmd]);
        // advance to next item and return to idle
        setCurrentIndex((i) => i + 1);
        setPhase("idle");
      }, delay);
      return () => clearTimeout(t);
    }

    // Command lines get typed character by character
    setTimeout(() => setPhase("typing"), 0);
    let charIdx = 0;
    const speed = 35 + Math.random() * 30; // 35-65ms per char (realistic typing)

    const interval = setInterval(() => {
      if (charIdx <= cmd.text.length) {
        setCurrentText(cmd.text.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        // Pause after typing before showing output
        setPhase("pause");
        setTimeout(() => {
          setLines((prev) => [...prev, cmd]);
          setCurrentText("");
          setCurrentIndex((i) => i + 1);
          setPhase("idle");
        }, 400);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, currentText]);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a0e14] shadow-[0_0_60px_rgba(147,51,234,0.1)] overflow-hidden h-[400px] flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 bg-[#12161e]">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
        <span className="ml-3 font-mono text-[11px] text-gray-500">operator@exoquest ~ zsh</span>
      </div>

      {/* Body */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden p-5 font-mono text-[13px] leading-6 space-y-0.5 select-none pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line.text}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              <span className={line.prompt === "$" ? "text-purple-400" : "text-gray-600"}>
                {line.prompt}{" "}
              </span>
              <span className={line.color}>{line.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Currently typing line */}
        {phase === "typing" && currentIndex < sequence.length && (
          <div>
            <span className="text-purple-400">$ </span>
            <span className={sequence[currentIndex].color}>
              {currentText}
            </span>
            <span className="inline-block w-[7px] h-[14px] ml-0.5 bg-green-400 animate-pulse align-middle" />
          </div>
        )}

        {/* Idle cursor */}
        {phase === "idle" && currentIndex < sequence.length && !sequence[currentIndex]?.isOutput && (
          <div>
            <span className="text-purple-400">$ </span>
            <span className="inline-block w-[7px] h-[14px] bg-green-400 animate-pulse align-middle" />
          </div>
        )}

        {/* End state cursor */}
        {currentIndex >= sequence.length && (
          <div>
            <span className="text-purple-400">$ </span>
            <span className="inline-block w-[7px] h-[14px] bg-green-400 animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
