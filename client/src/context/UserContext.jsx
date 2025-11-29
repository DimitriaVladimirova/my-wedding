import { createContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

export const UserContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  user: null,
  registerHandler() {},
  loginHandler() {},
  logoutHandler() {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const { request } = useRequest();

  useEffect(() => {
    const storedUser = localStorage.getItem("auth");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("auth");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth");
    }
  }, [user]);

  const registerHandler = async (email, password) => {
    const newUser = { email, password };

    const result = await request("/users/register", "POST", newUser);

    setUser(result);
  };

  const loginHandler = async (email, password) => {
    const result = await request("/users/login", "POST", { email, password });
    setUser(result);
  };

  const logoutHandler = () => {
    if (!user?.accessToken) {
      setUser(null);
      return Promise.resolve();
    }

    return request("/users/logout", "GET", null, {
      accessToken: user.accessToken,
    }).finally(() => setUser(null));
  };

  const isAdmin = user?.email === "admin@abv.bg";

  const value = {
    user,
    isAuthenticated: !!user?.accessToken,
    isAdmin,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
