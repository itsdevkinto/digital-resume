import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type DarkContextType = {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const DarkContext = createContext<DarkContextType | null>(null);

export const DarkProvider = ({ children }: { children: React.ReactNode }) => {
  // Determine initial theme: inline script class -> localStorage -> system preference
  const getInitialTheme = (): boolean => {
    if (typeof window !== "undefined") {
      const cls = document.documentElement.className.trim();
      if (cls === "dark") return true;
      if (cls === "light") return false;
      const stored = localStorage.getItem("theme");
      if (stored === "dark") return true;
      if (stored === "light") return false;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      return prefersDark;
    }
    return false;
  };

  const [dark, setDark] = useState<boolean>(getInitialTheme());

  // Sync class on change
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [dark]);

  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      {children}
    </DarkContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDark = () => {
  const context = useContext(DarkContext);
  if (!context) {
    throw new Error("useDark must be used within a DarkProvider");
  }
  return context;
};
