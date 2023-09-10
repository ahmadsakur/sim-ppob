import { selectIsAuthenticated, selectToken, selectUser } from "@/store/auth/selectors";
import { useSelector } from "react-redux";

function useAuth() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  return { isAuthenticated, user, token };
}

export default useAuth;
