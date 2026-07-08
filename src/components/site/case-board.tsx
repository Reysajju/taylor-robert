"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Reveal } from "./reveal";
import { ScrambleHeading } from "./scramble-heading";
import { X, GripVertical, Redo } from "lucide-react";

/* ─── Data ─────────────────────────────────────────────── */
interface BoardNode {
  id: string;
  label: string;
  sublabel: string;
  x: number; // percent
  y: number; // percent
  type: "person" | "location" | "event" | "document";
  color: string;
}

interface BoardEdge {
  from: string;
  to: string;
  label: string;
}

const NODES: BoardNode[] = [
  { id: "eme", label: "La EMe", sublabel: "Mexican Mafia · 1957", x: 15, y: 18, type: "person", color: "#b08d57" },
  { id: "ab", label: "Aryan Brotherhood", sublabel: "San Quentin · 1967", x: 72, y: 12, type: "person", color: "#b08d57" },
  { id: "bgf", label: "Black Guerrilla Family", sublabel: "George Jackson · 1966", x: 50, y: 52, type: "person", color: "#b08d57" },
  { id: "nf", label: "Nuestra Familia", sublabel: "Soledad · 1968", x: 25, y: 65, type: "person", color: "#b08d57" },
  { id: "duel", label: "Deuel Vocational Institution", sublabel: "Birthplace of La EMe", x: 8, y: 42, type: "location", color: "#7a2e1d" },
  { id: "sq", label: "San Quentin", sublabel: "AB Forge · Death Row", x: 85, y: 38, type: "location", color: "#7a2e1d" },
  { id: "tf", label: "Task Forces", sublabel: "Multi-Agency Response", x: 50, y: 22, type: "event", color: "#9c3a25" },
  { id: "hb", label: "Homeboy Industries", sublabel: "Fr. Greg Boyle · Off-Ramp", x: 78, y: 72, type: "document", color: "#c9a86f" },
  { id: "taylor", label: "Robert B. Taylor", sublabel: "LAPD → Chief Probation", x: 42, y: 82, type: "person", color: "#b08d57" },
  { id: "blood", label: "Blood Alliances", sublabel: "Race-based power structures", x: 22, y: 32, type: "event", color: "#9c3a25" },
];

const EDGES: BoardEdge[] = [
  { from: "duel", to: "eme", label: "Founded at" },
  { from: "eme", to: "nf", label: "Rivalry" },
  { from: "sq", to: "ab", label: "Forged at" },
  { from: "bgf", to: "ab", label: "Ideological conflict" },
  { from: "eme", to: "blood", label: "Race-based power" },
  { from: "ab", to: "blood", label: "Race-based power" },
  { from: "tf", to: "eme", label: "Investigates" },
  { from: "tf", to: "ab", label: "Investigates" },
  { from: "tf", to: "bgf", label: "Investigates" },
  { from: "taylor", to: "tf", label: "Testified before" },
  { from: "taylor", to: "hb", label: "Documented" },
  { from: "nf", to: "bgf", label: "Tactical alliance" },
];

const TYPE_ICONS: Record<BoardNode["type"], string> = {
  person: "◉",
  location: "▣",
  event: "✦",
  document: "▦",
};

