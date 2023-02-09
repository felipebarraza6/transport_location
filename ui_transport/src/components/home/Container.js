import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import QuickFunctions from './QuickFunctions'
import Users from '../../screens/Users'

const { Content } = Layout

const Container = () => {

  return(
    <Content style={styles.content}>
      <Routes>
        <Route exact path="/" element={<QuickFunctions />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/colleges_students" element={<>colegios y estudiantes</>} />
        <Route exact path="/attendance_books" element={<>libros de asistencia</>} />
        <Route exact path="/profile" element={<>perfil</>} />
      </Routes>
    </Content>)

}

const styles = { 
  content: { 
    margin: '10px',
    padding: '10px',
    minHeight: '78.9vh',
  }
}


export default Container
