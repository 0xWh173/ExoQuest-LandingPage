"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

const PERSPECTIVE = 900;
const TAU = Math.PI * 2;
const STEP = 1 / 240;
const PAD = 32;
const AXES = ["x", "y", "z", "r", "p"] as const;
type Axis = typeof AXES[number];
const DOWN = { x: 0, y: 1 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

interface StackBoundsArgs {
  width: number;
  height: number;
  cardDistance: number;
  verticalDistance: number;
  depth: number;
  skewAmount: number;
  visible: number;
  hoverSpread: number;
}

const stackBounds = ({
  width,
  height,
  cardDistance,
  verticalDistance,
  depth,
  skewAmount,
  visible,
  hoverSpread,
}: StackBoundsArgs) => {
  const slope = Math.tan((skewAmount * Math.PI) / 180);
  const spread = 1 + Math.max(0, hoverSpread);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < visible; i++) {
    const scale = PERSPECTIVE / (PERSPECTIVE + i * depth);
    for (const u of [-width / 2, width / 2]) {
      for (const v of [-height / 2, height / 2]) {
        const x = (i * cardDistance * spread + u) * scale;
        const y = (-i * verticalDistance * spread + v + u * slope) * scale;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return {
    width: Math.ceil(maxX - minX + PAD * 2),
    height: Math.ceil(maxY - minY + PAD * 2),
    originX: PAD - minX,
    originY: PAD - minY,
  };
};

export const SOLUTIONS_DATA = [
  {
    id: "solutions-colleges",
    title: "Colleges & Universities",
    subtitle: "Turnkey Labs & Automated Verification",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    copy: "Elevate your computer science and cybersecurity education with turnkey hands-on labs and campus CTF tournaments. Eliminate server deployment headaches with automated student grading, syllabus-aligned challenge tracks, and faculty oversight dashboards.",
    bullets: [
      "Automated student grading & homework verification",
      "Inter-university CTF competition hosting",
      "Zero-infrastructure faculty dashboards",
    ],
  },
  {
    id: "solutions-companies",
    title: "Companies & Enterprises",
    subtitle: "Skill Benchmarking & Cyber Readiness",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M8 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    ),
    copy: "Benchmark real offensive and defensive skills before making key security hires. Replace outdated multiple-choice quizzes with realistic hands-on exploit scenarios, and host internal corporate hackathons that foster a security-first culture.",
    bullets: [
      "Hands-on technical assessment for candidate vetting",
      "Red/Blue team offensive and defensive simulations",
      "Cross-departmental security awareness CTFs",
    ],
  },
  {
    id: "solutions-communities",
    title: "Communities & Clubs",
    subtitle: "High-Concurrency CTFs with Zero DevOps",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    copy: "Host engaging weekly challenges, seasonal leagues, and international hackathons effortlessly. ExoQuest handles backend infrastructure, real-time scoreboards, and discord webhook alerts so you can focus on community growth.",
    bullets: [
      "1-click tournament hosting with zero DevOps overhead",
      "Instant Discord bot role sync & live solve alerts",
      "Collaborative writeup hubs & community rankings",
    ],
  },
  {
    id: "solutions-individuals",
    title: "Individuals & Solvers",
    subtitle: "Hands-on Sandboxes & Verified Badges",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    copy: "From fundamental web vulnerabilities to complex kernel exploits, advance your tradecraft at your own pace. Work through curated challenge tracks, test exploits in isolated sandboxes, and build a verified solver portfolio.",
    bullets: [
      "Progressive difficulty curves from zero to advanced",
      "Instant ephemeral personal sandboxes per challenge",
      "Verifiable skill certifications & public solver badges",
    ],
  },
];

export function CardSwap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const shadeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = 500;
  const cardHeight = 410;
  const cardDistance = 40;
  const verticalDistance = 0;
  const depth = 85;
  const skewAmount = 0;
  const visibleCards = 4;
  const delay = 4500;
  const autoplay = true;
  const speed = 1;
  const bounce = 0.35;
  const parallax = 0.5;
  const hoverSpread = 0.12;
  const dim = 0.5;
  const cardRadius = 24;

  const count = SOLUTIONS_DATA.length;
  const visible = clamp(visibleCards, 1, count);

  const bounds = useMemo(
    () =>
      stackBounds({
        width: cardWidth,
        height: cardHeight,
        cardDistance,
        verticalDistance,
        depth,
        skewAmount,
        visible,
        hoverSpread,
      }),
    [cardWidth, cardHeight, cardDistance, verticalDistance, depth, skewAmount, visible, hoverSpread]
  );

  const shiftRef = useRef<(dir: number) => void>(() => {});
  const goToCardIndexRef = useRef<(idx: number) => void>(() => {});

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    // Apply exact CSS variables to root container
    root.style.setProperty("--swap-w", `${cardWidth}px`);
    root.style.setProperty("--swap-h", `${cardHeight}px`);
    root.style.setProperty("--swap-ox", `${bounds.originX}px`);
    root.style.setProperty("--swap-oy", `${bounds.originY}px`);
    root.style.setProperty("--swap-stage-w", `${bounds.width}px`);
    root.style.setProperty("--swap-stage-h", `${bounds.height}px`);
    root.style.setProperty("--swap-ratio", `${bounds.width} / ${bounds.height}`);
    root.style.setProperty("--swap-radius", `${Math.max(0, cardRadius)}px`);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const deck = Array.from({ length: count }, (_, index) => ({
      el: slotRefs.current[index],
      shade: shadeRefs.current[index],
      index,
      pos: index,
      from: index,
      hold: 0,
      nudge: 0,
      phase: "rest",
      dir: { x: 0, y: 1 },
      tilt: 0,
      top: 0,
      under: false,
      x: 0,
      y: 0,
      z: 0,
      r: 0,
      p: 0,
      v: { x: 0, y: 0, z: 0, r: 0, p: 0 },
    }));

    const state = {
      order: deck.map((card) => card.index),
      raf: 0,
      last: 0,
      timer: 0 as ReturnType<typeof setTimeout> | 0,
      queue: [] as Array<ReturnType<typeof setTimeout>>,
      layers: 0,
      scale: 1,
      hovered: false,
      overCard: false,
      inView: true,
      drag: null as {
        id: number;
        index: number;
        startX: number;
        startY: number;
        active: boolean;
        samples: Array<{ x: number; y: number; t: number }>;
      } | null,
      spread: 0,
      spreadV: 0,
      px: 0,
      py: 0,
      pvx: 0,
      pvy: 0,
      tx: 0,
      ty: 0,
      dragged: false,
    };

    const slot = (position: number) => {
      const q = Math.min(position, visible);
      const spread = 1 + state.spread;
      return { x: q * cardDistance * spread, y: -q * verticalDistance * spread, z: -q * depth, r: 0, p: q };
    };

    const clearance = (dir: { x: number; y: number }) => Math.abs(dir.x) * cardWidth + Math.abs(dir.y) * cardHeight + 12;

    const targetOf = (card: typeof deck[0], time: number) => {
      if (card.phase === "exit") {
        const base = slot(0);
        const reach = clearance(card.dir) * 1.3;
        return { x: base.x + card.dir.x * reach, y: base.y + card.dir.y * reach, z: base.z, r: card.tilt, p: 0 };
      }
      if (card.phase === "enter") {
        const base = slot(0);
        return { x: base.x, y: base.y + clearance(DOWN) * 1.3, z: base.z, r: 0, p: card.p };
      }
      const position = (time < card.hold ? card.from : card.pos) + card.nudge;
      return slot(Math.max(0, position));
    };

    const layerOf = (card: typeof deck[0]) => {
      if (card.top) return 1000 + card.top;
      if (card.under) return 1;
      return 10 + (count - card.pos) * 2;
    };

    const write = (card: typeof deck[0]) => {
      const { el, shade } = card;
      if (!el) return;
      el.style.transform = `translate3d(${card.x.toFixed(2)}px, ${card.y.toFixed(2)}px, ${card.z.toFixed(2)}px) rotate(${card.r.toFixed(3)}deg)${skewAmount ? ` skewY(${skewAmount}deg)` : ""}`;
      el.style.zIndex = String(layerOf(card));
      const fade = clamp(visible - card.p, 0, 1);
      el.style.opacity = fade < 1 ? fade.toFixed(3) : "";
      el.style.visibility = fade <= 0.001 ? "hidden" : "";
      if (shade) {
        const depthT = clamp(card.p / Math.max(1, visible - 1), 0, 1);
        shade.style.opacity = (dim * 0.62 * depthT).toFixed(3);
      }
      el.style.cursor = card.phase === "drag" ? "grabbing" : card.pos > 0 ? "pointer" : "grab";
      if (card.pos === 0) el.setAttribute("data-front", "");
      else el.removeAttribute("data-front");
    };

    const writeStage = () => {
      const ox = bounds.originX + state.px;
      const oy = bounds.originY + state.py;
      stage.style.perspectiveOrigin = `${ox.toFixed(2)}px ${oy.toFixed(2)}px`;
    };

    const fit = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      if (!w) return;
      const scale = Math.min(1, w / bounds.width, h > 0 ? h / bounds.height : 1);
      state.scale = scale > 0 ? scale : 1;
      stage.style.transform = `translate(-50%, -50%) scale(${state.scale.toFixed(4)})`;
    };

    const integrate = (card: typeof deck[0], target: Record<Axis, number>, omega: number, zeta: number, dt: number) => {
      const k = omega * omega;
      const d = 2 * zeta * omega;
      const steps = Math.max(1, Math.ceil(dt / STEP));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        for (const axis of AXES) {
          const velocity = card.v[axis] + (k * (target[axis] - card[axis]) - d * card.v[axis]) * h;
          card.v[axis] = velocity;
          card[axis] += velocity * h;
        }
      }
    };

    const scalar = (value: number, velocity: number, target: number, omega: number, zeta: number, dt: number) => {
      const k = omega * omega;
      const d = 2 * zeta * omega;
      const steps = Math.max(1, Math.ceil(dt / STEP));
      const h = dt / steps;
      let x = value;
      let v = velocity;
      for (let i = 0; i < steps; i++) {
        v += (k * (target - x) - d * v) * h;
        x += v * h;
      }
      return [x, v];
    };

    const frame = (time: number) => {
      state.raf = 0;
      const dt = state.last ? Math.min(0.05, (time - state.last) / 1000) : 1 / 60;
      state.last = time;
      const restOmega = TAU * 1.7 * speed;
      const restZeta = reduce ? 1 : 1 - 0.72 * bounce;
      const exitOmega = TAU * 1.9 * speed;
      let busy = false;

      const spreadTarget = state.hovered && !reduce ? hoverSpread : 0;
      [state.spread, state.spreadV] = scalar(state.spread, state.spreadV, spreadTarget, TAU * 1.4, 0.9, dt);
      [state.px, state.pvx] = scalar(state.px, state.pvx, reduce ? 0 : state.tx, TAU * 1.1, 1, dt);
      [state.py, state.pvy] = scalar(state.py, state.pvy, reduce ? 0 : state.ty, TAU * 1.1, 1, dt);
      if (
        Math.abs(state.spread - spreadTarget) > 0.0005 ||
        Math.abs(state.spreadV) > 0.0005 ||
        Math.abs(state.px - state.tx) > 0.05 ||
        Math.abs(state.py - state.ty) > 0.05 ||
        Math.abs(state.pvx) + Math.abs(state.pvy) > 0.05
      ) {
        busy = true;
      }
      writeStage();

      for (const card of deck) {
        if (card.phase === "drag") {
          busy = true;
          write(card);
          continue;
        }
        const target = targetOf(card, time);
        const moving = card.phase === "exit" || card.phase === "enter";
        integrate(card, target, moving ? exitOmega : restOmega, moving ? 1 : restZeta, dt);
        if (card.phase === "exit") {
          const base = slot(0);
          const travelled = (card.x - base.x) * card.dir.x + (card.y - base.y) * card.dir.y;
          if (travelled >= clearance(card.dir)) {
            card.phase = "rest";
            card.top = 0;
            card.hold = 0;
          }
        } else if (card.phase === "enter") {
          const base = slot(0);
          if (card.y - base.y >= clearance(DOWN)) {
            card.phase = "rest";
            card.under = false;
            card.hold = 0;
          }
        }
        if (card.hold > time || card.phase !== "rest") busy = true;
        for (const axis of AXES) {
          const limit = axis === "p" ? 0.001 : 0.02;
          if (Math.abs(target[axis] - card[axis]) > limit || Math.abs(card.v[axis]) > limit) busy = true;
        }
        write(card);
      }

      if (busy) {
        state.raf = requestAnimationFrame(frame);
      } else {
        state.last = 0;
        for (const card of deck) {
          if (card.top && card.phase === "rest") card.top = 0;
        }
      }
    };

    const wake = () => {
      if (!state.raf) state.raf = requestAnimationFrame(frame);
    };

    const paused = () => {
      return (
        !autoplay ||
        count < 2 ||
        state.overCard ||
        state.drag ||
        !state.inView ||
        document.visibilityState === "hidden"
      );
    };

    const schedule = () => {
      if (state.timer) clearTimeout(state.timer);
      state.timer = 0;
      if (paused()) return;
      state.timer = setTimeout(() => {
        state.timer = 0;
        shift(1);
      }, Math.max(400, delay));
    };

    const settleOrder = (time: number, stagger: number) => {
      state.order.forEach((index, position) => {
        const card = deck[index];
        if (card.pos === position) return;
        card.from = card.pos;
        card.pos = position;
        card.hold = time + Math.max(0, position) * stagger;
      });
    };

    const shift = (
      direction: number,
      options: { dir?: { x: number; y: number }; tilt?: number; velocity?: { x: number; y: number } } = {}
    ) => {
      if (count < 2) return;
      const time = performance.now();
      const stagger = 0.05 / speed;
      if (direction > 0) {
        const front = deck[state.order[0]];
        state.order = [...state.order.slice(1), front.index];
        settleOrder(time, stagger * 1000);
        front.phase = "exit";
        front.dir = options.dir ?? DOWN;
        front.tilt = options.tilt ?? 0;
        front.top = ++state.layers;
        front.under = false;
        front.nudge = 0;
        front.hold = 0;
        if (options.velocity) {
          front.v.x = options.velocity.x;
          front.v.y = options.velocity.y;
        }
      } else {
        const back = deck[state.order[count - 1]];
        state.order = [back.index, ...state.order.slice(0, count - 1)];
        settleOrder(time, stagger * 1000);
        back.phase = "enter";
        back.top = 0;
        back.under = true;
        back.nudge = 0;
        back.hold = 0;
      }
      deck.forEach((card) => {
        if (card.phase === "rest") card.nudge = 0;
      });

      setActiveIndex(state.order[0]);
      wake();
      schedule();
    };

    const goTo = (position: number) => {
      state.queue.forEach(clearTimeout);
      state.queue = [];
      const gap = 110 / speed;
      for (let i = 0; i < position; i++) {
        state.queue.push(setTimeout(() => shift(1), i * gap));
      }
    };

    const goToCardIndex = (targetCardIndex: number) => {
      const currentPos = state.order.indexOf(targetCardIndex);
      if (currentPos > 0) {
        goTo(currentPos);
      }
    };

    shiftRef.current = shift;
    goToCardIndexRef.current = goToCardIndex;

    // Pointer parallax and dragging
    const local = (event: PointerEvent) => {
      const box = root.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top, w: box.width, h: box.height };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") {
        const point = local(event);
        const nx = clamp((point.x / Math.max(1, point.w)) * 2 - 1, -1, 1);
        const ny = clamp((point.y / Math.max(1, point.h)) * 2 - 1, -1, 1);
        state.tx = nx * parallax * 0.35 * bounds.width;
        state.ty = ny * parallax * 0.35 * bounds.height;
        state.hovered = true;
        const overCard = Boolean((event.target as HTMLElement).closest?.("[data-swap-index]"));
        if (overCard !== state.overCard) {
          state.overCard = overCard;
          schedule();
        }
        wake();
      }

      const drag = state.drag;
      if (!drag || drag.id !== event.pointerId) return;
      const dx = (event.clientX - drag.startX) / state.scale;
      const dy = (event.clientY - drag.startY) / state.scale;
      if (!drag.active) {
        if (Math.hypot(dx, dy) < 5) return;
        drag.active = true;
        state.dragged = true;
        const card = deck[drag.index];
        card.phase = "drag";
        card.v = { x: 0, y: 0, z: 0, r: 0, p: 0 };
        try {
          root.setPointerCapture(event.pointerId);
        } catch {}
        root.style.cursor = "grabbing";
      }
      const card = deck[drag.index];
      const base = slot(0);
      card.x = base.x + dx;
      card.y = base.y + dy;
      card.z = base.z;
      card.r = clamp(dx * 0.035, -9, 9);
      card.p = 0;
      const time = performance.now();
      drag.samples.push({ x: card.x, y: card.y, t: time });
      while (drag.samples.length > 2 && time - drag.samples[0].t > 90) drag.samples.shift();
      const progress = clamp(Math.hypot(dx, dy) / (Math.min(cardWidth, cardHeight) * 0.3), 0, 1);
      const next = deck[state.order[1]];
      if (next && next.phase === "rest") next.nudge = -0.22 * progress;
      wake();
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      if (state.drag?.active) return;
      state.hovered = false;
      state.overCard = false;
      state.tx = 0;
      state.ty = 0;
      schedule();
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      state.dragged = false;
      if (event.button > 0 || count < 2) return;
      const target = (event.target as HTMLElement).closest?.("[data-swap-index]");
      if (!target || !root.contains(target)) return;
      const index = Number(target.getAttribute("data-swap-index"));
      if (index !== state.order[0] || deck[index].phase !== "rest") return;
      state.drag = {
        id: event.pointerId,
        index,
        startX: event.clientX,
        startY: event.clientY,
        active: false,
        samples: [],
      };
      schedule();
    };

    const onPointerUp = (event: PointerEvent) => {
      const drag = state.drag;
      if (!drag || drag.id !== event.pointerId) return;
      state.drag = null;
      root.style.cursor = "";
      if (!drag.active) {
        schedule();
        return;
      }
      try {
        root.releasePointerCapture(event.pointerId);
      } catch {}
      const card = deck[drag.index];
      const base = slot(0);
      const first = drag.samples[0];
      const lastSample = drag.samples[drag.samples.length - 1];
      const span = first && lastSample ? Math.max(0.016, (lastSample.t - first.t) / 1000) : 1;
      const velocity =
        first && lastSample && lastSample !== first
          ? { x: (lastSample.x - first.x) / span, y: (lastSample.y - first.y) / span }
          : { x: 0, y: 0 };
      const offset = { x: card.x - base.x, y: card.y - base.y };
      const distance = Math.hypot(offset.x, offset.y);
      const fling = Math.hypot(velocity.x, velocity.y);
      const next = deck[state.order[1]];
      if (next) next.nudge = 0;
      if (event.type !== "pointercancel" && (distance > Math.min(cardWidth, cardHeight) * 0.3 || fling > 700)) {
        const aim = { x: offset.x + velocity.x * 0.12, y: offset.y + velocity.y * 0.12 };
        const length = Math.hypot(aim.x, aim.y) || 1;
        card.phase = "rest";
        shift(1, {
          dir: { x: aim.x / length, y: aim.y / length },
          tilt: card.r,
          velocity,
        });
      } else {
        card.phase = "rest";
        card.v.x = velocity.x;
        card.v.y = velocity.y;
        wake();
        schedule();
      }
    };

    const onClick = (event: MouseEvent) => {
      if (state.dragged) {
        state.dragged = false;
        return;
      }
      const target = (event.target as HTMLElement).closest?.("[data-swap-index]");
      if (!target || !root.contains(target)) return;
      const index = Number(target.getAttribute("data-swap-index"));
      const position = state.order.indexOf(index);
      if (position > 0) goTo(position);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        shift(1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        shift(-1);
      }
    };

    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKeyDown);

    // Initial positioning & responsive sizing
    fit();
    writeStage();
    deck.forEach((card) => write(card));
    wake();
    schedule();

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver((entries) => {
      state.inView = entries[entries.length - 1]?.isIntersecting ?? true;
      schedule();
    });
    intersectionObserver.observe(root);

    // Expose global cardSwapApi for navigation & hash routing
    (window as any).cardSwapApi = {
      next: () => shift(1),
      prev: () => shift(-1),
      goToCardIndex,
      fit,
      refresh: () => {
        fit();
        wake();
        schedule();
      },
    };

    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const idMap: Record<string, number> = {
        "solutions-colleges": 0,
        "solutions-companies": 1,
        "solutions-communities": 2,
        "solutions-individuals": 3,
      };
      if (idMap[hash] !== undefined) {
        goToCardIndex(idMap[hash]);
      }
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointerup", onPointerUp);
      root.removeEventListener("pointercancel", onPointerUp);
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", handleHash);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (state.timer) clearTimeout(state.timer);
      state.queue.forEach(clearTimeout);
      cancelAnimationFrame(state.raf);
    };
  }, [cardWidth, cardHeight, cardDistance, verticalDistance, depth, skewAmount, visible, hoverSpread, dim, delay, autoplay, speed, bounce, count, bounds]);

  return (
    <div className="solutions-swap-wrapper">
      {/* 3D CardSwap Canvas / Stage */}
      <div
        ref={rootRef}
        id="solutions-card-swap"
        className="card-swap"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Solutions Card Stack"
        style={{
          "--swap-w": `${cardWidth}px`,
          "--swap-h": `${cardHeight}px`,
          "--swap-ox": `${bounds.originX}px`,
          "--swap-oy": `${bounds.originY}px`,
          "--swap-stage-w": `${bounds.width}px`,
          "--swap-stage-h": `${bounds.height}px`,
          "--swap-ratio": `${bounds.width} / ${bounds.height}`,
          "--swap-radius": `${cardRadius}px`,
        } as React.CSSProperties}
      >
        <div className="card-swap-sizer" aria-hidden="true">
          <span style={{ maxWidth: bounds.width, aspectRatio: `${bounds.width} / ${bounds.height}` }}></span>
        </div>
        <div className="card-swap-stage" ref={stageRef}>
          {SOLUTIONS_DATA.map((solution, idx) => (
            <div
              key={solution.id}
              className="card-swap-slot"
              id={solution.id}
              data-swap-index={idx}
              ref={(el) => {
                slotRefs.current[idx] = el;
              }}
            >
              <div className="card-swap-card solution-swap-card">
                <div className="solution-swap-inner">
                  <div className="solution-swap-header">
                    <div className="solution-swap-icon">{solution.icon}</div>
                    <div className="solution-swap-titles">
                      <h3 className="solution-swap-title">{solution.title}</h3>
                      <span className="solution-swap-subtag">{solution.subtitle}</span>
                    </div>
                  </div>

                  <p className="solution-swap-copy">{solution.copy}</p>

                  <ul className="solution-swap-bullets">
                    {solution.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="solution-bullet-item">
                        <svg className="solution-bullet-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="solution-swap-footer">
                    <span className="solution-drag-hint">Drag or swipe card ➔</span>
                  </div>
                </div>
                <span className="card-swap-card-rim" aria-hidden="true"></span>
              </div>
              <span
                className="card-swap-shade"
                aria-hidden="true"
                ref={(el) => {
                  shadeRefs.current[idx] = el;
                }}
              ></span>
            </div>
          ))}
        </div>
      </div>

      {/* CardSwap Controls */}
      <div className="solutions-swap-controls">
        <button
          className="solutions-ctrl-btn"
          id="solutions-swap-prev"
          type="button"
          aria-label="Previous Solution Card"
          onClick={() => shiftRef.current(-1)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <div className="solutions-swap-dots" id="solutions-swap-dots">
          {SOLUTIONS_DATA.map((solution, idx) => (
            <button
              key={solution.id}
              className={`swap-dot ${activeIndex === idx ? "active" : ""}`}
              data-index={idx}
              type="button"
              aria-label={`View ${solution.title}`}
              onClick={() => goToCardIndexRef.current(idx)}
            ></button>
          ))}
        </div>
        <button
          className="solutions-ctrl-btn"
          id="solutions-swap-next"
          type="button"
          aria-label="Next Solution Card"
          onClick={() => shiftRef.current(1)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="solutions-swap-hint-bar">
        <span className="hint-pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Auto-cycling
        </span>
        <span className="hint-divider">•</span>
        <span>Drag / flick cards in any direction</span>
        <span className="hint-divider">•</span>
        <span>Click cards behind to bring forward</span>
      </div>
    </div>
  );
}
