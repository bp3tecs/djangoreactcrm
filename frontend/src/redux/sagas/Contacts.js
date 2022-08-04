import { all, takeEvery, put, fork, call } from 'redux-saga/effects'
import { ADD_CONTACT, DELETE_CONTACT } from '../constants/Contacts'
import { GET_CONTACT } from '../constants/Contacts'
import { service } from '../../service'
import { responseMessage } from '../actions/Contacts'
import { setContactsData,   
   } from '../actions/Contacts'
export function* getContactsList() {
  yield takeEvery(GET_CONTACT, function* ({ payload }) {  
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
      
      console.log("get contact"+response)           
      if(response.status === 200) {
        console.log('response.data'+response.data['data'])
        yield(put(setContactsData({response: response.data }))) 

      }

    } catch(error) {
      console.log('error'+error)
    }
  })
}

export function* addContact() {  
  yield takeEvery(ADD_CONTACT, function* ({ payload }) {
    console.log('aaaaaaaaaaaaaaa')
    try {
     // console.log("try")
      console.log("bbbb"+(
        service.post,
        '/api/contacts/',
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
        '/api/contacts/',
        payload,
        {
          headers: {
            'Authorization': `jwt ${localStorage.getItem('Token')}`,
            'org' : localStorage.getItem('company')
          }
        }
      )
      console.log("addcontact response"+response)
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
        //console.log('error'+error.response.data.errors.get('contact_errors'))
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
export function* deleteContact() {  
  yield takeEvery(DELETE_CONTACT, function* ({ payload }) {    
    let { id, bool} = payload
    try {
      let response = yield call(
        service.delete,
        `/api/contacts/${id}/`,        
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
    fork(getContactsList),
    fork(addContact),
    fork(deleteContact)
  ])
}
