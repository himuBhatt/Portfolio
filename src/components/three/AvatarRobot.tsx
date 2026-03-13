import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarRobotProps {
  scrollProgress?: number;
}

const AvatarRobot = ({ scrollProgress = 0 }: AvatarRobotProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(230, 25%, 15%)"),
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(185, 100%, 50%)"),
        emissive: new THREE.Color("hsl(185, 100%, 50%)"),
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(185, 100%, 60%)"),
        emissive: new THREE.Color("hsl(185, 100%, 60%)"),
        emissiveIntensity: 1.5,
      }),
    []
  );

  const purpleAccent = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("hsl(262, 83%, 58%)"),
        emissive: new THREE.Color("hsl(262, 83%, 58%)"),
        emissiveIntensity: 0.3,
        metalness: 0.9,
        roughness: 0.1,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Floating idle animation
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
      
      // Scroll-based rotation
      const targetRotY = scrollProgress < 0.2
        ? Math.sin(t * 0.3) * 0.15
        : scrollProgress < 0.4
        ? 0.3
        : scrollProgress < 0.6
        ? -0.2
        : scrollProgress < 0.8
        ? 0.1
        : 0;
      
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02;
    }

    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 0.5) * 0.05;
      headRef.current.rotation.z = Math.sin(t * 0.7) * 0.03;
    }

    // Arm animations based on scroll
    if (rightArmRef.current) {
      if (scrollProgress > 0.8) {
        // Wave animation at contact
        rightArmRef.current.rotation.z = -1.2 + Math.sin(t * 4) * 0.3;
        rightArmRef.current.rotation.x = 0;
      } else if (scrollProgress > 0.4 && scrollProgress < 0.6) {
        // Point at skills
        rightArmRef.current.rotation.z = -0.8;
        rightArmRef.current.rotation.x = -0.5;
      } else {
        rightArmRef.current.rotation.z = Math.sin(t * 0.6) * 0.1;
        rightArmRef.current.rotation.x = 0;
      }
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = -Math.sin(t * 0.6) * 0.1;
    }

    // Eye glow pulse
    if (eyeLeftRef.current && eyeRightRef.current) {
      const glowIntensity = 1.2 + Math.sin(t * 2) * 0.5;
      (eyeLeftRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;
      (eyeRightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;
    }
  });

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        <mesh material={bodyMaterial}>
          <boxGeometry args={[0.8, 0.7, 0.7]} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.05, 0.36]}>
          <boxGeometry args={[0.65, 0.25, 0.05]} />
          <meshStandardMaterial
            color="hsl(230, 30%, 8%)"
            metalness={1}
            roughness={0}
          />
        </mesh>
        {/* Eyes */}
        <mesh ref={eyeLeftRef} position={[-0.15, 0.05, 0.39]} material={eyeMaterial}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.15, 0.05, 0.39]} material={eyeMaterial}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.5, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        </mesh>
        <mesh position={[0, 0.65, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
        {/* Ear panels */}
        <mesh position={[-0.45, 0, 0]} material={purpleAccent}>
          <boxGeometry args={[0.08, 0.3, 0.3]} />
        </mesh>
        <mesh position={[0.45, 0, 0]} material={purpleAccent}>
          <boxGeometry args={[0.08, 0.3, 0.3]} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.15, 0]} material={accentMaterial}>
        <cylinderGeometry args={[0.1, 0.12, 0.2]} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.5, 0]} material={bodyMaterial}>
        <boxGeometry args={[1, 1.1, 0.6]} />
      </mesh>
      {/* Chest light */}
      <mesh position={[0, 0.6, 0.31]} material={accentMaterial}>
        <circleGeometry args={[0.12, 32]} />
      </mesh>
      {/* Chest accent lines */}
      <mesh position={[0, 0.3, 0.31]} material={purpleAccent}>
        <boxGeometry args={[0.6, 0.03, 0.01]} />
      </mesh>
      <mesh position={[0, 0.15, 0.31]} material={purpleAccent}>
        <boxGeometry args={[0.4, 0.03, 0.01]} />
      </mesh>

      {/* Arms */}
      <group ref={rightArmRef} position={[0.65, 0.8, 0]}>
        <mesh position={[0.15, -0.3, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.2, 0.6, 0.25]} />
        </mesh>
        <mesh position={[0.15, -0.65, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[0.15, -0.85, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.18, 0.35, 0.22]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.15, -1.1, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      <group ref={leftArmRef} position={[-0.65, 0.8, 0]}>
        <mesh position={[-0.15, -0.3, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.2, 0.6, 0.25]} />
        </mesh>
        <mesh position={[-0.15, -0.65, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[-0.15, -0.85, 0]} material={bodyMaterial}>
          <boxGeometry args={[0.18, 0.35, 0.22]} />
        </mesh>
        <mesh position={[-0.15, -1.1, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      {/* Legs */}
      <mesh position={[-0.2, -0.35, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.25, 0.6, 0.3]} />
      </mesh>
      <mesh position={[0.2, -0.35, 0]} material={bodyMaterial}>
        <boxGeometry args={[0.25, 0.6, 0.3]} />
      </mesh>
      {/* Knee accents */}
      <mesh position={[-0.2, -0.35, 0.16]} material={purpleAccent}>
        <circleGeometry args={[0.06, 16]} />
      </mesh>
      <mesh position={[0.2, -0.35, 0.16]} material={purpleAccent}>
        <circleGeometry args={[0.06, 16]} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.2, -0.75, 0.05]} material={accentMaterial}>
        <boxGeometry args={[0.28, 0.15, 0.4]} />
      </mesh>
      <mesh position={[0.2, -0.75, 0.05]} material={accentMaterial}>
        <boxGeometry args={[0.28, 0.15, 0.4]} />
      </mesh>
    </group>
  );
};

export default AvatarRobot;
