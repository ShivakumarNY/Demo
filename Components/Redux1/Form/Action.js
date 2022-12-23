import {
  CREATE_LIST,
  DELETE_LIST,
  EDIT_ITEM,
  CREATE_IMAGE,
  CREATE_DATA,
} from './ActionType';

export const createList = data => {
  return {
    type: CREATE_LIST,
    payload: data,
  };
};
export const clearList = Index => ({
  type: DELETE_LIST,
  payload: Index,
});
export const editItem = (item1, item2) => {
  return {
    type: EDIT_ITEM,
    payload1: item1,
    payload2: item2,
  };
};
export const createImage = value => {
  return {
    type: 'CREATE_IMAGE',
    payload: value,
  };
};
export const createData = value => {
  return {
    type: CREATE_DATA,
    payload: value,
  };
};
