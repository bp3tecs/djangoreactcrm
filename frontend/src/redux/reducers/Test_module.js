import { GET_TEST_MODULE,  SET_TEST_MODULEDATA,TEST_MODULE_ERRORS,RESPONSE_MESSAGE,REFRESH} from '../constants/Test_module'

const initialState = {
  test_module: '',
  errors: '',
  test_moduleData: '',
}

const test_module = (state = initialState, action) => {  
  switch(action.type) {
    case SET_TEST_MODULEDATA:
      return {
        ...state,
        test_moduleData: action.payload.response,        
        isLoading: false,  
        
      }
    case RESPONSE_MESSAGE:
    return {
      ...state,
      responseMessage: action.payload
    } 
    
    case TEST_MODULE_ERRORS: {
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

export default test_module