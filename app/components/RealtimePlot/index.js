import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import {scaleLinear, extent}  from "d3";

import styles from "./index.scss";
import DataSeries from "./DataSeries";
import VerticalAxis from "./VerticalAxis";
import AnimatedVerticalAxis from "./AnimatedAxisWrapper";

export const transitionDuration = 600;

function generateData (size) {
  const data = [];
  for (let index = 0; index < size; index++) {
    const value = Math.random() * 140 - 70;
    data.push({index, value});
  }
  return data;
}

function labelFn (value, index) {
  return value > 0 ? "+" + value : value;
}

class RealtimePlot extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,

      domainXMin: 100,
      domainXMax: 500,
      domainYMin: -100,
      domainYMax: 100,
      data: generateData(20)
    };
  }

  componentDidMount() {
    let width = this.svgContainer.clientWidth;
    let height = this.svgContainer.clientHeight;

    this.setState({ width, height });

    let { refreshRate } = this.props;

    if(!this.dataRateInterval) {
      this.dataRateInterval = setInterval(this.streamDataStep.bind(this), refreshRate);
    }
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


  buildScale (domainMin, domainMax, range) {
    return scaleLinear().domain([domainMin, domainMax]).range(range);
  }

  render () {
    const view = [this.state.width, this.state.height];
    //const view = [360, 120];
    const viewBox = `0 0 ${view[0]} ${view[1]}`;


    const {data} = this.state;
    const [domainYMin, domainYMax] = extent(data, ({value}) => value);
    const [domainXMin, domainXMax] = extent(data, ({index}) => index);

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
      [view[1] - horizontalAxisHeight * 2, 50]
    );

    const verticalAxisView = [verticalAxisWidth, view[1] - horizontalAxisHeight * 2];

    return (
      <svg
        className={styles.plot}
        viewBox={viewBox}
        ref={(el) => {this.svgContainer = el;}}
      >
        <g>
          {/*{this.buildHorizontalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale)}*/}
          {/*{this.buildVerticalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, yScale)}*/}
          <VerticalAxis scale={yScale} view={verticalAxisView} orientation={VerticalAxis.orientation.LEFT} labelFn={labelFn} styles={styles}/>
          <DataSeries
            data={data}
            containerView={view}
            horizontalAxisHeight={horizontalAxisHeight}
            verticalAxisWidth={verticalAxisWidth}
            xScale={xScale}
            yScale={yScale}
            styles={styles}
          />
        </g>
      </svg>
    );
  }
}


export default RealtimePlot;
