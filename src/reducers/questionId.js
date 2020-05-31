import { SET_QUESTION_ID } from "../actions/questionId";

export default function questionId(state = null, action) {
  switch (action.type) {
    case SET_QUESTION_ID:
      return action.id;
    default:
      return state;
  }
}
