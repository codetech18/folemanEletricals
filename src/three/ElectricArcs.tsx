import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Arc = { points: Point[]; branches: Point[][]; offset: number; cycle: number };

function seededRandom(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function lightningPath(
  start: Point,
  end: Point,
  random: () => number,
  displacement: number,
  depth = 6,
): Point[] {
  if (!depth) return [start, end];
  const middle = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2 + (random() - 0.5) * displacement,
  };
  return [
    ...lightningPath(start, middle, random, displacement * 0.68, depth - 1).slice(
      0,
      -1,
    ),
    ...lightningPath(middle, end, random, displacement * 0.68, depth - 1),
  ];
}

function createArc(index: number, cycle: number): Arc {
  const random = seededRandom(1703 + index * 9871 + cycle * 7919);
  const lanes = [0.24, 0.73, 0.37, 0.85, 0.15, 0.61];
  const y = lanes[index] + (random() - 0.5) * 0.09;
  const points = lightningPath(
    { x: -0.08, y },
    { x: 1.08, y: y + (random() - 0.5) * 0.19 },
    random,
    0.3,
  );
  const branches = [0.3, 0.6].map((position, branch) => {
    const join = Math.round((points.length - 1) * position);
    const start = points[join];
    return lightningPath(
      start,
      {
        x: start.x + 0.12 + random() * 0.08,
        y: start.y + (branch % 2 ? -1 : 1) * (0.07 + random() * 0.07),
      },
      random,
      0.09,
      3,
    );
  });
  return { points, branches, offset: index * 0.83, cycle };
}

/** Lightweight decorative canvas: no GPU context or post-processing required. */
export function ElectricArcs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const started = performance.now();
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let arcs = Array.from({ length: 6 }, (_, index) => createArc(index, 0));

    function stroke(
      points: Point[],
      alpha: number,
      lineWidth: number,
      glow: number,
      color: string,
    ) {
      if (points.length < 2) return;
      context!.beginPath();
      points.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        if (index === 0) context!.moveTo(x, y);
        else context!.lineTo(x, y);
      });
      context!.globalAlpha = alpha;
      context!.strokeStyle = color;
      context!.lineWidth = lineWidth;
      context!.shadowBlur = glow;
      context!.shadowColor = "#ffd100";
      context!.lineJoin = "round";
      context!.lineCap = "round";
      context!.stroke();
    }

    function draw(now: number, still = false) {
      context!.clearRect(0, 0, width, height);
      const seconds = still ? 2.6 : (now - started) / 1000;
      const duration = 6.8;
      arcs.forEach((arc, index) => {
        const time = seconds + arc.offset;
        const cycle = Math.floor(time / duration);
        if (!still && cycle !== arc.cycle) {
          arc = arcs[index] = createArc(index, cycle);
        }
        const phase = (time % duration) / duration;
        // Broad, gradual envelopes keep the effect from becoming a strobe.
        const envelope = phase < 0.7 ? Math.sin((phase / 0.7) * Math.PI) : 0;
        if (envelope <= 0) return;
        const head = Math.min(1, phase / 0.58);
        const first = Math.max(
          0,
          Math.floor((head - 0.3) * (arc.points.length - 1)),
        );
        const last = Math.min(
          arc.points.length,
          Math.ceil(head * (arc.points.length - 1)) + 1,
        );
        const trail = arc.points.slice(first, last);
        stroke(arc.points, envelope * 0.12, 1, 5, "#d5a821");
        stroke(trail, envelope * 0.48, 2.2, 18, "#ffd100");
        stroke(trail, envelope * 0.66, 0.7, 4, "#fff5cc");
        arc.branches.forEach((branch, branchIndex) => {
          const arrival = branchIndex ? 0.6 : 0.3;
          const branchLight = Math.max(0, 1 - Math.abs(head - arrival) / 0.26);
          stroke(branch, envelope * branchLight * 0.34, 0.8, 9, "#ffe890");
        });
      });
      context!.globalAlpha = 1;
      context!.shadowBlur = 0;
    }

    function animate(now: number) {
      frame = 0;
      draw(now);
      if (visible && !document.hidden && !motion.matches) {
        frame = requestAnimationFrame(animate);
      }
    }
    function update() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (motion.matches) draw(performance.now(), true);
      else if (visible && !document.hidden) frame = requestAnimationFrame(animate);
    }
    function resize() {
      const bounds = canvas!.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      update();
    }
    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    sizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return <canvas ref={canvasRef} className="electric-canvas" aria-hidden="true" />;
}
