import React, { createContext, useMemo, useState } from "react";

interface IAppContext {
    totalIncome: number,
    setTotalIncome: React.Dispatch<React.SetStateAction<IAppContext['totalIncome']>>,
    leftOver: number,
    setLeftOver: React.Dispatch<React.SetStateAction<IAppContext['leftOver']>>,
    isDarkMode: boolean,
    setIsDarkMode: React.Dispatch<React.SetStateAction<IAppContext['isDarkMode']>>,
}

export const AppContext = createContext<IAppContext>({
    totalIncome: 0,
    setTotalIncome: (value: React.SetStateAction<number>) => { },
    leftOver: 0,
    setLeftOver: (value: React.SetStateAction<number>) => { },
    isDarkMode: false,
    setIsDarkMode: (value: React.SetStateAction<boolean>) => { }
});

export const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [totalIncome, setTotalIncome] = useState<IAppContext['totalIncome']>(0);
    const [leftOver, setLeftOver] = useState<IAppContext['leftOver']>(0);
    const [isDarkMode, setIsDarkMode] = useState<IAppContext['isDarkMode']>(false);

    const value = useMemo(() => ({
        totalIncome,
        setTotalIncome,
        leftOver,
        setLeftOver,
        isDarkMode,
        setIsDarkMode,
    }), [totalIncome, leftOver, isDarkMode]);

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}