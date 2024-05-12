import { generateID } from "../src/utils/func";

export const systemMeans = [
  {
    meanName: "כלי תקשוב",
    typeOption: [
      { value: "פתל", valId: generateID() },
      { value: "עננון", valId: generateID() },
      { value: "112 רקש", valId: generateID() },
    ],
    amount: true,
    ict: true,
    arm: true,
    id: generateID(),
  },
  {
    meanName: "סלולר צבאי",
    typeOption: [],
    amount: true,
    ict: true,
    arm: false,
    id: generateID(),
  },
  {
    meanName: "כלי פיקוד",
    typeOption: [
      { value: "אמר מפקד פתן", valId: generateID() },
      { value: "נגמשי רפואה", valId: generateID() },
      { value: "נגמשי מפ אבטחה", valId: generateID() },
      { value: "נגמשי מכלול מבצעים", valId: generateID() },
    ],
    amount: true,
    ict: true,
    arm: true,
    id: generateID(),
  },
  {
    meanName: "ערכות שוב נידות",
    typeOption: [],
    amount: true,
    ict: true,
    arm: false,
    id: generateID(),
  },
  {
    meanName: "אטל 2000",
    typeOption: [],
    amount: false,
    ict: true,
    arm: false,
    id: generateID(),
  },
];
