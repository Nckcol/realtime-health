import React, { Component } from "react";
import PropTypes from "prop-types";
import {curveBasis, area, line} from "d3";

class LineDataSeries extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    view: PropTypes.array.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired
  };

  render () {
    const {view, data, xScale, yScale, styles} = this.props;
    const [width, height] = view;
    const id = 'clip-path--' + Math.floor(+(new Date) + Math.random() * 0xffffff).toString(36);

    const plotArea = area()
      .x(({index}) => xScale(index))
      .y0(200)
      .y1(({value}) => yScale(value))
      .curve(curveBasis);

    const plotLine = line()
      .x(({index}) => xScale(index))
      .y(({value}) => yScale(value))
      .curve(curveBasis);

    return (
      <g>
        <defs>
          <clipPath id={id}>
            <rect width={width} height={height} />
          </clipPath>
        </defs>
        <g clipPath={`url(#${id})`}>
          <path d={plotArea(data)} className={styles.area}/>
          <path d={plotLine(data)} className={styles.line}/>
        </g>
      </g>
    );
  }
}

export default LineDataSeries;
