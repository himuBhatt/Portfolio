import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GridFloor = () => {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.3) % 2;
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
      <gridHelper
        ref={ref}
        args={[40, 40, "hsl(185, 100%, 30%)", "hsl(230, 20%, 12%)"]}
        rotation={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="hsl(230, 25%, 3%)"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default GridFloor;
