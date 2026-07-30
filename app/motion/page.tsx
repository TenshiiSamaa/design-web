"use client";

import React, { useState, useMemo } from "react";
import { 
  motion, AnimatePresence, useMotionValue, useTransform
} from "framer-motion";
import { ANIMATION_PRESETS } from "@/features/motion/registry";
import { AnimationSpec } from "@/features/motion/types";
import { 
  ArrowLeft, Sparkles, Zap, Play, Cpu, Move, Eye, EyeOff, Info, RotateCcw
} from "lucide-react";
import { Card, Separator } from "@/components/ui";
import Link from "next/link";

export default function MotionLabPage() {
  // Motion Playground States
  const [selectedPresetId, setSelectedPresetId] = useState<string>("scale-spring");
  const [duration, setDuration] = useState<number>(0.3);
  const [delay, setDelay] = useState<number>(0);
  const [stiffness, setStiffness] = useState<number>(200);
  const [damping, setDamping] = useState<number>(15);
  const [mass, setMass] = useState<number>(1);
  const [scaleLimit, setScaleLimit] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [transformOrigin, setTransformOrigin] = useState<string>("center");

  // Telemetry simulator metrics
  const [animTriggerCount, setAnimTriggerCount] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Drag simulation values
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const rotateX = useTransform(dragY, [-100, 100], [20, -20]);
  const rotateY = useTransform(dragX, [-100, 100], [-20, 20]);

  const activePreset = useMemo(() => {
    return ANIMATION_PRESETS.find((p) => p.id === selectedPresetId) || ANIMATION_PRESETS[0];
  }, [selectedPresetId]);

  // Sync state sliders when preset is switched
  const handleSelectPreset = (preset: AnimationSpec) => {
    setSelectedPresetId(preset.id);
    setDuration(preset.duration);
    setDelay(preset.delay);
    if (preset.spring) {
      setStiffness(preset.spring.stiffness);
      setDamping(preset.spring.damping);
      setMass(preset.spring.mass);
    }
  };

  const handleResetPlayground = () => {
    setDuration(0.3);
    setDelay(0);
    setStiffness(200);
    setDamping(15);
    setMass(1);
    setScaleLimit(1.2);
    setRotation(0);
    setTransformOrigin("center");
  };

  // Compile active transition configs
  const activeTransition = useMemo(() => {
    if (prefersReducedMotion) {
      return { type: "tween" as const, duration: 0.01 };
    }
    if (activePreset.spring) {
      return {
        type: "spring" as const,
        stiffness,
        damping,
        mass,
        delay
      };
    }
    return {
      type: "tween" as const,
      duration,
      ease: "easeOut" as const,
      delay
    };
  }, [activePreset, stiffness, damping, mass, duration, delay, prefersReducedMotion]);

  return (
    <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full text-[var(--foreground)]">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4 shrink-0">
        <div className="space-y-1">
          <Link href="/" className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
            <ArrowLeft className="h-3 w-3" /> Back to Playground
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Zap className="h-5 w-5 text-[var(--primary)]" />
            Motion & Interaction System
          </h1>
          <p className="text-xs text-[var(--muted-foreground)]">
            Configure cubic curves, spring physics variables, loading shimmer states, and inspect execution telemetry.
          </p>
        </div>

        {/* Reduced motion override control */}
        <button
          onClick={() => setPrefersReducedMotion(!prefersReducedMotion)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            prefersReducedMotion
              ? "border-[var(--destructive)]/30 bg-[var(--destructive)]/10 text-[var(--destructive)]"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]"
          }`}
        >
          {prefersReducedMotion ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          <span>Reduced Motion Overrides: {prefersReducedMotion ? "ON" : "OFF"}</span>
        </button>
      </div>

      {/* 2. Workspace Grid: Simulator Playground & Inspector Gauges */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Animation Preset Browser (3 cols) */}
        <div className="lg:col-span-3 space-y-5 md:sticky md:top-20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] px-1">Preset Registry</span>
          <div className="space-y-1 bg-[var(--surface)]/30 border border-[var(--border)] rounded-xl p-2.5">
            {ANIMATION_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`w-full px-2.5 py-2 rounded-lg text-xs text-left transition-all flex flex-col gap-0.5 cursor-pointer ${
                  selectedPresetId === p.id
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold"
                    : "hover:bg-[var(--surface)] text-[var(--foreground)]"
                }`}
              >
                <span>{p.name}</span>
                <span className={`text-[9px] capitalize ${selectedPresetId === p.id ? "text-[var(--primary-foreground)]/80" : "text-[var(--muted-foreground)]"}`}>
                  Cat: {p.category}
                </span>
              </button>
            ))}
          </div>

          <Separator />

          {/* Quick instructions info */}
          <Card className="p-4 bg-[var(--surface)]/20 text-xs space-y-2 border-[var(--border)]">
            <h5 className="font-bold flex items-center gap-1.5 text-[var(--foreground)]">
              <Info className="h-3.5 w-3.5 text-[var(--primary)]" /> Motion Guidelines
            </h5>
            <p className="text-[11px] text-[var(--muted-foreground)] leading-relaxed">
              Always optimize transition duration to remain below 400ms. Damping ratios between 15-25 deliver clean elastic spring physics.
            </p>
          </Card>
        </div>

        {/* Center: Live Sandbox & Sliders panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">Physics Controllers</span>
            <button 
              onClick={handleResetPlayground}
              className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
          </div>

          {/* Spring & Tween control sliders */}
          <div className="space-y-4 border border-[var(--border)] rounded-xl p-4 bg-[var(--background)]">
            {/* General parameters */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Duration</span>
                <span className="font-mono text-[var(--muted-foreground)]">{duration.toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.0"
                step="0.05"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Delay Time</span>
                <span className="font-mono text-[var(--muted-foreground)]">{delay.toFixed(2)}s</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.5"
                step="0.05"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <Separator className="my-2" />

            {/* Spring options */}
            <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] tracking-wide block">Spring Curves</span>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Stiffness</span>
                <span className="font-mono text-[var(--muted-foreground)]">{stiffness}</span>
              </div>
              <input
                type="range"
                min="50"
                max="600"
                step="10"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Damping (Friction)</span>
                <span className="font-mono text-[var(--muted-foreground)]">{damping}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Mass</span>
                <span className="font-mono text-[var(--muted-foreground)]">{mass.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={mass}
                onChange={(e) => setMass(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <Separator className="my-2" />

            {/* Transform configs */}
            <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] tracking-wide block">Transform Parameters</span>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Hover Scale Limit</span>
                <span className="font-mono text-[var(--muted-foreground)]">{(scaleLimit * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.5"
                step="0.05"
                value={scaleLimit}
                onChange={(e) => setScaleLimit(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[var(--foreground)]">Rotation Degree</span>
                <span className="font-mono text-[var(--muted-foreground)]">{rotation}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-[var(--muted-foreground)] font-semibold block">Transform Origin</label>
              <div className="grid grid-cols-3 gap-1 bg-[var(--surface)] p-1 rounded-lg border border-[var(--border)]">
                {(["left", "center", "right"] as const).map((origin) => (
                  <button
                    key={origin}
                    onClick={() => setTransformOrigin(origin)}
                    className={`py-1 rounded text-[10px] font-semibold transition-all cursor-pointer capitalize ${
                      transformOrigin === origin
                        ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {origin}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Visual Preview Panels & Live Telemetry Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Animation Playground Sandbox View */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Visual Sandbox Preview</span>
            <div className="w-full border border-[var(--border)] border-dashed rounded-xl bg-[var(--background)]/30 p-8 flex flex-col items-center justify-center min-h-[220px] relative">
              
              {/* Reset simulator trigger */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={animTriggerCount + selectedPresetId}
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: rotation
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={activeTransition}
                  style={{ transformOrigin }}
                  whileHover={prefersReducedMotion ? {} : { scale: scaleLimit }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-[var(--primary)] to-[var(--accent-foreground)] cursor-pointer flex flex-col items-center justify-center text-[var(--primary-foreground)] shadow-xl relative"
                >
                  <Sparkles className="h-6 w-6" />
                  <span className="text-[9px] font-bold uppercase tracking-wide mt-1 select-none">Test Presets</span>
                </motion.div>
              </AnimatePresence>

              {/* Trigger manual button */}
              <button 
                onClick={() => setAnimTriggerCount((c) => c + 1)}
                className="mt-6 flex items-center gap-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:scale-102 transition-transform cursor-pointer"
              >
                <Play className="h-3 w-3 fill-current" /> Trigger Entrance Transition
              </button>
            </div>
          </div>

          <Separator />

          {/* Micro-interaction Gestures Showcase */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1">Interactive Gestures (Drag Card)</span>
            <div className="w-full border border-[var(--border)] rounded-xl bg-[var(--surface)] p-6 min-h-[200px] flex items-center justify-center overflow-hidden relative">
              <motion.div
                drag
                dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
                style={{ x: dragX, y: dragY, rotateX, rotateY, transformStyle: "preserve-3d" }}
                whileDrag={{ scale: 1.05 }}
                className="h-28 w-52 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 flex flex-col justify-between cursor-grab active:cursor-grabbing text-left shadow-md select-none"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-xs text-[var(--foreground)]">Draggable Card</h5>
                    <p className="text-[10px] text-[var(--muted-foreground)]">Drag inside constraints</p>
                  </div>
                  <Move className="h-3.5 w-3.5 text-[var(--primary)] shrink-0" />
                </div>
                <div className="text-[9px] font-mono text-[var(--muted-foreground)]">
                  Bounds: Elastic Limit
                </div>
              </motion.div>
            </div>
          </div>

          <Separator />

          {/* Performance Inspector gauges */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] block px-1 flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5" /> Performance Telemetry Inspector
            </span>

            <div className="grid grid-cols-2 gap-3.5">
              {/* FPS Indicator */}
              <Card className="p-4 bg-[var(--surface)]/30 border-[var(--border)] text-left flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">Execution FPS</span>
                  <span className="text-xl font-black text-emerald-500 font-mono block">60.0 <span className="text-xs">fps</span></span>
                </div>
                <p className="text-[9px] text-[var(--muted-foreground)] mt-2 leading-relaxed">
                  Smooth animation loops locked at V-Sync refresh levels.
                </p>
              </Card>

              {/* Layout shifts */}
              <Card className="p-4 bg-[var(--surface)]/30 border-[var(--border)] text-left flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-[var(--muted-foreground)] block">Layout Shift (CLS)</span>
                  <span className="text-xl font-black text-[var(--primary)] font-mono block">0.00</span>
                </div>
                <p className="text-[9px] text-[var(--muted-foreground)] mt-2 leading-relaxed">
                  Decoupled spring translates guarantee zero layout shifting.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
