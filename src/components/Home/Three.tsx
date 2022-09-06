import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "three/examples/fonts/droid/droid_sans_bold.typeface.json";
import React, { useEffect, useRef, useState } from "react";

import { colors } from "../../color";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textGeometry: any;
    }
  }
}

const TEXT_ARR = [
  "Three",
  "CSS",
  "RN",
  "Firebase",
  "Storybook",
  "Next",
  "JS/TS",
  "gsap",
  "React",
  "Graphql",
  "Redux",
  "Tailwind",
  "Recoil",
  "Python",
  "Java",
  "npm",
  "git",
  "Node JS",
  "ES5/ES6",
  "REST",
  "npm",
  "npm",
  "npm",
  "npm",
];

function Three() {
  const [planes, setPlanes] = useState<any>([]);
  const [pointsRef, setPointsRef] = useState<any>();
  const font = useRef(new FontLoader().parse(myFont));
  const planeRefArr = useRef<any[]>([]);

  useFrame(({ camera, clock }) => {
    // console.log(Math.floor(10000 / window.innerWidth));
    const distance = Math.floor(11000 / window.innerWidth);
    camera.position.x = Math.sin(clock.elapsedTime / 3) * distance;
    camera.position.z = Math.cos(clock.elapsedTime / 3) * distance;
    camera.lookAt(0, 0, 0);
    planeRefArr.current.forEach((plane) => {
      plane.lookAt(camera.position.x, camera.position.y, camera.position.z);
    });
  });

  useEffect(() => {
    if (pointsRef) {
      var tempP = Array.from(pointsRef.geometry.attributes.position.array);
      var newP = [];
      const cnt = 5;
      for (let i = 0; i < tempP.length - 3 * cnt; i += 3) {
        const temp = [tempP[i], tempP[i + 1], tempP[i + 2]];
        if (!temp.includes(0)) {
          newP.push(temp);
        }
      }
      setPlanes(newP);
    }
  }, [pointsRef, font]);

  return (
    <>
      <OrbitControls enabled={false} />

      <pointLight position={[-6, 0, 0]} intensity={0.5} />
      <pointLight position={[6, 0, 0]} intensity={0.5} />
      <pointLight position={[0, 0, 6]} intensity={0.5} />
      <pointLight position={[0, 0, -6]} intensity={0.5} />

      <points ref={(el: any) => setPointsRef(el)}>
        <sphereGeometry args={[3, 5, 5]} />
        <meshBasicMaterial transparent />
      </points>

      {planes.map((arr: any, i: number) => (
        <mesh
          key={i}
          ref={(el: any) => (planeRefArr.current[i] = el)}
          position={[arr[0], arr[1], arr[2]]}
        >
          <textGeometry
            args={[
              TEXT_ARR[i],
              { font: font.current, size: 0.2, height: 0.05 },
            ]}
          />
          <meshLambertMaterial attach="material" color={colors.purple} />
        </mesh>
      ))}
    </>
  );
}

export default Three;
