import React, { useContext, useState, useEffect } from 'react'
import { Card, Table, notification, Button, Row } from 'antd'
import { SkinTwoTone, DeleteOutlined } from '@ant-design/icons'
import { CollegeStudentsContext } from '../../../screens/CollegeStudents'
import api from '../../../api/endpoints'

const Students = () => {

  const { state, dispatch } = useContext(CollegeStudentsContext)

  const [update, setUpdate] = useState(0)
  

  const columnsStudents = [
    {
      title: 'Nombre',
      render: (x) => `${x.first_name} ${x.last_name}`
    },
    {
      title: 'RUT',
      dataIndex: 'dni'
    },
    {
      render: (x)=> {
        return(<Row>

          <Button icon={<DeleteOutlined />} style={styles.btn} type='primary' onClick={async() => {
            const rq = await api.students.delete(x.id).then((x)=>{
              notification.success({'message':'USUARIO ELIMINADO CORRECTAMENTE'})
              setUpdate(update+1)
            })
        const rq3 = await api.grades.retrieve(state.grade_selected && state.grade_selected.id).then(async (response) => {
      dispatch({
        type: 'ADD_LIST_STUDENTS',
        students: response.data.students
      })
      
    })
            const rq2 = await api.colleges.retrieve(state.college_selected && state.college_selected.id).then((r)=> {

              console.log(r)
            dispatch({
              type:'ADD_LIST_GRADES',
              grades: r.data.grades
            })
      })
            return rq
          }} danger size={'small'}>Eliminar</Button>
        </Row>)
      }
    }

  ]

  const getUpdateStudients = async() => {
    
  }

  useEffect(()=> {
    if(update >= 1){
    getUpdateStudients()
    }

  }, [update])


  return(
    <Card title={<><SkinTwoTone style={styles.iconTitle} />Estudiantes {state.grade_selected && state.grade_selected.number_grade}</>} hoverable >
      <Table bordered expandable={{ expandedRowRender: (record) => ( <p style={{ margin: 0 }}>
          <b>Dirección:</b> {record.address} <br />
          <b>Apoderado:</b> {record.guardian.first_name} {record.last_name} <br />
          <b>Apoderado teléfono:</b> {record.guardian.phone_number}  <br />
          <b>Apoderado email:</b> {record.guardian.email}  <br />
        </p>)}} size='small' dataSource={state.lists.students} columns={columnsStudents} rowKey='id'/>
    </Card>
  )
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


export default Students
