"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MATRIX_CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

interface ShapeData {
  mesh: THREE.Mesh;
  rotationSpeed: { x: number; y: number; z: number };
  floatSpeed: number;
  floatOffset: number;
}

export default function ParticlesBackground() {
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const threeCanvas = threeCanvasRef.current;
    const matrixCanvas = matrixCanvasRef.current;
    if (!threeCanvas || !matrixCanvas) return;

    /* ========================================
       THREE.JS — partiküller + wireframe şekiller
       ======================================== */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Partikül sistemi — subtle
    const isMobile = window.innerWidth < 768;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 600 : 1200;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    // Three.js 0.184+ runtime'da BufferAttribute/Float32BufferAttribute mevcut
    // @types/three sürüm uyumsuzluğu nedeniyle any cast gerekli
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AttrCtor =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((THREE as any).Float32BufferAttribute ??
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (THREE as any).BufferAttribute) as new (
        arr: Float32Array,
        itemSize: number,
      ) => unknown;
    particlesGeometry.setAttribute(
      "position",
      new AttrCtor(posArray, 3) as never,
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00d4ff,
      transparent: true,
      opacity: isMobile ? 0.4 : 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Wireframe şekiller
    const shapes: ShapeData[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.OctahedronGeometry(0.25, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
    ];
    const shapeCount = isMobile ? 4 : 10;
    for (let i = 0; i < shapeCount; i++) {
      const geometry =
        geometries[Math.floor(Math.random() * geometries.length)] ?? geometries[0];
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00d4ff : 0xd946ef,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
      );
      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2,
      });
      scene.add(mesh);
    }

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", handleMouseMove);

    const startTime = performance.now();
    let rafId = 0;
    const animateThree = () => {
      const elapsedTime = (performance.now() - startTime) / 1000;
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = targetY * 0.3;
      particlesMesh.rotation.y += targetX * 0.3;

      for (const shape of shapes) {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
        shape.mesh.position.y +=
          Math.sin(elapsedTime * shape.floatSpeed + shape.floatOffset) * 0.002;
      }

      camera.position.x += (targetX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (targetY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animateThree);
    };
    animateThree();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      particlesMesh.position.y = window.pageYOffset * 0.001;
    };
    window.addEventListener("scroll", handleScroll);

    /* ========================================
       MATRIX RAIN
       ======================================== */
    const matrixCtx = matrixCanvas.getContext("2d");
    if (!matrixCtx) return;
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const matrixInterval = window.setInterval(() => {
      matrixCtx.fillStyle = "rgba(10, 10, 15, 0.05)";
      matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      matrixCtx.fillStyle = "#00ff88";
      matrixCtx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const char =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        matrixCtx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (
          drops[i] * fontSize > matrixCanvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 50);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearInterval(matrixInterval);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas id="three-canvas" ref={threeCanvasRef} aria-hidden="true" />
      <canvas
        id="matrix-canvas"
        ref={matrixCanvasRef}
        aria-hidden="true"
      />
    </>
  );
}
