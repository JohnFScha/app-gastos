import { useEffect } from "react";
import { useThemeStore } from "../store/store";

const useThemeDetector = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.change)

  const mqListener = (e: any) => {
    setTheme(e.matches);
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", mqListener);
  }, [theme]);

  return theme;
}

export default useThemeDetector