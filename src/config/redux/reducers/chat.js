const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  data: {},
};

const chat = (state = initialState, action) => {
  switch (action.type) {
    case 'GETCHATS_PENDING':
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMsg: '',
      };
    case 'GETCHATS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: 'Data Rejected!',
      };
    case 'GETCHATS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
      };
    default:
      return state;
  }
};

export default chat;
