"use client";

import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GradientHero() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="from-primary/20 via-background to-background absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"></div>
        <div className="bg-primary/5 absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:16px_16px] opacity-15"></div>

      <div className="relative z-10 container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Heading - Replaced motion.h1 with h1 */}
          <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 from-primary/10 via-foreground/85 to-foreground/50 bg-gradient-to-tl bg-clip-text text-center text-4xl tracking-tighter text-balance text-transparent sm:text-5xl md:text-6xl lg:text-7xl font-playfair ">
            Study the Bible Critically, Together
          </h1>

          {/* Description - Replaced motion.p with p */}
          <p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg">
            Bereans is a community for thoughtful exploration of scripture—
            blending history, language, and culture. Learn, discuss, and grow
            without needing academic certification.
          </p>

          {/* CTA Buttons - Replaced motion.div with div */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="/login">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:shadow-primary/30 relative overflow-hidden rounded-full px-6 shadow-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Join the Community
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                {/* Maintain the hover gradient transition functionality */}
                <span className="from-primary via-primary/90 to-primary/80 absolute inset-0 z-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Button>
            </a>

            <a href="/questions">
              <Button
                variant="outline"
                size="lg"
                className="border-border bg-background/50 flex items-center gap-2 rounded-full backdrop-blur-sm"
              >
                <BookOpen className="h-4 w-4" />
                Explore Discussions
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
