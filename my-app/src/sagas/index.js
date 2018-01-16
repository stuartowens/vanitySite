import { take, put, call, fork, select, all } from 'redux-saga/effects';
import { api, history } from '../services';
import * as actions from '../actions';
import { getAddresses } from '../reducers/selectors';

// each entity defines 3 creators { request, success, failure }
const { address } = actions;


/***************************** Subroutines ************************************/

// resuable fetch Subroutine
// entity :  address | ... | ...
// apiFn  : api.fetchAdresses | ...
// id     : name | ...
// url    : next page url. If not provided will use pass id to apiFn
function* fetchEntity(entity, apiFn, id, url) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, url || id);
  if (response) yield put(entity.success(id, response));
  else yield put(entity.failure(id, error));
}

// yeah! we can also bind Generators
export const fetchAddress = fetchEntity.bind(null, address, api.fetchAdresses);


// load address unless it is cached
function* loadAddress(name, requiredFields) {
  const address = yield select(getAddresses, name);
  if (!address || requiredFields.some(key => !address.hasOwnProperty(key)))
    yield call(fetchAddress, name);
}


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// trigger router navigation via history
function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(actions.NAVIGATE);
    yield history.push(pathname);
  }
}


// Fetches data for a Repo: repo data +
function* watchLoadAddressesPage() {
  while (true) {
    const { name, requiredFields = [] } = yield take(
      actions.LOAD_ADDRESSES
    );

    yield fork(loadAddress, name, requiredFields);
  }
}

export default function* root() {
  yield all([
    fork(watchNavigate),
    fork(watchLoadAddressesPage),
  ]);
}
