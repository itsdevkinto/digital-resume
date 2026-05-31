import { useEffect, useRef, useState } from "react";
import { SquareTerminal } from "lucide-react";
import "./styles.css";

const CELLS = 16;

type CardState = "idle" | "scanning" | "verified" | "cooldown";

function randomCells() {
  return Array.from({ length: CELLS }, () => Math.random() > 0.45);
}

const AccessCard = () => {
  const [cells, setCells] = useState<boolean[]>(randomCells);
  const [cardState, setCardState] = useState<CardState>("idle");

  const hoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const burstRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const verifiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = () => setCells(randomCells());

  const startIdleGlitch = () => {
    idleTimerRef.current = setTimeout(() => {
        let i = 0;
        const bursts = 3 + Math.floor(Math.random() * 4);
        burstRef.current = setInterval(() => {
          scramble();
          i++;
          if (i >= bursts) {
            clearInterval(burstRef.current ?? undefined);
            startIdleGlitch();
          }
        }, 55);
      },
      // eslint-disable-next-line react-hooks/purity
      1800 + Math.random() * 2500,
    );
  };

  const stopIdleGlitch = () => {
    clearTimeout(idleTimerRef.current ?? undefined);
    clearInterval(burstRef.current ?? undefined);
  };

  useEffect(() => {
    startIdleGlitch();
    return () => {
      stopIdleGlitch();
      clearInterval(hoverIntervalRef.current ?? undefined);
      clearTimeout(scanTimerRef.current ?? undefined);
      clearTimeout(verifiedTimerRef.current ?? undefined);
      clearTimeout(cooldownTimerRef.current ?? undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startScanning = () => {
    if (cardState !== "idle") return;
    setCardState("scanning");
    stopIdleGlitch();
    hoverIntervalRef.current = setInterval(scramble, 60);

    scanTimerRef.current = setTimeout(() => {
      clearInterval(hoverIntervalRef.current ?? undefined);
      setCells(Array(CELLS).fill(true));
      setCardState("verified");

      verifiedTimerRef.current = setTimeout(() => {
        setCardState("cooldown");
      
        setTimeout(() => {
          scramble();
      
          let i = 0;
          const bursts = 3 + Math.floor(Math.random() * 4);
          burstRef.current = setInterval(() => {
            scramble();
            i++;
            if (i >= bursts) {
              clearInterval(burstRef.current ?? undefined);
            }
          }, 55);
        }, 1600); // tweak this value
        cooldownTimerRef.current = setTimeout(() => {
          setCardState("idle");
          startIdleGlitch();
        }, 1200);
      }, 3600);
    }, 4000);
  };

  const stopScanning = () => {
    if (cardState !== "scanning") return;
    clearInterval(hoverIntervalRef.current ?? undefined);
    clearTimeout(scanTimerRef.current ?? undefined);
    scramble();
    setCardState("idle");
    startIdleGlitch();
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    startScanning();
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    stopScanning();
  };

  const handleClick = (e: React.MouseEvent) => {
    const nativeEvent = e.nativeEvent as PointerEvent;
    const isTouch =
      nativeEvent.pointerType === "touch" ||
      nativeEvent.pointerType === "pen" ||
      (nativeEvent.pointerType === undefined &&
        window.matchMedia("(pointer: coarse)").matches);

    if (isTouch) {
      if (cardState === "idle") {
        startScanning();
      } else if (cardState === "scanning") {
        stopScanning();
      }
    }
  };

  const isScanning = cardState === "scanning";
  const isVerified = cardState === "verified";
  const isCooldown = cardState === "cooldown";
  const isLifted = isScanning || isVerified;
  const isLit = isScanning || isVerified || isCooldown;

  const ledClass = [
    "led",
    isLit && "lit",
    isScanning && "pulsing",
    isCooldown && "fading",
  ]
    .filter(Boolean)
    .join(" ");

  const gridClass = [
    "glitch-grid",
    isScanning && "scanning",
    isLit && !isScanning && "verified",
    isCooldown && "fading-out",
  ]
    .filter(Boolean)
    .join(" ");

  const cardClass = [
    "access-card",
    isLifted && "lifted",
    isVerified && "verified-state",
    isCooldown && "cooldown-state",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      className={cardClass}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {isScanning && <div className="scan-line" />}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "relative",
          zIndex: 3,
        }}
      >
        <SquareTerminal style={{ width: 22, height: 22, opacity: 0.85 }} />
        <span className={ledClass} />
      </div>

      <div style={{ position: "relative", zIndex: 3 }}>
        <p className="ac-label">Access Card</p>
        <p className="card-title">DEV PORTFOLIO</p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 3,
        }}
      >
        <div>
          <p className="ac-label">Founding member</p>
          <p className="member-name" style={{ marginTop: 3 }}>
            KINTO
          </p>
        </div>

        <div className={gridClass}>
          {cells.map((on, i) => (
            <div
              key={i}
              className="cell"
              style={{ background: on ? "#fff" : "transparent" }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default AccessCard;
