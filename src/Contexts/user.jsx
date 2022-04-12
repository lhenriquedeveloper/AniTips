import { useState, createContext } from "react";

export const UserContext = createContext({});


function UserProvider({ children }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [userLogged, setUserLogged] = useState();


    return (
        <UserContext.Provider value={{ email, setEmail, password, setPassword, nickname, setNickname, userLogged, setUserLogged }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;
