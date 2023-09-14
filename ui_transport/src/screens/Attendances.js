import React, { createContext, useReducer } from "react";
import { Row, Col } from "antd";
import List from "../components/attendance/List";
import { attendancesReducer } from "../reducers/attendancesReducer";

export const AttendancesContext = createContext();

const Attendances = () => {
  const initialState = {
    attendances: [],
  };

  const [state, dispatch] = useReducer(attendancesReducer, initialState);

  console.log(state);

  return (
    <AttendancesContext.Provider value={{ state, dispatch }}>
      <Row style={styles.container} justify="center">
        <Col span={window.innerWidth > 900 ? 17 : 24}>
          <List />
        </Col>
      </Row>
    </AttendancesContext.Provider>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
};

export default Attendances;
