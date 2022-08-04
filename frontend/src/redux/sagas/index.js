import { all } from 'redux-saga/effects'
import Fetch from './Fetch'
import Auth from './Auth';
import Leads from './Leads';
import Contacts from './Contacts'
import Users from './Users'
import Profiles from './Profiles'
import Accounts from './Accounts'
import Test_module from './Test_module'

export default function* rootSaga(getState) {
  yield all([
    Fetch(),
    Auth(),    
    Leads(),
    Contacts(),
    Users(),
    Profiles(),
    Accounts(),
    Test_module(),
  ]);
}

