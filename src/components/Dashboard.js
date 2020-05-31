import React from "react";
import { connect } from "react-redux";
import Poll from "./Poll";

class Dashboard extends React.Component {
  state = {
    tabs: [
      { name: "Unanswered", isActive: true },
      { name: "Answered", isActive: false },
    ],
    activeTab: "Unanswered",
  };

  handleClick = (name) => {
    const updatedTabs = this.state.tabs.map((tab) => {
      tab.isActive = false;
      if (tab.name === name) {
        tab.isActive = true;
        this.setState({ activeTab: tab.name });
      }
      return tab;
    });

    this.setState({
      tabs: [...updatedTabs],
    });
  };

  render() {
    const { user, questions, questionIds } = this.props;

    const answeredQuestions = user
      ? Object.values(questions).filter((question) =>
          Object.keys(user.answers).includes(question.id)
        )
      : [];

    const answeredIds = user
      ? answeredQuestions
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((q) => q.id)
      : [];

    const unansweredIds = questionIds.filter(
      (qId) => !answeredIds.includes(qId)
    );

    const Ids =
      this.state.activeTab === "Unanswered" ? unansweredIds : answeredIds;

    return (
      <div className="mt-4">
        <ul className="nav nav-tabs d-flex justify-content-center">
          {this.state.tabs.map((tab) => (
            <li
              key={tab.name}
              className="nav-item"
              onClick={() => this.handleClick(tab.name)}
            >
              <button className={tab.isActive ? "nav-link active" : "nav-link"}>
                {tab.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="container d-flex flex-column align-items-center">
          {Ids.map((id) => {
            return <Poll key={id} id={id} />;
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    user: users[authedUser],
    questions,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Dashboard);
