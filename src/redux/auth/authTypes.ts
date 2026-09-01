export type Role = "users" | "admin" | "student";

export const Roles = {
  USERS: "users" as const,
  ADMIN: "admin" as const,
  STUDENT: "student" as const,
};

export const ALL_ROLES: Role[] = [Roles.USERS, Roles.ADMIN, Roles.STUDENT];

export interface AuthUser {
  role?: Role;
  [key: string]: any;
}
