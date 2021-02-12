export const setSignedInState = (signedIn) => ({
  type: 'SET_SIGNED_IN_STATE',
  signedIn,
});

export const updateUrl = (url) => ({ type: 'EDIT_NEW_URL', url });

export const addNewLink = (data = { url: '', name: '', enable: false }) => ({
  type: 'ADD_NEW_LINK',
  newLink: {
    id: new Date().valueOf(),
    ...data,
  },
});

export const editLinkName = (data) => ({
  type: 'EDIT_LINK_NAME',
  id: data.id,
  name: data.name,
});

export const editLinkUrl = (data) => ({
  type: 'EDIT_LINK_URL',
  id: data.id,
  url: data.url,
});

export const enableLink = (data) => ({
  type: 'ENABLE_LINK',
  id: data.id,
  enable: data.enable,
});

export const deleteLink = (data) => ({
  type: 'DELETE_LINK',
  id: data.id,
});

export const resetAllLink = () => ({
  type: 'RESET_ALL_LINK',
});

export const modifyUserDetails = (data) => data;

export const saveUserChanges = (data) => data;
