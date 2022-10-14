import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/authentication";
import { onAuthStateChanged, User } from "firebase/auth";

const initialUser: any = null;

const AuthContext = createContext({
  user: initialUser,
  loading: true,
});

function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
