export type Role = "users" | "admin";

export const Roles = {
  USERS: "users" as const,
  ADMIN: "admin" as const,
};

export const ALL_ROLES: Role[] = [Roles.USERS, Roles.ADMIN];

export interface AuthUser {
  role?: Role;
  [key: string]: any;
}
