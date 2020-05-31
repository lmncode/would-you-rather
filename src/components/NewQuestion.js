import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";

class NewQuestion extends React.Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "opt1") {
      this.setState({
        optionOneText: value,
      });
    } else if (name === "opt2") {
      this.setState({
        optionTwoText: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState({
      toHome: true,
    });
  };
  render() {
    const { toHome } = this.state;
    if (toHome) {
      return <Redirect to="/" />;
    }

    console.log(this.props);
    return (
      <div className="card mt-4">
        <div className="card-header d-flex flex-column align-items-center">
          <h3>Create New Question</h3>
        </div>
        <div className="card-body">
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={this.handleSubmit}
          >
            <h4 className="mb-3 text-center">Complete the question:</h4>
            <p>Would You Rather ...</p>
            <input type="text" name="opt1" onChange={this.handleChange} />
            <span> OR</span>
            <input type="text" name="opt2" onChange={this.handleChange} />
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={
                this.state.optionOneText === "" ||
                this.state.optionTwoText === ""
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
