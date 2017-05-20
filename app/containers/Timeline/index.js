import React, { Component } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import Box from "components/Box/index";
import styles from "./index.scss";

const Timeline = () => (
  <div className={styles.timeline}>
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}>
      {["Hello", "my", "beautiful", "world!", "it's", "me!", "Or", "not", "me"].map(
        (item, key) => (
          <div key={key} className={styles.item}>
            <Box>
              <p>{item}</p>
            </Box>
          </div>
        )
      )}
    </Scrollbars>
  </div>
);

export default Timeline;
