import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { ADD_ACCOUNT } from '../constants/Accounts'
import { GET_ACCOUNT } from '../constants/Accounts'
import { service } from '../../service'
import { accountErrors } from '../actions/Accounts'
import { setAccountsData,   
   } from '../actions/Accounts'
export function* getAccountsList() {
  yield takeEvery(GET_ACCOUNT, function* ({ payload }) {  
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
      console.log('hhh')
      console.log(response)           
      if(response.status === 200) {
        console.log('response.data'+response.data['data'])
        yield(put(setAccountsData({response: response.data }))) 

      }

    } catch(error) {
      console.log('error'+error)
    }
  })
}
export function* addAccount() {
  yield takeEvery(ADD_ACCOUNT, function* ({ payload }) {    
    let { url, data } = payload    
    try {
      service.defaults.headers['Authorization'] = 'jwt '+window.localStorage.getItem('Token')
      let response = yield call(service.post, url, data)       
    }
    catch(err) {                      
      //yield(put(accountErrors(err.response)))
    }
  })
}
export default function* rootSaga() {
  yield all([
    fork(getAccountsList),
    fork(addAccount)
  ])
}
