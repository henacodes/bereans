"use client";

import { useState } from "react";
import Image from "next/image";
import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    // Changed bg-slate-100 to bg-muted/50 for a themed neutral background
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4 md:p-8">
      {/* The Main Card Container */}
      <Card className="grid w-full max-w-5xl overflow-hidden shadow-xl md:grid-cols-2 lg:min-h-[600px] p-0 border-none">
        {/* Left Side: Jesus Icon Filling the Container */}
        {/* Changed bg-zinc-950 to bg-secondary or a dark muted tone that respects theme */}
        <div className="relative hidden bg-slate-950 md:block">
          <Image
            src="/christian-pattern.png"
            alt="Christ Pantocrator"
            fill
            className="object-cover object-center grayscale-[0.2] opacity-60 contrast-[1.1]"
            priority
          />

          {/* Overlays: Using semi-transparent blacks is usually okay for images, 
              but the vignette now uses a gradient that blends with black/950 */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/90" />

          {/* Berean Verse Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
            <h2 className="mb-4 font-serif text-xl italic tracking-wide text-primary">
              Acts 17:11
            </h2>
            <p className="text-lg leading-relaxed text-slate-100 shadow-black drop-shadow-md font-lexend">
              &ldquo;Now the Berean Jews were of more noble character than those
              in Thessalonica, for they received the message with great
              eagerness and examined the Scriptures every day to see if what
              Paul said was true. &rdquo;
            </p>
            <div className="mt-6 h-px w-16 bg-primary/50" />
          </div>

          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>

        {/* Right Side: Forms */}
        {/* Changed bg-white to bg-card and text-center colors to foreground */}
        <CardContent className="flex flex-col justify-center bg-card p-8 lg:p-12">
          <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {showSignIn ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your details below to continue
              </p>
            </div>

            {/* Form Rendering Logic */}
            <div className="relative transition-all duration-300">
              {showSignIn ? (
                <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
              ) : (
                <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
