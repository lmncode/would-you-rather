import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import Nav from "./Nav";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import Dashboard from "./Dashboard";
import PollPage from "./PollPage";
import LeaderBoard from "./LeaderBoard";
import ErrorPage from "./ErrorPage";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <Nav authedUser={this.props.authedUser} />
          <div className="container d-flex justify-content-center align-items-center">
            <Switch>
              <Route exact path="/">
                {!this.props.authedUser ? (
                  <Redirect
                    from="/"
                    to={{
                      pathname: "/login",
                      state: { referrer: "/" },
                    }}
                  />
                ) : (
                  <Dashboard />
                )}
              </Route>
              <Route path="/add">
                {!this.props.authedUser ? (
                  <Redirect
                    from="add"
                    to={{
                      pathname: "/login",
                      state: { referrer: "/add" },
                    }}
                  />
                ) : (
                  <NewQuestion />
                )}
              </Route>
              <Route path="/login">
                <Login />
              </Route>

              <Route path="/leaderboard">
                {!this.props.authedUser ? (
                  <Redirect
                    from="leaderboard"
                    to={{
                      pathname: "/login",
                      state: { referrer: "/leaderboard" },
                    }}
                  />
                ) : (
                  <LeaderBoard />
                )}
              </Route>

              <Route path="/question/:id">
                {!this.props.authedUser ? (
                  <Redirect
                    from="/question/:id"
                    to={{
                      pathname: "/login",
                      state: { referrer: "/question/:id" },
                    }}
                  />
                ) : (
                  <PollPage />
                )}
              </Route>
              <Route component={ErrorPage}></Route>
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
