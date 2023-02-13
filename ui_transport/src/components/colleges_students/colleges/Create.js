import React, { useContext } from 'react'
import { Modal, Form, Input, Select, 
        Button, Row, notification } from 'antd'
import { IdcardOutlined, AimOutlined } from '@ant-design/icons'
import { CollegeStudentsContext } from '../../../screens/CollegeStudents'
import api from '../../../api/endpoints'

const CreateCollege = () => {
 
  const { state, dispatch } = useContext(CollegeStudentsContext)
  
  const [form] = Form.useForm()

  const closeModalCreateCollege = () => {
    dispatch({ type: 'TOGGLE_MODAL_CREATE' })
  }

  const resetData = () => form.resetFields()
  
  const onFinish = async(values) => {
    values = {
      ...values,
    }
    const rq = await api.colleges.create(values).then((response)=>{
      dispatch({ type: 'UPDATE_DATA'})
      resetData()
      closeModalCreateCollege()
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

  return(<Modal  title='CREAR COLEGIO' open={state.create_modals.colleges_open_modal} onCancel={closeModalCreateCollege} footer={[]}>
      <Form onFinish={onFinish} form={form} style={styles.form}>
        <Form.Item name='name' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Nombre' prefix={<IdcardOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='address' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Input placeholder='Dirección' prefix={<AimOutlined style={styles.prefix} />} />
        </Form.Item>
        <Form.Item name='commune' rules={[{required: true,message: 'Campo obligatorio'}]}>
          <Select placeholder='Comuna'>
            <Select.Option value='cobquecura'>Cobquecura</Select.Option>
            <Select.Option value='coelemu'>Coelemu</Select.Option>
            <Select.Option value='ninhue'>Ninhue</Select.Option>
            <Select.Option value='portezuelo'>Portezuelo</Select.Option>
            <Select.Option value='quirihue'>Quirihue</Select.Option>
            <Select.Option value='ranquil'>Ránquil</Select.Option>
            <Select.Option value='trehuaco'>Trehuaco</Select.Option>
            <Select.Option value='bulnes'>Bulnes</Select.Option>
            <Select.Option value='chillan viejo'>Chillán Viejo</Select.Option>
            <Select.Option value='chillan'>Chillán</Select.Option>
            <Select.Option value='el caarmen'>El Carmen</Select.Option>
            <Select.Option value='pemuco'>Pemuco</Select.Option>
            <Select.Option value='pinto'>Pinto</Select.Option>
            <Select.Option value='quillon'>Quillón</Select.Option>
            <Select.Option value='san ignaacio'>San Ignacio</Select.Option>
            <Select.Option value='yungay'>Yungay</Select.Option>
            <Select.Option value='coihueco'>Coihueco</Select.Option>
            <Select.Option value='ñiquen'>Ñiquen</Select.Option>
            <Select.Option value='san carlos'>San Carlos</Select.Option>
            <Select.Option value='san ignacio'>San Fabian</Select.Option>
            <Select.Option value='san nicolas'>San Nicolas</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Row justify={'center'}>
          <Button style={styles.btn} type='primary' htmlType='submit'>Crear</Button>
          <Button style={styles.btn} onClick={resetData}>Limpiar</Button>
          <Button style={styles.btn} type='primary' danger onClick={closeModalCreateCollege}>Cancelar</Button>
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


export default CreateCollege 
