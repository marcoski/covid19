import C from '../constants'
import { createReducers } from '../../utils/redux'

const dataReducer = createReducers({}, {
  [C.DATA.READ_BY_DATE]: (data, action) => ({ ...data, byDate: action.data }),
  [C.DATA.READ_BY_AGGREGATE]: (data, action) => ({ ...data, byAggregate: action.data }),
  [C.DATA.CLEAR]: () => ({})
})

export const data = (state = {}, action) => dataReducer(state, action) 