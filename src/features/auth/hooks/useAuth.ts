// useAuth.ts
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/home");
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/auth/login");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return { user, login, logout };
}