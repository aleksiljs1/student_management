// config/routes.ts
export const ROUTE_PERMISSIONS = {
  DELETE: [
    { path: "/api/data/students/delete", roles: ["ADMIN", "SUPERADMIN"] },
    { path: "/api/data/faculties/delete", roles: ["ADMIN", "SUPERADMIN"] },
    { path: "/api/data/classes/delete", roles: ["ADMIN", "SUPERADMIN"] },
  ],
  ADMIN_WRITE_METHODS: ["POST", "PUT", "DELETE", "PATCH"],
  PUBLIC_ROUTES: ["/api/auth/login"]
};

export const AUTH_ERRORS = {
  INVALID_TOKEN: { error: "Invalid token" },
  INSUFFICIENT_PERMISSIONS: { error: "Insufficient permissions" }
};
// this is the example i was given to see