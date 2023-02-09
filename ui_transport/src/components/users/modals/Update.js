import React, { useContext, useState, useEffect } from 'react'
import { Modal, Form, Input, Select, 
        Button, Row, notification } from 'antd'
import { IdcardOutlined, PhoneOutlined } from '@ant-design/icons'
import { UsersContext } from '../../../screens/Users'
import api from '../../../api/endpoints'

const UpdateUser = () => {
 
  const { state, dispatch } = useContext(UsersContext)
  const [form] = Form.useForm()

  const closeModalUpdateUser = () => {
    dispatch({ type: 'OPEN_USER_UPDATE', payload: false })
  }


  const [valuesInput, setValues] = useState({...state.selectedUser})


  const resetData = () => setValues({ first_name: '' }) 
  
  const onFinish = async(values) => {
    const rq = await api.users.update(state.selectedUser.username, values).then((response)=>{
      dispatch({ type: 'UPDATE_DATA_USERS'})
      resetData()
      closeModalUpdateUser()
    }).catch((err)=>{
      if(err.response.data){
        Object.keys(err.response.data).map((key)=> {
            let field = key
            let message = err.response.data[key]
          if(key==='non_field_errors'){
            field='Error'
          }
            notification.error({message:`${field.toUpperCase()}: ${message}`})
        })
      }
    })
    return rq
  }
  console.log(valuesInput)

  const changeValueInput = (e) => {
    setValues({
      ...valuesInput,
      [e.target.name]: e.target.value
    })
  }

  useEffect(()=> {
    setValues({...state.selectedUser})
  },[state.modals.update_user_open])


  return(<Modal  
          title={state.selectedUser && `Actualizar a "${state.selectedUser.email} (${state.selectedUser.dni})"`} 
          open={state.modals.update_user_open} 
          onCancel={closeModalUpdateUser} 
          footer={[]}>
          {state.selectedUser && <>
            <Input onChange={changeValueInput} 
              name='first_name' 
              value={valuesInput.first_name}
              style={styles.input} 
              placeholder={state.selectedUser.first_name} 
              prefix={<IdcardOutlined style={styles.prefix} />} />
            <Input onChange={changeValueInput}  
              name='last_name' 
              style={styles.input} 
              value={valuesInput.last_name}
              placeholder={state.selectedUser.last_name} 
              prefix={<IdcardOutlined style={styles.prefix} />} />
            <Input onChange={changeValueInput}  
              name='dni' 
              style={styles.input} 
              value={valuesInput.dni}
              placeholder={state.selectedUser.dni}  
              prefix={<IdcardOutlined style={styles.prefix} />} />
            <Input onChange={changeValueInput}  
              name='phone_number' 
              style={styles.input} 
              value={valuesInput.phone_number}
              placeholder={state.selectedUser.phone_number} 
              prefix={<PhoneOutlined style={styles.prefix} />} />
            <Select onSelect={changeValueInput}  name='type_user' style={styles.input}  
                value={valuesInput.type_user}
                placeholder={state.selectedUser.type_user === 'ADM' ? 'ADMINISTRADOR': state.selectedUser.type_user === 'DRV' ? 'CONDUCTOR':'APODERADO'} >
              <Select.Option value='GUA'>Apoderado</Select.Option>
              <Select.Option value='ADM'>Administrador</Select.Option>
              <Select.Option value='DRV'>Conductor</Select.Option>
            </Select>
            <Row justify={'center'}>
              <Button style={styles.btn} type='primary' onClick={()=>onFinish(valuesInput)}>Actualizar</Button>
              <Button style={styles.btn} type='primary' danger onClick={closeModalUpdateUser}>Cancelar</Button>
            </Row>
          </>} 
    </Modal>)

}

const styles = {
  form: {
    marginTop: '40px'
  },
  input: {
    width: '100%',
    marginTop:'10px',
    marginBottom: '5px',
  },
  btn: {
    margin:'10px'
  },
  prefix: {
    marginRight: '12px'
  }
}


export default UpdateUser
