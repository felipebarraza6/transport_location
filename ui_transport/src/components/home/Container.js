import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import QuickFunctions from './QuickFunctions'
import Users from '../../screens/Users'
import CollegeStudents from '../../screens/CollegeStudents'
import Attendances from '../../screens/Attendances'
import Profile from '../../screens/Profile'
import { AppContext } from '../../App'

const { Content } = Layout

const Container = () => {

  const {state} = useContext(AppContext)

  return(
    <Content style={styles.content}>
      <Routes>
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/colleges_students" element={<CollegeStudents />} />
        <Route exact path="/attendances" element={< Attendances />} />
        {state.user && <>
          {state.user.type_user === 'ADM' && <Route exact path="/" element={<Profile />} />}
          {state.user.type_user === 'GUA' && <Route exact path="/" element={<QuickFunctions />} />}
          {state.user.type_user === 'DRV' && <Route exact path="/" element={<Profile />} />}
          </>}
        <Route exact path="/profile" element={<Profile />} />
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
