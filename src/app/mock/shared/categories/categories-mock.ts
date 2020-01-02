import { Category } from "src/app/feature/shared/models/category";

export const categoriesMock: Category[] = JSON.parse(
  localStorage.getItem("iapps-category")
) || {
    Categories: [
      {
        CategoryID: 7,
        CategoryCode: "CAT_DSPT",
        CategoryName: "Dispatch",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 1,
        CategoryCode: "CAT_GDS_INB",
        CategoryName: "Goods Inbound",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 8,
        CategoryCode: "CAT_KPI",
        CategoryName: "KPI",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 4,
        CategoryCode: "CAT_MANUF",
        CategoryName: "Manufacturing",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 2,
        CategoryCode: "CAT_MAT_STOR",
        CategoryName: "Material Storage",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 6,
        CategoryCode: "CAT_PACK",
        CategoryName: "Packing",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 3,
        CategoryCode: "CAT_PROD_PREP",
        CategoryName: "Production Preparation",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 5,
        CategoryCode: "CAT_QLTY",
        CategoryName: "Quality",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 10,
        CategoryCode: "CAT_SHE",
        CategoryName: "SHE",
        CategoryImgURL: "NA",
        IsDeleted: 0
      },
      {
        CategoryID: 10,
        CategoryCode: "CAT_DEMO",
        CategoryName: "DEMO",
        CategoryImgURL: "NA",
        IsDeleted: 1
      }
    ],
    Industries: [
      {
        CategoryID: 1,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 2,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 5,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 3,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 4,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 6,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 7,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 8,
        IndustryID: 2,
        IndustryName: "Assembly"
      },
      {
        CategoryID: 10,
        IndustryID: 2,
        IndustryName: "Assembly"
      }
    ]
  };
