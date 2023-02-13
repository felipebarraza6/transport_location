import React, { useContext, useState, useEffect } from 'react'
import { Card, Table, Row, Button, notification } from 'antd'
import { BookTwoTone, OrderedListOutlined, PlusOutlined } from '@ant-design/icons'
import { CollegeStudentsContext } from '../../../screens/CollegeStudents'

import api from '../../../api/endpoints'

const Grades = () => {

  const { state, dispatch } = useContext(CollegeStudentsContext)

  const toggleModalCreateOpenGrade = (option, open, id_grade) => {
    dispatch({ type: 'TOGGLE_MODAL_CREATE', [option]: open})
    dispatch({type:'GRADE_SELECTED', grade: id_grade})
  }

  const [update, setUpdate] = useState(0)

  const deleteGrade = async(id) => {
    const rq = await api.grades.delete(id).then(()=> {
      notification.success({message:'CURSO ELIMINADO CORRECTAMENTE'})
    })
    const rq2 = await api.colleges.retrieve(state.college_selected.id).then((r)=> {
      dispatch({
        type: 'ADD_LIST_GRADES',
        grades: r.data.grades
      })
    })
  }
  

  const columnsGrades = [
    { 
      title:'Curso',
      dataIndex: 'number_grade'
    },
    /* 
    <Button icon={<EditOutlined />} style={styles.btn} size='small' >Editar</Button>
     */
    {
      render: (x)=> {
        return(<Row justify={'center'}>
          <Button icon={<PlusOutlined />} style={styles.btn} 
              type='primary' size={'small'} onClick={()=>toggleModalCreateOpenGrade('students', true, x)}>Crear estudiante</Button>

          <Button icon={<OrderedListOutlined />} onClick={()=>{
            dispatch({type:'ADD_LIST_STUDENTS', students: x.students})
            dispatch({type:'ADD_GRADE_SELECTED', grade: x})
          }} style={styles.btn} type='primary' size='small'>Ver estudiantes ({x.students.length})</Button>
          <Button type='primary' size='small' onClick={()=>{deleteGrade(x.id)}} disabled={x.students.length === 0 ? false:true} danger>Eliminar</Button>
          </Row>)
      }
    }
  ]




  return(<Card title={<><BookTwoTone style={styles.iconTitle} />Cursos {state.college_selected && state.college_selected.name}</>} style={styles.card} hoverable extra={<Row>
            </Row>}>
              <Table size='small' bordered dataSource={state.lists.grades} rowKey='id' columns={columnsGrades}/>
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



export default Grades
