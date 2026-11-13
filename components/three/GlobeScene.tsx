"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Line, RoundedBox, useTexture } from "@react-three/drei";
import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import data from "@/lib/globe-data.json";
import { docTexture, passportTexture } from "./textures";

/*  "UAE on the world": a realistic Earth (NASA Blue Marble) turned so the UAE sits on top,
    the UAE drawn in flag colours, a Dubai skyline standing on it, and routes flying out to
    the countries customers come from.                                                       */

const R = 2.6;
const GREEN = "#00a651";
const RED = "#e8262d";
const GOLD = "#f2c14e";
const DUBAI: [number, number] = [25.2, 55.27];
const CITIES: [number, number][] = [
  [19.08, 72.88], // Mumbai
  [9.93, 76.27], // Kochi
  [24.86, 67.0], // Karachi
  [23.81, 90.41], // Dhaka
  [14.6, 120.98], // Manila
  [30.04, 31.24], // Cairo
  [-1.29, 36.82], // Nairobi
  [6.93, 79.85], // Colombo
  [41.0, 28.97], // Istanbul
];

/** lat/lon → position matching three.js SphereGeometry UV mapping */
function ll2v(lat: number, lon: number, r = R) {
  const phi = ((lon + 180) * Math.PI) / 180;
  const theta = ((90 - lat) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(theta) * Math.cos(phi), r * Math.cos(theta), r * Math.sin(theta) * Math.sin(phi));
}

/* ── Earth ───────────────────────────────────────────── */
function Earth() {
  const [map, bump, water, clouds] = useTexture(["./globe/earth.jpg", "./globe/bump.jpg", "./globe/water.jpg", "./globe/clouds_a.jpg"]);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const cloudRef = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => (cloudRef.current.rotation.y += dt * 0.01));
  return (
    <>
      <mesh>
        <sphereGeometry args={[R, 128, 128]} />
        <meshPhongMaterial map={map} bumpMap={bump} bumpScale={5} specularMap={water} specular={new THREE.Color("#7a95ad")} shininess={20} />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[R * 1.01, 96, 96]} />
        <meshPhongMaterial color="#ffffff" alphaMap={clouds} transparent opacity={0.45} depthWrite={false} />
      </mesh>
    </>
  );
}

