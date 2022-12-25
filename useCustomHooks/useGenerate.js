import React, { useState } from "react";
import getUsageReport from "../helper/usageReportGenerator";
import * as Constants from "../constants/Constants";
import filterData from "../helper/filterData";

const useGenerate = (fromDate, toDate, status) => {
  const [result, setResult] = useState();

  const onGenerate = () => {
    if ((fromDate, toDate, status)) {
      const data = getUsageReport(fromDate, toDate);
      const filteredData = filterData(data, status);
      setResult(filteredData);
    }
  };

  return {
    result: result,
    onGenerate,
  };
};

export default useGenerate;
