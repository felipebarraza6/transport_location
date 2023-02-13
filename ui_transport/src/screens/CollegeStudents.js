import React, { createContext, useReducer } from 'react'

import { Row, Col, Typography } from 'antd'
import { collegeStudentsReducer } from '../reducers/collegeStudentsReducer' 

// Create
import CreateCollege from '../components/colleges_students/colleges/Create'
import CreateGrade from '../components/colleges_students/grades/Create'
import CreateStudent from '../components/colleges_students/students/Create'

//Lists & functions
import Colleges from '../components/colleges_students/lists/Colleges'
import Grades from '../components/colleges_students/lists/Grades'
import Students from '../components/colleges_students/lists/Students'

export const CollegeStudentsContext = createContext()


const { Title } = Typography


const CollegeStudents = () => {

  const initialState = {
    selectedObjUpdate: null,
    college_selected: null,
    grade_selected: null,
    lists: {
      colleges: null,
      grades: null,
      students: [] 
    },
    update_modals: {
      colleges_open_modal: false,
      grades_open_modal: false,
      students_open_modal: false
    },
    create_modals: {
      colleges_open_modal: false,
      grades_open_modal: false,
      students_open_modal: false
    },
    updateCountData: 0,
  }

  const [state, dispatch] = useReducer(collegeStudentsReducer, initialState)
  console.log(state) 

  return(<CollegeStudentsContext.Provider value={{ state, dispatch }}>
      <CreateCollege />
      <CreateGrade />
      <CreateStudent />
      <Row style={styles.container} justify={'center'} align='top'>
        <Col span={24}>
          <Title style={styles.title} level={4}>Gestión de colegios, cursos y estudiantes</Title>
        </Col>
        <Col span={8}>
          <Colleges /> 
        </Col>
        <Col span={8}>
          <Grades /> 
        </Col>
        <Col span={8}>
          <Students /> 
        </Col>
      </Row>
    </CollegeStudentsContext.Provider>)

}


const styles = {
  title: {
    textAlign: 'left',
    marginBottom:'30px'
  },
  container: {
    marginTop:'10px'
  },
  card: {
    marginRight:'5px'
  }
}


export default CollegeStudents
