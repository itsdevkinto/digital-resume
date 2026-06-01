import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

if (
  typeof document !== "undefined" &&
  !document.getElementById("sheet-styles")
) {
  const s = document.createElement("style");
  s.id = "sheet-styles";
  s.textContent = `
    @keyframes sheet-fade-in { from { opacity: 0 } to { opacity: 1 } }
    @keyframes sheet-fade-out { from { opacity: 1 } to { opacity: 0 } }
  `;
  document.head.appendChild(s);
}

type CategoryConfig = {
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  mobileLabel?: string;
};

interface MiniWebsiteModalProps {
  open: boolean;
  activeCategory: string;
  categories: Record<string, CategoryConfig>;
  headerLabel: string;
  headerIcon: React.ComponentType<{ className?: string }>;
  onClose: () => void;
  onSwitch: (category: string) => void;
  renderContent: (category: string) => React.ReactNode;
}

// iOS-matched easing from Vaul / Ionic Framework
const SHEET_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
const SNAP_DURATION = "0.28s"; // snappy inter-snap (expand/collapse)
const OPEN_DURATION = "0.36s"; // slightly longer for the opening pop
const CLOSE_DURATION = "0.28s"; // quick close

// Snap points: sheet is always rendered at SNAP_MAX height,
// translateY shifts it so only SNAP_MIN is visible when collapsed.
const SNAP_MAX_VH = 0.9;
const SNAP_MIN_VH = 0.48;
const VELOCITY_THRESHOLD = 500; // px/s — flick to dismiss/expand
const DRAG_THRESHOLD = 80; // px — slow drag threshold

