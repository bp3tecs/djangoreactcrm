import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { ADD_TEST_MODULE, DELETE_TEST_MODULE } from '../constants/Test_module'
import { GET_TEST_MODULE } from '../constants/Test_module'
import { service } from '../../service'
import { responseMessage } from '../actions/Test_module'
import { setTest_moduleData,   
   } from '../actions/Test_module'
export function* getTest_moduleList() {
  yield takeEvery(GET_TEST_MODULE, function* ({ payload }) {  
    let { url } = payload    
    try {
      let response = yield call(
        service.get,
       // `${url}?offset=${offset}`,
       url,
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      ) 
      
      console.log("get test_module"+response)           
      if(response.status === 200) {
        console.log('response.data'+response.data['data'])
        yield(put(setTest_moduleData({response: response.data }))) 

      }

    } catch(error) {
      console.log('error'+error)
    }
  })
}

export function* addTest_module() {  
  yield takeEvery(ADD_TEST_MODULE, function* ({ payload }) {
    console.log('aaaaaaaaaaaaaaa')
    try {
     // console.log("try")
      console.log("bbbb"+(
        service.post,
        '/api/test_module/',
        payload,
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      ))
      let response = yield call(
        service.post,
        '/api/test_module/',
        payload,
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )
      console.log("addtest_module response"+response)
      if(!response.data.error) {
        yield(put(responseMessage(true)))
       // yield(put(updateErrors([])))
      }
    } catch(error) {      
      let err = ''
      let error_json=''
      let error_status=''
      if(error.response.data.error) {
        for (let i in Object.values(error.response.data.errors)) {
          err = err + Object.values(error.response.data.errors)[0] + ', '
        }
        //att= Object.values(error.response.data.errors)
        console.log(error.response.data.errors)
        //console.log('error'+error.response.data.errors.get('test_module_errors'))
      }
      
      console.log('error'+JSON.stringify(error).toString())
      error_json =JSON.stringify(error).toString()
      error_status= error_json.status
      console.log('status'+error_status)
      yield(put(responseMessage(false)))
     // yield(put(updateErrors(error.response.data.errors)))
    }
  })
}
export function* deleteTest_module() {  
  yield takeEvery(DELETE_TEST_MODULE, function* ({ payload }) {    
    let { id, bool} = payload
    try {
      let response = yield call(
        service.delete,
        `/api/test_module/${id}/`,        
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )      
      if(!response.data.error) {        
        yield(put(refresh(bool)))
      }

    } catch(error) {

    }
  })
}
export default function* rootSaga() {
  yield all([
    fork(getTest_moduleList),
    fork(addTest_module),
    fork(deleteTest_module)
  ])
}
