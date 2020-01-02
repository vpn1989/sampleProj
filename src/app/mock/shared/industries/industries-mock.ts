import { Industry } from "src/app/feature/shared/models/industry";

export const industriesMock: Industry[] = JSON.parse(
  localStorage.getItem("iapps-industries")
) || {
  Industries: [
    {
      IndustryID:2,
      IndustryCode:"INDS_ASMB",
      IndustryName:"Assembly",
      IndustryImgURL:"/dam/production-prepration.png-1574239488162",
      IndustrySortOrder:1,
      IsDeleted:0
   },
   {
      IndustryID:3,
      IndustryCode:"INDS_PACK",
      IndustryName:"Packaging",
      IndustryImgURL:"/dam/production-prepration.png-1573201481121",
      IndustrySortOrder:2,
      IsDeleted:0
   },
   {
      IndustryID:4,
      IndustryCode:"INDS_DEMO",
      IndustryName:"Demo",
      IndustryImgURL:"/dam/production-prepration.png-1573202011215",
      IndustrySortOrder:3,
      IsDeleted:1
   },
   {
      IndustryID:1010,
      IndustryCode:"INDS_PROD",
      IndustryName:"Production",
      IndustryImgURL:"",
      IndustrySortOrder:4,
      IsDeleted:1
   }
  ],
  "result-set-2": [
    {
      Cnt: 4
    }
  ]
};
