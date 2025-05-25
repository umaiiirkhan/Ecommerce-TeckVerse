import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeType = 'default' | 'gadgets' | 'watches' | 'phones' | 'laptops' | 'accessories';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themeColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  default: 'rgb(14, 165, 233)', // primary-500
  gadgets: 'rgb(59, 130, 246)', // gadgets-500
  watches: 'rgb(239, 68, 68)', // watches-500
  phones: 'rgb(139, 92, 246)', // phones-500
  laptops: 'rgb(16, 185, 129)', // laptops-500
  accessories: 'rgb(249, 115, 22)', // accessories-500
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('default');

  const themeColor = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};