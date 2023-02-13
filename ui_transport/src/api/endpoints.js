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

const listGuardians = async () => {
  const request = await GET('users/?type_user=GUA')
  return request
}

const listDrivers = async () => {
  const request = await GET('users/?type_user=DRV')
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

const createCollege = async(data) => {
  const request = await POST('colleges/', data)
  return request
}

const listColleges = async () => {
  const request = await GET('colleges/')
  return request
}

const retrieveCollege = async(id) => {
  const request = await GET(`colleges/${id}/`)
  return request
}

const deleteCollege = async(id) => {
  const request = await DELETE(`colleges/${id}/`)
  return request
}

const createGrade = async(data) => {
  const request = await POST('grades/', data)
  return request
}

const retrieveGrade = async (id) => {
  const request = await GET(`grades/${id}/`)
  return request
}

const deleteGrade = async(id) => {
  const request = await DELETE(`grades/${id}/`)
  return request
}

const createStudent = async(data) => {
  const request = await POST('students/', data)
  return request
}

const deleteStudent = async(user) => {
  const request = await DELETE(`students/${user}/`)
  return request
}

const listAllAttendances = async() => {
  const request = await GET(`assits/`)
  return request
}

const createAttendances = async(data) => {
  const request = await POST(`assits/`, data)
  return request
}

const createLocationRealTime = async(data) => {
  const request = await POST('locations/', data)
  return request
}




const api = {
    authenticated: login,
    users: {
      retrieve: userRetrieve,
      list: listUsers,
      list_guardians: listGuardians,
      list_drivers: listDrivers,
      create: createUser,
      update: updateUser,
      delete: deleteUser,
      change_password: changePassword
    },
    colleges: {
      create: createCollege,
      list: listColleges,
      retrieve: retrieveCollege,
      delete: deleteCollege
    },
    grades: {
      create: createGrade,
      retrieve: retrieveGrade,
      delete: deleteGrade
    },
    students: {
      create: createStudent,
      delete: deleteStudent
    },
    attendances: {
      create: createAttendances,
      lists: {
        all: listAllAttendances
      }
    },
  locations: {
    create: createLocationRealTime  
  }
}

export default api
