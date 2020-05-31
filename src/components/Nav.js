import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authedUser";

class Nav extends React.Component {
  handleClick = () => {
    this.props.dispatch(logout());
  };
  render() {
    return (
      <nav className="navbar navbar-expand-sm justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link mr-3"
              to="/"
              exact
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link mr-3"
              to="/leaderboard"
              activeClassName="active"
            >
              Leader Board
            </NavLink>
          </li>
          {this.props.authedUser ? (
            <Fragment>
              <li className="nav-item mr-4">
                <NavLink
                  className="nav-link mr-4"
                  to="/add"
                  activeClassName="active"
                >
                  New Question
                </NavLink>
              </li>
              <li className="nav-item ml-4 d-flex align-items-center">
                <h5 className="m-0 mr-3">{`Hello, ${this.props.user.name}`}</h5>{" "}
                <img
                  src={this.props.user.avatarURL}
                  alt={this.props.user.name}
                />
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link mr-3 ml-3"
                  to="/login"
                  activeClassName="active"
                  onClick={this.handleClick}
                >
                  Logout
                </NavLink>
              </li>
            </Fragment>
          ) : null}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];
  return {
    authedUser,
    user,
  };
}

export default connect(mapStateToProps)(Nav);
