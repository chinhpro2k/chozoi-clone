import React, {lazy} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

interface IHistory {
  action: 'PUSH' | 'POP'
  goBack: () => any
  push: (path: string, state?: { [key: string]: any }) => any
}

export const AppRouter: React.FC<any>=()=> {
  const setHistory = (instance: BrowserRouter | null) => {
    // @ts-ignore
    if (instance && instance['history']) {
      // @ts-ignore
      history = instance['history'];
    }
  }
  return (
    <BrowserRouter ref={instance => setHistory(instance)}>
      <Switch>
        {/*Default*/}
        <Redirect exact path={"/"} to={"/login"}/>
        {/*Login Page*/}

        {/*login Page*/}
        <Route path={"/login"} component={lazy(() => import("./modules/auth/index"))}/>

        {/*home user Page*/}
        <Route exact path={"/home-user"} component={lazy(() => import("./modules/home/index"))}/>
        <Route exact path={"/home-user/user"} component={lazy(() => import("./modules/user/index"))}/>
        <Route exact path={"/home-user/question"} component={lazy(() => import("./modules/questionUser/index"))}/>
        <Route exact path={"/home-user/question/plan"} component={lazy(() => import("./modules/planByUser/index"))}/>
        {/*home Admin Page*/}
        <Route exact path={"/home-admin"} component={lazy(() => import("./modules/homeAdmin/index"))}/>

        {/*404 notfound*/}
        <Route exact path={"/404.html"} component={lazy(() => import("./modules/404/index"))}/>
        {/*router customer*/}

      </Switch>
    </BrowserRouter>
  );
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let history: IHistory | null = null;