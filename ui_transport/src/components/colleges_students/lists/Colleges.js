import React, { useContext, useEffect } from 'react'
import { Card, Button, Row, Table, notification } from 'antd'
import { BankTwoTone, PlusOutlined, OrderedListOutlined } from '@ant-design/icons'
import { CollegeStudentsContext,  } from '../../../screens/CollegeStudents'
import api from '../../../api/endpoints'


const Colleges = () => {

  const { state, dispatch } = useContext(CollegeStudentsContext)

  const toggleModalCreateOpen = (option, open, id_college) => {
    dispatch({ 
      type: 'TOGGLE_MODAL_CREATE', 
      [option]: open,  
  })
    dispatch({
      type: 'COLLEGE_SELECTED',
      college: id_college
    })
  }

  const getLists = async()=> {
    const rq1 = await api.colleges.list().then((response)=> {
      dispatch({ 
        type:'ADD_LIST',
        payload: {
          colleges: response.data.results
        }
      })
    })
  }

  const deleteCollege = async(id)=> {
    
    const rq = await api.colleges.delete(id).then(()=> {
      notification.success({message: 'COLEGIO ELIMINADO CORRECTAMENTE'})
    })
 const rq1 = await api.colleges.list().then((response)=> {
      dispatch({ 
        type:'ADD_LIST',
        payload: {
          colleges: response.data.results
        }
      })
    })


  }

  useEffect(()=> {
    getLists()
  }, [state.updateCountData])

  const columnsCollege = [
    {
      title: 'Nombre',
      dataIndex: 'name'
    },
    {
      title: 'Dirección',
      dataIndex: 'address'
    },
    {
      title: 'Comuna',
      dataIndex: 'commune'
    },

          /*<Button icon={<EditOutlined />} style={styles.btn} size='small'>Editar</Button>*/
    {
      render: (x) => {
        return(<Row justify={'end'}>
          <Button icon={<PlusOutlined />} style={styles.btn} 
              type='primary' size={'small'} onClick={()=>toggleModalCreateOpen('grades', true, x)}>Crear curso</Button>
          <Button icon={<OrderedListOutlined />} style={styles.btn}  
              type='primary' size={'small'} onClick={()=>{ 
                dispatch({ type:'ADD_LIST_GRADES' ,grades:x.grades})
                dispatch({ type:'ADD_COLLEGE_SELECTED' ,college:x})
              }}>Ver cursos ({x.grades.length})</Button>
          <Button  disabled={x.grades.length === 0 ? false:true} type='primary' size={'small'} onClick={()=>{deleteCollege(x.id)}} danger>Eliminar</Button>
        </Row>)
      }
    }
  ]


  return(<Card title={<><BankTwoTone style={styles.iconTitle} />Colegios</>} style={styles.card} hoverable extra={<Row>
            <Button icon={<PlusOutlined />} 
              type='primary' size={'small'} onClick={()=>toggleModalCreateOpen('colleges', true)} /></Row>}>
              <Table bordered size='small' dataSource={state.lists.colleges} rowKey='id' columns={columnsCollege}  />
          </Card>)
}

const styles = {
  card: {
    marginRight:'5px'
  },
  iconTitle: {
    marginRight: '10px'
  },
  btn: {
    margin:'2px'
  }
}

export default Colleges
