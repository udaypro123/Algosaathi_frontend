import { type AuthUser, type Role, Roles } from "../redux/auth/authTypes";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = (): AuthUser | null => {
  try {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    return JSON.parse(userJson) as AuthUser;
  } catch {
    return null;
  }
};

export const setAuthData = (token: string, user: AuthUser): void => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthData = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return Boolean(getToken());
};

export const getUserRole = (): Role | null => {
  const user = getUser();
  if (!user) return null;
  return (user.role as Role) ?? Roles.USERS;
};

export const hasRole = (requiredRoles: Role | Role[]): boolean => {
  if (!isAuthenticated()) return false;
  const userRole = getUserRole();
  if (!userRole) return false;
  const rolesArray = Array.isArray(requiredRoles)
    ? requiredRoles
    : [requiredRoles];

  return rolesArray.includes(userRole);
};
