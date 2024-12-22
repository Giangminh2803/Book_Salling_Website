import React, { createContext, useContext, useState } from "react";

interface IAppContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (v: boolean) => void;
    setUser: (v: IUser) => void;
    user: IUser | null;
    isAppLoading: boolean;
    setIsAppLoading: (v: boolean) => void;
}
const CurrentAppContext = createContext<IAppContext | null>(null);

interface IProps {
    children: React.ReactNode
}

export const AppProvider = (props: IProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);


    return (
        <CurrentAppContext.Provider value={{
            isAuthenticated, user, setIsAuthenticated, setUser, isAppLoading, setIsAppLoading
        }}>
            {props.children}
        </CurrentAppContext.Provider>
    );
};

export const useCurrentApp = () => {
    const currentAppContext = useContext(CurrentAppContext);
  
    if (!currentAppContext) {
      throw new Error(
        "currentAppContext has to be used within <CurrentAppContext.Provider>"
      );
    }
  
    return currentAppContext;
  };