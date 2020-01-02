import { SubscriptionRequest } from "src/app/feature/shared/models/subscription-request";

export const subscriptionRequestMock: SubscriptionRequest[] = JSON.parse(
    localStorage.getItem("iapps-pending-request")
  ) || {
    PendingRequests: [
        {
            SubscriptionRequestID: 46,
            Message: "I would like to apply for Quality Control",
            AppID: 3,
            AppName: "Quality Control",
            RequestStatusID: 1,
            StatusName: "NEW",
            UserID: 3,
            Name: "Vipin Nair",
            Email: "corporateadmin@company1.com",
            CompanyID: 1,
            CompanyName: "Company1",
            CompanyAddress: "India",
            CompanyWebsite: "company1.com"
        },
        {
            SubscriptionRequestID: 49,
            Message: "I would like to apply for SHE",
            AppID: 7,
            AppName: "SHE",
            RequestStatusID: 4,
            StatusName: "PROCESSING",
            UserID: 3,
            Name: "Vipin Nair",
            Email: "corporateadmin@company1.com",
            CompanyID: 1,
            CompanyName: "Company1",
            CompanyAddress: "India",
            CompanyWebsite: "company1.com"
        },
    ],
    RequestCount: [
        {Cnt: 2}
    ]
};