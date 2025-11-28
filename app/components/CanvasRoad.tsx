"use client";
import { useEffect, useRef } from "react";

export default function CanvasRoad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let raf = 0;
    let running = true;
    let offset = 0;
    let velocity = 2; // base speed
    let lastY = window.scrollY;

    function resize() {
      const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
      const width = Math.ceil(window.innerWidth * dpr);
      const height = Math.ceil(window.innerHeight * dpr);
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function onScroll() {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      // damped acceleration from scroll delta
      velocity += dy * 0.02;
      if (Math.abs(velocity) > 30) velocity = 30 * Math.sign(velocity);
    }

    function tick() {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      // ease velocity back towards base
      velocity += (2 - velocity) * 0.02;
      offset = (offset + velocity) % 60;
      draw();
    }

    function draw() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // background subtle vignette
      const grad = ctx.createRadialGradient(w/2, h*0.6, 0, w/2, h*0.6, Math.max(w, h));
      grad.addColorStop(0, "rgba(0,0,0,0.0)");
      grad.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // road area
      const roadWidth = Math.min(w * 0.6, 1100);
      const roadX = (w - roadWidth) / 2;
      ctx.save();
      ctx.translate(roadX, 0);

      // center glow line
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "rgba(0,229,255,0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let y = -60 + (offset % 60); y < h + 60; y += 60) {
        ctx.moveTo(roadWidth/2, y);
        ctx.lineTo(roadWidth/2, y + 30);
      }
      ctx.stroke();

      // lane markers left/right
      ctx.globalCompositeOperation = "source-over";
      const laneX = roadWidth * 0.25;
      ctx.setLineDash([30, 30]);
      ctx.lineDashOffset = -offset;
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,255,255,0.6)";

      ctx.beginPath();
      ctx.moveTo(laneX, 0); ctx.lineTo(laneX, h);
      ctx.moveTo(roadWidth - laneX, 0); ctx.lineTo(roadWidth - laneX, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // side glow borders
      const gradientSide = ctx.createLinearGradient(0, 0, 0, h);
      gradientSide.addColorStop(0, "rgba(255,45,85,.15)");
      gradientSide.addColorStop(1, "rgba(0,229,255,.15)");

      ctx.fillStyle = gradientSide;
      ctx.fillRect(0, 0, 6, h);
      ctx.fillRect(roadWidth - 6, 0, 6, h);

      ctx.restore();
    }

    resize();
    draw();
    tick();

    const resizeObs = new ResizeObserver(resize);
    resizeObs.observe(document.body);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      resizeObs.disconnect();
    };
  }, []);

  return <canvas id="road-canvas" ref={canvasRef} />;
}
