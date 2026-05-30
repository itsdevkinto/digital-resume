/**
 * SignatureAnimation
 * Endlessly draws the signature path-by-path, then erases it with a
 * diagonal wipe (inverted slanted-Z: top-left → top-right → bottom-left → bottom-right).
 */

const SIG_TOTAL_DRAW = 6.5; // seconds for the full draw sequence
const SIG_HOLD = 0.6; // seconds to hold before erasing
const SIG_ERASE = 1.4; // seconds for the diagonal wipe erase
const SIG_PAUSE = 0.5; // seconds of blank before redraw
const SIG_CYCLE = SIG_TOTAL_DRAW + SIG_HOLD + SIG_ERASE + SIG_PAUSE;

// Each path: [drawStart, drawDuration] in seconds
const PATH_TIMING = [
  [0, 3.5], // sig-path-1  (long swooping stroke)
  [1.8, 3.2], // sig-path-2  (detail strokes)
  [4.2, 1.0], // sig-path-3  (short curl)
  [5.2, 0.8], // sig-path-4  (dot / final mark)
] as const;

const ERASE_START = SIG_TOTAL_DRAW + SIG_HOLD;

export const SignatureAnimation = () => {
  return (
    <div style={{ lineHeight: 0, position: "relative" }} aria-hidden="true">
      <style>{`
        /* ── keyframes ─────────────────────────────────────────── */

        @keyframes sig-draw-1 {
          0%                                          { stroke-dashoffset: 900; opacity: 0; }
          ${pct(0.05, PATH_TIMING[0][1])}%            { opacity: 1; }
          ${pct(PATH_TIMING[0][1], PATH_TIMING[0][1])}% { stroke-dashoffset: 0; opacity: 1; }
          /* hold + erase window — stay visible until wipe covers it */
          ${pct(ERASE_START + SIG_ERASE * 0.15, SIG_CYCLE)}% { opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.45, SIG_CYCLE)}% { opacity: 0; }
          100%                                        { opacity: 0; stroke-dashoffset: 900; }
        }

        @keyframes sig-draw-2 {
          0%,
          ${pct(PATH_TIMING[1][0], SIG_CYCLE)}%      { stroke-dashoffset: 700; opacity: 0; }
          ${pct(PATH_TIMING[1][0] + PATH_TIMING[1][1] * 0.05, SIG_CYCLE)}% { opacity: 1; }
          ${pct(PATH_TIMING[1][0] + PATH_TIMING[1][1], SIG_CYCLE)}% { stroke-dashoffset: 0; opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.3, SIG_CYCLE)}% { opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.6, SIG_CYCLE)}% { opacity: 0; }
          100%                                        { opacity: 0; stroke-dashoffset: 700; }
        }

        @keyframes sig-draw-3 {
          0%,
          ${pct(PATH_TIMING[2][0], SIG_CYCLE)}%      { stroke-dashoffset: 50; opacity: 0; }
          ${pct(PATH_TIMING[2][0] + 0.05, SIG_CYCLE)}% { opacity: 1; }
          ${pct(PATH_TIMING[2][0] + PATH_TIMING[2][1], SIG_CYCLE)}% { stroke-dashoffset: 0; opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.55, SIG_CYCLE)}% { opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.78, SIG_CYCLE)}% { opacity: 0; }
          100%                                        { opacity: 0; stroke-dashoffset: 50; }
        }

        @keyframes sig-draw-4 {
          0%,
          ${pct(PATH_TIMING[3][0], SIG_CYCLE)}%      { stroke-dashoffset: 2; opacity: 0; }
          ${pct(PATH_TIMING[3][0] + 0.05, SIG_CYCLE)}% { opacity: 1; }
          ${pct(PATH_TIMING[3][0] + PATH_TIMING[3][1], SIG_CYCLE)}% { stroke-dashoffset: 0; opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.75, SIG_CYCLE)}% { opacity: 1; }
          ${pct(ERASE_START + SIG_ERASE * 0.95, SIG_CYCLE)}% { opacity: 0; }
          100%                                        { opacity: 0; stroke-dashoffset: 2; }
        }

        /* ── diagonal wipe overlay ──────────────────────────────
          Invert{ed slanted-Z erase: a white/bg stripe sweeps from
          top-le}ft to bottom-right, covering the signature.
           We animate clipPath on a rect that moves diagonally.     */

        @keyframes sig-wipe {
          /* invisible before erase phase */
          0%,
          ${pct(ERASE_START, SIG_CYCLE)}%            { opacity: 0; transform: translateX(-220px) skewX(-20deg); }
          /* slam in */
          ${pct(ERASE_START + 0.05, SIG_CYCLE)}%     { opacity: 1; transform: translateX(-220px) skewX(-20deg); }
          /* sweep across */
          ${pct(ERASE_START + SIG_ERASE * 0.85, SIG_CYCLE)}% { opacity: 1; transform: translateX(260px) skewX(-20deg); }
          /* exit + stay gone through pause */
          ${pct(ERASE_START + SIG_ERASE, SIG_CYCLE)}% { opacity: 0; transform: translateX(260px) skewX(-20deg); }
          100%                                        { opacity: 0; transform: translateX(-220px) skewX(-20deg); }
        }

        /* ── static path classes ────────────────────────────────── */

        .sig-p {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-width: 4;
          opacity: 0;
        }

        .sig-p-1 { stroke-dasharray: 900; stroke-dashoffset: 900;
          animation: sig-draw-1 ${SIG_CYCLE}s cubic-bezier(0.4,0,0.2,1) infinite; }
        .sig-p-2 { stroke-dasharray: 700; stroke-dashoffset: 700;
          animation: sig-draw-2 ${SIG_CYCLE}s cubic-bezier(0.4,0,0.2,1) infinite; }
        .sig-p-3 { stroke-dasharray: 50;  stroke-dashoffset: 50;
          animation: sig-draw-3 ${SIG_CYCLE}s cubic-bezier(0.4,0,0.2,1) infinite; }
        .sig-p-4 { stroke-dasharray: 2;   stroke-dashoffset: 2;
          animation: sig-draw-4 ${SIG_CYCLE}s ease infinite; }

        .sig-wipe-bar {
          position: absolute;
          inset: -10px -60px;          /* oversize so skew doesn't show edges */
          width: 80px;                  /* narrow bar = sharp diagonal edge    */
          background: currentColor;
          opacity: 0;
          transform: translateX(-220px) skewX(-20deg);
          animation: sig-wipe ${SIG_CYCLE}s linear infinite;
          pointer-events: none;
          border-radius: 2px;
        }
      `}</style>


      <svg
        width="89"
        height="66"
        viewBox="0 0 178 131"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block relative"
        style={{ stroke: "currentColor" }}
      >
        <path
          className="sig-p sig-p-1"
          d="M121.883 113.404C113.304 109.84 104.725 106.277 93.3761 103.781C82.0273 101.285 68.1688 99.9655 56.872 100.341C45.5752 100.717 37.2601 102.829 30.4029 105.171C23.5456 107.513 18.3982 110.02 14.6246 112.104C10.851 114.188 8.60722 115.772 6.72543 117.446C4.84363 119.119 3.39179 120.835 2.64387 121.917C1.89595 122.999 1.89595 123.395 2.15992 124.127C2.42389 124.859 2.95184 125.915 3.42179 126.525C3.89174 127.135 4.28769 127.267 5.21759 127.466C6.14749 127.666 7.59933 127.93 9.00718 128.066C10.415 128.202 11.7349 128.202 13.7347 127.608C15.7345 127.015 18.3742 125.827 21.3838 124.027C24.3935 122.227 27.6932 119.851 35.4643 113.348C43.2355 106.845 55.3782 96.2859 72.6543 78.2418C89.9304 60.1978 111.972 34.9885 123.855 21.21C135.737 7.43148 136.793 5.84765 137.469 4.89976C138.145 3.95186 138.409 3.68789 138.611 3.35392C138.813 3.01996 138.945 2.624 138.815 2.35403C138.685 2.08406 138.289 1.95207 138.019 2.01607C137.749 2.08006 137.617 2.34403 137.417 2.612C137.217 2.87997 136.953 3.14395 136.681 3.81587"
        />
        <path
          className="sig-p sig-p-2"
          d="M136.681 3.81587C136.813 5.13573 136.945 6.45558 138.267 16.0445C139.589 25.6335 142.097 43.4516 143.389 53.0925C144.681 62.7335 144.681 63.6574 144.747 64.5293C145.024 68.2016 145.344 71.6645 145.812 75.3921C146.263 78.9811 146.28 81.2595 146.28 82.6013C146.28 87.2527 146.68 75.0162 147.012 70.6306C147.133 69.0319 147.08 67.049 146.948 66.2271C146.816 65.4052 146.552 65.8012 146.35 66.1371C146.148 66.4731 146.016 66.7371 145.816 66.873C145.417 67.1449 144.421 67.273 142.629 67.673C141.516 67.9213 139.913 67.8089 138.569 67.611C134.528 67.0156 133.354 65.5452 132.422 64.9473C131.589 64.413 131.086 63.5454 130.618 63.0795C130.466 62.9282 130.81 62.7455 131.078 62.7435C132.179 62.7353 133.474 63.2734 137.067 63.2774C137.888 63.2783 138.273 62.8815 138.741 62.7455C139.209 62.6095 139.737 62.6095 139.943 62.7415C140.84 63.3164 139.749 64.8733 139.549 65.4052C139.452 65.664 139.481 65.9371 139.547 65.9411C139.873 65.9609 140.409 64.8813 141.209 64.2793C141.434 64.1098 141.481 64.6013 141.613 64.6733C142.584 65.203 143.873 63.2814 145.204 62.4155C145.739 62.0683 146.008 61.9456 146.144 62.2075C146.28 62.4695 146.28 63.1294 146.412 63.4034C146.544 63.6774 146.808 63.5454 147.142 63.2794C147.476 63.0135 147.872 62.6175 148.076 62.6775C148.28 62.7375 148.28 63.2654 148.478 63.3394C149.111 63.5759 149.612 62.3455 150.472 61.9456C151.143 61.6333 152.52 61.8096 153.2 62.2056C153.88 62.6015 153.88 63.3934 153.88 63.5374C153.88 63.6814 153.88 63.1534 153.682 63.0135C153.484 62.8735 153.088 63.1375 152.752 63.5374C152.416 63.9374 152.152 64.4653 152.016 64.4733C151.88 64.4813 151.88 63.9534 151.88 63.9454C151.88 63.9374 151.88 64.4653 151.88 64.5393C151.88 64.6133 151.88 64.2173 151.946 63.8814C152.012 63.5454 152.144 63.2814 152.344 63.2114C152.786 63.0568 154.136 63.4094 155.801 63.5414C156.423 63.5907 156.543 63.9374 156.611 64.2053C156.743 64.7251 156.943 65.4052 157.211 65.9391C157.273 66.0625 156.951 65.9451 156.815 65.4812C156.679 65.0172 156.679 64.2253 156.547 63.8174C156.415 63.4094 156.151 63.4094 155.751 63.6734C154.733 64.3454 154.148 65.2732 153.816 65.7392C153.651 65.9707 153.352 66.0731 153.018 66.2071C152.684 66.3411 152.288 66.4731 152.084 66.0131C151.88 65.5532 151.88 64.4973 152.078 63.8214C152.39 62.7544 153.08 62.2135 153.08 61.9436C153.08 61.8176 153.08 62.7295 153.212 63.0035C153.344 63.2774 153.608 63.1454 153.876 63.1434C154.144 63.1414 154.407 63.2734 154.543 63.5394C154.679 63.8054 154.679 64.2013 154.745 64.2073C154.811 64.2133 154.943 63.8174 155.209 63.6134C155.475 63.4094 155.871 63.4094 156.075 63.6734C156.279 63.9374 156.279 64.4653 156.411 64.7373C156.543 65.0092 156.807 65.0092 157.141 64.8773C157.913 64.572 159.203 63.2854 160.669 62.0176C161.154 61.5977 161.343 61.9376 161.279 62.2715C161.215 62.6055 160.951 63.0015 160.551 63.4694C160.151 63.9374 159.623 64.4653 159.351 64.5393C159.079 64.6133 159.079 64.2173 159.211 64.2113C159.343 64.2053 159.607 64.6013 160.205 64.8053C160.803 65.0092 161.727 65.0092 162.203 64.8773C162.679 64.7453 162.679 64.4813 162.745 64.5433C162.811 64.6053 162.943 65.0012 163.011 65.5352C163.079 66.0691 163.079 66.7291 163.013 66.937C162.947 67.145 162.815 66.881 162.747 66.1511C162.679 65.4212 162.679 64.2333 162.679 63.8854C162.679 63.5374 162.679 64.0653 163.537 64.3373C164.394 64.6093 166.11 64.6093 166.796 64.6093C167.482 64.6093 167.086 64.6093 166.882 64.2133C166.678 63.8174 166.678 63.0255 166.612 62.8155C166.531 62.5563 166.146 63.6734 165.946 63.8094C165.826 63.8909 165.878 63.1534 165.944 63.0135C166.044 62.8022 166.41 63.6734 166.874 64.0733C167.534 64.6418 168.806 63.9454 170.338 63.8774C170.845 63.8549 171.334 63.1534 171.804 62.8815C172.274 62.6095 172.67 62.6095 172.742 62.7415C172.814 62.8735 172.55 63.1374 172.282 63.2734C172.014 63.4094 171.75 63.4094 171.478 63.4094"
        />
        <path
          className="sig-p sig-p-3"
          d="M160.279 51.4107C160.411 52.6026 160.679 56.3222 161.011 58.5379C161.062 58.8769 161.079 59.1379 161.145 59.4059C161.211 59.6738 161.343 59.9378 161.543 60.1398C161.743 60.3418 162.007 60.4737 162.679 60.6097"
        />
        <path className="sig-p sig-p-4" d="M175.877 78.6078H175.877" />
      </svg>
    </div>
  );
};

/** Helper: convert an absolute second to a % of the full cycle, clamped 0–99.9 */
function pct(sec: number, total: number = SIG_CYCLE): number { 
  return Math.min(99.9, Math.max(0, (sec / total) * 100));
}
