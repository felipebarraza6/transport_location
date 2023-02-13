import React, { useContext, useState, useEffect } from 'react'
import { Modal, Form, Input, Select, 
        Button, Row, notification } from 'antd'
import { IdcardOutlined, AimOutlined } from '@ant-design/icons'
import { CollegeStudentsContext } from '../../../screens/CollegeStudents'
import api from '../../../api/endpoints'

const CreateGrade = () => {
 
  const { state, dispatch } = useContext(CollegeStudentsContext)
  const [drivers, setDrivers] = useState([])

  const [form] = Form.useForm()

  const closeModalCreateGrade = () => {
    dispatch({ type: 'TOGGLE_MODAL_CREATE' })
  }

  const resetData = () => form.resetFields()
  
  const onFinish = async(values) => {
    values = {
      ...values,
      college: state.college_selected.id
    }
    const rq = await api.grades.create(values).then((response)=>{
      dispatch({ type: 'UPDATE_DATA'})
      resetData()
      closeModalCreateGrade()
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

  const getDrivers = async() => {
    const rq = await api.users.list_drivers().then((response)=> {
      setDrivers(response.data.results)
    })
    return rq
  }

  useEffect(()=> {
    getDrivers()
  }, [])


  return(<Modal  title='CREAR CURSO' open={state.create_modals.grades_open_modal} onCancel={closeModalCreateGrade} footer={[]}>
      <Form onFinish={onFinish} form={form} style={styles.form}>
        <Form.Item name='number_grade' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Nombre curso' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='driver' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Select placeholder='Conductor designado' prefix={<IdcardOutlined style={styles.prefix} />}>
            {drivers.map((x)=> <Select.Option key={x.id} value={x.id}>{x.first_name} {x.last_name} - {x.dni}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item>
          <Row justify={'center'}>
          <Button style={styles.btn} type='primary' htmlType='submit'>Crear</Button>
          <Button style={styles.btn} onClick={resetData}>Limpiar</Button>
          <Button style={styles.btn} type='primary' danger onClick={closeModalCreateGrade}>Cancelar</Button>
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


export default CreateGrade
