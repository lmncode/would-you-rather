export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWER = "ADD_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAnswer({ qid, authedUser, answer }) {
  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer,
  };
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addAnswer(info));
  };
}
