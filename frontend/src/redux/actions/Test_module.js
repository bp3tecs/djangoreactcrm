import { GET_TEST_MODULE, ADD_TEST_MODULE, TEST_MODULE_ERRORS,SET_TEST_MODULEDATA,RESPONSE_MESSAGE,DELETE_TEST_MODULE,REFRESH,LOADING} from '../constants/Test_module'

export const getTest_module = (url) => {
  return {
    type: GET_TEST_MODULE,
    payload: {url
    }
  }
}

export const setTest_moduleData = (data) => {
  return {
    type: SET_TEST_MODULEDATA,
    payload: data
  }
}

export const addTest_module = ( data) => {  
  return {
    type: ADD_TEST_MODULE,
    payload:data
   
  }
}
export const loading = (bool) => {
  return {
    type: LOADING,
    payload: bool
  }
}
  

export const deleteTest_module= (id, bool) => {  
  return {
    type: DELETE_TEST_MODULE,
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

export const test_moduleErrors = (error) => {
  return {
    type: TEST_MODULE_ERRORS,
    payload: {
      error
    }
  }
}
