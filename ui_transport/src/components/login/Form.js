import React, { useContext } from 'react'
import { Typography, Input, Form as FormComponent, 
          Button, notification} from 'antd'
import api from '../../api/endpoints'
import { AppContext } from '../../App'

const { Title } = Typography

const Form = () => {

  const { formC } = FormComponent.useForm()

  const { dispatch } = useContext(AppContext) 
  
  const finishLogin = async(values) => {
        try {
            const request = await api.authenticated(values)      
            dispatch({
              type: 'LOGIN',
              payload: request
            })
            
            return request
          } catch(error) {
            notification.error({ message: 'contraseña incorrecta' })
          }
    }

  return(<FormComponent name='auth' onFinish={finishLogin} form={formC}>
            <Title level={1} style={{color:'white'}}>Gestión de rutas<br/> y transporte escolar</Title>
              <FormComponent.Item name="email" rules={[{ required: true, message: 'Ingresa tu email!' }]}>
                <Input placeholder='Usuario' style={{borderRadius:'10px', width:'200px'}} />
              </FormComponent.Item>
              <FormComponent.Item name="password" rules={[{ required: true, message: 'Ingresa tu clave!' }]}>
                <Input type='password' placeholder='Clave' style={{borderRadius:'10px', width:'200px'}} />
              </FormComponent.Item>
              <FormComponent.Item>
                <Button type='primary' htmlType='submit' style={{borderRadius:'10px', width:'200px'}}>Ingresar</Button>
              </FormComponent.Item>
              <FormComponent.Item>
                <Button style={{borderRadius:'10px', width:'200px'}} >Limpiar</Button>
              </FormComponent.Item>
          </FormComponent> )

}


export default Form
