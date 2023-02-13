import React, { useEffect, useContext } from 'react'
import { Card, Table } from 'antd'
import api from '../../api/endpoints'
import { AttendancesContext } from '../../screens/Attendances'


const List = () => {
  
  const { state, dispatch } = useContext(AttendancesContext)

  const getAttendences = async() => {

    const rq = await api.attendances.lists.all().then((r)=> {
      console.log(r,'a')
      dispatch({
        type: 'ADD_LIST',
        payload: {
          list: r.data.results
        }
      })
    })

      return rq
  }

  const columns = [
    {title:'Alumno', render: (x)=> <>{x.student.first_name} {x.student.last_name}</>},
    {title:'Apoderado', render:(x)=> <>{x.student.guardian.first_name} {x.student.guardian.last_name}</>},
    {title:'Fecha', render: (x)=>x.date},
    {title:'Asistencia confirmaada', render:(x)=><>{x.is_attend ? 'ASISTIRA':'NO ASISTIRA'}</>}
  ]

  useEffect(()=> {
    getAttendences() 
  }, [])

  return(<Card title='Asistencias'>
      <Table dataSource={state.attendances} columns={columns} rowKey={'id'} />
    </Card>)

}


export default List
