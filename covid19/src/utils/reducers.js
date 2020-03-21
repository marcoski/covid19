import it from '../i18n/it.json'
export const C = {
  REQUEST: "REQUEST",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  CHANGE_LANG: "CHANGE_LANG"
}


export const request = (state = { loading: false, error: '' }, action) => {
  switch (action.type) {
    case C.REQUEST:
      return { ...state, loading: true, error: '' }
    case C.SUCCESS:
      return { ...state, loading: false, error: '' }
    case C.FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export const i18n = (state = it, action) => {
  switch(action.type) {
    case C.CHANGE_LANG: 
      return action.language
    default:
      return state
  }
}