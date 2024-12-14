declare module 'next-themes' {
    export const ThemeProvider: any;
    export const useTheme: () => {
        theme: string;
        setTheme: (theme: string) => void;
        resolvedTheme: string;
    };
}