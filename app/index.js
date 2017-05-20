import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from 'containers/App';
import store from 'store';

import "./main.scss";

import webstomp from "webstomp-client";

/*
let ws = new WebSocket(prompt("Web Socket address", "ws://localhost:8080/ws-api"));
let client = webstomp.over(ws);

client.connect({}, (frame) => {

  client.subscribe("/app/connect", function(frame) {
    console.log(frame);
    //store.dispatch(AppActions.messageReceive(frame.body));
  });

  client.subscribe("/queue/cardiogram", function(frame) {
    console.log(frame);
    //store.dispatch(AppActions.messageReceive(frame.body));
  });

  client.send("/app/chat", JSON.stringify({'name':"HUY!"}));

}, (error) => {
  console.log(error);
});
*/

const root = document.getElementById('root');
const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AppContainer>
          <Component />
        </AppContainer>
      </Router>
    </Provider>,
    root
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/App', () => renderApp(App));
}
