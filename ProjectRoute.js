import React from "react";
import { Route, Switch } from "react-router";
import SignUP from "./SignUp";
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";
import ProjectHome from "./ProjectHome";


export default function ProjectRoute() {
 return (
    <div>
      <Switch>
        <Route exact path="/" component={SignUP} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/forgotpassword" component={Forgotpassword}/>
        <Route exact path="/projecthome" component={ProjectHome}/>
      </Switch>
    </div>
  );
}
