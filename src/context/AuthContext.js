import {useContext,createContext} from "react";
export const AuthContext = createContext();

export default function useAuthContext(){
    return useContext(AuthContext)
}
