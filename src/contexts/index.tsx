import { useContext } from "react";
import { UseAuth } from "../hooks/useAuth";
import { AuthContext } from "./auth.context";
import { ScreenContext } from "./screen.context";
import { UseScreen } from "../hooks/useScreen";

export const useAuth = () => useContext<UseAuth>(AuthContext);
export const useScreen = () => useContext<UseScreen>(ScreenContext)
