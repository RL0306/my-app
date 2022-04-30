import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {

  const authSessionKey = sessionStorage.getItem("auth");
  const data = JSON.parse(authSessionKey);
  const[user, setUser] = useState(data);


  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}