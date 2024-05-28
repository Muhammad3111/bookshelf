// import React, { createContext, ReactNode, useContext, useState } from "react";
// import CryptoJS from "crypto-js";

// type AuthKeys = {
//   url: string;
//   body: object | string;
//   method: string;
// };

// type GenerateSignResult = {
//   key: string;
//   sign: string;
// };

// type AuthContextProps = {
//   authKeys: AuthKeys | null;
//   setAuthKeys: React.Dispatch<React.SetStateAction<AuthKeys | null>>;
//   generateSign: () => GenerateSignResult | undefined; // generateSign funksiyasi GenerateSignResult yoki undefined qaytarsin
// };

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [authKeys, setAuthKeys] = useState<AuthKeys | null>(null);
//   const generateSign = () => {
//     if (!authKeys) return undefined;
//     const { userKey, secret } = localStorage; // Agar authKeys mavjud emas bo'lsa undefined qaytar
//     const stringToSign = `${authKeys.method}${authKeys.url}${authKeys.body}${secret}`;
//     const sign = CryptoJS.MD5(stringToSign).toString();
//     return { key: userKey, sign };
//   };

//   return (
//     <AuthContext.Provider value={{ authKeys, setAuthKeys, generateSign }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
