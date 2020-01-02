import { Subscription } from "src/app/feature/shared/models/subscription";

export const subscriptionMock: Subscription[] = JSON.parse(
  localStorage.getItem("iapps-subscription")
) || {
  Subscriptions: [
    {
      SubscriptionID: 16,
      CompanyID: 1,
      PlanID: 1,
      AppName: "SHE",
      CompanyName: "FOEHL",
      SubscribedDate: "2019-09-04 07:33:09.240",
      Status: 1,
      CreatedOn: "2019-09-04 07:33:09.240",
      AppVersionID: "0.0"
    },
    {
      SubscriptionID: 17,
      CompanyID: 2,
      PlanID: 1,
      AppName: "Purchage Order Calender",
      CompanyName: "FOEHL",
      SubscribedDate: "2019-09-04 07:35:52.290",
      Status: 0,
      CreatedOn: "2019-09-04 07:35:52.290",
      AppVersionID: "0.5"
    }
  ],
  "result-set-2": [
    {
      Cnt: 2
    }
  ]
};
