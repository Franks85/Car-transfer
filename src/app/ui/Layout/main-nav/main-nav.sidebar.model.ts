export interface SideNavLink {
  title: string;
  url: string;
}

export const getSidenavLinks = (id: string): SideNavLink[] => {
  return [
    { title: 'Dashboard', url: `dashboard/user/${id}/main` },
    {
      title: `La tua auto`,
      url: `dashboard/user/${id}/car`
    },
    {
      title: `Area Geografica`,
      url: `dashboard/user/${id}/geo`
    },
    {
      title: `Organizza giornate`,
      url: `dashboard/user/${id}/day`
    },
    {
      title: `Fissa i tariffari`,
      url: `dashboard/user/${id}/rates`
    }
  ];
};
