import React from "react";
import AnimatedDataSeriesWrapper from "./AnimatedDataSeriesWrapper";

const DataSeries = ({data, containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale, styles}) => {
  const trbl = [
    horizontalAxisHeight,
    verticalAxisWidth,
    horizontalAxisHeight,
    verticalAxisWidth
  ];
  const view = [
    containerView[0] - verticalAxisWidth * 2,
    containerView[1] - horizontalAxisHeight * 2
  ];
  return (
    <AnimatedDataSeriesWrapper
      data={data}
      view={view}
      xScale={xScale}
      yScale={yScale}
      styles={styles}
    />
  );
};

export default DataSeries;
