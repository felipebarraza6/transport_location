import React, { useContext } from 'react'
import { Layout, Row, Col, 
        Typography, Button } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'

const { Header } = Layout
const { Title } = Typography

const HeaderApp = () => {

  const { state, dispatch } = useContext(AppContext)

  const LogOut = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  return(<Header>
    <Row style={styles.container}>
      <Col>
        <Title style={styles.title} level={2}>TransportApp</Title> 
      </Col>
      <Col offset={5} style={styles.colMenu}>
        <Link to='/'>
          <Button type='primary'>
            Inicio            
          </Button>
        </Link>
      </Col>
      <Col style={styles.colMenu}>
        <Link to='/users'>
          <Button type='primary'>
            Usuarios
          </Button>
        </Link>
      </Col>
      <Col style={styles.colMenu}>
        <Link to='/colleges_students'>
           <Button type='primary'>
             Colegios y Estudiantes
           </Button>
         </Link>
      </Col>
      <Col style={styles.colMenu}>
        <Link to='/attendance_books'>
          <Button type='primary'>
            Libros de asistencía            
          </Button>
        </Link>
      </Col>
      <Col style={styles.colMenu}>
        <Link to='/profile'>
          <Button icon={<UserOutlined />}>
            {state.user.username}           
          </Button>
        </Link>

      </Col>

      <Col style={styles.colMenu}>
        <Button icon={<LogoutOutlined />} onClick={LogOut} >Salir</Button>
      </Col>
    </Row>
  </Header>)

}

const styles = {
  container: {
    padding:'0px'
  },
  colMenu: {
    marginRight: '15px'
  },
  title: {
    color: 'white',
    paddingTop:'10px'
  }
}


export default HeaderApp
