import { GET_CONTACT,  SET_CONTACTS_DATA,CONTACT_ERRORS,RESPONSE_MESSAGE,REFRESH} from '../constants/Contacts'

const initialState = {
  contacts: '',
  errors: '',
  contactsData: '',
}

const contacts = (state = initialState, action) => {  
  switch(action.type) {
    case SET_CONTACTS_DATA:
      return {
        ...state,
        contactsData: action.payload.response,        
        isLoading: false,  
        
      }
    case RESPONSE_MESSAGE:
    return {
      ...state,
      responseMessage: action.payload
    } 
    
    case CONTACT_ERRORS: {
      return {
        ...state,
        errors: action.payload
      }
    }
    case REFRESH:      
      return {
        ...state,
        refresh: action.payload
      }
    default: 
      return state
  }
}

export default contacts