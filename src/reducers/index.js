import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import questionId from "./questionId";

export default combineReducers({
  authedUser,
  users,
  questions,
  questionId,
});
