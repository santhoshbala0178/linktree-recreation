export const setSignedIn = (signedIn) => {
  
}

export const setSignedInState = (signedIn) => {
  return {
    type: "SET_SIGNED_IN_STATE",
    signedIn: signedIn
  }
}

export const updateUrl = (url) => {
  return { type: "EDIT_NEW_URL", url: url };
};

export const addNewLink = (data={url:"", name:"", enable:false}) => {
  return {
    type: "ADD_NEW_LINK",
    newLink: {
      "id":new Date().valueOf(),
      ...data
    }
  }
}

export const editLinkName = (data) => {
  return {
    type: "EDIT_LINK_NAME",
    id: data.id,
    name: data.name
  }
}

export const editLinkUrl = (data) => {
  return {
    type: "EDIT_LINK_URL",
    id: data.id,
    url: data.url
  }
}

export const enableLink = (data) => {
  return {
    type: "ENABLE_LINK",
    id: data.id,
    enable: data.enable
  }
}

export const deleteLink = (data) => {
  return {
    type: "DELETE_LINK",
    id: data.id
  }
}

export const resetAllLink = () => {
  return {
    type: "RESET_ALL_LINK"
  }
}

export const modifyUserDetails = (data) => {
  return data
}

export const saveUserChanges = (data) => {
  return data
}