import { RequestStatus } from 'src/app/feature/shared/models/request-status';

export const requestStatusMock: RequestStatus[] = JSON.parse(
  localStorage.getItem("iapps-request-status")
) || {
    "RequestStatus": [
      {
        "RequestStatusID": 2,
        "StatusName": "ACCEPTED"
      },
      {
        "RequestStatusID": 1,
        "StatusName": "NEW"
      },
      {
        "RequestStatusID": 4,
        "StatusName": "PROCESSING"
      },
      {
        "RequestStatusID": 3,
        "StatusName": "REJECTED"
      }
    ]
  }