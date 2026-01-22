// components/bible/OnboardingPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick, X, Info } from "lucide-react";
import { Button } from "./ui/button";

export function OnboardingPanel() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("has_seen_bible_tour");
    if (!hasSeen) {
      const timer = setTimeout(() => setIsVisible(true), 1500); // Delay for better UX
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setIsVisible(false);
    localStorage.setItem("has_seen_bible_tour", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-white dark:bg-slate-900 border border-border shadow-2xl rounded-2xl overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-primary">
                <Info className="h-5 w-5" />
                <span className="font-bold text-sm tracking-tight">
                  Quick Tip
                </span>
              </div>
              <button
                onClick={close}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <h3 className="text-lg font-playfair font-bold mb-2">
              How to ask a question
            </h3>

            {/* Short Demo Loop Placeholder */}
            <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center border border-dashed border-slate-300 relative overflow-hidden">
              {/* Replace src with your actual screen recording mp4 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <MousePointerClick className="h-8 w-8 text-primary mb-2 animate-bounce" />
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  Click first verse → Click last verse
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              To inquire about a passage, <strong>click the first verse</strong>
              , move your mouse, and <strong>click the last verse</strong> of
              the range. A dialog will appear to start your inquiry!
            </p>

            <Button
              onClick={close}
              className="w-full bg-[#82C3A1] hover:bg-[#82C3A1]/90 text-[#1E3A2B] font-bold"
            >
              Got it!
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
