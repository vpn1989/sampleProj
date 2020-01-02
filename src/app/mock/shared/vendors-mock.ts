import { Vendor } from "src/app/feature/shared/models/vendors";

export const vendorsMock: Vendor[] = JSON.parse(
  localStorage.getItem("iapps-vendors")
) || {
  Vendors: [
    {
      AppVendorID: 1,
      AppVendorCode: "GTL",
      AppVendorName: "Geojit",
      AppVendorSupportEmail: "gtl@geojit.com",
      AppVendorWebsite: "www.geojittechnologies.com",
      AppVendorAddress: "Kochi",
      IsDeleted: 0
    },
    {
      AppVendorID: 2,
      AppVendorCode: "Test",
      AppVendorName: "test vendor",
      AppVendorSupportEmail: "t@s.com",
      AppVendorWebsite: "test.com",
      AppVendorAddress: "test",
      IsDeleted: 1
    }
  ],
  PageMeta: [
    {
      Cnt: 2
    }
  ]
};
