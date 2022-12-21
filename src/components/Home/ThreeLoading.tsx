import React, { useRef, useEffect } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import myFont from "three/examples/fonts/droid/droid_sans_bold.typeface.json";
import { colors } from "../../color";

function TestThree() {
  const font = useRef(new FontLoader().parse(myFont));
  const meshRef = useRef<any>();

  useEffect(() => {
    meshRef.current.geometry.center();
  }, [meshRef]);
  return (
    <>
      <pointLight position={[1, 0, 1]} intensity={1} />
      <mesh ref={meshRef}>
        <textGeometry
          args={["LOADING...", { font: font.current, size: 0.6, height: 0.05 }]}
        />
        <meshLambertMaterial attach="material" color={colors.purple} />
      </mesh>
    </>
  );
}

export default TestThree;
