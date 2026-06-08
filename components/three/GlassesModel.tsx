"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/models/glasses.glb";

type GlassesModelProps = {
  scrollProgress: React.RefObject<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
  frameColor: string;
  lensTint: string;
  pinnedRotation?: React.RefObject<number>;
  pinnedProgress?: React.RefObject<number>;
};

export function GlassesModel({
  scrollProgress,
  pointer,
  frameColor,
  lensTint,
  pinnedRotation,
  pinnedProgress,
}: GlassesModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);

  const frameMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: frameColor,
      metalness: 0.85,
      roughness: 0.32,
      clearcoat: 0.5,
      clearcoatRoughness: 0.25,
      envMapIntensity: 0.6,
    });
  }, [frameColor]);

  void lensTint;

  const prepared = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const meshes: THREE.Mesh[] = [];
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) meshes.push(child);
    });

    meshes.forEach((mesh) => {
      mesh.geometry = mesh.geometry.clone();
      mesh.geometry.computeVertexNormals();
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 3.4;
    const scale = targetSize / maxDim;

    cloned.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    cloned.scale.setScalar(scale);

    return { cloned, meshes };
  }, [gltf.scene]);

  useEffect(() => {
    prepared.meshes.forEach((mesh) => {
      mesh.material = frameMat;
    });
  }, [prepared, frameMat]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    const idleY = Math.sin(t * 0.6) * 0.12;
    const idleRot = Math.sin(t * 0.4) * 0.08;

    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    const scroll = scrollProgress.current ?? 0;
    const pinnedRot = pinnedRotation?.current ?? 0;
    const pinnedProg = pinnedProgress?.current ?? 0;

    const targetRotY = idleRot + px * 0.35 + scroll * Math.PI * 0.15 + pinnedRot;
    const targetRotX = -py * 0.2 + scroll * 0.08 + pinnedProg * 0.2;
    const targetRotZ = scroll * 0.05;

    g.rotation.y += (targetRotY - g.rotation.y) * Math.min(1, delta * 4);
    g.rotation.x += (targetRotX - g.rotation.x) * Math.min(1, delta * 4);
    g.rotation.z += (targetRotZ - g.rotation.z) * Math.min(1, delta * 4);

    g.position.y += (idleY - g.position.y) * Math.min(1, delta * 2);
  });

  return <primitive ref={groupRef} object={prepared.cloned} />;
}

useGLTF.preload(MODEL_PATH);
