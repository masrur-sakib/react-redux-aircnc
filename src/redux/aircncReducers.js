import { SAVE_SUBMITTED_INFO } from "./aicncActions";

const initialState = {
  bookingInfo: null,
};

const aircncReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SUBMITTED_INFO:
      return {
        bookingInfo: action.payload,
      };

    default:
      return state;
  }
};

export default aircncReducers;
