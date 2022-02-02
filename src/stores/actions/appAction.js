import { SET_USER, SET_LOGGED_IN, SET_SELECTED_SIDE_MENU_INDEX } from '../../constants/actionTypeEnum';

export const setUser = (data) => ({
  type: SET_USER,
  data,
});

export const setLoggedIn = (data) => ({
  type: SET_LOGGED_IN,
  data,
});

export const setSelectedSidebarIndex = (data) => ({
  type: SET_SELECTED_SIDE_MENU_INDEX,
  data,
});
