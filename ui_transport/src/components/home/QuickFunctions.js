import React, { useContext } from 'react'
import { Row, Col, Card, 
        Button, Typography } from 'antd'
import { UserOutlined, BuildOutlined, BookOutlined,
         UsergroupAddOutlined, OrderedListOutlined,
         PushpinOutlined } from '@ant-design/icons'
import { AppContext } from '../../App'


const QuickFunctions = () => {

  const { Title } = Typography

  const { state, dispatch } = useContext(AppContext)

  const functionsAdmin = [
    {
      'name': 'Crear Usuario',
      'type_user': ['admin'],
      'icon': <UserOutlined />,
      'func': () => {
        dispatch({ type: 'OPEN_USER_CREATE', payload: true })
      }
    },
    {
      'name': 'Ver Usuarios',
      'type_user': ['admin'],
      'icon': <UserOutlined />
    },
    {
      'name': 'Crear Colegio',
      'type_user': ['admin'],
      'icon': <BuildOutlined />
    },
    {
      'name': 'Ver colegios',
      'type_user': ['admin'],
      'icon': <BuildOutlined />
    },
    {
      'name': 'Crear Estudiante',
      'type_user': ['admin'],
      'icon': <BookOutlined />
    },
    {
      'name': 'Ver estudiantes',
      'type_user': ['admin'],
      'icon': <BookOutlined />
    },
    {
      'name': 'Crear Curso',
      'type_user': ['admin'],
      'icon': <UsergroupAddOutlined />
    },
    {
      'name': 'Ver Cursos',
      'type_user': ['admin'],
      'icon': <UsergroupAddOutlined />
    },
    {
      'name': 'Crear libro de asistencía',
      'type_user': ['admin'],
      'icon': <OrderedListOutlined />
    },
    {
      'name': 'Ver libros de asistencía',
      'type_user': ['admin'],
      'icon': <OrderedListOutlined />
    },
    {
      'name': 'Registro rutas de conductores',
      'type_user': ['admin'],
      'icon': <PushpinOutlined />
    },
  ]


  return(<Row justify={'start'} align={'middle'} style={styles.container}>
      <Col span={6} >
        <Title level={2} style={styles.title}>
          <u>ACCESOS DIRECTOS</u>
        </Title>
      </Col>
     {functionsAdmin.map((x, index)=> <Col key={index} span={6}>
        <Card style={styles.card} hoverable>
          <Button icon={x.icon} type='ghost' size='large' onClick={x.func}>{x.name}</Button>
        </Card>
       </Col>)} 
    </Row>)
}

const styles = { 
  container: {
    marginTop:'150px'
  },
  title: {
    margin: '20px'
  },
  card: {
    margin:'5px',
    backgroundImage: 'linear-gradient(to right top, #d6e4ff, #dce3f8, #e1e3f1, #e3e3ea, #e4e4e4)'
  }
}


export default QuickFunctions
