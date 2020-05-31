import React from "react";
import { connect } from "react-redux";

class User extends React.Component {
  render() {
    const { user } = this.props;

    const { name, answers, questions, avatarURL } = user;
    return (
      <div className="card mt-4" style={{ width: "400px" }}>
        <div className="card-header">{name}</div>
        <div className="card-body d-flex justify-content-center">
          <img className="card-img-top" src={avatarURL} alt={name} />
          <div className="ml-4">
            <p className="card-text">Answers : {Object.keys(answers).length}</p>
            <p className="card-text">
              Questions : {Object.keys(questions).length}
            </p>
            <h4>
              Score:{" "}
              {Object.keys(answers).length + Object.keys(questions).length}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  const user = users[id];
  return {
    user,
  };
}

export default connect(mapStateToProps)(User);
