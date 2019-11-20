export const usersMock: [] = JSON.parse(
  localStorage.getItem("iapps-users")
) || {
  users: [
    {
      createdOn: "2019-08-09T17:32:22.377",
      updatedOn: "2019-08-09T17:32:22.377",
      userId: 1,
      email: "samuel@fohel.com",
      username: "Samuel",
      password: "password",
      enabled: 1,
      roles: [
        {
          createdOn: "2019-08-13T10:05:59.13",
          updatedOn: "2019-08-13T10:05:59.13",
          roleId: 2,
          roleName: "COMPANY_ADMIN",
          roleDescription: "Administrator of the company account"
        }
      ],
      authorities: [
        {
          authority: "COMPANY_ADMIN"
        }
      ],
      accountNonExpired: true,
      credentialsNonExpired: true,
      accountNonLocked: true,
      euser: "1"
    }
  ]
};
