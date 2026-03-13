import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import AvatarRobot from "./AvatarRobot";
import ParticleField from "./ParticleField";
import GridFloor from "./GridFloor";

interface Scene3DProps {
  scrollProgress: number;
}

const Scene3D = ({ scrollProgress }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="hsl(185, 100%, 80%)" />
        <pointLight position={[-3, 3, 2]} intensity={0.8} color="hsl(262, 83%, 58%)" />
        <pointLight position={[3, -1, 3]} intensity={0.4} color="hsl(185, 100%, 50%)" />

        <Suspense fallback={null}>
          <AvatarRobot scrollProgress={scrollProgress} />
          <ParticleField />
          <GridFloor />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
