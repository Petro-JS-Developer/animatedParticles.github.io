import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getUser } from "../API/api";

/* Actions */
const SET_ALL_USER = 'SET_ALL_USER';
const SET_NUMBER_PAGE = 'SET_NUMBER_PAGE';
const ADD_USER = 'ADD_USER';
const DELETE_USERS = 'DELETE_USERS';
const EDIT_USER = 'EDIT_USER';
const IS_EDIT_CELL = 'IS_EDIT_CELL';

/* Action Creator */
const addUser = (user) => ({type: ADD_USER, user});
const deleteUsers = (id) => ({type: DELETE_USERS, id});
export const editUserAction = (user) => ({type: EDIT_USER, user});
const setAllUserInState = (allUsers) => ({type:SET_ALL_USER, allUsers});
const setNumberPage = (page) => ({type:SET_NUMBER_PAGE, page});
export const isEditCell = (bool) => ({type:IS_EDIT_CELL, bool});

/* Selector in store */
export const allUsers = (store) => store.allUsers;
export const visibleUsers = (store) => store.visibleUsers;
export const numPage = (store) => store.page;
export const allPages = (store) => store.allPages;
export const fromUser = (store) => store.fromUser;
export const toUser = (store) => store.toUser;
export const boolValCell = (store) => store.isEditCell;

/* Thunk */
export const getUsersFromServer = async (id) => {
  await getUser(id)
  .then(arrUser => store.dispatch(setAllUserInState(arrUser)));
}

export const setNumPage = (numPage) => {
  store.dispatch(setNumberPage(numPage));
}

export const addUserToState = (user={}) => {
  store.dispatch(addUser(user));
}

export const deleteUserFromState = (id='') => {
  store.dispatch(deleteUsers(id));
}

const initialState = {
  allUsers: [],
  visibleUsers: 5,
  page: 1,
  fromUser: 1,
  toUser: 5,
  allPages: 1,
  isEditCell: true,
};

/* Reducer */
const reducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_ALL_USER:
      return {...state, allUsers: action.allUsers, allPages: action.allUsers.length};

    case SET_NUMBER_PAGE:
      return {...state, page: action.page, fromUser: action.page * state.visibleUsers - state.visibleUsers + 1, toUser: action.page * state.visibleUsers > state.allUsers ? state.allUsers : action.page * state.visibleUsers};

      case ADD_USER:
      return {...state, allUsers: [...state.allUsers, action.user], allPages: state.allUsers.length};

      case DELETE_USERS:
      return {...state, allUsers: state.allUsers.filter(user => user.id !== action.id), allPages: state.allUsers.length};

      case EDIT_USER:
      return {...state, allUsers: state.allUsers.map(user => user.id === action.user.id ?
        {
          id: action.user.id,
          name: action.user.name,
          email: action.user.email,
          phone: action.user.phone,
          website: action.user.website,
        }
        : user)};

      case IS_EDIT_CELL:
      return {...state, isEditCell: action.bool};

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
  );