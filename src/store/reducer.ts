import * as actionTypes from './actionTypes';

export const signedInReducer = (
  state: ISignedInState = { signedIn: false },
  actions: ISignedInState,
): ISignedInState => {
  switch (actions.type) {
    case actionTypes.SET_SIGNED_IN:
      return { ...state, signedIn: actions.signedIn };
    default:
      return state;
  }
};

export const newUrlReducer = (
  state: INewLink = { url: '' },
  actions: INewLink,
): INewLink => {
  switch (actions.type) {
    case actionTypes.EDIT_NEW_URL:
      return { ...state, url: actions.url };
    default:
      return state;
  }
};

export const saveChangeReducer = (
  state: ISaveState = { saveState: false },
  actions: ISaveState,
): ISaveState => {
  switch (actions.type) {
    case actionTypes.SAVE_CHANGE_STATE:
      return { ...state, saveState: actions.saveState };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state: IUserDetails = {
    username: '',
    password: '',
    repeatPassword: '',
    login: false,
    id: '',
  },
  actions: IUserDetails,
): IUserDetails => {
  switch (actions.type) {
    case 'MODIFY_USERNAME':
      return { ...state, username: actions.username };
    case 'MODIFY_PASSWORD':
      return { ...state, password: actions.password };
    case 'MODIFY_REPEAT_PASSWORD':
      return { ...state, repeatPassword: actions.repeatPassword };
    case 'LOGIN_STATUS':
      return { ...state, login: actions.login, id: actions.id };
    case 'RESET_DETAILS':
      return {
        ...state,
        username: '',
        password: '',
        repeatPassword: '',
        login: false,
        id: '',
      };
    default:
      return state;
  }
};

export const newLinkReducer = (
  state: IAllLinks = { links: [] },
  actions: INewLink,
): IAllLinks => {
  switch (actions.type) {
    case actionTypes.ADD_NEW_LINK:
      return {
        ...state,
        links: [
          ...state.links,
          {
            id: actions.id,
            url: actions.url,
            name: actions.name,
            enable: actions.enable,
          },
        ],
      };
    case actionTypes.RESET_ALL_LINK:
      return { ...state, links: [] };
    case actionTypes.EDIT_LINK_NAME:
      return {
        ...state,
        links: state.links?.map((eachLink) => {
          if (eachLink.id === actions.id) {
            return { ...eachLink, name: actions.name };
          }
          return eachLink;
        }),
      };
    case actionTypes.EDIT_LINK_URL:
      return {
        ...state,
        links: state.links?.map((eachLink) => {
          if (eachLink.id === actions.id) {
            return { ...eachLink, url: actions.url };
          }
          return eachLink;
        }),
      };
    case actionTypes.ENABLE_LINK:
      return {
        ...state,
        links: state.links?.map((eachLink) => {
          if (eachLink.id === actions.id) {
            console.log(actions.id)
            return { ...eachLink, enable: actions.enable };
          }
          return eachLink;
        }),
      };
    case actionTypes.DELETE_LINK:
      return {
        ...state,
        links: state.links?.filter((eachLink) => eachLink.id !== actions.id),
      };
    default:
      return state;
  }
};
