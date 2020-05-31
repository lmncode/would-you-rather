export const SET_QUESTION_ID = "GET_QUESTION_ID";

export function setQuestionId(id) {
  return {
    type: SET_QUESTION_ID,
    id,
  };
}
