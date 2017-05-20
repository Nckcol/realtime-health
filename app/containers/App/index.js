import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from 'components/Header';
import Container from "components/Container/index";
import Home from 'routes/Home';
import Budget from 'routes/Budget';
import Reports from 'routes/Reports';

import styles from "./index.scss";

const App = () => (
  <main className={styles.page}>
    <div className={styles.head}>
      <Container>
        <Header />
      </Container>
    </div>
    <div className={styles.content}>
      <div className={styles.container}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/budget" component={Budget} />
          <Route path="/reports" component={Reports} />

          <Redirect to="/budget"/>
        </Switch>
      </div>
    </div>
  </main>
);

export default App;
