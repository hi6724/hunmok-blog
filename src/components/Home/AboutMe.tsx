import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";

function AboutMe() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sphereRef = useRef<any>(null);
  const [planePos, setPlanePos] = useState<any>([]);
  useEffect(() => {
    if (titleRef.current !== null) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 60%",
        },
      });
    }
  });

  useEffect(() => {
    if (sphereRef.current !== null) {
      var tempP = Array.from(sphereRef.current.attributes.position.array);
      var newP = [];
      for (let i = 0; i < tempP.length; i += 3) {
        const temp = [tempP[i], tempP[i + 1], tempP[i + 2]];
        newP.push(temp);
      }
      setPlanePos(newP);
    }
  }, [sphereRef.current]);
  console.log(sphereRef.current);

  return (
    <Container onClick={() => setPlanePos([])}>
      <div>
        <Title ref={titleRef}>
          <TypingText size={4}>About Me</TypingText>
        </Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere
          varius arcu volutpat ullamcorper. Donec accumsan odio eu blandit
          auctor. Phasellus vitae ornare enim, vitae eleifend nunc.
        </Description>
        <Description>
          Nullam commodo nisl ut dapibus varius. Vivamus vestibulum, purus et
          placerat blandit, purus magna consequat nisl, at fringilla erat nisl
          non massa. Duis nisl dolor, feugiat non risus ut, pretium porta odio.
        </Description>
        <Description>
          Curabitur consequat facilisis fringilla. Pellentesque turpis diam,
          convallis ac sollicitudin non, maximus in odio. Curabitur porta
          interdum libero quis facilisis. Nunc a aliquam ipsum, aliquet cursus
          odio. Mauris eu pulvinar metus.
        </Description>
      </div>
      <Canvas style={{ height: "35vw" }}>
        <OrbitControls />
        <points>
          <sphereGeometry ref={sphereRef} args={[3, 6, 6]} />
          <pointsMaterial size={0.1} color={"yellow"} />
        </points>
        {planePos.map((arr: any, i: number) => (
          <mesh key={i} position={[arr[0], arr[1], arr[2]]}>
            <planeGeometry args={[0.3, 0.3]} />
            <meshBasicMaterial />
          </mesh>
        ))}
      </Canvas>
    </Container>
  );
}

export default AboutMe;

const Container = styled.div`
  margin-top: 25vh;
  height: 100vh;
  padding: 0 5vw;
  display: grid;
  grid-template-columns: 35vw 45vw;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 4rem;
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
`;

const Description = styled.div`
  font-size: 1.2rem;
  font-family: "BM-Air";
  line-height: 1.5rem;
  color: ${colors.white};
  margin-bottom: 1rem;
`;
