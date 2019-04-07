import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux';

export function settingsPage (state = { type: 'CHANGE_SETTINGS_PAGE', page: 0 }, action) {
  if (action.type === 'CHANGE_SETTINGS_PAGE') {
    return Object.assign({}, state, { page: action.page })
  }
  return state;
}

export default combineReducers({
  settingsPage,
  localize: localizeReducer
})

var searchParams = new URLSearchParams(window.location.search);
window.language = searchParams.get('language');
