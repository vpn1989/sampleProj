import { Application } from "src/app/feature/shared/models/application";

export const applicationsMock: Application[] = JSON.parse(
  localStorage.getItem("iapps-application")
) || {
  "Applications":[
     {
        "AppID":1,
        "AppCategoryID":1,
        "AppCategoryName":"Goods Inbound",
        "AppCode":"po-calendars",
        "AppName":"Purchase Order Calendar",
        "AppDesc":"Purchase details",
        "AppVendorID":1,
        "AppURLSuffix":null,
        "IndustryID":null,
        "AppIcon32URL":"https://iapps.gtl.com/IndustryAppFe/assets/icons/dashboard_icon_purchase_calender.png",
        "BannerImageURL":"https://fssd.org/wp-content/uploads/2016/01/calendar-banner-960x250.jpg",
        "AvgRating":4.5,
        "RatingCount":125,
        "IsSubscribed":0,
        "IsPending":0
     },
     {
        "AppID":2,
        "AppCategoryID":1,
        "AppCategoryName":"Goods Inbound",
        "AppCode":"goods-recieving",
        "AppName":"Goods Receiving",
        "AppDesc":"Goods purchased details",
        "AppVendorID":1,
        "AppURLSuffix":null,
        "IndustryID":null,
        "AppIcon32URL":"https://iapps.gtl.com/IndustryAppFe/assets/icons/dashboard_icon_goods_receive.png",
        "BannerImageURL":"https://image.freepik.com/free-photo/close-up-woman-holding-box-with-service-delivery-holding-board_1150-8870.jpg",
        "AvgRating":4.5,
        "RatingCount":125,
        "IsSubscribed":0,
        "IsPending":0
     },
     {
        "AppID":3,
        "AppCategoryID":1,
        "AppCategoryName":"Goods Inbound",
        "AppCode":"quality-control",
        "AppName":"Quality Control",
        "AppDesc":"Quality Check",
        "AppVendorID":1,
        "AppURLSuffix":null,
        "IndustryID":null,
        "AppIcon32URL":"https://iapps.gtl.com/IndustryAppFe/assets/icons/dashboard_icon_qc.png",
        "BannerImageURL":"https://cdn.cleverism.com/wp-content/uploads/2015/09/419-shutterstock_335390924.jpg",
        "AvgRating":4.5,
        "RatingCount":125,
        "IsSubscribed":0,
        "IsPending":0
     },
     {
        "AppID":5,
        "AppCategoryID":1,
        "AppCategoryName":"Goods Inbound",
        "AppCode":"coa",
        "AppName":"COA",
        "AppDesc":"Certificate of Authority",
        "AppVendorID":1,
        "AppURLSuffix":null,
        "IndustryID":null,
        "AppIcon32URL":"https://iapps.gtl.com/IndustryAppFe/assets/icons/dashboard_icon_coa.png",
        "BannerImageURL":"http://brightopaints.com/wp-content/uploads/2017/01/certificate-banner.jpg",
        "AvgRating":4.5,
        "RatingCount":125,
        "IsSubscribed":0,
        "IsPending":0
     },
     {
        "AppID":7,
        "AppCategoryID":10,
        "AppCategoryName":"SHE",
        "AppCode":"APP_SHE",
        "AppName":"SHE",
        "AppDesc":"Safety, Health and Environment",
        "AppVendorID":1,
        "AppURLSuffix":null,
        "IndustryID":null,
        "AppIcon32URL":"https://iapps.fliplabs.net/IndustryAppFe/assets/icons/icon_product_master.png",
        "BannerImageURL":"https://images.pexels.com/photos/1329061/pexels-photo-1329061.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260=",
        "AvgRating":4.5,
        "RatingCount":125,
        "IsSubscribed":0,
        "IsPending":0
     }
  ],
  "Industries":[
     {
        "AppID":1,
        "IndustryID":2,
        "IndustryName":"Assembly"
     },
     {
        "AppID":1,
        "IndustryID":3,
        "IndustryName":"Packaging"
     },
     {
        "AppID":2,
        "IndustryID":2,
        "IndustryName":"Assembly"
     },
     {
        "AppID":3,
        "IndustryID":2,
        "IndustryName":"Assembly"
     },
     {
        "AppID":3,
        "IndustryID":3,
        "IndustryName":"Packaging"
     },
     {
        "AppID":5,
        "IndustryID":2,
        "IndustryName":"Assembly"
     },
     {
        "AppID":5,
        "IndustryID":3,
        "IndustryName":"Packaging"
     },
     {
        "AppID":7,
        "IndustryID":2,
        "IndustryName":"Assembly"
     }
  ],
  "PageMeta":[
     {
        "Cnt":5
     }
  ]
};
