export const usersReducer = (state, action) => {
    switch (action.type) {

      case 'ADD_USERS':
        return {
          ...state,
          users: action.payload
        }

      case 'SELECTED_USER':
        return {
          ...state,
          selectedUser: action.payload
        }

      case 'UNSELECTED_USER':
        return {
          ...state,
          selectedUser: null
        }


      case 'OPEN_USER_CREATE':
        return {
          ...state,            
          modals: {
            ...state.modals,
            create_user_open: action.payload 
          }
        }
      
      case 'OPEN_USER_UPDATE':
        return {
          ...state,            
          modals: {
            ...state.modals,
            update_user_open: action.payload 
          }
        }
      
      case 'OPEN_USER_CHANGE_PASSWORD':
        return {
          ...state,            
          modals: {
            ...state.modals,
            change_password_open: action.payload 
          }
        }

        
      case 'UPDATE_DATA_USERS':
        return {
          ...state,
          updateCountData: state.updateCountData + 1,
          selectedUser: null
        }


                
        default:
            return state
    }
}
