import { POST_LOGIN, GET, POST, PATCH, DELETE  } from "./config"

const login = async(data) =>{
    
    const request = await POST_LOGIN('users/login/', {
        email: data.email,
        password: data.password
    })

    return request.data
}

const userRetrieve = async(user) => {
  const request = await GET(`users/${user}/`)
  return request
}

const listUsers = async() => {
  const request = await GET('users/')
  return request
}

const createUser = async(data) => {
  const request = await POST('users/signup/', data)
  return request
}

const updateUser = async(username, data) => {
  const request = await PATCH(`users/${username}/`, data)
  return request
}

const deleteUser = async(username) => {
  const request = await DELETE(`users/${username}/`)
  return request
}

const changePassword = async(email, password) => {
  const request = await POST('users/reset_password/', { user: email, new_password: password })
  return request
}



const api = {
    authenticated: login,
    users: {
      retrieve: userRetrieve,
      list: listUsers,
      create: createUser,
      update: updateUser,
      delete: deleteUser,
      change_password: changePassword
    }
}

export default api
