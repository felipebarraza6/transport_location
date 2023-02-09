import React, { useContext, useState } from 'react'
import { Modal, Input, Button, notification } from 'antd'
import { UsersContext } from '../../../screens/Users'
import api from '../../../api/endpoints'

const ChangePassword = () => {
  
  const { state, dispatch } = useContext(UsersContext) 
  const [data, setData] = useState(null)

  const closeModalChangePassword = () => {
    dispatch({type:'OPEN_USER_CHANGE_PASSWORD', payload: false})
    dispatch({type:'UNSELECTED_USER'})
  }

  const changePassword = async() => {
    const rq = await api.users.change_password(state.selectedUser.email, data.new_password).then(()=> {
      dispatch({type:'OPEN_USER_CHANGE_PASSWORD', payload: false})
      notification.success({message:'CONTRASEÑA MODIFICADA EXITOSAMENTE'})
      setData(null)
    })
  }



  return(<Modal title={`Actualizar contraseña de ${state.selectedUser && state.selectedUser.email}`} 
        open={state.modals.change_password_open} 
        onCancel={closeModalChangePassword} footer={[]} >
      <Input value={data ? data.new_password:''} onChange={(e)=> setData({...data, new_password:e.target.value})} name='new_password' style={styles.input} placeholder='Nueva contraseña' />
      <Button type='primary' style={styles.btn} onClick={()=>changePassword()}>Aceptar nueva contraseña</Button>
      <Button style={styles.btn} danger type='primary' onClick={closeModalChangePassword}>Cancelar</Button>
    </Modal>)

}

const styles = {
  input: {
    marginBottom:'-20px',
    marginTop: '30px'
  },
  btn: {
    marginTop:'20px',
    marginRight: '10px'
  }
}

export default ChangePassword
