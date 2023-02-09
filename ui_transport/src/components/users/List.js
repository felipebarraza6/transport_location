import React, { useEffect, useContext } from 'react'
import { Table, Button, Row, Col, Tag, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, UnlockOutlined } from '@ant-design/icons'
import { UsersContext } from '../../screens/Users'
import api from '../../api/endpoints'


const List = () => {
  
  const { state, dispatch } = useContext(UsersContext)

  const getUsers = async() => {
    const rq = await api.users.list().then((x)=>{
      dispatch({type:'ADD_USERS', payload: x.data.results})
    })
    return rq
  }

  const deleteUser = async(user) => {
    const rq = await api.users.delete(user).then((x)=> {
      dispatch({ type: 'UPDATE_DATA_USERS'})

    })
    return rq
  }

  const renderTypeUser = (type_user) => {
        if(type_user === 'ADM') {
          return(<Tag color='blue'>Administrador</Tag>)
        }else if(type_user === 'DRV') {
          return(<Tag color='volcano'>Conductor</Tag>)
        } else {
          return(<Tag color='green'>Apoderado</Tag>)
        }
  }

  const openModalUpdate = (user) => {
    dispatch({ type: 'SELECTED_USER', payload: user})
    dispatch({type:'OPEN_USER_UPDATE', payload: true})
  }

  const openModalChangePassword = (user) => {
    dispatch({ type: 'SELECTED_USER', payload: user})
    dispatch({type:'OPEN_USER_CHANGE_PASSWORD', payload: true})
  }

  
  const columns = [
    { dataIndex:'first_name', title:'Nombre'},
    { dataIndex:'last_name', title:'Apellido'},
    { dataIndex:'email', title:'Email'},
    { dataIndex:'phone_number', title:'Teléfono'},
    { dataIndex:'type_user', title:'Tipo de perfil', render: (x) => renderTypeUser(x)},
    { render: (user) => {
          return(<Row >
            <Col span={12}>
              <Button icon={<EditOutlined />} size='small' type='primary' 
                onClick={()=>openModalUpdate(user)}
                >Actualizar</Button>
              <Button icon={<UnlockOutlined />} size='small' style={styles.changePassword}
                onClick={()=>openModalChangePassword(user)} >Modificar contraseña</Button>
            </Col>
            <Col span={12}>
              <Popconfirm 
                  onConfirm={()=>deleteUser(user.username)}
                  title='Estas seguro de eliminar este usuario? está acción eliminara todos los registros relacionados' okText={'ELIMINAR'} cancelText={'CANCELAR'}>
                <Button icon={<DeleteOutlined />} size='small' type='primary' danger>Eliminar</Button>
              </Popconfirm>
            </Col>

          </Row>)
    }}
  ]

  useEffect(()=> {
    getUsers()
  },[state.updateCountData])

  return(<Table columns={columns} dataSource={state.users} rowKey={'id'} bordered />)

}

const styles = {
  changePassword: {
    backgroundColor: 'green',
    color: 'white',
    borderColor: 'green',
    marginTop:'5px'
  }
}

export default List
