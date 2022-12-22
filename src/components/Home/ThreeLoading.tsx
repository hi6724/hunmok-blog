import React, { useRef, useEffect } from "react";

import { useThree, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "three/examples/fonts/droid/droid_sans_bold.typeface.json";
import { colors } from "../../color";
import gsap from "gsap";

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

function textAnim(mesh: any, i: number) {
  gsap.to(mesh.position, {
    duration: 1,
    delay: i / 10,
    keyframes: {
      y: [1, 2, 1],
      ease: "power1.inOut",
    },
    repeat: -1,
    repeatDelay: 2.4,
  });
}

function lightAnim(mesh: any, i: number, clock: THREE.Clock) {
  const xPos = Math.sin(clock.elapsedTime * 3 + i * 2) * 5;
  const zPos = Math.cos(clock.elapsedTime * 3 + i * 2) * 5 + 1;
  mesh.position.set(xPos, 3, zPos);
}

function ThreeLoading() {
  const font = useRef(new FontLoader().parse(myFont));
  const lightRef = useRef<any>([]);
  const textRef = useRef<any>([]);

  useEffect(() => {
    if (!!textRef.current) {
      textRef.current.forEach(textAnim);
    }
  }, [textRef.current]);
  useThree(({ camera }) => {
    camera.position.z = 6;
    camera.position.y = 1.5;
    camera.lookAt(0, 1, 0);
  });
  useFrame(({ clock }) => {
    if (!!lightRef.current) {
      lightRef.current.forEach((mesh: any, i: number) =>
        lightAnim(mesh, i, clock)
      );
    }
  });
  return (
    <>
      {/* Ball */}
      {Array.from("LOADING").map((str: string, i) => {
        let xPos = i / 2 - 2;
        if (i === 0) xPos += 0.1;
        if (i === 1) xPos -= 0.05;
        if (i > 4) xPos -= 0.2;
        return (
          <mesh
            position={[xPos, 1, 3]}
            castShadow
            ref={(el) => (textRef.current[i] = el)}
          >
            <textGeometry
              args={[str, { font: font.current, size: 0.5, height: 0.1 }]}
            />
            <meshLambertMaterial attach="material" color={colors.white} />
          </mesh>
        );
      })}
      {/* Floor */}
      <mesh
        rotation={[-angleToRadians(90), 0, 0]}
        position={[0, 0.3, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={colors.darkGray} />
      </mesh>

      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      {/* Spotlight light */}
      {Array.from(Array(3).keys()).map((_, i) => {
        const hex = "#00";
        const output = hex.substring(0, i + 1) + "F" + hex.substring(i + 1);
        return (
          <spotLight
            key={i}
            ref={(el) => (lightRef.current[i] = el)}
            args={[output, 10, 6]}
            penumbra={1}
            position={[-5, 3, 0]}
            castShadow
          />
        );
      })}
    </>
  );
}

export default ThreeLoading;
