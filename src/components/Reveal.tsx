import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
} from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  y?: number;
  blur?: number;
  once?: boolean;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
};

/**
 * Scroll-entrance reveal with blur + translate.
 * Framer-style: elements start blurred & shifted down, snap into place.
 * Respects prefers-reduced-motion. GPU-friendly.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  y = 20,
  blur = 8,
  once = true,
  style,
  ariaHidden
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.03, rootMargin: "0px 0px -20px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className} style={style} aria-hidden={ariaHidden}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      className={className}
      aria-hidden={ariaHidden}
       /* 👈 FIXED: Added the prop here */
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : `blur(${blur}px)`,
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                    filter 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                    transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, filter, transform",
      }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
