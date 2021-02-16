import * as actionTypes from './actionTypes';

export const setSignedInState = (signedIn: boolean): ISignedInState => ({
  type: actionTypes.SET_SIGNED_IN,
  signedIn,
});

export const updateUrl = (url: string): IUpdateUrl => ({
  type: actionTypes.EDIT_NEW_URL,
  url,
});

export const addNewLink = (
  data: INewLink = { url: '', name: '', enable: false },
): INewLink => ({
  type: actionTypes.ADD_NEW_LINK,
  id: new Date().valueOf(),
  ...data,
});

export const editLinkName = (data: INewLink): IEditLink => ({
  type: actionTypes.EDIT_LINK_NAME,
  id: data.id,
  name: data.name,
});

export const editLinkUrl = (data: INewLink): IEditLink => ({
  type: actionTypes.EDIT_LINK_URL,
  id: data.id,
  url: data.url,
});

export const enableLink = (data: INewLink): IEditLink => ({
  type: actionTypes.ENABLE_LINK,
  id: data.id,
  enable: data.enable,
});

export const deleteLink = (data: INewLink): IEditLink => ({
  type: actionTypes.DELETE_LINK,
  id: data.id,
});

export const resetAllLink = (): IType => ({
  type: actionTypes.RESET_ALL_LINK,
});

export const modifyUserDetails = (data: IUserDetails): IUserDetails => data;

export const saveUserChanges = (data: ISaveState): ISaveState => data;
