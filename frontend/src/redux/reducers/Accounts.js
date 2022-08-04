import { GET_ACCOUNT,  SET_ACCOUNTS_DATA,ACCOUNT_ERRORS } from '../constants/Accounts'

const initialState = {
 // accounts: '',
  errors: [],
  accountsData: '',
}

const accounts = (state = initialState, action) => {  
  switch(action.type) {
    case SET_ACCOUNTS_DATA:
      console.log('hai')
      return {
        ...state,
        accountsData: action.payload.response,        
        isLoading: false,  
        
      }
    case ACCOUNT_ERRORS: {
      return {
        ...state,
        errors: action.payload
      }
    }
    default: 
      return state
  }
}

export default accounts