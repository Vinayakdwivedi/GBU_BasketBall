'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Trail } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Inner ball mesh
function Ball() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 1.5
    meshRef.current.rotation.x += delta * 0.5
  })

  return (
    <Trail
      width={1.5}
      length={8}
      color={new THREE.Color('#ffffff')}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#c2410c"
          roughness={0.4}
          metalness={0.2}
          envMapIntensity={0.8}
        />
        {/* Simple Seams using lines */}
        <lineSegments>
          <edgesGeometry args={[new THREE.SphereGeometry(1.01, 8, 8)]} />
          <lineBasicMaterial color="#1a0a00" transparent opacity={0.3} />
        </lineSegments>
      </mesh>
    </Trail>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    // Gentle float to make it look alive
    groupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <pointLight position={[-4, 2, -2]} intensity={0.8} color="#f97316" />
      <pointLight position={[4, -2, 4]} intensity={0.5} color="#fb923c" />
      <group ref={groupRef}>
        <Ball />
      </group>
    </>
  )
}

export default function Basketball3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isLocked = useRef(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup the timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Phase 1: Hero to Events
    tl.to(containerRef.current, {
      top: '50vh',
      left: '20vw',
      scale: 1.2,
      ease: 'power1.inOut',
      duration: 1
    })

    // Phase 2: Swirl and massive scale up at Team Section
    .to(containerRef.current, {
      top: '60vh',
      left: '50vw',
      scale: 15, // Cover whole page
      rotationZ: 360,
      ease: 'sine.inOut',
      duration: 1.5
    })

    // Phase 3: Shrink to bottom left
    .to(containerRef.current, {
      top: 'calc(100vh - 150px)',
      left: '30px',
      scale: 0.8,
      rotationZ: 720,
      ease: 'power2.out',
      duration: 1,
      onComplete: () => {
        // "sits there all the time and when scroll back then no movement"
        isLocked.current = true;
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '70vh',
        right: '5vw',
        width: '300px',
        height: '300px',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 50,
        filter: 'drop-shadow(0px 20px 30px rgba(249,115,22,0.6))',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}