import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Input, Select, 
        Button, Row, notification } from 'antd'
import { IdcardOutlined  } from '@ant-design/icons'
import { CollegeStudentsContext } from '../../../screens/CollegeStudents'
import api from '../../../api/endpoints'

const CreateStudent = () => {
 
  const { state, dispatch } = useContext(CollegeStudentsContext)
  
  const [form] = Form.useForm()

  const [guardians, setGuardians] = useState([])

  const closeModalCreateStudent = () => {
    dispatch({ type: 'TOGGLE_MODAL_CREATE' })
  }

  const resetData = () => form.resetFields()
  
  const onFinish = async(values) => {
    values = {
      ...values,
      grade: state.grade_selected.id
    }
    const rq = await api.students.create(values).then(async(response)=>{
      dispatch({ type: 'UPDATE_DATA'})
      const rq2 = await api.grades.retrieve(state.grade_selected.id).then(async(response2)=> {
        console.log('response')
        console.log(response2)
        dispatch({ type:'ADD_LIST_STUDENTS', students: response2.data.students })
      })
      const rq3 = await api.colleges.retrieve(state.college_selected.id).then((r)=> {
        dispatch({
          type: 'ADD_LIST_GRADES',
          grades: r.data.grades 
        })
      })
      resetData()
      closeModalCreateStudent()
    }).catch((err)=>{
      if(err.response){
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


  const getGuardians = async() => {
    const rq = await api.users.list_guardians().then((response)=> {
      setGuardians(response.data.results)
    })
    return rq
  }

  useEffect(()=> {
    getGuardians()
  }, [])

 

  return(<Modal  title='CREAR ESTUDIANTE' open={state.create_modals.students_open_modal} onCancel={closeModalCreateStudent} footer={[]}>
      <Form onFinish={onFinish} form={form} style={styles.form}>
        <Form.Item name='first_name' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Nombre' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='last_name' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Apellido' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='address' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Dirección' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='dni' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Rut' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='guardian' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Select placeholder='Apoderado' >
            {guardians.map((obj)=><Select.Option value={obj.id}>{obj.email} - {obj.dni}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item>
          <Row justify={'center'}>
          <Button style={styles.btn} type='primary' htmlType='submit'>Crear</Button>
          <Button style={styles.btn} onClick={resetData}>Limpiar</Button>
          <Button style={styles.btn} type='primary' danger onClick={closeModalCreateStudent}>Cancelar</Button>
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


export default CreateStudent
