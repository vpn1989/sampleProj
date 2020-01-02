import { Plan } from "src/app/feature/shared/models/plans";

export const plansMock: Plan[] = JSON.parse(
    localStorage.getItem("iapps-plans")
  ) || {
    Plans: [
      {
        PlanID: 1,
        PlanCode: "YR",
        PlanName: "Yearly",
        PlanDesc: "Yearly plan",
        DurationUnit: "Year(s)",
        Duration: 1
      },
      {
        PlanID: 2,
        PlanCode: "HLR",
        PlanName: "Half Yearly",
        PlanDesc: "This is a 6 months plan",
        DurationUnit: "Month(s)",
        Duration: 6
      },
      {
        PlanID: 3,
        PlanCode: "QTR",
        PlanName: "Quaterly",
        PlanDesc: "A three months plan",
        DurationUnit: "Month(s)",
        Duration: 3
      },
      {
        PlanID: 2,
        PlanCode: "HLR",
        PlanName: "Half Yearly",
        PlanDesc: "This is a 6 months plan",
        DurationUnit: "Month(s)",
        Duration: 6
      },
      {
        PlanID: 3,
        PlanCode: "QTR",
        PlanName: "Quaterly",
        PlanDesc: "A three months plan",
        DurationUnit: "Month(s)",
        Duration: 3
      },
      {
        PlanID: 2,
        PlanCode: "HLR",
        PlanName: "Half Yearly",
        PlanDesc: "This is a 6 months plan",
        DurationUnit: "Month(s)",
        Duration: 6
      },
      {
        PlanID: 3,
        PlanCode: "QTR",
        PlanName: "Quaterly",
        PlanDesc: "A three months plan",
        DurationUnit: "Month(s)",
        Duration: 3
      },
      {
        PlanID: 2,
        PlanCode: "HLR",
        PlanName: "Half Yearly",
        PlanDesc: "This is a 6 months plan",
        DurationUnit: "Month(s)",
        Duration: 6
      },
      {
        PlanID: 3,
        PlanCode: "QTR",
        PlanName: "Quaterly",
        PlanDesc: "A three months plan",
        DurationUnit: "Month(s)",
        Duration: 3
      },
      {
        PlanID: 2,
        PlanCode: "HLR",
        PlanName: "Half Yearly",
        PlanDesc: "This is a 6 months plan",
        DurationUnit: "Month(s)",
        Duration: 6
      },
      {
        PlanID: 3,
        PlanCode: "QTR",
        PlanName: "Quaterly",
        PlanDesc: "A three months plan",
        DurationUnit: "Month(s)",
        Duration: 3
      }
    ],
    PageMeta: [
      {
        Cnt: 12
      }
    ]
  };
