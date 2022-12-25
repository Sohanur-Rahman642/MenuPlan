import data2 from "../data/2.json";
import data7 from "../data/7.json";
import data2627 from "../data/2627.json";
import data10780 from "../data/10780.json";
import data13116 from "../data/13116.json";
import data14842 from "../data/14842.json";
import data17172 from "../data/17172.json";
import data20566 from "../data/20566.json";
import data21632 from "../data/21632.json";
import data27366 from "../data/27366.json";
import data29127 from "../data/29127.json";
import data30024 from "../data/30024.json";
import data30332 from "../data/30332.json";
import data31870 from "../data/31870.json";
import data33550 from "../data/33550.json";
import data34407 from "../data/34407.json";
import data34429 from "../data/34429.json";
import data36495 from "../data/36495.json";
import data37327 from "../data/37327.json";
import data38639 from "../data/38639.json";

import * as Constants from "../constants/Constants";
import { getConvertedDateFromString } from "./dateUtils";

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const getUsageReport = (from, to) => {
  var data = [
    data2,
    data7,
    data2627,
    data10780,
    data13116,
    data14842,
    data17172,
    data20566,
    data20566,
    data21632,
    data27366,
    data29127,
    data30024,
    data30332,
    data31870,
    data33550,
    data34407,
    data34429,
    data36495,
    data37327,
    data38639,
  ];

  let convertedFrom = getConvertedDateFromString(from);
  let convertedTo = getConvertedDateFromString(to);

  const result = data.map((item) => {
    const countMap = new Map();
    let count = 1;
    const { profile, calendar } = item;
    const { dateToDayId, mealIdToDayId } = calendar;
    const mealMap = new Map(Object.entries(mealIdToDayId));

    let sum = 0;

    for (const key in mealIdToDayId) {
      const date = getKeyByValue(dateToDayId, mealMap.get(key));

      if (
        new Date(date) >= new Date(convertedFrom) &&
        new Date(date) <= new Date(convertedTo)
      ) {
        if (countMap.get(date)) {
          countMap.set(date, ++count);
        } else {
          countMap.set(date, 1);
        }
      }
    }

    countMap.forEach((val) => {
      sum = sum + val;
    });

    console.log("sum", sum);

    return {
      profile: profile,
      dayToMealCount: Object.fromEntries(countMap),
      status:
        sum >= 10
          ? Constants.SUPERACTIVE
          : sum >= 5
          ? Constants.ACTIVE
          : Constants.BORED,
    };
  });

  return result;
};

export default getUsageReport;
