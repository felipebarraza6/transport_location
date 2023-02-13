export const collegeStudentsReducer = (state, action) => {
    switch (action.type) {
      
      case 'TOGGLE_MODAL_CREATE':
        return {
          ...state,
          create_modals: {
            colleges_open_modal: action.colleges ? action.colleges:false,
            grades_open_modal: action.grades ? action.grades:false,
            students_open_modal: action.students ? action.students:false 
          },
        }

      case 'COLLEGE_SELECTED':
        return {
          ...state,
          college_selected: action.college
        }
      case 'GRADE_SELECTED':
        return {
          ...state,
          grade_selected: action.grade
        }

      case 'SELECT_OBJ':
        return {
          ...state,
        }
      
      case 'UNSELECT_OBJ':
        return {
          ...state,
        }

      case 'UPDATE_DATA':
        return {
          ...state,
          updateCountData: state.updateCountData + 1 
        }

      case 'ADD_STUDENT_LIST':
        return {
          ...state,
          lists:{
            ...state.lists,
            students: action.student
          }
        }

      case 'ADD_GRADE_SELECTED':
        return {
          ...state,
          grade_selected: action.grade
        }

      case 'ADD_COLLEGE_SELECTED':
        return {
          ...state,
          college_selected: action.college
        }


      case 'ADD_LIST':
        return {
          ...state,
          lists: {
            ...state.lists,
            colleges: action.payload.colleges,
          }
        }
      case 'ADD_LIST_GRADES':
        return {
          ...state,
          lists: {
            ...state.lists,
            grades: action.grades,
          }
        }
      case 'ADD_LIST_STUDENTS':
        return {
          ...state,
          lists: {
            ...state.lists,
            students: action.students,
          }
        }

                
        default:
            return state
    }
}
