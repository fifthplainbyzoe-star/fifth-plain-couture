import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import emblem from "@/assets/preloader-emblem.png";
import mFabric from "@/assets/montage-fabric.jpg";
import mEmbroidery from "@/assets/montage-embroidery.jpg";
import mFolding from "@/assets/montage-folding.jpg";
import mLifestyle from "@/assets/montage-lifestyle.jpg";

const MONTAGE = [mFabric, mEmbroidery, mFolding, mLifestyle];
const FRAME_MS = 1100;

type Phase = "idle" | "emblem" | "name" | "cta" | "montage" | "out" | "done";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function release() {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-preload", "0");
  }
}

export function Preloader() {
  // Rendered on the server and during hydration so the homepage can never flash.
  // The blocking inline script in __root decides whether it stays.
  const [active, setActive] = useState(true);
  const [phase, setPhase] = useState<Phase>("idle");
  const [frame, setFrame] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  useIsomorphicLayoutEffect(() => {
    const flag = document.documentElement.getAttribute("data-preload");
    if (flag !== "1") {
      // Already seen this session, or not the homepage — drop before first paint.
      release();
      setActive(false);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("cta");
    } else {
      later(() => setPhase("emblem"), 700);
      later(() => setPhase("name"), 2000);
      later(() => setPhase("cta"), 3200);
    }

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      release();
    };
  }, []);

  // Subtle synthesized ambient pad — starts once audio is permitted.
  const startAmbience = useCallback(() => {
    if (audioRef.current) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 3.5);
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      [55, 82.5, 110, 164.8].forEach((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = f;
        const g = ctx.createGain();
        g.gain.value = i === 3 ? 0.25 : 0.6;
        osc.connect(g).connect(filter);
        osc.start();
      });
      filter.connect(gain).connect(ctx.destination);
      void ctx.resume();
      audioRef.current = { ctx, gain };
    } catch {
      /* audio is a nicety, never a blocker */
    }
  }, []);

  const stopAmbience = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    audioRef.current = null;
    try {
      a.gain.gain.cancelScheduledValues(a.ctx.currentTime);
      a.gain.gain.setValueAtTime(a.gain.gain.value, a.ctx.currentTime);
      a.gain.gain.exponentialRampToValueAtTime(0.0001, a.ctx.currentTime + 1.4);
      setTimeout(() => void a.ctx.close().catch(() => {}), 1700);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    startAmbience();
    const onGesture = () => startAmbience();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      stopAmbience();
    };
  }, [active, startAmbience, stopAmbience]);

  const enter = () => {
    if (phase === "montage" || phase === "out") return;
    startAmbience();
    setPhase("montage");
    MONTAGE.forEach((_, i) => later(() => setFrame(i), i * FRAME_MS));
    later(() => {
      stopAmbience();
      // Reveal the homepage underneath first, then cross-fade the overlay out.
      release();
      setPhase("out");
    }, MONTAGE.length * FRAME_MS);
    later(() => {
      setPhase("done");
      setActive(false);
    }, MONTAGE.length * FRAME_MS + 1100);
  };

  if (!active) return null;

  const showEmblem = phase !== "idle";
  const showName = phase === "name" || phase === "cta";
  const showCta = phase === "cta";
  const montage = phase === "montage";

  return (
    <div
      id="fp-preloader"
      aria-hidden={phase === "out"}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0d0d0c] transition-opacity duration-[1000ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
        phase === "out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Montage */}
      <div className={`absolute inset-0 ${montage ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}>
        {MONTAGE.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            width={1536}
            height={1024}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
              montage && frame === i ? "opacity-100 ken-burns" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0c] via-[#0d0d0c]/25 to-[#0d0d0c]/60" />
      </div>

      {/* Intro */}
      <div
        className={`relative z-10 flex flex-col items-center px-6 text-center transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
          montage ? "opacity-0 -translate-y-2" : "opacity-100"
        }`}
      >
        <img
          src={emblem}
          alt="Fifth Plain emblem"
          width={816}
          height={816}
          className={`h-24 w-24 md:h-32 md:w-32 object-contain transition-all duration-[1600ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
            showEmblem ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-[6px]"
          }`}
        />

        <div
          className={`transition-all duration-[1400ms] ease-[cubic-bezier(.2,.7,.2,1)] ${
            showName ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="mt-10 font-display text-3xl md:text-5xl tracking-[0.42em] text-[#f4efe7] pl-[0.42em]">
            FIFTHPLAIN
          </h1>
          <div className="mx-auto mt-7 h-px w-16 bg-[#c9a86a]/70" />
          <p className="mt-7 font-editorial text-lg md:text-2xl text-[#c9a86a]">The Art Of Presence</p>
        </div>

        <button
          type="button"
          onClick={enter}
          className={`mt-16 border border-[#c9a86a]/50 px-10 py-4 text-[10px] md:text-[11px] uppercase tracking-[0.34em] text-[#c9a86a] transition-all duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:border-[#c9a86a] hover:bg-[#c9a86a]/10 hover:shadow-[0_0_38px_-6px_rgba(201,168,106,0.55)] ${
            showCta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          Explore The Collection
        </button>
      </div>
    </div>
  );
}
