import React from 'react';
import style from './styles.scss';

const Loader = () => (
  <div className={style.loaderHolder}>
    <div className={style.loader}>
      <div className={style.bounce1}/>
      <div className={style.bounce2}/>
    </div>
  </div>
);

export default Loader;
