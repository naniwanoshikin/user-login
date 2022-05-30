import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LoginUserProvider";

// ログインユーザー情報
export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
