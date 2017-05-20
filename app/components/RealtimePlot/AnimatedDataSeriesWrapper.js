import React, { Component } from "react";
import PropTypes from "prop-types";
import {transitionDuration} from "./index";
import {select, easeSinInOut, interpolateNumber} from "d3";
import LineDataSeries from "./LineDataSeries";

class AnimatedDataSeriesWrapper extends Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    const {yScale, xScale} = this.props;
    const [domainXMin, domainXMax] = xScale.domain();
    const [domainYMin, domainYMax] = yScale.domain();
    this.state = {
      domainYMin,
      domainYMax,
      domainXMin,
      domainXMax
    };
  }

  componentWillReceiveProps (nextProps) {
    const [nextDomainXMin, nextDomainXMax] = nextProps.xScale.domain();
    const [domainXMin, domainXMax] = this.props.xScale.domain();
    const [nextDomainYMin, nextDomainYMax] = nextProps.yScale.domain();
    const [domainYMin, domainYMax] = this.props.yScale.domain();

    const domainYUnchanged = nextDomainYMin === domainYMin && nextDomainYMax === domainYMax;
    const domainXUnchanged = nextDomainXMin === domainXMin && nextDomainXMax === domainXMax;
    if (domainYUnchanged && domainXUnchanged) {
      return;
    }
    select(this).transition().tween('attr.domain'); // refactor, is this necessary to cancel previous transition?
    select(this).transition().duration(transitionDuration).ease(easeSinInOut).tween('attr.domain', () => {
      const minYInterpolator = interpolateNumber(this.state.domainYMin, nextDomainYMin);
      const maxYInterpolator = interpolateNumber(this.state.domainYMax, nextDomainYMax);
      const minXInterpolator = interpolateNumber(this.state.domainXMin, nextDomainXMin);
      const maxXInterpolator = interpolateNumber(this.state.domainXMax, nextDomainXMax);
      return (t) => {
        this.setState({
          domainYMin: minYInterpolator(t),
          domainYMax: maxYInterpolator(t),
          domainXMin: minXInterpolator(t),
          domainXMax: maxXInterpolator(t)
        });
      };
    })
  }

  render () {
    const {props} = this;
    const {xScale, yScale, styles} = props;
    const {domainYMin, domainYMax, domainXMin, domainXMax} = this.state;
    const newYScale = yScale.copy();
    const newXScale = xScale.copy();
    newYScale.domain([domainYMin, domainYMax]);
    newXScale.domain([domainXMin, domainXMax]);
    const newProps = Object.assign({}, props, {xScale: newXScale, yScale: newYScale});
    return (
      <LineDataSeries {...newProps} styles={styles}/>
    );
  }
}

export default AnimatedDataSeriesWrapper;
