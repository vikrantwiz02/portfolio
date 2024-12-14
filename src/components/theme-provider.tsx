import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Define your own props interface
interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string; // Optional attribute prop
    defaultTheme?: string; // Optional defaultTheme prop
    enableSystem?: boolean; // Optional enableSystem prop
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}