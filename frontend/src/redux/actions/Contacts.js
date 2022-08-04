import { GET_CONTACT, ADD_CONTACT, CONTACT_ERRORS,SET_CONTACTS_DATA,RESPONSE_MESSAGE,DELETE_CONTACT,REFRESH} from '../constants/Contacts'

export const getContact = (url) => {
  return {
    type: GET_CONTACT,
    payload: {url
    }
  }
}

export const setContactsData = (data) => {
  return {
    type: SET_CONTACTS_DATA,
    payload: data
  }
}

export const addContact = ( data) => {  
  return {
    type: ADD_CONTACT,
    payload:data
   
  }
}
export const loading = (bool) => {
  return {
    type: LOADING,
    payload: bool
  }
}
  

export const deleteContact= (id, bool) => {  
  return {
    type: DELETE_CONTACT,
    payload: {
      id,
      bool
    }
  }
}
export const responseMessage = (msg) => {
  return {
    type: RESPONSE_MESSAGE,
    payload: msg
  }
}

export const refresh = (bool) => {
  return {
    type: REFRESH,
    payload: bool    
  }
}

export const contactErrors = (error) => {
  return {
    type: CONTACT_ERRORS,
    payload: {
      error
    }
  }
}
