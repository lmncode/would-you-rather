import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setQuestionId } from "../actions/questionId";

class Poll extends React.Component {
  handleGetQuestionId(id) {
    this.props.dispatch(setQuestionId(id));
  }
  render() {
    const { question, user } = this.props;
    if (question && user) {
      return (
        <div className="card mt-4" style={{ width: "400px" }}>
          <div className="card-header">{user.name} asks:</div>
          <div className="card-body d-flex justify-content-center align-items-center">
            <img
              className="card-img-top"
              src={user.avatarURL}
              alt={user.name}
            />
            <div className="ml-4 d-flex flex-column align-items-center">
              <h4 className="card-title">Would You Rather</h4>
              <p className="card-text">{question.optionOne.text}...</p>
              <Link to={`/question/${question.id}`}>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleGetQuestionId(question.id)}
                >
                  View Poll
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else return <div>Loading</div>;
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  const user = users[question.author];

  return {
    question,
    user,
  };
}

export default connect(mapStateToProps)(Poll);
