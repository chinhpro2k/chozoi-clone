import React, { Component } from 'react';
import "./App.css";
import {AppRouter} from "./AppRouter";
import {Suspense} from "react";
import NotifyComponent from "./common/notify/NotifyComponent";
import {store} from "./modules/auth/store";


class App extends Component<any, any> {
  static get getAppName(): string {
    return process.env['REACT_APP_NAME'] as string;
  }
  async componentDidMount() {
    if (localStorage.getItem('userId')){
      await store.getUser(localStorage.getItem('userId'))
    }
  }

  render() {
    return (
      <Suspense fallback={null}>
        <AppRouter/>
        <NotifyComponent/>
      </Suspense>
    );
  }
}

export default App;