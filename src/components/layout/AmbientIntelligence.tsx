'use client';

import { useEffect, useRef } from 'react';

type DriftAxis = 'x' | 'y';
type ParticleKind = 'bokeh' | 'dot' | 'streak';

interface Particle {
  alpha: number;
  anchorX: number;
  anchorY: number;
  displacementVX: number;
  displacementVY: number;
  driftAmplitude: number;
  driftAxis: DriftAxis;
  driftPhase: number;
  driftSpeed: number;
  kind: ParticleKind;
  size: number;
  stretch: number;
  velocityX: number;
  velocityY: number;
  warm: boolean;
  x: number;
  y: number;
}

interface PointerState {
  active: boolean;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
}

interface ProjectedParticle {
  centerRatio: number;
  glowBlur: number;
  kind: ParticleKind;
  lineLength: number;
  opacity: number;
  radius: number;
  warm: boolean;
  x: number;
  y: number;
}

interface ViewportState {
  centerX: number;
  centerY: number;
  connectionDistance: number;
  dpr: number;
  height: number;
  maxRadius: number;
  particleCount: number;
  repelDistance: number;
  width: number;
}

const BASE_FRAME = 1000 / 60;
const MAX_DEVICE_PIXEL_RATIO = 1.8;
const OFFSCREEN_COORDINATE = -12_000;
const PALETTE = {
  backdropCore: 'rgba(9, 30, 68, 0.18)',
  backdropEdge: 'rgba(2, 10, 31, 0.05)',
  emberCore: 'rgba(255, 122, 24, 0.11)',
  emberEdge: 'rgba(255, 184, 77, 0.06)',
  focalGlow: 'rgba(103, 232, 249, 0.025)',
  warmCore: 'rgba(255, 166, 92, 1)',
  warmGlow: 'rgba(249, 115, 22, 0.95)',
  warmLine: 'rgba(255, 138, 76, 1)',
  bokehCore: 'rgba(110, 168, 255, 1)',
  bokehGlow: 'rgba(59, 130, 246, 0.92)',
  bokehLine: 'rgba(125, 166, 255, 1)',
  coolCore: 'rgba(72, 218, 255, 1)',
  coolGlow: 'rgba(6, 182, 212, 0.94)',
  coolLine: 'rgba(34, 211, 238, 1)',
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pickParticleKind(index: number, total: number): ParticleKind {
  const ratio = index / Math.max(total, 1);

  if (ratio < 0.58) {
    return 'dot';
  }

  if (ratio < 0.82) {
    return 'streak';
  }

  return 'bokeh';
}

function createParticle(viewport: ViewportState, index: number, total: number): Particle {
  const kind = pickParticleKind(index, total);
  const anchorX = randomBetween(-viewport.width * 0.06, viewport.width * 1.06);
  const anchorY = randomBetween(-viewport.height * 0.06, viewport.height * 1.06);

  return {
    alpha:
      kind === 'bokeh'
        ? randomBetween(0.28, 0.45)
        : kind === 'streak'
          ? randomBetween(0.36, 0.58)
          : randomBetween(0.42, 0.68),
    anchorX,
    anchorY,
    displacementVX: 0,
    displacementVY: 0,
    driftAmplitude:
      kind === 'bokeh' ? randomBetween(18, 42) : kind === 'streak' ? randomBetween(26, 60) : randomBetween(14, 36),
    driftAxis: Math.random() > 0.5 ? 'x' : 'y',
    driftPhase: randomBetween(0, Math.PI * 2),
    driftSpeed:
      kind === 'bokeh' ? randomBetween(0.28, 0.5) : kind === 'streak' ? randomBetween(0.38, 0.68) : randomBetween(0.44, 0.82),
    kind,
    size:
      kind === 'bokeh' ? randomBetween(6, 15) : kind === 'streak' ? randomBetween(1.4, 2.3) : randomBetween(0.9, 1.8),
    stretch: kind === 'streak' ? randomBetween(9, 18) : 1,
    velocityX: 0,
    velocityY: 0,
    warm: Math.random() > 0.8,
    x: anchorX,
    y: anchorY,
  };
}

function projectParticle(particle: Particle, viewport: ViewportState): ProjectedParticle {
  const dx = particle.x - viewport.centerX;
  const dy = particle.y - viewport.centerY;
  const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
  const centerRatio = clamp(distanceFromCenter / viewport.maxRadius, 0, 1);
  const opacity = particle.alpha * clamp(0.2 + (1 - centerRatio) * 0.35 + centerRatio * 0.72, 0.14, 0.94);
  const radiusScale =
    particle.kind === 'bokeh'
      ? 0.85 + (1 - centerRatio) * 0.25
      : particle.kind === 'streak'
        ? 0.9 + (1 - centerRatio) * 0.15
        : 0.82 + (1 - centerRatio) * 0.12;

  return {
    centerRatio,
    glowBlur:
      particle.kind === 'bokeh'
        ? 16 + (1 - centerRatio) * 18
        : particle.kind === 'streak'
          ? 8 + (1 - centerRatio) * 8
          : 5 + (1 - centerRatio) * 6,
    kind: particle.kind,
    lineLength: particle.kind === 'streak' ? particle.stretch * (0.9 + (1 - centerRatio) * 0.35) : 0,
    opacity,
    radius: particle.size * radiusScale,
    warm: particle.warm,
    x: particle.x,
    y: particle.y,
  };
}

function getParticleColors(projected: ProjectedParticle) {
  if (projected.warm) {
    return {
      core: `rgba(255, 166, 92, ${projected.opacity})`,
      glow: PALETTE.warmGlow,
      line: `rgba(255, 138, 76, ${projected.opacity * 0.3})`,
    };
  }

  if (projected.kind === 'bokeh') {
    return {
      core: `rgba(110, 168, 255, ${projected.opacity * 0.74})`,
      glow: PALETTE.bokehGlow,
      line: `rgba(125, 166, 255, ${projected.opacity * 0.24})`,
    };
  }

  return {
    core: `rgba(72, 218, 255, ${projected.opacity})`,
    glow: PALETTE.coolGlow,
    line: `rgba(34, 211, 238, ${projected.opacity * 0.28})`,
  };
}

export default function AmbientIntelligence() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let lastFrameTime = 0;
    let resizeTimeoutId = 0;
    let isDisposed = false;
    let isRunning = false;

    const viewport: ViewportState = {
      centerX: 0,
      centerY: 0,
      connectionDistance: 120,
      dpr: 1,
      height: 0,
      maxRadius: 0,
      particleCount: 0,
      repelDistance: 180,
      width: 0,
    };

    const pointer: PointerState = {
      active: false,
      currentX: OFFSCREEN_COORDINATE,
      currentY: OFFSCREEN_COORDINATE,
      targetX: OFFSCREEN_COORDINATE,
      targetY: OFFSCREEN_COORDINATE,
    };

    let particles: Particle[] = [];
    let backdropGradient: CanvasGradient | null = null;
    let heatGradient: CanvasGradient | null = null;

    const syncScene = () => {
      viewport.width = window.innerWidth;
      viewport.height = window.innerHeight;
      viewport.centerX = viewport.width * 0.5;
      viewport.centerY = viewport.height * 0.48;
      viewport.dpr = clamp(window.devicePixelRatio || 1, 1, MAX_DEVICE_PIXEL_RATIO);
      viewport.maxRadius = Math.max(viewport.width, viewport.height) * 0.72;

      const area = viewport.width * viewport.height;
      const densityDivisor = viewport.width < 768 ? 82_000 : 68_000;
      viewport.particleCount = clamp(Math.round(area / densityDivisor), 28, 110);
      viewport.connectionDistance = clamp(Math.sqrt(area) * 0.075, 82, 152);
      viewport.repelDistance = clamp(Math.sqrt(area) * 0.14, 125, 220);

      canvas.width = Math.floor(viewport.width * viewport.dpr);
      canvas.height = Math.floor(viewport.height * viewport.dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      context.setTransform(viewport.dpr, 0, 0, viewport.dpr, 0, 0);

      const noirGradient = context.createRadialGradient(
        viewport.centerX,
        viewport.centerY,
        0,
        viewport.centerX,
        viewport.centerY,
        viewport.maxRadius
      );
      noirGradient.addColorStop(0, PALETTE.backdropCore);
      noirGradient.addColorStop(0.42, PALETTE.backdropEdge);
      noirGradient.addColorStop(1, 'rgba(1, 5, 12, 0)');
      backdropGradient = noirGradient;

      const emberGradient = context.createRadialGradient(
        viewport.width * 0.72,
        viewport.height * 0.18,
        0,
        viewport.width * 0.72,
        viewport.height * 0.18,
        viewport.maxRadius * 0.6
      );
      emberGradient.addColorStop(0, PALETTE.emberCore);
      emberGradient.addColorStop(0.35, PALETTE.emberEdge);
      emberGradient.addColorStop(1, 'rgba(2, 10, 31, 0)');
      heatGradient = emberGradient;

      particles = Array.from({ length: viewport.particleCount }, (_, index) =>
        createParticle(viewport, index, viewport.particleCount)
      );
    };

    const drawBackdrop = () => {
      context.clearRect(0, 0, viewport.width, viewport.height);

      if (backdropGradient) {
        context.fillStyle = backdropGradient;
        context.fillRect(0, 0, viewport.width, viewport.height);
      }

      if (heatGradient) {
        context.fillStyle = heatGradient;
        context.fillRect(0, 0, viewport.width, viewport.height);
      }

      context.fillStyle = PALETTE.focalGlow;
      context.beginPath();
      context.ellipse(viewport.centerX, viewport.centerY, 160, 94, 0, 0, Math.PI * 2);
      context.fill();
    };

    const updatePointer = (deltaScale: number) => {
      const smoothing = pointer.active ? 0.18 : 0.08;
      const easedAmount = clamp(smoothing * deltaScale, 0, 1);

      pointer.currentX += (pointer.targetX - pointer.currentX) * easedAmount;
      pointer.currentY += (pointer.targetY - pointer.currentY) * easedAmount;
    };

    const updateParticles = (deltaScale: number, elapsedSeconds: number) => {
      const repelDistanceSquared = viewport.repelDistance * viewport.repelDistance;

      for (const particle of particles) {
        const primaryWave = Math.sin(elapsedSeconds * particle.driftSpeed + particle.driftPhase);
        const secondaryWave = Math.cos(elapsedSeconds * particle.driftSpeed * 0.72 + particle.driftPhase);
        const targetX =
          particle.anchorX +
          (particle.driftAxis === 'x' ? primaryWave * particle.driftAmplitude : secondaryWave * particle.driftAmplitude * 0.22);
        const targetY =
          particle.anchorY +
          (particle.driftAxis === 'y' ? primaryWave * particle.driftAmplitude : secondaryWave * particle.driftAmplitude * 0.22);

        const flowStrength = particle.kind === 'bokeh' ? 0.02 : 0.032;
        const flowDamping = particle.kind === 'bokeh' ? 0.12 : 0.14;
        let accelerationX = (targetX - particle.x) * flowStrength - particle.velocityX * flowDamping;
        let accelerationY = (targetY - particle.y) * flowStrength - particle.velocityY * flowDamping;

        if (pointer.active) {
          const dx = particle.x - pointer.currentX;
          const dy = particle.y - pointer.currentY;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < repelDistanceSquared) {
            const distance = Math.max(Math.sqrt(distanceSquared), 1);
            const intensity = 1 - distanceSquared / repelDistanceSquared;
            const burstStrength =
              particle.kind === 'bokeh' ? 2.1 : particle.kind === 'streak' ? 3.3 : 2.8;

            accelerationX += (dx / distance) * intensity * burstStrength;
            accelerationY += (dy / distance) * intensity * burstStrength;
          }
        }

        const displacementSpring = particle.kind === 'bokeh' ? 0.032 : 0.05;
        const displacementDamping = particle.kind === 'bokeh' ? 0.11 : 0.13;
        const displacementAX =
          -particle.displacementVX * displacementDamping - particle.displacementVX * 0.01;
        const displacementAY =
          -particle.displacementVY * displacementDamping - particle.displacementVY * 0.01;

        particle.velocityX += accelerationX * deltaScale;
        particle.velocityY += accelerationY * deltaScale;
        particle.velocityX *= 1 - displacementSpring * deltaScale * 0.08;
        particle.velocityY *= 1 - displacementSpring * deltaScale * 0.08;

        particle.displacementVX += displacementAX * deltaScale;
        particle.displacementVY += displacementAY * deltaScale;

        particle.x += (particle.velocityX + particle.displacementVX) * deltaScale;
        particle.y += (particle.velocityY + particle.displacementVY) * deltaScale;

        particle.x = clamp(particle.x, -viewport.width * 0.08, viewport.width * 1.08);
        particle.y = clamp(particle.y, -viewport.height * 0.08, viewport.height * 1.08);
      }
    };

    const drawConnections = (projectedParticles: ProjectedParticle[]) => {
      const maxDistanceSquared = viewport.connectionDistance * viewport.connectionDistance;

      for (let index = 0; index < projectedParticles.length; index += 1) {
        const currentParticle = projectedParticles[index];

        if (currentParticle.kind === 'bokeh') {
          continue;
        }

        for (let nextIndex = index + 1; nextIndex < projectedParticles.length; nextIndex += 1) {
          const nextParticle = projectedParticles[nextIndex];

          if (nextParticle.kind === 'bokeh') {
            continue;
          }

          const dx = currentParticle.x - nextParticle.x;
          const dy = currentParticle.y - nextParticle.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > maxDistanceSquared) {
            continue;
          }

          const connectionStrength = 1 - distanceSquared / maxDistanceSquared;
          const glowColor =
            currentParticle.warm || nextParticle.warm
              ? 'rgba(249, 115, 22, 0.62)'
              : 'rgba(34, 211, 238, 0.62)';

          context.save();
          context.shadowBlur = 10 + connectionStrength * 10;
          context.shadowColor = glowColor;
          context.strokeStyle =
            currentParticle.warm || nextParticle.warm
              ? `rgba(255, 154, 86, ${connectionStrength * 0.22})`
              : `rgba(125, 249, 255, ${connectionStrength * 0.18})`;
          context.lineWidth = 0.5 + connectionStrength * 0.45;
          context.beginPath();
          context.moveTo(currentParticle.x, currentParticle.y);
          context.lineTo(nextParticle.x, nextParticle.y);
          context.stroke();
          context.restore();
        }
      }
    };

    const drawParticles = (projectedParticles: ProjectedParticle[]) => {
      for (const projected of projectedParticles) {
        const colors = getParticleColors(projected);

        context.save();
        context.shadowBlur = projected.glowBlur;
        context.shadowColor = colors.glow;

        if (projected.kind === 'bokeh') {
          context.fillStyle = colors.core;
          context.beginPath();
          context.arc(projected.x, projected.y, projected.radius * 1.2, 0, Math.PI * 2);
          context.fill();

          context.fillStyle = `rgba(147, 197, 253, ${projected.opacity * 0.1})`;
          context.beginPath();
          context.arc(projected.x, projected.y, projected.radius * 2.2, 0, Math.PI * 2);
          context.fill();
          context.restore();
          continue;
        }

        if (projected.kind === 'streak') {
          context.strokeStyle = colors.line;
          context.lineWidth = projected.radius;
          context.beginPath();
          context.moveTo(projected.x - projected.lineLength, projected.y);
          context.lineTo(projected.x + projected.lineLength, projected.y);
          context.stroke();
          context.restore();
          continue;
        }

        context.fillStyle = colors.core;
        context.beginPath();
        context.arc(projected.x, projected.y, projected.radius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(125, 249, 255, ${projected.opacity * 0.18})`;
        context.beginPath();
        context.arc(projected.x, projected.y, projected.radius * 0.52, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    };

    const renderFrame = (time: number) => {
      if (isDisposed) {
        return;
      }

      if (!lastFrameTime) {
        lastFrameTime = time;
      }

      const deltaMilliseconds = clamp(time - lastFrameTime, 8, 34);
      const deltaScale = deltaMilliseconds / BASE_FRAME;
      const elapsedSeconds = time / 1000;
      lastFrameTime = time;

      drawBackdrop();
      updatePointer(deltaScale);
      updateParticles(deltaScale, elapsedSeconds);

      const projectedParticles = particles.map((particle) => projectParticle(particle, viewport));

      drawConnections(projectedParticles);
      drawParticles(projectedParticles);

      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    const startAnimation = () => {
      if (isRunning || isDisposed) {
        return;
      }

      isRunning = true;
      lastFrameTime = performance.now();
      animationFrameId = window.requestAnimationFrame(renderFrame);
    };

    const stopAnimation = () => {
      if (!isRunning) {
        return;
      }

      window.cancelAnimationFrame(animationFrameId);
      isRunning = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.active = true;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = OFFSCREEN_COORDINATE;
      pointer.targetY = OFFSCREEN_COORDINATE;
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeoutId);
      resizeTimeoutId = window.setTimeout(syncScene, 140);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      startAnimation();
    };

    syncScene();
    startAnimation();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isDisposed = true;
      stopAnimation();
      window.clearTimeout(resizeTimeoutId);

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-95"
      style={{ zIndex: -1 }}
    />
  );
}
