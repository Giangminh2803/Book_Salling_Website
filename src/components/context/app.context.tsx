import { fetchAccountAPI } from "@/services/api/auth/auth.api";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  user: IUser | null;
  isAppLoading: boolean;
  setIsAppLoading: (v: boolean) => void;
  carts: ICart[];
  setCarts: (v: ICart[]) => void
}
const CurrentAppContext = createContext<IAppContext | null>(null);

interface IProps {
  children: React.ReactNode;
}

export const AppProvider = (props: IProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [carts,setCarts] = useState<ICart[]>([])
  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      const carts = localStorage.getItem("carts")
      if (res.data?.user) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        if(carts){
          setCarts(JSON.parse(carts))
        }
      }
      setIsAppLoading(false);
    };
    fetchAccount();
  }, []);

  return (
    <>
      {isAppLoading === false ? (
        <CurrentAppContext.Provider
          value={{
            isAuthenticated,
            user,
            setIsAuthenticated,
            setUser,
            isAppLoading,
            setIsAppLoading,
            carts, setCarts
          }}
        >
          {props.children}
        </CurrentAppContext.Provider>
      ) : (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ClockLoader size={80} color="#0088ff" />
        </div>
      )}
    </>
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
