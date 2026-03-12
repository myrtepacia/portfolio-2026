import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import React from 'react'

const TypingBubble = () => {
    const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all dots within the container
    const dots = container.current?.querySelectorAll(".dot");
    
    if (dots) {
      gsap.to(dots, {
        y: -2,               // Lift dots up
        opacity: 0.3,        // Slight fade
        duration: 0.6,
        stagger: 0.2,        // Delay between dots for wave effect
        repeat: -1,          // Loop forever
        yoyo: true,          // Bounce back down
        ease: "power1.inOut"
      });
    }
  }, { scope: container }); // Scoping prevents targeting dots outside this component
  return (
    <div 
      ref={container} 
      className="flex items-center space-x-1.5 p-3 bg-gray-200 rounded-2xl dark:bg-zinc-700 rounded-bl-none w-fit"
    >
      <div className="dot w-1 h-1 bg-gray-500 rounded-full" />
      <div className="dot w-1 h-1 bg-gray-500 rounded-full" />
      <div className="dot w-1 h-1 bg-gray-500 rounded-full" />
    </div>
  )
}

export default TypingBubble