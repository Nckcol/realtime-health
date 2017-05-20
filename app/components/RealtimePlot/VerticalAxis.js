import React, { Component } from "react";
import PropTypes from "prop-types";

import {transitionDuration} from "./index";

import {select, easeSinInOut, interpolateNumber} from "d3";

class VerticalAxis extends Component {
  static propTypes = {
    labelFn: PropTypes.func.isRequired,
    orientation: PropTypes.string.isRequired,
    scale: PropTypes.func.isRequired,
    view: PropTypes.array.isRequired
  };

  static orientation = {
    LEFT: 'horizontal-axis-left',
    RIGHT: 'horizontal-axis-right'
  };

  constructor (props) {
    super(props);
    const {scale} = this.props;
    const [domainMin, domainMax] = scale.domain();
    this.state = {
      domainMax,
      domainMin
    };
  }

  componentWillReceiveProps (nextProps) {
    const [nextDomainMin, nextDomainMax] = nextProps.scale.domain();
    const [domainMin, domainMax] = this.props.scale.domain();
    if (nextDomainMin === domainMin && nextDomainMax === domainMax) {
      return;
    }
    select(this).transition().tween('attr.domain'); // refactor, is this necessary to cancel previous transition?
    select(this).transition().duration(transitionDuration).ease(easeSinInOut).tween('attr.domain', () => {
      const minInterpolator = interpolateNumber(this.state.domainMin, nextDomainMin);
      const maxInterpolator = interpolateNumber(this.state.domainMax, nextDomainMax);
      return (t) => {
        this.setState({
          domainMin: minInterpolator(t),
          domainMax: maxInterpolator(t)
        });
      };
    });
  }

  buildTicks (tickValues, scale, labelFn, view, orientation) {
    const { styles } = this.props;

    return tickValues.map((tickValue, index) => {
      const yPos = scale(tickValue);
      let x2 = view[0];
      let x1 = x2 + 5;
      let anchorPosition = 'start';
      let textXPos = x1 + 10;

      if (orientation === VerticalAxis.orientation.RIGHT) {
        x1 = 0;
        x2 = 5;
        anchorPosition = 'end';
        textXPos = x2 - 2;
      }

      return (
        <g
          key={index}
          transform={`translate(0, ${yPos})`}
        >
          <line x1={x1} x2={x2} y1={0} y2={0} className={styles.tick}/>
          <text
            dy={3}
            textAnchor={anchorPosition}
            x={textXPos}
            y={0}
            className={styles.text}
          >{labelFn(tickValue, index)}</text>
        </g>
      );
    });
  }

  render () {
    const {scale, view, labelFn, orientation} = this.props;

    const {domainMin, domainMax} = this.state;
    //const tickValues = scale.ticks();
    const newScale = scale.copy();
    newScale.domain([domainMin, domainMax]);

    let x1 = view[0];
    if (orientation === VerticalAxis.orientation.RIGHT) {
      x1 = 0;
    }
    const x2 = x1;



    return (
      <g>
        {this.buildTicks(newScale.ticks(3), newScale, labelFn, view, orientation)}
      </g>
    );
  }
}

export default VerticalAxis;
