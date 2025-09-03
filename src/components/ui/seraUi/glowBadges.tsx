"use client";
import React from "react";

type AnimatedBadgeProps = {
  text: string;
  borderColor: string;
  className?: string;
};

const AnimatedBadge = ({
  text,
  borderColor,
  className = "",
}: AnimatedBadgeProps) => {
  return (
    <div
      className={`rounded-full p-[1px] bg-gradient-to-r from-transparent ${borderColor} to-transparent [background-size:400%_100%] ${className}`}
      style={{ animation: "move-bg 8s linear infinite" }}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#0a091e] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-transparent">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default function AnimatedBadgeView(): React.ReactElement {
  return (
    <>
      <style>
        {`
          @keyframes move-bg {
            to {
              background-position: 400% 0;
            }
          }
        `}
      </style>
      <section
        aria-label="Sera UI Buttons"
        className="relative flex w-full items-center justify-center overflow-hidden p-4 font-sans antialiased bg-white dark:bg-black"
      >
        <div className="z-10 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            
              <AnimatedBadge text="Sera UI" borderColor="via-rose-500" />
          </div>
        </div>
      </section>
    </>
  );
}



// const AnimatedBadgeView = () => {
//   return (
//     <>
//       <AnimatedBadge text="Sera UI" icon={<FlowerIcon />} borderColor="via-white" />
//     </>
//   )
// }


// export default AnimatedBadgeView;