/* ─── Component ────────────────────────────────────────── */
export function CaseBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    const init: Record<string, { x: number; y: number }> = {};
    NODES.forEach((n) => {
      init[n.id] = { x: n.x, y: n.y };
    });
    return init;
  });
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState<string | null>(null);

  const getNode = useCallback(
    (id: string) => NODES.find((n) => n.id === id)!,
    []
  );

  /* Drag handlers */
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, nodeId: string) => {
      e.preventDefault();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pos = positions[nodeId];
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      setDragOffset({ x: mouseX - pos.x, y: mouseY - pos.y });
      setDragging(nodeId);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [positions]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      const newX = Math.max(5, Math.min(95, mouseX - dragOffset.x));
      const newY = Math.max(5, Math.min(95, mouseY - dragOffset.y));
      setPositions((prev) => ({ ...prev, [dragging]: { x: newX, y: newY } }));
    },
    [dragging, dragOffset]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  const resetBoard = useCallback(() => {
    const init: Record<string, { x: number; y: number }> = {};
    NODES.forEach((n) => {
      init[n.id] = { x: n.x, y: n.y };
    });
    setPositions(init);
  }, []);

  /* Connected edges for a node */
  const getConnectedEdges = useCallback(
    (nodeId: string) => {
      return EDGES.filter((e) => e.from === nodeId || e.to === nodeId);
    },
    []
  );

  /* Touch device detection */
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <section
      id="case-board"
      className="grain-overlay concrete-texture section-transition atmosphere-fog relative overflow-hidden border-t border-paper/10 bg-charcoal-deep"
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
        {/* Section header */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono-dossier text-[0.65rem] tracking-label text-gold">
              EVIDENCE BOARD
            </span>
            <span className="h-px flex-1 bg-paper/10" />
            <button
              onClick={resetBoard}
              className="flex items-center gap-1.5 font-mono-dossier text-[0.6rem] tracking-label text-paper-mute/50 transition-colors hover:text-gold"
              aria-label="Reset board layout"
            >
              <Redo className="h-3 w-3" />
              RESET
            </button>
          </div>

          <ScrambleHeading className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold tracking-display text-paper text-glow-gold">
            Connect the dots.
          </ScrambleHeading>
          <p className="mt-3 max-w-2xl text-paper-mute">
            An interactive investigation map. Drag the evidence pins to rearrange.
            Hover over the red thread to see how the connections unfold.
          </p>
        </Reveal>

        {/* Board */}
        <Reveal delay={0.15}>
          <div className="relative mt-10 overflow-hidden rounded-sm border border-paper/10 bg-charcoal/80">
            {/* Cork board texture overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(176,141,87,0.03)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(122,46,29,0.03)_0%,transparent_50%)]" />
            {/* Grid dots */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ede8dd 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div
              ref={containerRef}
              className="case-board-container relative aspect-[16/10] w-full touch-none select-none sm:aspect-[16/9]"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* SVG Connections */}
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <filter id="edge-glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <pattern id="dashes" patternUnits="userSpaceOnUse" width="6" height="6">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                {EDGES.map((edge) => {
                  const from = positions[edge.from];
                  const to = positions[edge.to];
                  if (!from || !to) return null;
                  const edgeKey = `${edge.from}-${edge.to}`;
                  const isHovered = hoveredEdge === edgeKey || hoveredNode === edge.from || hoveredNode === edge.to;
                  return (
                    <g key={edgeKey}>
                      {/* Main line */}
                      <line
                        x1={`${from.x}%`}
                        y1={`${from.y}%`}
                        x2={`${to.x}%`}
                        y2={`${to.y}%`}
                        stroke={isHovered ? "#9c3a25" : "#7a2e1d"}
                        strokeWidth={isHovered ? 1.5 : 0.8}
                        strokeOpacity={isHovered ? 0.9 : 0.4}
                        className="transition-all duration-300"
                        style={{ filter: isHovered ? "url(#edge-glow)" : "none" }}
                      />
                      {/* Label on hover */}
                      {isHovered && (
                        <text
                          x={`${(from.x + to.x) / 2}%`}
                          y={`${(from.y + to.y) / 2 - 1.5}%`}
                          textAnchor="middle"
                          fill="#ede8dd"
                          fontSize="0.55rem"
                          fontFamily="var(--font-mono), monospace"
                          letterSpacing="0.1em"
                          className="pointer-events-none uppercase"
                          opacity="0.9"
                        >
                          {edge.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Nodes */}
              {NODES.map((node) => {
                const pos = positions[node.id];
                const isDraggingThis = dragging === node.id;
                const isHoveredThis = hoveredNode === node.id;
                const connectedEdges = getConnectedEdges(node.id);
                return (
                  <div
                    key={node.id}
                    className="absolute z-10"
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: `translate(-50%, -50%) ${isDraggingThis ? "scale(1.08)" : ""}`,
                      transition: dragging === node.id ? "none" : "transform 0.3s ease",
                    }}
                    onPointerDown={(e) => handlePointerDown(e, node.id)}
                    onMouseEnter={() => {
                      setHoveredNode(node.id);
                      setShowInfo(node.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                      setShowInfo(null);
                    }}
                    onClick={() => isTouchDevice && setShowInfo(showInfo === node.id ? null : node.id)}
                  >
                    {/* Pin thumbtack */}
                    <div className="relative">
                      {/* Glow on hover */}
                      <div
                        className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${isHoveredThis ? "opacity-100" : "opacity-0"}`}
                        style={{ background: `radial-gradient(circle, ${node.color}33 0%, transparent 70%)` }}
                      />

                      {/* Pin dot */}
                      <div
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-9 sm:w-9 ${
                          isDraggingThis
                            ? "border-gold bg-charcoal shadow-lg shadow-gold/20"
                            : isHoveredThis
                              ? "border-gold/80 bg-charcoal-soft"
                              : "border-paper/20 bg-charcoal-soft"
                        }`}
                        style={{ cursor: dragging ? "grabbing" : "grab" }}
                      >
                        <span
                          className="text-xs sm:text-sm"
                          style={{ color: node.color }}
                          aria-hidden
                        >
                          {TYPE_ICONS[node.type]}
                        </span>
                        {isDraggingThis && (
                          <GripVertical className="absolute -bottom-4 left-1/2 h-3 w-3 -translate-x-1/2 text-paper-mute/30" />
                        )}
                      </div>

                      {/* Label card */}
                      <div
                        className={`absolute left-1/2 top-full mt-2 min-w-[5.5rem] -translate-x-1/2 whitespace-nowrap rounded-sm border px-2 py-1.5 text-center transition-all duration-300 ${
                          isHoveredThis || showInfo === node.id
                            ? "border-paper/20 bg-charcoal-soft opacity-100"
                            : "border-transparent bg-transparent opacity-70"
                        }`}
                      >
                        <span className="block font-display text-[0.65rem] font-medium leading-tight text-paper sm:text-xs">
                          {node.label}
                        </span>
                        <span className="mt-0.5 block font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/50">
                          {node.sublabel}
                        </span>
                      </div>

                      {/* Connection count badge */}
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-charcoal text-[0.45rem] font-bold text-rust-bright ring-1 ring-rust/30">
                        {connectedEdges.length}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend bar */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-paper/10 px-4 py-3 sm:gap-x-8 sm:px-5">
              <span className="font-mono-dossier text-[0.55rem] tracking-label text-paper-mute/50">
                LEGEND
              </span>
              {[
                { icon: "◉", label: "Person / Gang", color: "#b08d57" },
                { icon: "▣", label: "Location", color: "#7a2e1d" },
                { icon: "✦", label: "Event", color: "#9c3a25" },
                { icon: "▦", label: "Document / Program", color: "#c9a86f" },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <span style={{ color: item.color }} className="text-[0.65rem]">
                    {item.icon}
                  </span>
                  <span className="font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/60">
                    {item.label.toUpperCase()}
                  </span>
                </span>
              ))}
              <span className="ml-auto hidden items-center gap-1 font-mono-dossier text-[0.5rem] tracking-label text-paper-mute/30 sm:flex">
                <span className="h-px w-4 bg-rust/50" /> RED THREAD = CONNECTION
                <span className="h-px w-4 bg-rust/50" />
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}