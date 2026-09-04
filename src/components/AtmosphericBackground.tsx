import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  angle: number;
  angularSpeed: number;
  type: 'petal' | 'ember' | 'feather';
  color: string;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

export const AtmosphericBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<ClickRipple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool: warm saffron embers, cream lotus petals, golden spiritual sparks
    const particleCount = 45;
    const particles: Particle[] = [];

    const petalColors = ['#f2e2cf', '#edd4be', '#f27d26', '#e09f67'];
    const emberColors = ['#f27d26', '#ff9442', '#f2e2cf', '#d96c1e'];
    const featherColors = ['#f27d26', '#c98a58', '#f2e2cf', '#2b6272'];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'petal' | 'ember' | 'feather' =
        typeRand < 0.5 ? 'petal' : typeRand < 0.85 ? 'ember' : 'feather';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'ember' ? Math.random() * 2.5 + 1.2 : Math.random() * 7 + 4,
        speedX: (Math.random() - 0.5) * 0.8 + 0.2,
        speedY: type === 'ember' ? -(Math.random() * 0.7 + 0.4) : Math.random() * 0.6 + 0.3,
        opacity: Math.random() * 0.55 + 0.25,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        type,
        color:
          type === 'petal'
            ? petalColors[Math.floor(Math.random() * petalColors.length)]
            : type === 'ember'
            ? emberColors[Math.floor(Math.random() * emberColors.length)]
            : featherColors[Math.floor(Math.random() * featherColors.length)],
      });
    }

    const handleClick = (e: MouseEvent) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 110,
        opacity: 0.8,
      });
    };
    window.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render expanding saffron/cream ripples on clicks
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const ripple = ripplesRef.current[i];
        ripple.radius += 2.2;
        ripple.opacity *= 0.96;

        ctx.save();
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(242, 125, 38, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary subtle inner ring
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius * 0.65, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(242, 226, 207, ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        if (ripple.radius >= ripple.maxRadius || ripple.opacity < 0.02) {
          ripplesRef.current.splice(i, 1);
        }
      }

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        // Wrap around boundaries
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;
        if (p.y < -30) p.y = height + 20;
        if (p.y > height + 30) p.y = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        if (p.type === 'ember') {
          // Glowing saffron ember
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#f27d26';
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        } else if (p.type === 'petal') {
          // Warm cream petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.6;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#f2e2cf';
          ctx.fill();
        } else {
          // Subtle feather spark
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.quadraticCurveTo(0, -p.size * 0.6, p.size, 0);
          ctx.quadraticCurveTo(0, p.size * 0.6, -p.size, 0);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.55;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#f27d26';
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="atmospheric-background" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Editorial Aesthetic: Deep rich charcoal-terracotta radial backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 40%, #4a2c1a 0%, #1a0f0a 80%)',
        }}
      />

      {/* Atmospheric saffron glow circle */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#f27d26] blur-[120px] opacity-10 rounded-full" />

      {/* Secondary subtle warm dawn glow at top */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-[#f27d26]/10 blur-[130px] rounded-full" />

      {/* Archival Editorial dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `radial-gradient(#f2e2cf 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Interactive floating canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
