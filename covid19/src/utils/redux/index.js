
export const updateObject = (oldObject, newValues) => ({ ...oldObject, ...newValues })
export const removeItemFromArray = (array, itemId) => array.filter(item => item._id !== itemId)

export const updateItemInArray = (array, itemId, callback) => array.map(item => {
  if (item._id !== itemId) return item
  return callback(item)
})

export const createReducers = (initialState, handlers) => (state = initialState, action) => {
  //console.log(state, handlers.hasOwnProperty(action.type), action.type)
  if (handlers.hasOwnProperty(action.type)) return handlers[action.type](state, action)
  return state
}

export const updateNormalizedObject = (object, itemId, value) => ({ ...object, [itemId]: { ...object[itemId], ...value} })

export const addToNormalizedObject = (object, value) => ({ ...object, [value._id]: value })

export const removeFromNormalizedObject = (object, itemId) => {
  const newObject = { ...object }
  delete newObject[itemId]
  return newObject
}

export const normalizer = array => array.reduce((acc, cur) => ({ ...acc, [cur._id]: cur }), {})

export const denormalizer = object => Object.keys(object).reduce((acc, cur) => (
  [...acc, ...[object[cur]]]
), [])