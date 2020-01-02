import { AccountRequest } from 'src/app/feature/shared/models/account-request';

export const accountRequestDetailsMock:AccountRequest[] = JSON.parse(
    localStorage.getItem("iapps-account-request")
  ) || {
    "Accounts": [
        {
          ID: 3,
          Name: "test 1",
          Company: "test company 1",
          Email: "test1@gmail.com",
          Message: "test message 1",
          PhoneNumber: "4545454"
        }
      ]
  }