import React, { createContext, useReducer } from 'react'

import List from '../components/users/List'
import { Row, Col, Typography,
        Card, Button } from 'antd'

import { UserAddOutlined } from '@ant-design/icons'
import { usersReducer } from '../reducers/usersReducer'
import CreateUser from '../components/users/modals/Create'
import UpdateUser from '../components/users/modals/Update'
import ChangePassword from '../components/users/modals/ChangePassword'
export const UsersContext = createContext()


const { Title } = Typography


const Users = () => {

  const initialState = {
    users: null,
    selectedUser: null,
    updateUser: false,
    updateCountData: 0,
    modals: {
      create_user_open: false,
      update_user_open: false,
      change_password_open: false
    }
  }

  const [state, dispatch] = useReducer(usersReducer, initialState)

  const openModalUserCreate = () => {
    dispatch({ type: 'OPEN_USER_CREATE', payload: true })
  }

  return(<UsersContext.Provider value={{ state, dispatch }}>
      <Row style={styles.container} justify={'center'} align='middle'>
        <CreateUser />
        <UpdateUser />
        <ChangePassword />
        
        <Col span={20}>
          <Card title='Usuarios' extra={<Button icon={<UserAddOutlined />} 
            type='primary' onClick={openModalUserCreate}>Crear Usuario</Button>}>
              <List />
          </Card>
        </Col>
      </Row>
    </UsersContext.Provider>)

}


const styles = {
  title: {
    textAlign: 'center',
  },
  container: {
    marginTop:'50px'
  }
}


export default Users
