"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const [engineReady, setEngineReady] = useState(false);

  // Inisialisasi engine tsparticles sekali
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine); // memuat semua fitur
    }).then(() => {
      setEngineReady(true);
    });
  }, []);

  // Render hanya setelah engine siap
  if (!engineReady) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // agar di belakang konten
        },
        particles: {
          number: { value: 80 },
          color: { value: "#fe6c00" },
          links: { enable: true, color: "#fe6c00", distance: 150 },
          move: { enable: true, speed: 2 },
          size: { value: 2 },
        },
        background: { color: "transparent" },
      }}
    />
  );
};

export default ParticleBackground;
