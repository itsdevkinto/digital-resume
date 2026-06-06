import { useIsMobile } from "@/hooks/use-mobile";

export function AmbientBackground() {
  const isMobile = useIsMobile();
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${isMobile ? "absolute" : "fixed"} bg-background inset-0 -z-10`}
    >
      <div className="lamp-layers">
        {/* Top-right lamp */}
        <div
          className={`absolute top-0 right-0 animate-[lamp-breathe_8s_ease-in-out_infinite_4s] ${isMobile ? "h-[55vh] w-[55vw]" : "h-[90vh] w-[90vw]"}`}
          style={{
            background: isMobile
              ? "radial-gradient(ellipse 50% 40% at 100% 0%, var(--lamp-color) 0%, transparent 55%)"
              : "radial-gradient(ellipse 70% 60% at 100% -5%, var(--lamp-color) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className={`absolute top-0 right-0 animate-[lamp-breathe_8s_ease-in-out_infinite_5.5s] ${isMobile ? "h-[80vh] w-[80vw]" : "h-[60vh] w-[60vw]"}`}
          style={{
            background: isMobile
              ? "radial-gradient(ellipse 40% 30% at 100% 0%, var(--lamp-color-strong) 0%, transparent 50%)"
              : "radial-gradient(ellipse 45% 40% at 100% 0%, var(--lamp-color-strong) 0%, transparent 55%)",
            filter: "blur(20px)",
          }}
        />
      </div>
    </div>
  );
}
