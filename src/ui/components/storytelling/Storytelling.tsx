"use client";

import { ParallaxMedia } from "@/ui/components/parallaxMedia/ParallaxMedia";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";

interface StorytellingProps {
  variant: "portrait" | "landscape";
  mediaType: "image" | "video";
  media: any;
  title: string;
  description: ReactNode;
  className?: string;
}

export const Storytelling = ({
  variant,
  mediaType,
  media,
  title,
  description,
  className = "",
}: StorytellingProps) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mediaRef.current) observer.observe(mediaRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (mediaRef.current) observer.unobserve(mediaRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  const renderMedia = () => {
    if (mediaType === "image") {
      return (
        <div
          ref={mediaRef}
          className="transition-all duration-700 ease-out opacity-0 translate-y-4"
        >
          <Image
            className={`object-cover ${
              variant === "landscape" ? "aspect-video" : "aspect-[2/3]"
            }`}
            src={media}
            alt={title}
          />
        </div>
      );
    } else {
      return (
        <div
          ref={mediaRef}
          className="transition-all duration-700 ease-out opacity-0 translate-y-4"
        >
          <video
            className={`object-cover w-full h-full ${
              variant === "landscape" ? "aspect-video" : "aspect-[2/3]"
            }`}
            src={media}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      );
    }
  };

  if (variant === "portrait") {
    return (
      <>
        <ParallaxMedia className="span-w-3">{renderMedia()}</ParallaxMedia>
        <div
          ref={contentRef}
          className="flex flex-col gap-8 transition-all duration-700 ease-out opacity-0 translate-y-4"
        >
          <span>{title}</span>
          <p className="opacity-60">{description}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        ref={contentRef}
        className="flex flex-col span-w-2 gap-12 transition-all duration-700 ease-out opacity-0 translate-y-4"
      >
        <span className="text-14 uppercase">{title}</span>
        <p className="opacity-60">{description}</p>
      </div>
      <ParallaxMedia className="span-w-3">{renderMedia()}</ParallaxMedia>
    </>
  );
};
