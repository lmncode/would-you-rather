import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends React.Component {
  state = {
    user: "Select user",
  };

  handleChange = (e) => {
    this.setState({
      user: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(setAuthedUser(this.state.user));
    this.props.history.replace(this.props.location.state.referrer);
  };

  render() {
    return (
      <div className="card login">
        <div className="card-header d-flex flex-column align-items-center">
          <h1>Welcome to the "Would You Rather" App!</h1>
          <p>Please sign in to continue</p>
        </div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit}>
            <h2 className="mb-3 text-center">Sign in</h2>
            <select
              className="form-control mb-4 mt-4"
              id="sel1"
              value={this.state.user}
              onChange={this.handleChange}
            >
              <option>Select user</option>
              {Object.keys(this.props.users).map((userId) => (
                <option key={userId}>{this.props.users[userId].id}</option>
              ))}
            </select>

            <button
              type="submit"
              className="btn btn-primary form-control"
              disabled={this.state.user === "Select user"}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default withRouter(connect(mapStateToProps)(Login));
