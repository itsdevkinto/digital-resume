import { createContext, useContext, useRef } from "react";
import { Reveal } from "@/components/Reveal";


type SequenceContextType = {
  next: (duration?: number) => number;
  reset: (to?: number) => void;
};

const SequenceContext = createContext<SequenceContextType | null>(null);

export const RevealSequence = ({
  children,
  step = 200,
}: {
  children: React.ReactNode;
  step?: number;
}) => {
  const cursor = useRef(0);

  const next = (duration?: number) => {
    const delay = cursor.current;
    cursor.current += duration ?? step;
    return delay;
  };

  // reset(0)   → start from 0ms (default)
  // reset(300) → start from 300ms, so first item after reset gets 300ms delay
  const reset = (to = 0) => {
    cursor.current = to;
  };

  return (
    <SequenceContext.Provider value={{ next, reset }}>
      {children}
    </SequenceContext.Provider>
  );
};

type SequencedRevealProps = Omit<
  React.ComponentProps<typeof Reveal>,
  "delay"
> & {
  duration?: number;
};

/**
 * Resets the sequence cursor to `delay` ms at this point in the tree.
 *
 * <SequenceReset />           → next item starts at 0ms
 * <SequenceReset delay={300}> → next item starts at 300ms
 */
export const SequenceReset = ({ delay = 0 }: { delay?: number }) => {
  const ctx = useContext(SequenceContext);
  ctx?.reset(delay);
  return null;
};

export const SequencedReveal = ({
  duration,
  ...props
}: SequencedRevealProps) => {
  const ctx = useContext(SequenceContext);

  if (!ctx) {
    console.warn("<SequencedReveal> must be used inside a <RevealSequence>.");
    return <Reveal delay={0} {...props} />;
  }

  const delay = ctx.next(duration);
  return <Reveal delay={delay} {...props} />;
};
