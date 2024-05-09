import React, { createContext, useMemo, useState } from "react";

interface IAppContext {
    totalIncome: number,
    setTotalIncome: React.Dispatch<React.SetStateAction<IAppContext['totalIncome']>>,
    leftOver: number,
    setLeftOver: React.Dispatch<React.SetStateAction<IAppContext['leftOver']>>,
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppContextProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [totalIncome, setTotalIncome] = useState<IAppContext['totalIncome']>(0);
    const [leftOver, setLeftOver] = useState<IAppContext['leftOver']>(0);

    const value = useMemo(() => ({
        totalIncome,
        setTotalIncome,
        leftOver,
        setLeftOver
    }), [totalIncome, leftOver]);

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
}