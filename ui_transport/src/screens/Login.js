import React from 'react'
import { Row, Col, Space } from 'antd'
import wallpaper from '../assets/images/wallpaper.jpg'
import Form from '../components/login/Form'

const Login = () => {



    return(<Row align={'middle'} justify='end' style={styles.rowBackground} >
        <Col  style={{marginTop:'-130px', paddingRight:'120px'}}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Form />                     
        </Space>            
        </Col>

    </Row>)
}

const styles = {
  rowBackground: {
    backgroundImage:`url(${wallpaper})`,
        minHeight: '820px',    
      /* Create the parallax 
      scrolling effect */
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
  }
}


export default Login