export const MiniWebsiteModal = ({
  open,
  activeCategory,
  categories,
  headerLabel,
  headerIcon: HeaderIcon,
  onClose,
  onSwitch,
  renderContent,
}: MiniWebsiteModalProps) => {
  const isMobile = useIsMobile();
  const categoryKeys = Object.keys(categories);

  const [displayCategory, setDisplayCategory] = useState(activeCategory);
  if (open && activeCategory !== displayCategory) {
    setDisplayCategory(activeCategory);
  }

  const [isMaximized, setIsMaximized] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // The translateY offset when collapsed:
  // sheet height = SNAP_MAX_VH * window.innerHeight
  // visible portion = SNAP_MIN_VH * window.innerHeight
  // so translateY = (SNAP_MAX_VH - SNAP_MIN_VH) * window.innerHeight
  const getCollapsedY = useCallback(() => {
    return (SNAP_MAX_VH - SNAP_MIN_VH) * window.innerHeight;
  }, []);

  // Apply transform directly — no React state, no layout thrash
  const snapTo = useCallback(
    (maximized: boolean, animate = true) => {
      const el = sheetRef.current;
      if (!el) return;
      const y = maximized ? 0 : getCollapsedY();
      el.style.transition = animate
        ? `transform ${SNAP_DURATION} ${SHEET_EASE}`
        : "none";
      el.style.transform = `translateY(${y}px)`;
    },
    [getCollapsedY],
  );

  // Slide up from fully off-screen to collapsed position
  const openSheet = useCallback(() => {
    const el = sheetRef.current;
    if (!el) return;
    // Start off-screen instantly, then animate up
    el.style.transition = "none";
    el.style.transform = `translateY(${window.innerHeight}px)`;
    // Force a reflow so the browser registers the start position
    void el.offsetHeight;
    el.style.transition = `transform ${OPEN_DURATION} ${SHEET_EASE}`;
    el.style.transform = `translateY(${getCollapsedY()}px)`;
  }, [getCollapsedY]);

  // Slide down off-screen, fade backdrop, then call onClose
  const closeSheet = useCallback(() => {
    const el = sheetRef.current;
    const bd = backdropRef.current;
    if (!el) return;
    el.style.transition = `transform ${CLOSE_DURATION} ${SHEET_EASE}`;
    el.style.transform = `translateY(${window.innerHeight}px)`;
    if (bd) {
      bd.style.transition = `opacity ${CLOSE_DURATION} ease`;
      bd.style.opacity = "0";
    }
    setTimeout(onClose, parseFloat(CLOSE_DURATION) * 1000);
  }, [onClose]);

  const didOpenRef = useRef(false);

  // Snap whenever isMaximized changes — but not on the very first open
  // (openSheet handles that transition instead)
  useEffect(() => {
    if (!isMobile) return;
    if (!didOpenRef.current) return;
    snapTo(isMaximized);
  }, [isMaximized, isMobile, snapTo]);

  // Play open animation whenever the sheet mounts/opens
  useEffect(() => {
    if (!open || !isMobile) return;
    didOpenRef.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMaximized(false);
    requestAnimationFrame(() => {
      openSheet();
      didOpenRef.current = true;
    });
  }, [open, isMobile, openSheet]);

  // ── Drag logic ─────────────────────────────────────────────────────────────
  const dragState = useRef({
    startY: 0,
    startTranslateY: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    dragging: false,
  });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isMobile) return;
      const el = sheetRef.current;
      if (!el) return;

      // Read current translateY from the element directly
      const matrix = new DOMMatrix(getComputedStyle(el).transform);
      const currentY = matrix.m42;

      dragState.current = {
        startY: e.clientY,
        startTranslateY: currentY,
        lastY: e.clientY,
        lastTime: performance.now(),
        velocity: 0,
        dragging: true,
      };

      el.style.transition = "none"; // disable transition while dragging
      el.setPointerCapture(e.pointerId);
    },
    [isMobile],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const state = dragState.current;
    if (!state.dragging) return;
    const el = sheetRef.current;
    if (!el) return;

    const delta = e.clientY - state.startY;
    const newY = Math.max(0, state.startTranslateY + delta);

    // Track velocity
    const now = performance.now();
    const dt = now - state.lastTime;
    if (dt > 0) {
      state.velocity = ((e.clientY - state.lastY) / dt) * 1000; // px/s
    }
    state.lastY = e.clientY;
    state.lastTime = now;

    // Write directly — no setState, no Framer, no re-render
    el.style.transform = `translateY(${newY}px)`;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const state = dragState.current;
      if (!state.dragging) return;
      state.dragging = false;
      const el = sheetRef.current;
      if (!el) return;

      el.releasePointerCapture(e.pointerId);

      const delta = e.clientY - state.startY;
      const velocity = state.velocity;

      // Velocity-first snapping (flick feel)
      if (velocity > VELOCITY_THRESHOLD) {
        // Fast flick down
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          closeSheet();
        }
      } else if (velocity < -VELOCITY_THRESHOLD) {
        // Fast flick up
        setIsMaximized(true);
      } else if (delta > DRAG_THRESHOLD) {
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          closeSheet();
        }
      } else if (delta < -DRAG_THRESHOLD) {
        setIsMaximized(true);
      } else {
        // Snap back to current state
        snapTo(isMaximized);
      }
    },
    [isMaximized, closeSheet, snapTo],
  );

  const handleOverlayClick = () => {
    if (isMobile && isMaximized) {
      setIsMaximized(false);
    } else if (isMobile) {
      closeSheet();
    } else {
      onClose();
    }
  };

  // Desktop modal variants — simple opacity/scale, no height
  const desktopVariants = {
    initial: { opacity: 0, scale: 0.98, y: 6 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.99, y: 3 },
  };

  const desktopTransition = {
    duration: 0.2,
    ease: [0.25, 1, 0.35, 1] as const,
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — fades in via CSS, fades out imperatively in closeSheet */}
          <div
            ref={backdropRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[9998] bg-black/40 pointer-events-auto"
            style={{ animation: "sheet-fade-in 0.2s ease forwards" }}
          />

          <div
            className={cn(
              "fixed inset-0 z-[9999] flex pointer-events-none",
              isMobile
                ? "items-end justify-center"
                : "items-center justify-center md:p-16",
            )}
          >
            {isMobile ? (
              // Sheet is always full SNAP_MAX height, parked off-screen via translateY.
              // No Framer on the mobile path at all — pure CSS transform.
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: `${SNAP_MAX_VH * 100}vh` }}
              >
                <div
                  ref={sheetRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  className={cn(
                    "pointer-events-auto absolute inset-0 bg-background border border-black/25 dark:border-white/5",
                    "rounded-t-2xl shadow-lg flex flex-col overflow-hidden",
                  )}
                  // translateY set imperatively via ref — never via React state
                  style={{ willChange: "transform", touchAction: "none" }}
                >
                  {/* Drag handle */}
                  <div className="shrink-0 flex justify-center pt-3 mb-2 cursor-grab active:cursor-grabbing">
                    <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
                  </div>

                  <ModalInner
                    isMobile={isMobile}
                    displayCategory={displayCategory}
                    categories={categories}
                    categoryKeys={categoryKeys}
                    headerLabel={headerLabel}
                    HeaderIcon={HeaderIcon}
                    onClose={onClose}
                    onDismiss={closeSheet}
                    onSwitch={onSwitch}
                    renderContent={renderContent}
                  />
                </div>
              </div>
            ) : (
              // ── Desktop modal — Framer only here ─────────────────────────
              <motion.div
                key="desktop-modal"
                variants={desktopVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={desktopTransition}
                className={cn(
                  "pointer-events-auto relative bg-background border border-black/25 dark:border-white/5",
                  "rounded-2xl shadow-lg w-full max-w-5xl h-[800px] flex flex-row overflow-hidden",
                )}
              >
                <ModalInner
                  isMobile={isMobile}
                  displayCategory={displayCategory}
                  categories={categories}
                  categoryKeys={categoryKeys}
                  headerLabel={headerLabel}
                  HeaderIcon={HeaderIcon}
                  onClose={onClose}
                  onDismiss={onClose}
                  onSwitch={onSwitch}
                  renderContent={renderContent}
                />
              </motion.div>
            )}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

// ─── Inner layout ─────────────────────────────────────────────────────────────

interface InnerProps {
  isMobile: boolean;
  displayCategory: string;
  categories: Record<string, CategoryConfig>;
  categoryKeys: string[];
  headerLabel: string;
  HeaderIcon: React.ComponentType<{ className?: string }>;
  onClose: () => void;
  onDismiss: () => void; // animated close (mobile: slide down, desktop: onClose directly)
  onSwitch: (category: string) => void;
  renderContent: (category: string) => React.ReactNode;
}

const ModalInner = ({
  isMobile,
  displayCategory,
  categories,
  categoryKeys,
  headerLabel,
  HeaderIcon,
  onDismiss,
  onSwitch,
  renderContent,
}: InnerProps) => (
  <>
    <button
      onClick={onDismiss}
      className="absolute top-4.5 md:top-4 right-5 md:right-4 z-10 w-7 h-7 flex items-center justify-center rounded-lg hover:text-foreground transition-colors"
    >
      <X className="w-3.5 h-3.5" />
    </button>

    {isMobile && (
      <div className="flex flex-col shrink-0 border-b border-black/25 dark:border-white/5 dark:bg-dark-surface pb-3">
        <div className="flex items-center gap-2 px-5 pb-3 pr-14">
          <HeaderIcon className="w-4 h-4" />
          <span className="text-[11px] font-semibold tracking-wider uppercase">
            {headerLabel}
          </span>
        </div>
        <div
          className="grid gap-2 px-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(categoryKeys.length, 3)}, 1fr)`,
          }}
        >
          {categoryKeys.map((cat) => {
            const Icon = categories[cat].icon;
            const isActive = displayCategory === cat;
            const displayName = categories[cat].mobileLabel ?? cat;
            return (
              <button
                key={cat}
                onClick={() => onSwitch(cat)}
                className={cn(
                  "h-9 flex items-center justify-center gap-1.5 px-2 rounded-full text-xs transition-all border min-w-0",
                  isActive
                    ? "border-foreground/50 text-foreground font-medium"
                    : "border-black/25 dark:border-white/5 text-foreground/65 hover:text-foreground",
                )}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{displayName}</span>
              </button>
            );
          })}
        </div>
      </div>
    )}

    {!isMobile && (
      <div className="w-48 shrink-0 dark:bg-dark-surface border-r border-black/25 dark:border-white/5 flex flex-col py-5 px-3 gap-0.5">
        <div className="flex items-center gap-2 px-3 pb-4">
          <HeaderIcon className="w-4 h-4" />
          <span className="text-[11px] font-semibold tracking-wider uppercase">
            {headerLabel}
          </span>
        </div>
        {categoryKeys.map((cat) => {
          const Icon = categories[cat].icon;
          const isActive = displayCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSwitch(cat)}
              className={cn(
                "h-9 flex items-center gap-2.5 px-3 rounded-lg text-[13px] transition-all text-left w-full shrink-0",
                isActive
                  ? "border border-foreground/30 text-foreground font-medium"
                  : "text-foreground/55 border border-transparent hover:text-foreground",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className=" leading-none">{cat}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    )}

    <div className="flex-1 overflow-y-auto px-5 md:px-8 md:py-6 relative bg-background dark:bg-dark-surface">
      {/* key here forces a real DOM remount so the CSS animation re-fires on category switch */}
      <div
        key={displayCategory}
        style={{ animation: "sheet-fade-in 0.14s ease both" }}
      >
        <div className="mb-4">
          <h2 className="text-2xl hidden md:block font-semibold mb-1.5">
            {displayCategory}
          </h2>
          <p className="text-sm hidden md:block text-muted-foreground leading-relaxed">
            {categories[displayCategory]?.description}
          </p>
        </div>
        {renderContent(displayCategory)}
      </div>
    </div>
  </>
);
