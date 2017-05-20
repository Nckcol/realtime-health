import React, { Component } from "react";
import Box from "components/Box/index";
import RealtimePlot from "components/RealtimePlot/index";

import styles from "./index.scss";

const Activities = () => (
  <div className={styles.activities}>
    <div className={styles.item}>
      <Box>
        <div className={styles.inner}>
          <RealtimePlot refreshRate={600}/>
          <h3 className={styles.title}>Heart</h3>
          <div className={styles.infoHolder}>
            <div className={styles.info}>
              <div className={styles.units}>bps</div>
              <div className={styles.number}>138</div>
            </div>
          </div>
        </div>
      </Box>
    </div>
    <div className={styles.item}>
      <Box>
        <div className={styles.inner}>
          <RealtimePlot refreshRate={2000}/>
          <h3 className={styles.title}>Temperature</h3>
          <div className={styles.infoHolder}>
            <div className={styles.info}>
              <div className={styles.units}>°C</div>
              <div className={styles.number}>36,8</div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  </div>
);

export default Activities;
