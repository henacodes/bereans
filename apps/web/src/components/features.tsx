"use client";

import { Target, Quote, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Verse-Level Precision",
    desc: "Every insight and question is anchored directly to specific verses, ensuring strict contextual accuracy.",
  },
  {
    icon: <Quote className="h-6 w-6" />,
    title: "Academic Citations",
    desc: "Move beyond opinion with responses backed by historical lexicons, peer-reviewed sources, and primary texts.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Scholarly Dialogue",
    desc: "Engage in a rigorous community environment where discourse is evidence-based and respectfully critical.",
  },
];

export default function Features() {
  return (
    <section className="relative py-16 bg-transparent text-foreground">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="relative mx-auto max-w-2xl text-center">
          <h3 className="font-geist text-3xl font-bold tracking-tighter sm:text-4xl">
            A Higher Standard of Study
          </h3>
          <p className="mt-4 text-muted-foreground">
            Built for those who demand depth, transparency, and textual
            integrity in their exploration of scripture.
          </p>
        </div>

        <div className="mt-16">
          <ul className="grid gap-10 sm:grid-cols-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="group relative flex flex-col items-center text-center space-y-4"
              >
                {/* Icon Container with Theme-Responsive Glow */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-colors group-hover:bg-primary/10">
                  {item.icon}
                </div>

                <div className="space-y-2">
                  <h4 className="font-geist text-xl font-semibold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
