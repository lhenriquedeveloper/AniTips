import { useState, createContext } from "react";

export const UserContext = createContext({});


function UserProvider({ children }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");


    return (
        <UserContext.Provider value={{ email, setEmail, password, setPassword, nickname, setNickname }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;
