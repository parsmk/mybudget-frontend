export const ROUTES = {
  HOME: "/",
  PORTAL: {
    DASHBOARD: "/portal/",
    SYNOPSIS: "/portal/synopsis",
    ACCOUNT: (id: string) => `/portal/${id}`,
  },
};
