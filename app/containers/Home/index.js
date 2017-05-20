import React, { Component } from "react";
import PropTypes from "prop-types";
import Profile from "containers/Profile/index";
import Activities from "containers/Activities/index";
import Timeline from "containers/Timeline/index";


import styles from "./index.scss";

class Home extends Component {
  static propTypes = {
    hello: PropTypes.string
  };

  render() {
    return (
      <div className={styles.home}>
        <div className={styles.row}>
          <Profile />
        </div>
        <div className={styles.rowExpanded}>
          <div className={styles.activitiesHolder}>
            <Activities />
          </div>
          <div className={styles.timelineHolder}>
            <Timeline />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
