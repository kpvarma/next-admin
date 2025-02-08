import React from "react";
import SingleMetric from "./SingleMetric";
import DualMetric from "./DualMetric";
import KeyMetric from "./KeyMetric";
import { TimeSeriesChart } from "./TimeSeriesChart";

import { Metric } from "@/utils/models/definitions";

const MetricWidget = ({ metric, data }: {metric: Metric, data: any}) => {
  switch (metric.visualisation) {
    case "single_metric":
      return <SingleMetric metric={metric} data={data} />;
    case "dual_metric":
      return <DualMetric metric={metric} data={data} />;
    case "key_metric":
      return <KeyMetric metric={metric} data={data} />;
    case "timeseries":
      return (
        <TimeSeriesChart data={data} metadata={metric} />
      )
    default:
      return <div>Unknown Metric Type {metric.visualisation}</div>;
  }
};

export default MetricWidget;