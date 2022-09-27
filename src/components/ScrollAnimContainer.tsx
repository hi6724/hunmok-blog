import gsap from "gsap";
import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  anim: any;
  from?: boolean;
  target?: any;
  [key: string]: any;
};

function ScrollAnimContainer({ children, anim, from, target, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (from) {
      gsap.from(target !== undefined ? target : ref.current, {
        ...anim,
        scrollTrigger: {
          trigger: target !== undefined ? target : ref.current,
          start: "top 70%",
        },
      });
    } else {
      gsap.to(target !== undefined ? target : ref.current, {
        ...anim,
        scrollTrigger: {
          trigger: target !== undefined ? target : ref.current,
          start: "top 70%",
        },
      });
    }
  });

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

export default ScrollAnimContainer;
