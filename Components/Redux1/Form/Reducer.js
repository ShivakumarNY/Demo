import {
  CREATE_LIST,
  DELETE_LIST,
  EDIT_ITEM,
  CREATE_IMAGE,
  CREATE_DATA,
} from './ActionType';

const intialState = {
  list: [],
  list2: [],
  list3: [],
};

const Reducer = (state = intialState, action) => {
  switch (action.type) {
    case CREATE_LIST: {
      let createdList = [...state.list, action.payload];
      return {...state, list: createdList};
    }

    case DELETE_LIST: {
      const data = [...state.list];
      data.splice(action.payload, 1);
      return {
        ...state,
        list: data,
      };
    }
    case EDIT_ITEM: {
      const data = state?.list?.length ? state.list : [];

      const getIndex = data?.findIndex(
        (item, index) =>
          item?.msg === action?.payload1?.msg &&
          item?.title === action?.payload1?.title,
      );

      data[getIndex] = action?.payload2;
      return {
        ...state,
        list: data,
      };
    }
    case 'CREATE_IMAGE': {
      return {
        ...state,
        list2: action.payload,
      };
    }
    case 'CREATE_DATA': {
      return {
        ...state,
        list3: action.payload,
      };
    }
    default:
      return state;
  }
};
export default Reducer;
