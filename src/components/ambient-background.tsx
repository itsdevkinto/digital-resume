"use client";

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-background">
      <div className="lamp-layers">


        {/* Top-right lamp */}
        <div
          className="absolute top-0 right-0 h-[90vh] w-[90vw] animate-[lamp-breathe_8s_ease-in-out_infinite_4s]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 100% -5%, var(--lamp-color) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-0 right-0 h-[60vh] w-[60vw] animate-[lamp-breathe_8s_ease-in-out_infinite_5.5s]"
          style={{
            background:
              "radial-gradient(ellipse 45% 40% at 100% 0%, var(--lamp-color-strong) 0%, transparent 55%)",
            filter: "blur(20px)",
          }}
        />
      </div>
    </div>
  );
}