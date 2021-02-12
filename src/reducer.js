export const signedInReducer = (state = { signedIn: false }, actions) => {
  switch (actions.type) {
    case 'SET_SIGNED_IN_STATE':
      return { ...state, signedIn: actions.signedIn };
    default:
      return state;
  }
};

export const newUrlReducer = (state = { url: '' }, actions) => {
  switch (actions.type) {
    case 'EDIT_NEW_URL':
      return { ...state, url: actions.url };
    default:
      return state;
  }
};

export const saveChangeReducer = (state = { saveState: false }, actions) => {
  switch (actions.type) {
    case 'SAVE_CHANGE_STATE':
      return { ...state, saveState: actions.saveState };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = {
    username: '',
    password: '',
    repeatPassword: '',
    login: false,
    id: '',
  },
  actions
) => {
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
      };
    default:
      return state;
  }
};

export const newLinkReducer = (state = { links: [] }, actions) => {
  switch (actions.type) {
    case 'ADD_NEW_LINK':
      return { ...state, links: [...state.links, actions.newLink] };
    case 'RESET_ALL_LINK':
      return { ...state, link: [] };
    case 'EDIT_LINK_NAME':
      return {
        ...state,
        links: state.links.map((eachLink) => {
          if (eachLink.id === actions.id) {
            return { ...eachLink, name: actions.name };
          }
          return eachLink;
        }),
      };
    case 'EDIT_LINK_URL':
      return {
        ...state,
        links: state.links.map((eachLink) => {
          if (eachLink.id === actions.id) {
            return { ...eachLink, url: actions.url };
          }
          return eachLink;
        }),
      };
    case 'ENABLE_LINK':
      return {
        ...state,
        links: state.links.map((eachLink) => {
          if (eachLink.id === actions.id) {
            return { ...eachLink, enable: actions.enable };
          }
          return eachLink;
        }),
      };
    case 'DELETE_LINK':
      return {
        ...state,
        links: state.links.filter((eachLink) => eachLink.id !== actions.id),
      };
    default:
      return state;
  }
};
