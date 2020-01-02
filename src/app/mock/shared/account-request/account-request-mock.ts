import { AccountRequest } from 'src/app/feature/shared/models/account-request';

export const accountRequestMock:AccountRequest[] = JSON.parse(
    localStorage.getItem("iapps-account-request")
  ) || {
    "Requests": [
        {
          "ID": 1,
          "Name": "test 111",
          "Company": "test com 111",
          "Email": "test1@g.com",
          "Message": "test mes111",
          "PhoneNumber": "45454",
          "RequestStatusID": 1,
          "StatusName": "NEW"
        },
        {
          "ID": 2,
          "Name": "Company 3",
          "Company": "Company 3",
          "Email": "company3@asd.com",
          "Message": "Hi, Sample request",
          "PhoneNumber": "1231232311",
          "RequestStatusID": 1,
          "StatusName": "NEW"
        },
        {
          "ID": 3,
          "Name": "string",
          "Company": "string",
          "Email": "string",
          "Message": "string",
          "PhoneNumber": "121212121",
          "RequestStatusID": 4,
          "StatusName": "PROCESSING"
        }
      ]
  }