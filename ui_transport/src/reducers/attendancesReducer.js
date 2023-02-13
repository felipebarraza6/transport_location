export const attendancesReducer = (state, action) => {
  switch (action.type) {
    
    case 'ADD_LIST':
      return {
        ...state,
        attendances: action.payload.list
      }

    default:
      return state
  }
}
