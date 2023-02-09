import React, { useContext } from 'react'
import { Modal, Form, Input, Select, 
        Button, Row, notification } from 'antd'
import { IdcardOutlined, PhoneOutlined, MailOutlined,
       LockOutlined } from '@ant-design/icons'
import { UsersContext } from '../../../screens/Users'
import api from '../../../api/endpoints'

const CreateUser = () => {
 
  const { state, dispatch } = useContext(UsersContext)
  
  const [form] = Form.useForm()

  const closeModalCreateUser = () => {
    dispatch({ type: 'OPEN_USER_CREATE', payload: false })
  }

  const resetData = () => form.resetFields()
  
  const onFinish = async(values) => {
    values = {
      ...values,
      username: `${values.first_name.slice(0,4).toLowerCase()}${values.last_name.slice(0,4).toLowerCase()}`,
    }
    const rq = await api.users.create(values).then((response)=>{
      dispatch({ type: 'UPDATE_DATA_USERS'})
      resetData()
      closeModalCreateUser()
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


  return(<Modal  title='CREAR USUARIO' open={state.modals.create_user_open} onCancel={closeModalCreateUser} footer={[]}>
      <Form onFinish={onFinish} form={form} style={styles.form}>
        <Form.Item name='first_name' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Nombre' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='last_name' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Apellido' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='dni' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='RUT' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='phone_number' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Telefono' prefix={<PhoneOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='email' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Email' prefix={<MailOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='type_user' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Select placeholder='Tipo de usuario'>
            <Select.Option value='ADM'>Administrador</Select.Option>
            <Select.Option value='GUA'>Apoderado</Select.Option>
            <Select.Option value='DRV'>Conductor</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='password' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input type='password' placeholder='Contraseña'  prefix={<LockOutlined style={styles.prefix} />}/>
        </Form.Item>
        <Form.Item name='password_confirmation' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input type='password' placeholder='Repetir contraseña'  prefix={<LockOutlined style={styles.prefix} />}/>
        </Form.Item>
        <Form.Item>
          <Row justify={'center'}>
          <Button style={styles.btn} type='primary' htmlType='submit'>Crear</Button>
          <Button style={styles.btn} onClick={resetData}>Limpiar</Button>
          <Button style={styles.btn} type='primary' danger onClick={closeModalCreateUser}>Cancelar</Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>)

}

const styles = {
  form: {
    marginTop: '40px'
  },
  btn: {
    margin:'10px'
  },
  prefix: {
    marginRight: '12px'
  }
}


export default CreateUser
