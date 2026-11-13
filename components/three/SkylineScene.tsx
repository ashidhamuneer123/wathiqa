"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, ContactShadows } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { docTexture, passportTexture } from "./textures";

const GREEN = "#00843D";
const RED = "#D71920";
const GOLD = "#C9A23A";

/* ── textures ─────────────────────────────────────────── */
function windowsTexture(base: string, lit: string, cols = 6, rows = 18) {
  const c = document.createElement("canvas");
  c.width = 128; c.height = 384;
  const x = c.getContext("2d")!;
  x.fillStyle = base; x.fillRect(0, 0, 128, 384);
  const cw = 128 / cols, rh = 384 / rows;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      x.fillStyle = Math.random() > 0.55 ? lit : "rgba(255,255,255,.18)";
      x.fillRect(i * cw + 3, j * rh + 4, cw - 6, rh - 8);
    }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function flagTexture() {
  const c = document.createElement("canvas");
  c.width = 400; c.height = 200;
  const x = c.getContext("2d")!;
  x.fillStyle = RED; x.fillRect(0, 0, 100, 200);
  x.fillStyle = GREEN; x.fillRect(100, 0, 300, 67);
  x.fillStyle = "#ffffff"; x.fillRect(100, 67, 300, 66);
  x.fillStyle = "#111111"; x.fillRect(100, 133, 300, 67);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ── landmarks (stylised, not to scale) ───────────────── */
function BurjKhalifa() {
  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#dfe8f1", metalness: 0.3, roughness: 0.22, clearcoat: 1, emissive: "#5c7a99", emissiveIntensity: 0.12 }), []);
  const tiers = 11;
  return (
    <group>
      {Array.from({ length: tiers }).map((_, i) => {
        const r = 0.36 * (1 - i / (tiers + 2));
        const h = 0.42 - i * 0.012;
        const y = Array.from({ length: i }).reduce<number>((a, _, k) => a + (0.42 - k * 0.012), 0) + h / 2;
        return (
          <mesh key={i} position={[0, y, 0]} material={mat} castShadow rotation={[0, i * 0.35, 0]}>
            <cylinderGeometry args={[r * 0.92, r, h, 3, 1]} />
          </mesh>
        );
      })}
      <mesh position={[0, 4.55, 0]} material={mat} castShadow>
        <cylinderGeometry args={[0.012, 0.05, 1.1, 8]} />
      </mesh>
    </group>
  );
}

function BurjAlArab() {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0, 2.4);
    s.quadraticCurveTo(0.95, 1.3, 0.75, 0);
    s.lineTo(0, 0);
    return new THREE.ExtrudeGeometry(s, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3, curveSegments: 24 });
  }, []);
  return (
    <group>
      <mesh geometry={geo} position={[0, 0, -0.11]} castShadow>
        <meshPhysicalMaterial color="#ffffff" roughness={0.35} clearcoat={0.6} />
      </mesh>
      <mesh position={[-0.06, 1.35, 0]} castShadow>
        <boxGeometry args={[0.08, 2.7, 0.3]} />
        <meshStandardMaterial color="#9fb2c6" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.55, 1.6, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 32]} />
        <meshStandardMaterial color="#e8eef5" />
      </mesh>
    </group>
  );
}

function DubaiFrame() {
  const gold = <meshPhysicalMaterial color="#d9b04a" metalness={0.45} roughness={0.25} clearcoat={1} emissive={GOLD} emissiveIntensity={0.2} />;
  return (
    <group>
      <mesh position={[-0.42, 1, 0]} castShadow><boxGeometry args={[0.2, 2, 0.16]} />{gold}</mesh>
      <mesh position={[0.42, 1, 0]} castShadow><boxGeometry args={[0.2, 2, 0.16]} />{gold}</mesh>
      <mesh position={[0, 2.05, 0]} castShadow><boxGeometry args={[1.04, 0.2, 0.16]} />{gold}</mesh>
      <mesh position={[0, 2.05, 0.085]}><boxGeometry args={[0.9, 0.06, 0.01]} /><meshStandardMaterial color="#0b2e59" /></mesh>
    </group>
  );
}

function MuseumOfFuture() {
  return (
    <group>
      <mesh position={[0, 0.85, 0]} scale={[1, 1.25, 0.8]} castShadow>
        <torusGeometry args={[0.55, 0.26, 32, 64]} />
        <meshPhysicalMaterial color="#e9eef3" metalness={0.35} roughness={0.2} clearcoat={1} emissive="#8aa0b5" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.55, 0.62, 0.24, 32]} />
        <meshStandardMaterial color="#7fa88f" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Tower({ h, w = 0.34, color = "#3d6e9e", tex }: { h: number; w?: number; color?: string; tex: THREE.Texture }) {
  return (
    <group>
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[w, h, w]} />
        <meshStandardMaterial color={color} map={tex} metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0, h + 0.03, 0]}>
        <boxGeometry args={[w * 0.7, 0.06, w * 0.7]} />
        <meshStandardMaterial color="#dfe7ef" />
      </mesh>
    </group>
  );
}

