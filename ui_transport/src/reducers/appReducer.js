export const appReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
          localStorage.setItem("token", JSON.stringify(action.payload.access_token))
          localStorage.setItem("user", JSON.stringify(action.payload.user))            
          localStorage.setItem("type_user", JSON.stringify(action.payload.user.type_user)) 
          window.location.assign('/')

          return {
               ...state,
              isAuth: true,                
              token: action.payload.access_token,
              user: action.payload.user,
              type_user: action.payload.user.type_user,
              update_count: state.update_count + 1
          }

        case 'UPDATE':                
          localStorage.setItem("user", JSON.stringify(action.payload.user))            
          localStorage.setItem("type_user", JSON.stringify(action.payload.user.type_user))                                
          localStorage.setItem("profile", JSON.stringify(action.payload.profile_data))                                

          return {
            ...state,
              isAuth: true,                                    
              user: action.payload.user,
              profile: action.payload.profile_data,                    
              type_user: action.payload.user.type_user,
          }
        
        case 'OPEN_USER_CREATE':
          return {
            ...state,
            modals: {
              ...state.modals,
              create_user_open: action.payload 
            }
          }

        case 'LOGOUT':
          localStorage.clear()
          window.location.assign('/')
          return {
              ...state,
              isAuth: false,
              token: null,
              user: null,
              profile: null,
              type_user: null,
              update_count: 0
          }
        
        default:
            return state
    }
}
