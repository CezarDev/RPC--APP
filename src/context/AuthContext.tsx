import React, { createContext, useState} from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {

    const [signed, setSigned] = useState('teste value');

  return (
    <AuthContext.Provider value={{ signed}}>
      {children}
    </AuthContext.Provider>
  );
}