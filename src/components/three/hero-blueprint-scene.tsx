"use client";

import { Line, PointMaterial, Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Group, MathUtils } from "three";

type HeroBlueprintSceneProps = {
  reducedMotion: boolean;
};

type PointTuple = readonly [number, number, number];

const planLines: readonly PointTuple[][] = [
  [
    [-2.5, 0, -1.8],
    [2.5, 0, -1.8],
    [2.5, 0, 1.8],
    [-2.5, 0, 1.8],
    [-2.5, 0, -1.8],
  ],
  [
    [-1.55, 0, -1.05],
    [1.4, 0, -1.05],
    [1.4, 0, 1.1],
    [-1.55, 0, 1.1],
    [-1.55, 0, -1.05],
  ],
  [
    [-0.9, 0, -1.05],
    [-0.9, 0, 1.1],
  ],
  [
    [0.8, 0, -1.05],
    [0.8, 0, 1.1],
  ],
  [
    [-1.55, 0, 0.08],
    [1.4, 0, 0.08],
  ],
];

const walls: ReadonlyArray<{
  position: PointTuple;
  args: readonly [number, number, number];
}> = [
  { position: [0, 0.42, 0], args: [4.8, 0.84, 0.12] },
  { position: [-2.34, 0.42, 0], args: [0.12, 0.84, 3.5] },
  { position: [2.34, 0.42, 0], args: [0.12, 0.84, 3.5] },
  { position: [0, 0.42, -1.74], args: [4.8, 0.84, 0.12] },
  { position: [0.3, 1.02, -0.12], args: [2.7, 0.12, 2.05] },
];

export function HeroBlueprintScene({
  reducedMotion,
}: HeroBlueprintSceneProps) {
  const groupRef = useRef<Group>(null);
  const points = useMemo(() => {
    const items = new Float32Array(132);
    for (let index = 0; index < 44; index += 1) {
      const seed = index * 13.123;
      items[index * 3] = Math.sin(seed) * 4.1;
      items[index * 3 + 1] = ((Math.cos(seed * 1.3) + 1) / 2) * 2.6 + 0.2;
      items[index * 3 + 2] = Math.cos(seed * 0.7) * 3.2;
    }
    return items;
  }, []);

  useFrame(({ camera, clock }) => {
    const time = clock.getElapsedTime();
    const drift = reducedMotion ? 0 : 1;
    const depth = reducedMotion ? 0.45 : 0.62 + Math.sin(time * 0.24) * 0.06;

    if (groupRef.current) {
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        MathUtils.lerp(-0.78, -0.28, depth),
        0.05,
      );
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        MathUtils.lerp(-0.42, -0.18, depth),
        0.05,
      );
    }

    camera.position.x = MathUtils.lerp(camera.position.x, 0.5 + Math.sin(time * 0.18) * 0.16 * drift, 0.04);
    camera.position.y = MathUtils.lerp(camera.position.y, 4.65 + Math.cos(time * 0.2) * 0.08 * drift, 0.04);
    camera.position.z = MathUtils.lerp(camera.position.z, 6.25, 0.04);
    camera.lookAt(0, 0.6, 0);
  });

  return (
    <group>
      <color attach="background" args={["#FFFFFF"]} />
      <fog attach="fog" args={["#FFFFFF", 6, 12]} />
      <ambientLight intensity={1} />
      <pointLight position={[2.8, 4, 2]} color="#567287" intensity={15} distance={14} />
      <pointLight position={[-4, 2, 4]} color="#989DA3" intensity={10} distance={12} />

      <mesh rotation-x={-Math.PI / 2} position={[0, -0.08, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      <gridHelper args={[12, 24, "#567287", "#989DA3"]} position={[0, -0.07, 0]} />

      <Points positions={points} stride={3}>
        <PointMaterial
          transparent
          color="#7C838A"
          opacity={reducedMotion ? 0.08 : 0.16}
          size={0.026}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      {planLines.map((line, index) => (
        <Line
          key={index}
          points={line}
          color={index === 0 ? "#2C333C" : "#567287"}
          lineWidth={index === 0 ? 1.3 : 0.95}
          transparent
          opacity={0.88}
        />
      ))}

      <group ref={groupRef}>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[4.95, 0.04, 3.65]} />
          <meshStandardMaterial color="#989DA3" metalness={0.08} roughness={0.92} />
        </mesh>

        {walls.map((wall, index) => (
          <mesh key={index} position={wall.position}>
            <boxGeometry args={wall.args} />
            <meshStandardMaterial
              color={index === walls.length - 1 ? "#FFFFFF" : "#FFFFFF"}
              metalness={0.08}
              roughness={0.56}
            />
          </mesh>
        ))}

        <mesh position={[0, 0.64, 1.73]}>
          <boxGeometry args={[3.8, 0.92, 0.04]} />
          <meshPhysicalMaterial
            color="#989DA3"
            transparent
            opacity={0.22}
            roughness={0.06}
            transmission={0.88}
          />
        </mesh>
      </group>
    </group>
  );
}

