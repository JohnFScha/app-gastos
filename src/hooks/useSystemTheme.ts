import { useEffect, useState } from "react";

const useThemeDetector = () => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(getCurrentTheme());  
  
  const mqListener = (e: any) => {
      setIsDarkTheme(e.matches);
  };
  
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    
    darkThemeMq.addEventListener("load", mqListener);
    
    return () => darkThemeMq.removeEventListener("load", mqListener);
  }, []);

  return isDarkTheme;
}

export default useThemeDetector