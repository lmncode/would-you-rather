import React from "react";
import { connect } from "react-redux";
import User from "./User";

class LeaderBoard extends React.Component {
  render() {
    return (
      <div>
        {this.props.userIds.map((id) => (
          <User key={id} id={id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIds: Object.keys(users).sort((a, b) => {
      return (
        Object.keys(users[b].answers).length +
        Object.keys(users[b].questions).length -
        (Object.keys(users[a].answers).length +
          Object.keys(users[a].questions).length)
      );
    }),
  };
}

export default connect(mapStateToProps)(LeaderBoard);
