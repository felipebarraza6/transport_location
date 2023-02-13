import React, { useContext, useState, useEffect } from 'react' 
import { Badge, Row, Col, Descriptions, Button, notification } from 'antd'
import { AppContext } from '../App'
import api from '../api/endpoints'

const Profile = () => {
  
  const { state } = useContext(AppContext)
  const date_f = new Date()

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async(position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        const rq = await api.locations.create({
          'driver': state.user.id,
          'latitude': position.coords.latitude,
          'longitude': position.coords.longitude
        })
      },
      (error) => console.error(error)
    );

    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        async(position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          const rq = await api.locations.create({
          'driver': state.user.id,
          'latitude': position.coords.latitude,
          'longitude': position.coords.longitude
        })
        },
        (error) => console.error(error)
      );
    }, 180000);

    return () => clearInterval(intervalId);
  }, []);

  return(<Row style={styles.container} justify={'center'} align="middle">
      <Col span={17}>
        <Descriptions title='Tu Perfil' bordered>
    <Descriptions.Item label="Usuario">@{state.user.username}</Descriptions.Item>
    <Descriptions.Item label="Nombre">{state.user.first_name.toUpperCase()}</Descriptions.Item>
    <Descriptions.Item label="Apellido">{state.user.last_name.toUpperCase()}</Descriptions.Item>
    <Descriptions.Item label="Teléfono">{state.user.phone_number}</Descriptions.Item>
    <Descriptions.Item label="Email" span={2}>
    {state.user.email} 
    </Descriptions.Item>
    <Descriptions.Item label="Rut" span={3}>
      <Badge status="processing" text={state.user.dni} />
    </Descriptions.Item>
    <Descriptions.Item label="Tipo de perfil">
      {state.user.type_user === 'ADM' && 'ADMINISTRADOR'}
      {state.user.type_user === 'DRV' && 'CONDUCTOR'}
      {state.user.type_user === 'GUA' && 'APODERADO'}
    </Descriptions.Item>
    </Descriptions>

    
      </Col>
<Col span={17}>
    {state.user.type_user === 'DRV' &&
      <Descriptions bordered style={styles.container2} title='Sincronizacion de GPS'>
        <Descriptions.Item span={3} label='Tu latitud actual'>
           {coordinates.latitude}
        </Descriptions.Item>
        <Descriptions.Item span={3} label='Tu longitud actual'>
           {coordinates.longitude}
        </Descriptions.Item>
      </Descriptions>
    }
{state.user.type_user === 'GUA' &&
      <Descriptions bordered size='small' style={styles.container2} title='ESTUDIANTES'>
        {state.profile && <>
        {state.profile.students.map((x)=> {
          return(<>
            <Descriptions.Item span={3} label="Nombre">
              {x.first_name} {x.last_name} ({x.dni}) 
              <Button type='primary' size='small' style={{marginLeft:'50px'}} onClick={async()=> {
                var date = new Date()
                date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

                const rq = await api.attendances.create({
                  'student': x.id,
                  'date': date,
                  'is_attend': true
                }).then((r)=> {
                  notification.success({message:'ASISTENCIA CONFIRMADA CORRTAMENTE'})
                })

              }}>Confirmar asistencía para hoy {date_f.getDate()}/{date_f.getMonth()+1}/{date_f.getFullYear()}</Button>
              <Button type='primary' size='small' style={{marginLeft:'50px'}} onClick={async()=> {
                var date = new Date()
                date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

                const rq = await api.attendances.create({
                  'student': x.id,
                  'date': date,
                  'is_attend': false
                }).then((r)=> {
                  notification.success({message:'INASISTENCIA CONFIRMADA CORRTAMENTE'})
                })

              }} danger>Confirmar inacistencía para hoy {date_f.getDate()}/{date_f.getMonth()+1}/{date_f.getFullYear()}</Button>

            </Descriptions.Item>
          </>)
        })}
</>}
      </Descriptions>
    }

    </Col>
    </Row>)

}

const styles = {
  container:{
    marginTop:'70px'
  },
  container2: {
    marginTop:'30px'
  }
}

export default Profile
