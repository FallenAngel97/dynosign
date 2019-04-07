export function settingsPage (state = { type: 'CHANGE_SETTINGS_PAGE', page: 0 }, action) {
  if (action.type === 'CHANGE_SETTINGS_PAGE') {
    return Object.assign({}, state, { page: action.page })
  }
  return state;
}
