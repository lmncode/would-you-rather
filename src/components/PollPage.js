import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { handleAddAnswer } from "../actions/users";
import ErrorPage from "./ErrorPage";

class PollPage extends React.Component {
  state = {
    answer: "optionOne",
  };

  handleChange = (e) => {
    this.setState({
      answer: e.target.id,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.dispatch(
      handleAnswerQuestion({
        qid: this.props.question.id,
        authedUser: this.props.authedUser.id,
        answer: this.state.answer,
      })
    );
    this.props.dispatch(
      handleAddAnswer({
        qid: this.props.question.id,
        authedUser: this.props.authedUser.id,
        answer: this.state.answer,
      })
    );
  };

  render() {
    const { question, users, authedUser } = this.props;
    if (!authedUser) return <Redirect to="/" />;

    if (question) {
      const user = users[question.author];
      const votes =
        question.optionOne.votes.length + question.optionTwo.votes.length;
      const v1 = Math.floor((question.optionOne.votes.length * 100) / votes);
      const v2 = Math.floor((question.optionTwo.votes.length * 100) / votes);
      return (
        <div className="card mt-4" style={{ width: "400px" }}>
          <div className="card-header">{user.name} asks:</div>
          <div className="card-body d-flex justify-content-center align-items-center">
            <img
              className="card-img-top"
              src={user.avatarURL}
              alt={user.name}
            />
            <div className="ml-4">
              {Object.keys(authedUser.answers).includes(question.id) ? (
                <div>
                  <h4>Results</h4>

                  <div
                    className={
                      authedUser.answers[question.id] === "optionOne"
                        ? "option selected"
                        : "option"
                    }
                  >
                    <p>Would you rather {question.optionOne.text}</p>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={v1}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${v1}%` }}
                      >
                        {v1}%
                      </div>
                    </div>
                    <p>{`${question.optionOne.votes.length} out of ${votes} votes`}</p>
                  </div>

                  <hr />
                  <div
                    className={
                      authedUser.answers[question.id] === "optionTwo"
                        ? "option selected"
                        : "option"
                    }
                  >
                    <p>Would you rather {question.optionTwo.text}</p>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={v2}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: `${v2}%` }}
                      >
                        {v2}%
                      </div>
                    </div>
                    <p>{`${question.optionTwo.votes.length} out of ${votes} votes`}</p>
                  </div>
                </div>
              ) : (
                <form onChange={this.handleChange}>
                  <h4 className="card-title">Would You Rather</h4>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        id="optionOne"
                        name="optradio"
                        defaultChecked
                      />
                      {question.optionOne.text}
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" id="optionTwo" name="optradio" />
                      {question.optionTwo.text}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      );
    } else return <ErrorPage />;
  }
}

function mapStateToProps({ users, questions, authedUser, questionId }) {
  const question = questions[questionId];

  return {
    question,
    users,
    authedUser: users[authedUser],
  };
}

export default connect(mapStateToProps)(PollPage);
