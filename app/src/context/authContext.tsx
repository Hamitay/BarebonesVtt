import React from "react";

const loginApi = async (username: string, password?: string) => {
  return { username };
};

type User = {
  username: string;
};

type AuthContextType = {
  user?: User;
  loading: boolean;
  error?: any;
  login: (username: string, password?: string) => Promise<void>;
  logout: () => void;
};

const getUserFromLocalStorage = () => {
  const rawUserObject = localStorage.getItem("user");

  return rawUserObject ? JSON.parse(rawUserObject) : undefined;
};

const saveUserToLocalStorage = (user: User) => {
  localStorage.setItem("user", "user");
};

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Undefined auth context!");
  }

  return context;
};

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const login = async (username: string, password?: string) => {
    setLoading(true);

    // Checks local storage first
    let user = getUserFromLocalStorage();

    if (!user) {
      user = await loginApi(username, password);
    }
    //saveUserToLocalStorage(user);
    setLoading(false);
    setUser(user);
  };

  const logout = () => {};

  const memoedValue = React.useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
