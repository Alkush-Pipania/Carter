"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useCallback, useEffect, useState } from "react";
import "@/app/globals.css";
 
const buttonVariants = cva(
  // Base styles that apply to all variants
  [
    "relative",
    "rounded-sm",
    "px-4",
    "py-2",
    "w-fit",
    "transition-all",
    "duration-100",
    "dark:hover:bg-black/90",
    "hover:bg-white/90",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "bg-white",
    "dark:bg-black",
    "text-black",
    "dark:text-white",
    "border",
    "border-primary-purple/primary-purple-400",
    "dark:border-white",
  ],
  {
    variants: {
      variant: {
        clicky: "", // Base styles for clicky - will be combined with isPressed
        silent: ["border", "hover:bg-opacity-90"],
        submit: ""
      },
      isPressed: {
        true: "",
        false: "",
      },
    },
    // Compound variants for combining isPressed with variant
    compoundVariants: [
      {
        variant: "clicky",
        isPressed: true,
        className: [
          "translate-y-[5px]",
          "translate-x-[5px]",
          "border-b-[4px]",
          "border-r-[4px]",
        ],
      },
      {
        variant: "clicky",
        isPressed: false,
        className: ["border-b-[7px]", "border-r-[7px]"],
      },
    ],
    defaultVariants: {
      variant: "clicky",
      isPressed: false,
    },
  }
);
 
const useClickSounds = (volume = 1) => {
  const createAudio = (path: string) =>
    typeof window !== "undefined" ? new Audio(path) : null;
  const [sounds] = useState(() => ({
    click: createAudio("/sound/click.wav"),
    release: createAudio("/sound/click-release.wav"),
  }));
 
  useEffect(() => {
    if (!sounds.click || !sounds.release) return;
    [sounds.click, sounds.release].forEach((sound) => {
      sound.volume = volume;
      sound.load();
    });
    return () => {
      [sounds.click, sounds.release].forEach((sound) => {
        if (sound) sound.pause();
      });
    };
  }, [sounds, volume]);
 
  const playSound = useCallback((sound: HTMLAudioElement | null) => {
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.error("Audio playback failed:", err);
        }
      });
    }
  }, []);
 
  return {
    playClick: useCallback(() => playSound(sounds.click), [playSound, sounds]),
    playRelease: useCallback(
      () => playSound(sounds.release),
      [playSound, sounds]
    ),
  };
};
 
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  volume?: number;
}
 
export default function Button2({
    variant = "clicky",
    volume = 1,
    children,
    className,
    onMouseDown,
    onMouseUp,
    disabled,
    ...props
  }: ButtonProps){
    const { playClick, playRelease } = useClickSounds(volume);
    const [isPressed, setIsPressed] = useState(false);
 
    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && variant === "clicky") {
          playClick();
        }
        setIsPressed(true);
        onMouseDown?.(e);
      },
      [disabled, variant, playClick, onMouseDown]
    );
 
    const handleMouseUp = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && variant === "clicky") {
          playRelease();
        }
        setIsPressed(false);
        onMouseUp?.(e);
      },
      [disabled, variant, playRelease, onMouseUp]
    );
 
    return (
      <button
        className={cn(buttonVariants({ variant, isPressed, className }))}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }