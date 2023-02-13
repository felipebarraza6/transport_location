import React, { useContext, useState, useEffect } from 'react'
import { Row, Col, Typography } from 'antd'

import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { AppContext } from '../../App'
import { Map, Marker, Popup, TileLayer, MapContainer } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const QuickFunctions = () => {


  const { state, dispatch } = useContext(AppContext)
  const [coordinates, setCoordinates] = useState({
    latitude: state.profile.location.latitude,
    longitude: state.profile.location.longitude,
  })

  

  console.log(state)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async(position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error(error)
    ); 
  },[])


  return(<Row justify={'center'} align={'middle'}>
    <Col xl={6} xs={24} lg={6} style={{marginTop:'50px'}}>
      <Typography.Title level={3}>Ubicación en tiempo real</Typography.Title>
      Conductor/a: <b>{state.profile.students[0].grade.driver.first_name} {state.profile.students[0].grade.driver.last_name}</b>
    </Col>
    <Col xl={18} xs={24} lg={18} style={{marginTop:'50px'}}>
    <MapContainer center={[coordinates.latitude, coordinates.longitude]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[coordinates.latitude, coordinates.longitude]}>
      <Popup>
        Ubicación del conductor
      </Popup>
    </Marker>
  </MapContainer>
</Col>
         </Row>)
}

const styles = { 
  container: {
    marginTop:'150px'
  },
  title: {
    margin: '20px',
  },
  card: {
    margin:'5px',
    backgroundImage: 'linear-gradient(to right top, #d6e4ff, #dce3f8, #e1e3f1, #e3e3ea, #e4e4e4)'
  }
}


export default QuickFunctions
