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
    { prompt: "$", text: "nmap -sV -T4 10.0.42.1", color: "text-[#22c55e]" },
    { prompt: ">", text: "Scanning target...", color: "text-[#38bdf8]", isOutput: true },
    { prompt: ">", text: "PORT    STATE  SERVICE  VERSION", color: "text-gray-400", isOutput: true },
    { prompt: ">", text: "22/tcp  open   ssh      OpenSSH 8.9", color: "text-[#38bdf8]", isOutput: true },
    { prompt: ">", text: "80/tcp  open   http     nginx 1.24", color: "text-[#38bdf8]", isOutput: true },
    { prompt: ">", text: "443/tcp open   https    ExoQuest-V2", color: "text-[#38bdf8]", isOutput: true },
    { prompt: "$", text: "python3 exploit.py --target 10.0.42.1 --port 80", color: "text-[#22c55e]" },
    { prompt: ">", text: "[*] Connecting to target...", color: "text-[#fbbf24]", isOutput: true },
    { prompt: ">", text: "[*] Sending payload (stage 1/3)...", color: "text-[#fbbf24]", isOutput: true },
    { prompt: ">", text: "[+] Buffer overflow triggered", color: "text-[#c084fc]", isOutput: true },
    { prompt: ">", text: "[+] Shell spawned. Reverse connection active.", color: "text-[#22c55e]", isOutput: true },
    { prompt: "$", text: "whoami", color: "text-[#22c55e]" },
    { prompt: ">", text: "root@exoquest-node-7", color: "text-[#fb7185]", isOutput: true },
    { prompt: "$", text: "cat /root/flag.txt", color: "text-[#22c55e]" },
    { prompt: ">", text: "EXOQ{Y0U_4R3_4N_3L1T3_H4CK3R}", color: "text-yellow-300", isOutput: true },
];

export function InteractiveTerminal() {
    const [lines, setLines] = useState<TerminalLine[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [phase, setPhase] = useState<"idle" | "typing" | "pause">("idle");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mounted = true;
        let timer1: ReturnType<typeof setTimeout> | undefined;
        let timer2: ReturnType<typeof setTimeout> | undefined;
        let interval: ReturnType<typeof setInterval> | undefined;

        if (currentIndex >= sequence.length) {
            timer1 = setTimeout(() => {
                if (!mounted) return;
                setLines([]);
                setCurrentIndex(0);
            }, 5000);
            return () => {
                mounted = false;
                if (timer1) clearTimeout(timer1);
            };
        }

        const cmd = sequence[currentIndex];

        if (cmd.isOutput) {
            setPhase("pause");
            const delay = 180 + Math.random() * 200;
            timer1 = setTimeout(() => {
                if (!mounted) return;
                setLines((prev) => [...prev, cmd]);
                setCurrentIndex((i) => i + 1);
                setPhase("idle");
            }, delay);
            return () => {
                mounted = false;
                if (timer1) clearTimeout(timer1);
            };
        }

        setPhase("typing");
        let charIdx = 0;
        const speed = 35 + Math.random() * 25; // 35-60ms per char

        interval = setInterval(() => {
            if (!mounted) return;
            if (charIdx <= cmd.text.length) {
                setCurrentText(cmd.text.slice(0, charIdx));
                charIdx++;
            } else {
                clearInterval(interval);
                setPhase("pause");
                timer2 = setTimeout(() => {
                    if (!mounted) return;
                    setLines((prev) => [...prev, cmd]);
                    setCurrentText("");
                    setCurrentIndex((i) => i + 1);
                    setPhase("idle");
                }, 350);
            }
        }, speed);

        return () => {
            mounted = false;
            if (interval) clearInterval(interval);
            if (timer2) clearTimeout(timer2);
        };
    }, [currentIndex]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines, currentText]);

    return (
        <div className="rounded-xl border border-[#22262B] bg-[#0A0E14] overflow-hidden h-[445px] w-full max-w-[616px] mx-auto flex flex-col font-mono select-none">
            {/* Title bar */}
            <div className="flex items-center h-[38px] border-b border-[#292D34] pr-[22px] bg-[#12161E] shrink-0" style={{ paddingLeft: "10px" }}>
                <div className="flex items-center gap-[7px]">
                    <span className="h-3 w-3 rounded-full bg-[#FA2C36]" />
                    <span className="h-3 w-3 rounded-full bg-[#EFB000]" />
                    <span className="h-3 w-3 rounded-full bg-[#00C850]" />
                </div>
                <span
                    className="font-mono text-xs text-[#7D8590] font-medium tracking-wide"
                    style={{ marginLeft: "10px" }}
                >
                    operator@exoquest ~ zsh
                </span>
            </div>

            {/* Body */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto pr-6 pt-3 pb-3 font-mono text-[13px] leading-[23px] select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ paddingLeft: "10px" }}
            >
                <AnimatePresence mode="popLayout">
                    {lines.map((line, i) => (
                        <motion.div
                            key={`${i}-${line.text}`}
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.1 }}
                            className="min-h-[23px]"
                        >
                            <span className={line.prompt === "$" ? "text-purple-400 font-semibold" : "text-[#586574]"}>
                                {line.prompt}{" "}
                            </span>
                            <span className={line.color}>{line.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Currently typing line */}
                {phase === "typing" && currentIndex < sequence.length && (
                    <div className="min-h-[23px]">
                        <span className="text-purple-400 font-semibold">$ </span>
                        <span className={sequence[currentIndex].color}>
                            {currentText}
                        </span>
                        <span className="inline-block w-[8px] h-[15px] ml-1 bg-[#00C850] animate-pulse align-middle" />
                    </div>
                )}

                {/* Idle cursor */}
                {phase === "idle" && currentIndex < sequence.length && !sequence[currentIndex]?.isOutput && (
                    <div className="min-h-[23px]">
                        <span className="text-purple-400 font-semibold">$ </span>
                        <span className="inline-block w-[8px] h-[15px] ml-1 bg-[#00C850] animate-pulse align-middle" />
                    </div>
                )}

                {/* End state cursor */}
                {currentIndex >= sequence.length && (
                    <div className="min-h-[23px]">
                        <span className="text-purple-400 font-semibold">$ </span>
                        <span className="inline-block w-[8px] h-[15px] ml-1 bg-[#00C850] animate-pulse align-middle" />
                    </div>
                )}
            </div>
        </div>
    );
}
