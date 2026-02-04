'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
    primary: string;
    secondary: string;
    scaffold: string;
    card: string;
    appBar: string;
}

interface ThemeContextType {
    themeMode: ThemeMode;
    isDarkMode: boolean;
    colors: ThemeColors;
    setThemeMode: (mode: ThemeMode) => void;
    setColor: (key: keyof ThemeColors, color: string) => void;
    resetColors: () => void;
}

const defaultDarkColors: ThemeColors = {
    primary: '#673AB7',
    secondary: '#B81CB0', // From default in theme_customization_screen.dart
    scaffold: '#000000',
    card: '#1C1C1C',
    appBar: '#000000',
};

const defaultLightColors: ThemeColors = {
    primary: '#673AB7',
    secondary: '#00BCD4',
    scaffold: '#673AB7',
    card: '#673AB7',
    appBar: '#673AB7',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
    const [darkColors, setDarkColors] = useState<ThemeColors>(defaultDarkColors);
    const [lightColors, setLightColors] = useState<ThemeColors>(defaultLightColors);

    // Load from localStorage on mount
    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as ThemeMode;
        if (savedMode) setThemeModeState(savedMode);

        const loadColor = (key: string, parse: boolean = false) => {
            const val = localStorage.getItem(key);
            return val ? (parse ? parseInt(val).toString(16) : val) : null;
            // Flutter saves int, we simulate that or just save hex string for web simplicity
            // We will save Hex Strings for Web.
        };

        // Helper to load full palette
        const loadPalette = (prefix: 'dark' | 'light', defaults: ThemeColors) => {
            return {
                primary: localStorage.getItem(`${prefix}PrimaryColor`) || defaults.primary,
                secondary: localStorage.getItem(`${prefix}SecondaryColor`) || defaults.secondary,
                scaffold: localStorage.getItem(`${prefix}ScaffoldBackgroundColor`) || defaults.scaffold,
                card: localStorage.getItem(`${prefix}CardColor`) || defaults.card,
                appBar: localStorage.getItem(`${prefix}AppBarBackgroundColor`) || defaults.appBar,
            };
        };

        setDarkColors(loadPalette('dark', defaultDarkColors));
        setLightColors(loadPalette('light', defaultLightColors));

    }, []);

    const isDarkMode = themeMode === 'dark';
    const colors = isDarkMode ? darkColors : lightColors;

    // Apply CSS Variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', colors.primary);
        root.style.setProperty('--secondary-color', colors.secondary);
        root.style.setProperty('--background-color', colors.scaffold);
        root.style.setProperty('--card-background', colors.card);
        root.style.setProperty('--app-bar-bg', colors.appBar);

        // Derived colors
        root.style.setProperty('--text-color', isDarkMode ? '#FFFFFF' : '#000000');
    }, [colors, isDarkMode]);

    const setThemeMode = (mode: ThemeMode) => {
        setThemeModeState(mode);
        localStorage.setItem('themeMode', mode);
    };

    const setColor = (key: keyof ThemeColors, color: string) => {
        if (isDarkMode) {
            setDarkColors(prev => {
                const next = { ...prev, [key]: color };
                localStorage.setItem(`dark${capitalize(key)}Color` === 'darkScaffoldColor' ? 'darkScaffoldBackgroundColor' : `dark${capitalize(key)}${key === 'appBar' ? 'BackgroundColor' : 'Color'}`, color);
                // Correcting mapping to match Flutter keys approximately or just consistent web keys
                // Flutter keys: darkPrimaryColor, darkScaffoldBackgroundColor, darkCardColor, darkAppBarBackgroundColor, darkSecondaryColor
                let storageKey = `dark${capitalize(key)}Color`;
                if (key === 'scaffold') storageKey = 'darkScaffoldBackgroundColor';
                if (key === 'appBar') storageKey = 'darkAppBarBackgroundColor';
                localStorage.setItem(storageKey, color);
                return next;
            });
        } else {
            setLightColors(prev => {
                const next = { ...prev, [key]: color };
                let storageKey = `light${capitalize(key)}Color`;
                if (key === 'scaffold') storageKey = 'lightScaffoldBackgroundColor';
                if (key === 'appBar') storageKey = 'lightAppBarBackgroundColor';
                localStorage.setItem(storageKey, color);
                return next;
            });
        }
    };

    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const resetColors = () => {
        if (isDarkMode) {
            setDarkColors(defaultDarkColors);
            // Clear local storage for dark keys
            ['Primary', 'Secondary', 'Card'].forEach(k => localStorage.removeItem(`dark${k}Color`));
            localStorage.removeItem('darkScaffoldBackgroundColor');
            localStorage.removeItem('darkAppBarBackgroundColor');
        } else {
            setLightColors(defaultLightColors);
            // Clear local storage for light keys
            ['Primary', 'Secondary', 'Card'].forEach(k => localStorage.removeItem(`light${k}Color`));
            localStorage.removeItem('lightScaffoldBackgroundColor');
            localStorage.removeItem('lightAppBarBackgroundColor');
        }
    };

    return (
        <ThemeContext.Provider value={{ themeMode, isDarkMode, colors, setThemeMode, setColor, resetColors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