function UAEFlagDots() {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const dots = data.uaeDots as [number, number][];
  useLayoutEffect(() => {
    const m = new THREE.Object3D();
    const c = new THREE.Color();
    dots.forEach(([la, lo], i) => {
      const p = ll2v(la, lo, R * 1.004);
      m.position.copy(p);
      m.lookAt(p.clone().multiplyScalar(2));
      m.updateMatrix();
      ref.current.setMatrixAt(i, m.matrix);
      const col = lo < 52.9 ? RED : la > 24.75 ? GREEN : la > 23.55 ? "#ffffff" : "#111111";
      ref.current.setColorAt(i, c.set(col));
    });
    ref.current.instanceMatrix.needsUpdate = true;
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [dots]);
  const rings = useMemo(() => (data.uaeRings as [number, number][][]).map((r) => r.map(([la, lo]) => ll2v(la, lo, R * 1.006))), []);
  return (
    <group>
      <instancedMesh ref={ref} args={[undefined, undefined, dots.length]}>
        <circleGeometry args={[0.0095, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {rings.map((pts, i) => (
        <Line key={i} points={pts} color={GOLD} lineWidth={2} />
      ))}
    </group>
  );
}

function Arc({ to, delay }: { to: [number, number]; delay: number }) {
  const { curve, pts, end } = useMemo(() => {
    const a = ll2v(DUBAI[0], DUBAI[1], R * 1.01);
    const b = ll2v(to[0], to[1], R * 1.01);
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R + a.distanceTo(b) * 0.42);
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    return { curve: c, pts: c.getPoints(64), end: ll2v(to[0], to[1], R * 1.012) };
  }, [to]);
  const dot = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  useLayoutEffect(() => ring.current.lookAt(end.clone().multiplyScalar(2)), [end]);
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * 0.3 + delay) % 1.5) / 1.5;
    const k = Math.min(t * 1.3, 1);
    dot.current.position.copy(curve.getPoint(k));
    dot.current.visible = t < 0.77;
    const h = t > 0.77 ? (t - 0.77) / 0.23 : 0;
    ring.current.scale.setScalar(0.4 + h * 1.6);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = h > 0 ? 1 - h : 0;
  });
  return (
    <group>
      <Line points={pts} color={GOLD} lineWidth={1.5} transparent opacity={0.6} />
      <mesh ref={dot}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#fff3c4" toneMapped={false} />
      </mesh>
      <mesh position={end}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color={GREEN} toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={end}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { c: { value: new THREE.Color("#6cc3ff") } },
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 c; varying vec3 vN;
          void main(){ float d = clamp(-vN.z, 0.0, 1.0); float a = pow(smoothstep(0.0, 0.62, d), 2.2) * 0.6; gl_FragColor = vec4(c, a); }`,
      }),
    []
  );
  return (
    <mesh material={mat} scale={1.09}>
      <sphereGeometry args={[R, 96, 96]} />
    </mesh>
  );
}

/* ── Dubai skyline (stylised but realistic materials) ──── */
function useGlass(color = "#a9c8e0") {
  return useMemo(() => new THREE.MeshPhysicalMaterial({ color, metalness: 0.9, roughness: 0.12, envMapIntensity: 1.9, clearcoat: 1, clearcoatRoughness: 0.05 }), [color]);
}

/** Burj Khalifa: Y-shaped plan with three wings that step back in a spiral, central core and spire */
function BurjKhalifa() {
  const glass = useGlass("#9fbcd6");
  const steel = useMemo(() => new THREE.MeshStandardMaterial({ color: "#e9eef3", metalness: 0.9, roughness: 0.2, envMapIntensity: 1.5 }), []);
  const tiers = 16;
  const th = 0.085;
  const parts: React.ReactElement[] = [];
  for (let k = 0; k < tiers; k++) {
    for (let w = 0; w < 3; w++) {
      // each wing retires on a different tier → spiral setbacks
      const shrink = Math.max(0, k - w * 1.3) / (tiers + 1);
      const len = 0.24 * (1 - shrink);
      if (len < 0.05) continue;
      const ang = (w * 2 * Math.PI) / 3 + Math.PI / 2;
      parts.push(
        <mesh key={`${k}-${w}`} material={glass} position={[(Math.cos(ang) * len) / 2, k * th + th / 2, (Math.sin(ang) * len) / 2]} rotation={[0, -ang, 0]}>
          <boxGeometry args={[len, th * 0.96, 0.085 * (1 - shrink * 0.5)]} />
        </mesh>
      );
    }
  }
  const h = tiers * th;
  return (
    <group>
      {parts}
      <mesh material={glass} position={[0, h / 2 + 0.05, 0]}>
        <cylinderGeometry args={[0.035, 0.07, h + 0.1, 6]} />
      </mesh>
      <mesh material={steel} position={[0, h + 0.32, 0]}>
        <cylinderGeometry args={[0.006, 0.03, 0.55, 8]} />
      </mesh>
    </group>
  );
}

/** Burj Al Arab: white sail, steel exoskeleton, helipad, on its own little island */
function BurjAlArab() {
  const sail = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(0, 0.95);
    s.quadraticCurveTo(0.42, 0.55, 0.36, 0);
    s.lineTo(0, 0);
    return new THREE.ExtrudeGeometry(s, { depth: 0.11, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 32 });
  }, []);
  const truss = useMemo(() => {
    const c = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0.36, 0, 0.055), new THREE.Vector3(0.46, 0.55, 0.055), new THREE.Vector3(0, 1.0, 0.055));
    return new THREE.TubeGeometry(c, 40, 0.012, 8, false);
  }, []);
  return (
    <group>
      <mesh position={[0.15, -0.005, 0.05]}>
        <cylinderGeometry args={[0.24, 0.27, 0.03, 32]} />
        <meshStandardMaterial color="#e9dcc0" roughness={0.9} />
      </mesh>
      <mesh geometry={sail} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial color="#ffffff" roughness={0.3} transmission={0} clearcoat={0.6} sheen={1} sheenColor={new THREE.Color("#dbe8ff")} />
      </mesh>
      <mesh geometry={truss}>
        <meshStandardMaterial color="#dfe6ee" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[-0.02, 0.5, 0.055]}>
        <boxGeometry args={[0.035, 1.0, 0.14]} />
        <meshStandardMaterial color="#cfd8e2" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.24, 0.7, 0.055]}>
        <cylinderGeometry args={[0.07, 0.07, 0.012, 24]} />
        <meshStandardMaterial color="#f1f4f7" />
      </mesh>
    </group>
  );
}

/** Emirates Towers: two triangular steel-and-glass towers */
function EmiratesTowers() {
  const glass = useGlass("#b8c4cf");
  return (
    <group>
      <mesh material={glass} position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.11, 0.9, 3]} />
      </mesh>
      <mesh material={glass} position={[0.24, 0.36, 0.05]} rotation={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.1, 0.72, 3]} />
      </mesh>
    </group>
  );
}

/** Dubai Frame: two gold towers joined by a glass bridge */
function DubaiFrame() {
  const gold = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#e8bf5a", metalness: 0.75, roughness: 0.28, envMapIntensity: 2.4, clearcoat: 1, emissive: "#8a6414", emissiveIntensity: 0.35 }), []);
  return (
    <group>
      <mesh material={gold} position={[-0.17, 0.33, 0]}><boxGeometry args={[0.07, 0.66, 0.06]} /></mesh>
      <mesh material={gold} position={[0.17, 0.33, 0]}><boxGeometry args={[0.07, 0.66, 0.06]} /></mesh>
      <mesh material={gold} position={[0, 0.69, 0]}><boxGeometry args={[0.41, 0.07, 0.06]} /></mesh>
      <mesh position={[0, 0.69, 0.031]}><boxGeometry args={[0.33, 0.025, 0.004]} /><meshStandardMaterial color="#9fd3ff" emissive="#9fd3ff" emissiveIntensity={0.4} /></mesh>
    </group>
  );
}

function GlassTower({ h, w = 0.12, color = "#9fb9d0", twist = 0 }: { h: number; w?: number; color?: string; twist?: number }) {
  const glass = useGlass(color);
  const geo = useMemo(() => {
    const g = new THREE.BoxGeometry(w, h, w, 1, 24, 1);
    if (twist) {
      const p = g.attributes.position as THREE.BufferAttribute;
      const v = new THREE.Vector3();
      for (let i = 0; i < p.count; i++) {
        v.fromBufferAttribute(p, i);
        const a = ((v.y + h / 2) / h) * twist;
        p.setXYZ(i, v.x * Math.cos(a) - v.z * Math.sin(a), v.y, v.x * Math.sin(a) + v.z * Math.cos(a));
      }
      g.computeVertexNormals();
    }
    return g;
  }, [h, w, twist]);
  return <mesh geometry={geo} material={glass} position={[0, h / 2, 0]} />;
}

function Flag() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 400; c.height = 200;
    const x = c.getContext("2d")!;
    x.fillStyle = "#D71920"; x.fillRect(0, 0, 100, 200);
    x.fillStyle = "#00843D"; x.fillRect(100, 0, 300, 67);
    x.fillStyle = "#ffffff"; x.fillRect(100, 67, 300, 66);
    x.fillStyle = "#111111"; x.fillRect(100, 133, 300, 67);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  const geo = useMemo(() => new THREE.PlaneGeometry(0.5, 0.25, 20, 6), []);
  const base = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);
  useFrame(({ clock }) => {
    const p = geo.attributes.position as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    for (let i = 0; i < p.count; i++) {
      const x = base[i * 3] + 0.25;
      p.setZ(i, Math.sin(x * 10 - t * 4) * 0.035 * x * 2);
    }
    p.needsUpdate = true;
    geo.computeVertexNormals();
  });
  return (
    <group>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.008, 0.012, 1.2, 8]} />
        <meshStandardMaterial color="#e5e9ee" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh geometry={geo} position={[0.255, 1.06, 0]}>
        <meshStandardMaterial map={tex} side={THREE.DoubleSide} roughness={0.75} />
      </mesh>
    </group>
  );
}

function Skyline() {
  return (
    <group>
      {/* plaza the city stands on */}
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.95, 1.02, 0.08, 64]} />
        <meshStandardMaterial color="#efe5d0" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.78, 0.92, 64]} />
        <meshStandardMaterial color="#8cc49b" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.013, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.66, 64]} />
        <meshStandardMaterial color="#4fb3d9" roughness={0.2} metalness={0.3} />
      </mesh>

      <group position={[0.02, 0.01, -0.05]}><BurjKhalifa /></group>
      <group position={[-0.62, 0.01, 0.28]} rotation={[0, 0.35, 0]}><BurjAlArab /></group>
      <group position={[0.45, 0.01, 0.35]} rotation={[0, -0.4, 0]}><DubaiFrame /></group>
      <group position={[-0.32, 0.01, -0.35]}><EmiratesTowers /></group>
      <group position={[0.42, 0.01, -0.3]}><GlassTower h={0.95} twist={1.6} color="#b5cde0" /></group>
      <group position={[0.28, 0.01, -0.55]}><GlassTower h={0.7} w={0.11} color="#7fa3c2" /></group>
      <group position={[-0.12, 0.01, 0.45]}><GlassTower h={0.42} w={0.13} color="#a6c0d6" /></group>
      <group position={[0.65, 0.01, -0.08]}><GlassTower h={0.55} w={0.1} color="#8fb6a6" /></group>
      <group position={[-0.62, 0.01, -0.15]}><GlassTower h={0.6} w={0.1} color="#9db4c8" twist={-1.2} /></group>
      <group position={[0.7, 0.01, 0.5]}><Flag /></group>
    </group>
  );
}

/* ── floating documents ──────────────────────────────── */
function Card({ tex, w = 0.62, h = 0.85, d = 0.02, edge = "#fff" }: { tex: THREE.Texture; w?: number; h?: number; d?: number; edge?: string }) {
  return (
    <group>
      <RoundedBox args={[w, h, d]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={edge} />
      </RoundedBox>
      <mesh position={[0, 0, d / 2 + 0.002]}>
        <planeGeometry args={[w - 0.02, h - 0.02]} />
        <meshStandardMaterial map={tex} />
      </mesh>
    </group>
  );
}

/* ── composition ─────────────────────────────────────── */
function World() {
  const rig = useRef<THREE.Group>(null!);
  const tex = useMemo(() => ({ doc: docTexture("#00843D", "check"), pass: passportTexture() }), []);
  // turn the globe so Dubai is exactly on top
  const globeRot = useMemo(() => {
    const v = ll2v(DUBAI[0], DUBAI[1]).normalize();
    return new THREE.Quaternion().setFromUnitVectors(v, new THREE.Vector3(0, 1, 0));
  }, []);
  // then spin about the vertical so that India is to the right and Africa to the left
  const spin = useMemo(() => {
    const v = ll2v(10, 55).applyQuaternion(globeRot); // a point south of Dubai should face the camera
    return Math.atan2(v.x, v.z) * -1;
  }, [globeRot]);
  const { pointer } = useThree();
  useFrame((_, dt) => {
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, pointer.x * 0.35, 2.5, dt);
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -pointer.y * 0.06, 2.5, dt);
  });
  return (
    <group ref={rig}>
      <group position={[0, -R, 0]}>
        <group rotation={[0, spin, 0]}>
          <group quaternion={globeRot}>
            <Earth />
            <UAEFlagDots />
            {CITIES.map((c, i) => (
              <Arc key={i} to={c} delay={i * 0.16} />
            ))}
          </group>
        </group>
        <Atmosphere />
        <group position={[0, R + 0.02, 0]} scale={1.15}>
          <Skyline />
        </group>
      </group>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
        <group position={[-1.95, 1.25, 0.6]} rotation={[0.05, 0.45, -0.15]} scale={0.85}><Card tex={tex.doc} /></group>
      </Float>
      <Float speed={2} rotationIntensity={0.7} floatIntensity={1.3}>
        <group position={[1.95, 1.55, 0.4]} rotation={[0.1, -0.5, 0.2]} scale={0.7}><Card tex={tex.pass} d={0.07} edge="#0a2547" /></group>
      </Float>
    </group>
  );
}

function CameraAim({ y }: { y: number }) {
  const { camera } = useThree();
  useEffect(() => camera.lookAt(0, y, 0), [camera, y]);
  return null;
}

export default function GlobeScene({ compact = false }: { compact?: boolean }) {
  return (
    <Canvas dpr={[1, compact ? 1.5 : 2]} camera={{ position: [0, 2.4, compact ? 9.2 : 8.2], fov: 38 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <CameraAim y={0.15} />
      <ambientLight intensity={0.85} />
      <directionalLight position={[-4, 6, 6]} intensity={2.3} color="#fff3df" />
      <directionalLight position={[5, 2, -4]} intensity={0.6} color="#bfe1ff" />
      <Suspense fallback={null}>
        {/* studio reflections for glass & metal — generated locally, no downloads */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 5, -6]} scale={[12, 4, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.5} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#ffe2b0" />
          <Lightformer form="rect" intensity={1.2} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#bfe0ff" />
          <Lightformer form="circle" intensity={2} position={[0, 8, 0]} rotation-x={Math.PI / 2} scale={4} color="#ffffff" />
          <mesh scale={50}>
            <sphereGeometry />
            <meshBasicMaterial color="#5d7a93" side={THREE.BackSide} />
          </mesh>
        </Environment>
        <World />
      </Suspense>
    </Canvas>
  );
}
