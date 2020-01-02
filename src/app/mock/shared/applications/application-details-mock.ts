export const applicationDetailsMock = JSON.parse(
  localStorage.getItem("iapps-application-details")
) || {
  Application: [
    {
      AppID: 1,
      AppCategoryID: 1,
      AppCode: "po-calendars",
      AppName: "Purchase Order Calendar",
      AppSummary: "<p><strong>Purchase order calendar module tracks your purchase order from&nbsp; your ERP system and display it&nbsp; in a more meaningful manner</strong></p> <p>On selecting Purchase Order Calendar module from Goods Inbound menu, you can acess this application. The purchase orders posted in SAPB1 system will be synced to Industry App. The syncing is scheduled for a time interval. If the user wants to sync the purchase order without waiting, the force sync option also given to Sync the purchase order immediately. Person in charge of Goods receipt can view the purchase orders coming on a day and he can plan the day accordingly. The view designed in the form of a calendar. The user has option to filter the details period wise on clicking Daily/Weekly/Monthly tabs as mentioned. On selecting weekly, the data will be shown for 7 days. On selecting Monthly the data will be filtered for selected month. On clicking Daily, today&rsquo;s scheduled purchase order details will be displayed. The user has option to view any day&rsquo;s data by selecting the date on clicking Date Picker as shown below. The status of the purchase order will be shown in Status Bar. The purchase order has 4 status 1. Scheduled 2. Arrived 3. Unloading 4. GR Completed. The completion of status will be marked with tick mark. On keeping the mouse over to the tick or dot mark small popup will be shown as in below screen with time.</p>",
      AppDesc: "Purchase details",
      AppVendorID: 1,
      AppVendorName: "Geojit",
      AppVendorWebsite: "www.geojittechnologies.com",
      AppVendorAddress: "Kochi",
      Subscribed: 0,
      Pending: 0,
      Rating: 4.6,
      AppURLSuffix: null,
      Count: 123
    }
  ],
  Industries: [
    {
      AppID: 1,
      IndustryID: 2,
      IndustryName: "Assembly"
    },
    {
      AppID: 1,
      IndustryID: 3,
      IndustryName: "Packaging"
    }
  ],
  Language: [
    {
      LanguageID: 1,
      LanguageCode: "EN",
      LanguageName: "English"
    }
  ],
  Screens: [
    {
      AssetID: 1,
      AssetURL: "https://fssd.org/wp-content/uploads/2016/01/calendar-banner-960x250.jpg",
      AssetTypeID: 2,
      AssetType: "BannerImage"
    },
    {
      AssetID: 3,
      AssetURL: "https://iapps.gtl.com/IndustryAppFe/assets/icons/dashboard_icon_purchase_calender.png",
      AssetTypeID: 3,
      AssetType: "FavIcon32"
    },
    {
      AssetID: 22,
      AssetURL: "https://iapps.fliplabs.net/IndustryAppFe/assets/icons/dashboard_icon_purchase_calender.png",
      AssetTypeID: 4,
      AssetType: "FavIcon64"
    },
    {
      AssetID: 25,
      AssetURL: "http://company2.gtl.com/IndustryAppFe/assets/screens/screen-1.png",
      AssetTypeID: 1,
      AssetType: "Screenshot"
    },
    {
      AssetID: 26,
      AssetURL: "http://company2.gtl.com/IndustryAppFe/assets/screens/screen-2.png",
      AssetTypeID: 1,
      AssetType: "Screenshot"
    },
    {
      AssetID: 27,
      AssetURL: "http://company2.gtl.com/IndustryAppFe/assets/screens/screen-3.png",
      AssetTypeID: 1,
      AssetType: "Screenshot"
    },
    {
      AssetID: 28,
      AssetURL: "http://company2.gtl.com/IndustryAppFe/assets/screens/screen-4.png",
      AssetTypeID: 1,
      AssetType: "Screenshot"
    },
    {
      AssetID: 29,
      AssetURL: "http://company2.gtl.com/IndustryAppFe/assets/screens/screen-5.png",
      AssetTypeID: 1,
      AssetType: "Screenshot"
    }
  ]
};
