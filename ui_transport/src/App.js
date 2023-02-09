import React, { 
  createContext, 
  useReducer, 
  useEffect } from 'react'
import { appReducer } from './reducers/appReducer'

import Login from './screens/Login'
import Home from './screens/Home'
import api from './api/endpoints'

export const AppContext = createContext()

function App() {
  
  const initialState = {
    isAuth: false,
    token: null,
    user: null,
    type_user: null,
    profile: null,
    update_count: 0,
    modals: {
      create_user_open: false
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState)

  const updateApp = async() => {
    const token = JSON.parse(localStorage.getItem('token'))
    const user = JSON.parse(localStorage.getItem('user'))
     
    if(user && token){
      const rq = await api.users.retrieve(user.username).then((x)=>{        
        dispatch({
          type:'UPDATE',
          payload: x.data
        })
      })    
      return rq 
    }
  }


  useEffect(() =>{
    updateApp()
  },[state.update_count])


  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {state.isAuth ? <Home />:<Login />}
    </AppContext.Provider>
  )
}


export default App
