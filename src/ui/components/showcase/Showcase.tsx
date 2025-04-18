"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface ShowcaseProps {
  i1: string;
  i2: StaticImageData;
  i3: StaticImageData;
}

export const Showcase = ({ i1, i2, i3 }: ShowcaseProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [image2Loaded, setImage2Loaded] = useState(false);
  const [image3Loaded, setImage3Loaded] = useState(false);

  return (
    <section className="flex w-full flex-wrap gutter-gap-1">
      <video
        autoPlay
        loop
        muted
        className={`lg:span-w-4 object-cover aspect-square transition-opacity duration-500 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={i1}
        onLoadedData={() => setVideoLoaded(true)}
      />
      <div className="flex lg:flex-col gutter-gap-1">
        <Image
          className={`span-w-3 lg:span-w-2 aspect-square object-cover transition-opacity duration-500 ${
            image2Loaded ? "opacity-100" : "opacity-0"
          }`}
          src={i2}
          alt="showcase"
          onLoadingComplete={() => setImage2Loaded(true)}
        />
        <Image
          className={`span-w-3 lg:span-w-2 aspect-square object-cover transition-opacity duration-500 ${
            image3Loaded ? "opacity-100" : "opacity-0"
          }`}
          src={i3}
          alt="showcase"
          onLoadingComplete={() => setImage3Loaded(true)}
        />
      </div>
    </section>
  );
};
