import { useEffect, useState } from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('item', 'dark')
        } else {
            root.classList.remove('dark');
            localStorage.setItem('them', 'light')
        }
    }, [isDark]);

    return{isDark, setIsDark};
}