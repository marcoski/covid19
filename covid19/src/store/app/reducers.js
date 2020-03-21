import C from '../constants'
import { createReducers } from '../../utils/redux'

const appReducer = createReducers({}, {
  [C.APP.LAST_UPDATE]: (app, action) => ({ ...app, lastUpdate: action.lastUpdate }),
  [C.APP.CURRENT_VIEW]: (app, action) => ({ ...app, currentView: action.currentView }),
  [C.APP.CURRENT_AGGREGATE]: (app, action) => ({ ...app, currentAggregate: action.currentAggregate }),
  [C.APP.CHANGE_FILTERS]: (app, action) => ({ ...app, filters: action.filters }),
  [C.APP.REGIONS]: (app, action) => ({ ...app, regions: action.regions }),
  [C.DATA.CLEAR]: (app, action) => ({ ...app, currentAggregate: '' })
})

export const app = (
  state = { lastUpdate: '', currentView: 'italia', currentAggregate: '', filters: [], regions: {} }, action
) => (
  appReducer(state, action)
)