import { useContext } from "react";
import { DarkContext } from "@/context/dark-context";

export const useDark = () => {
  const ctx = useContext(DarkContext);
  if (!ctx) throw new Error("useDark must be used inside <DarkProvider>");
  return ctx;
};
