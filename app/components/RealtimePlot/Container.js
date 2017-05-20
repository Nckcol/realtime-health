import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

/*import AnimatedAxisWrapper from "./AnimatedAxisWrapper";*/

import AnimatedDataSeriesWrapper from "./AnimatedDataSeriesWrapper";
import DataSeries from "./DataSeries";
/*import VerticalAxis from "./VerticalAxis";
import HorizontalAxis from "./HorizontalAxis";*/

/*const AnimatedVerticalAxis = AnimatedAxisWrapper()(VerticalAxis);
const AnimatedHorizontalAxis = AnimatedAxisWrapper()(HorizontalAxis);*/

/*function labelFn (value, index) {
  return value;
}*/

export function generateData (size) {
  const data = [];
  for (let index = 0; index < size; index++) {
    const value = Math.random() * 900 + 100;
    data.push({index, value});
  }
  return data;
}

class Container extends Component {
  static propTypes = {
    trbl: PropTypes.array.isRequired,
    view: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      domainXMin: 100,
      domainXMax: 500,
      domainYMin: 0,
      domainYMax: 100,
      data: generateData(50)
    };

    setInterval(this.streamDataStep.bind(this), 240)
  }

  addData (value) {
    const data = this.state.data.slice(0);
    const index = data[data.length - 1].index + 1;
    data.push({index, value});
    data.shift();
    this.setState({data});
  }

  streamDataStep () {
    const value = Math.random() * 140 - 70;
    this.addData(value);
  }

  buildVerticalAxis (containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
    const view = [verticalAxisWidth, containerView[1] - horizontalAxisHeight * 2];
    const trbl = [horizontalAxisHeight, 0, 0, 0];
    const orientation = VerticalAxis.orientation.LEFT;
    const tickValues = scale.ticks();
    return (
      <AnimatedVerticalAxis {...{scale, trbl, view, tickValues, orientation, labelFn}} />
    );
  }

  buildScale (domainMin, domainMax, range) {
    return d3.scaleLinear().domain([domainMin, domainMax]).range(range);
  }

  /*buildHorizontalAxis (containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
    const view = [containerView[0] - verticalAxisWidth * 2, horizontalAxisHeight];
    const trbl = [containerView[1] - horizontalAxisHeight, verticalAxisWidth, 0, verticalAxisWidth];
    const orientation = HorizontalAxis.orientation.BOTTOM;
    const tickValues = scale.ticks();
    return (
      <AnimatedHorizontalAxis {...{scale, trbl, view, tickValues, orientation, labelFn}} />
    );
  }*/

  render () {
    const {view, trbl, styles} = this.props;
    const {data} = this.state;
    const [domainYMin, domainYMax] = d3.extent(data, ({value}) => value);
    const [domainXMin, domainXMax] = d3.extent(data, ({index}) => index);

    const horizontalAxisHeight = 0;
    const verticalAxisWidth = 0;
    const marginSide = ((view[0] - verticalAxisWidth * 2) / data.length);
    const xScale = this.buildScale(
      domainXMin + 2,
      domainXMax - 2,
      [0 - marginSide, view[0] - verticalAxisWidth * 2 + marginSide]
    );
    const yScale = this.buildScale(
      domainYMin,
      domainYMax,
      [view[1] - horizontalAxisHeight * 2, 0]
    );

    return (
      <g>
        {/*{this.buildHorizontalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale)}*/}
        {/*{this.buildVerticalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, yScale)}*/}
        <DataSeries
          data={data}
          containerView={view}
          containerTrbl={trbl}
          horizontalAxisHeight={horizontalAxisHeight}
          verticalAxisWidth={verticalAxisWidth}
          xScale={xScale}
          yScale={yScale}
          styles={styles}
        />
      </g>
    );
  }
}

export default Container;
