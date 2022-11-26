import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { dispatch } = useAuth();

    const logout = () => {
        sessionStorage.removeItem('user');
        dispatch({ type: 'logout' });
    }

    return { logout };
}