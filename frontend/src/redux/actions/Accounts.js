import { GET_ACCOUNT,SET_ACCOUNTS_DATA ,ACCOUNT_ERRORS} from '../constants/Accounts'


export const getAccount = (url) => {
  return {
    type: GET_ACCOUNT,
    payload: {url
    }
  }
}

export const setAccountsData = (data) => {
  return {
    type: SET_ACCOUNTS_DATA,
    payload: data
  }
}

export const contactErrors = (error) => {
  return {
    type: ACCOUNT_ERRORS,
    payload: {
      error
    }
  }
}
