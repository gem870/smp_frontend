import { _state } from "../states/grade-setting-state";
import { actions } from "../action-types/grade-setting-action-types";
export const gradeReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_GRADE_CLASSES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_GRADE_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        classList: payload,
      };
    case actions.FETCH_GRADE_CLASSES_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    case actions.FETCH_PREVIOUS_GRADES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_PREVIOUS_GRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        prevGradesList: payload,
      };
    case actions.FETCH_PREVIOUS_GRADES_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_GRADE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_GRADE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_GRADE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.UPDATE_GRADE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_GRADE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_GRADE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

      case actions.NEW_CLASS_STATE:
        return {
          ...state,
          newClassList: [...state.newClassList, payload]
        };
  

    case actions.UPDATE_CLASS_STATE:{
      var updatedClassList = filterClasses(state.newClassList, payload)
      return {
        ...state,
        newClassList: updatedClassList
      };
    }

    default:
      return state;
  }
};
function filterClasses(arr, value) {
  let prevClasses = arr.map((list) => list.className);
  if (prevClasses !== value) {
    return arr.splice(arr.length - 1, 1);
  } else{
    return arr
  }
}