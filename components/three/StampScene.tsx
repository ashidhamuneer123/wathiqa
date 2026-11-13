"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Sparkles, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { docTexture } from "./textures";

const PERIOD = 2.6;

function StampRig() {
  const stamp = useRef<THREE.Group>(null!);
  const ink = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const paper = useRef<THREE.Group>(null!);
  const tex = useMemo(() => docTexture("#0B2E59", "check"), []);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime % PERIOD) / PERIOD; // 0..1
    // stamp: hover → slam down (0.35–0.45) → hold → lift
    let y = 1.6;
    if (t > 0.3 && t < 0.42) y = THREE.MathUtils.lerp(1.6, 0.18, (t - 0.3) / 0.12);
    else if (t >= 0.42 && t < 0.55) y = 0.18;
    else if (t >= 0.55 && t < 0.75) y = THREE.MathUtils.lerp(0.18, 1.6, (t - 0.55) / 0.2);
    stamp.current.position.y = y + Math.sin(clock.elapsedTime * 2) * 0.03;
    stamp.current.rotation.y = clock.elapsedTime * 0.4;
    // paper squash on impact
    const hit = t >= 0.42 && t < 0.5 ? 1 - (t - 0.42) / 0.08 : 0;
    paper.current.scale.setScalar(1 - hit * 0.02);
    // ink appears after impact, fades before next cycle
    const inkA = t >= 0.42 ? Math.min(1, (t - 0.42) / 0.05) * (t > 0.92 ? (1 - t) / 0.08 : 1) : 0;
    (ink.current.material as THREE.MeshBasicMaterial).opacity = inkA;
    // shockwave ring
    const w = t >= 0.42 && t < 0.7 ? (t - 0.42) / 0.28 : 0;
    ring.current.scale.setScalar(0.4 + w * 2.2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = w > 0 ? (1 - w) * 0.7 : 0;
  });

  const check = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const x = c.getContext("2d")!;
    x.strokeStyle = "#00843D";
    x.lineWidth = 16; x.beginPath(); x.arc(128, 128, 100, 0, Math.PI * 2); x.stroke();
    x.lineWidth = 6; x.beginPath(); x.arc(128, 128, 80, 0, Math.PI * 2); x.stroke();
    x.lineWidth = 22; x.lineCap = "round"; x.lineJoin = "round";
    x.beginPath(); x.moveTo(84, 130); x.lineTo(116, 162); x.lineTo(176, 96); x.stroke();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <group rotation={[0.55, -0.5, 0]} position={[0, -0.75, 0]}>
      <group ref={paper}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[2.2, 3]} />
          <meshStandardMaterial map={tex} roughness={0.6} />
        </mesh>
      </group>
      <mesh ref={ink} rotation={[-Math.PI / 2, 0, 0.3]} position={[0, 0.005, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={check} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.45, 0.5, 64]} />
        <meshBasicMaterial color="#C9A23A" transparent opacity={0} depthWrite={false} />
      </mesh>
      <group ref={stamp} position={[0, 1.6, 0]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 48]} />
          <meshStandardMaterial color="#00843D" roughness={0.4} />
        </mesh>
        <RoundedBox args={[0.9, 0.18, 0.9]} radius={0.06} position={[0, 0.2, 0]} castShadow>
          <meshPhysicalMaterial color="#0B2E59" roughness={0.3} clearcoat={1} />
        </RoundedBox>
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 0.55, 32]} />
          <meshPhysicalMaterial color="#C9A23A" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.92, 0]} castShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshPhysicalMaterial color="#E1261C" roughness={0.3} clearcoat={1} />
        </mesh>
      </group>
      <ContactShadows position={[0, -0.01, 0]} opacity={0.18} scale={5} blur={2} far={2.5} />
    </group>
  );
}

export default function StampScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.6, 6], fov: 40 }} gl={{ antialias: true, alpha: true }}  aria-hidden="true">
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 6, 4]} intensity={1.6} castShadow />
      <pointLight position={[-3, 2, 2]} intensity={14} color="#00843D" />
      <StampRig />
      <Sparkles count={30} scale={[4, 3, 3]} size={2.5} speed={0.3} color="#C9A23A" />
    </Canvas>
  );
}
