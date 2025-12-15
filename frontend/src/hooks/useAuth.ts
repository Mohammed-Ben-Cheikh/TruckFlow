import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/auth/authSlice";
import type { RootState } from "../stores/store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
  };
};
