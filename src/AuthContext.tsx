import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { LoginResponse, User } from "./types";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (response: LoginResponse) => void;
    logout: () => void;
    getToken: () => string | null;
    getUser: () => User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const isRequiredAuth = (): boolean => {
      return (pathname.startsWith(`/login`) ||
              pathname.startsWith(`/send_reset_password_mail`) ||
              pathname.startsWith(`/reset_password`)) ? false : true

    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        } else {
          if (isRequiredAuth()) {
            navigate('/login');
          }
        }
    }, []);

    const login = (response: LoginResponse) => {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        setUser(response.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate('/login');
    };

    const getToken = () => token;

    const getUser = () => user;

    return (
      <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout, getToken, getUser }}>
        {children}
      </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
