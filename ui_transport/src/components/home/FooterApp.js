import React from 'react'
import { Layout, Typography } from 'antd'

const { Footer } = Layout
const { Paragraph } = Typography

const FooterApp = () => {

  return(<Footer style={styles.footer}>
      <Paragraph style={styles.paragraph}>
        Gestión de Transporte - 2023
      </Paragraph>
    </Footer>)
}

const styles = {
  footer: {
    backgroundColor: '#1677ff',
  },
  paragraph: {
    textAlign: 'center',
    color:'white',
    fontSize: '16px',
    fontWeight: 'bold'
  }
}


export default FooterApp