function Flag() {
  const tex = useMemo(flagTexture, []);
  const geo = useMemo(() => new THREE.PlaneGeometry(1.3, 0.65, 24, 8), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  useFrame(({ clock }) => {
    const p = geo.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3] + 0.65; // 0 at pole
      const y = base[i * 3 + 1];
      p.setZ(i, Math.sin(x * 4 - t * 4) * 0.08 * x + Math.sin(y * 3 + t * 2) * 0.02 * x);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <group>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.035, 3, 12]} />
        <meshStandardMaterial color="#d7dde4" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 3.03, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh geometry={geo} position={[0.67, 2.6, 0]} castShadow>
        <meshStandardMaterial map={tex} side={THREE.DoubleSide} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Card({ tex, w = 1, h = 1.37, d = 0.025, edge = "#fff" }: { tex: THREE.Texture; w?: number; h?: number; d?: number; edge?: string }) {
  return (
    <group>
      <RoundedBox args={[w, h, d]} radius={0.04} smoothness={4} castShadow>
        <meshStandardMaterial color={edge} />
      </RoundedBox>
      <mesh position={[0, 0, d / 2 + 0.002]}>
        <planeGeometry args={[w - 0.03, h - 0.03]} />
        <meshStandardMaterial map={tex} />
      </mesh>
    </group>
  );
}

function CheckBadge() {
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(-0.22, 0.02, 0), new THREE.Vector3(-0.06, -0.15, 0), new THREE.Vector3(0.25, 0.2, 0)]), []);
  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.12, 48]} />
        <meshPhysicalMaterial color={GREEN} clearcoat={1} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <tubeGeometry args={[curve, 30, 0.05, 12, false]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}

/* ── composition ──────────────────────────────────────── */
function City() {
  const ref = useRef<THREE.Group>(null!);
  const { pointer } = useThree();
  const texA = useMemo(() => windowsTexture("#2f5d8c", "#ffe9a8"), []);
  const texB = useMemo(() => windowsTexture("#1f7a5a", "#d9fff0", 5, 16), []);
  const texC = useMemo(() => windowsTexture("#56708a", "#ffffff", 4, 14), []);
  const docs = useMemo(() => ({ a: docTexture(GREEN, "check"), b: docTexture(RED, "seal"), p: passportTexture() }), []);

  useFrame((_, dt) => {
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, -0.35 + pointer.x * 0.45, 3, dt);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, 0.08 - pointer.y * 0.08, 3, dt);
  });

  return (
    <group ref={ref} position={[0, -1.9, 0]}>
      {/* island + water */}
      <mesh position={[0, -0.18, 0]} receiveShadow>
        <cylinderGeometry args={[3.3, 3.45, 0.36, 72]} />
        <meshStandardMaterial color="#f1e6cf" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.26, 0]}>
        <cylinderGeometry args={[3.9, 3.9, 0.2, 72]} />
        <meshPhysicalMaterial color="#5fb7d4" roughness={0.1} metalness={0.1} clearcoat={1} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.25, 72]} />
        <meshStandardMaterial color="#f6efe0" />
      </mesh>
      {/* green park ring */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 3.1, 72]} />
        <meshStandardMaterial color="#9cc9a7" />
      </mesh>

      <group position={[0.15, 0, -0.2]}><BurjKhalifa /></group>
      <group position={[-2.3, 0, 0.3]} rotation={[0, 0.25, 0]} scale={1.15}><BurjAlArab /></group>
      <group position={[1.85, 0, 0.9]} rotation={[0, -0.6, 0]}><DubaiFrame /></group>
      <group position={[-1.15, 0, 1.6]} rotation={[0, 0.3, 0]}><MuseumOfFuture /></group>
      <group position={[2.3, 0, -1.2]}><Flag /></group>

      <group position={[-0.8, 0, -1.1]}><Tower h={2.2} tex={texA} /></group>
      <group position={[0.95, 0, -1.4]}><Tower h={2.7} w={0.3} tex={texB} color="#2a8a63" /></group>
      <group position={[1.1, 0, 0.1]}><Tower h={1.7} w={0.38} tex={texC} color="#6a87a3" /></group>
      <group position={[-1.5, 0, -0.3]}><Tower h={1.5} w={0.3} tex={texB} color="#2a8a63" /></group>
      <group position={[0.6, 0, 1.3]}><Tower h={1.1} w={0.3} tex={texA} /></group>
      <group position={[-0.25, 0, 1.0]}><Tower h={0.8} w={0.36} tex={texC} color="#6a87a3" /></group>

      {/* floating documents */}
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[-2.7, 3.4, 0.8]} rotation={[0.1, 0.5, -0.12]}><Card tex={docs.a} /></group>
      </Float>
      <Float speed={1.3} rotationIntensity={0.6} floatIntensity={1.2}>
        <group position={[2.9, 3.9, 0.4]} rotation={[-0.05, -0.5, 0.15]} scale={0.85}><Card tex={docs.b} /></group>
      </Float>
      <Float speed={2} rotationIntensity={0.7} floatIntensity={1.3}>
        <group position={[-1.7, 4.9, -0.4]} rotation={[0.2, 0.3, 0.2]} scale={0.6}><Card tex={docs.p} d={0.1} edge="#0a2547" /></group>
      </Float>
      <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.5}>
        <group position={[1.6, 5.2, 0.8]}><CheckBadge /></group>
      </Float>

      <Sparkles count={60} scale={[8, 6, 6]} position={[0, 3, 0]} size={3} speed={0.3} color={GOLD} />
      <ContactShadows position={[0, -0.37, 0]} opacity={0.3} scale={10} blur={3} far={2} />
    </group>
  );
}

export default function SkylineScene({ compact = false }: { compact?: boolean }) {
  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 2]}
      shadows
      camera={{ position: [0, 1.7, compact ? 13.5 : 12.8], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <hemisphereLight args={["#ffffff", "#e9dcc0", 1.1]} />
      <directionalLight position={[5, 9, 6]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-6} shadow-camera-right={6} shadow-camera-top={8} shadow-camera-bottom={-4} />
      <pointLight position={[-5, 3, 4]} intensity={18} color="#ffd9a0" />
      <City />
    </Canvas>
  );
}
