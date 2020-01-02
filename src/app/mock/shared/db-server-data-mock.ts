import { DbServerData } from 'src/app/feature/shared/models/db-server-data';

export const dbServerDataMock: DbServerData[] = JSON.parse(
  localStorage.getItem("iapps-db-server-data")
) || {
    CompanyDBServer: [
      {
        DBServerID: 2,
        DBServerDomain: "192.168.37.33",
        DBServerType: "DB",
      },
      {
        DBServerID: 3,
        DBServerDomain: "192.168.64.31",
        DBServerType: "DB",
      },
      {
        DBServerID: 4,
        DBServerDomain: "192.168.37.31",
        DBServerType: "DB",
      },
      {
        DBServerID: 5,
        DBServerDomain: "192.168.37.41",
        DBServerType: "DB",
      },
      {
        DBServerID: 6,
        DBServerDomain: "192.168.37.51",
        DBServerType: "DB",
      }
    ],
    "#result-set-2": [
      {
        "Cnt": 1
      }
    ]
  };
