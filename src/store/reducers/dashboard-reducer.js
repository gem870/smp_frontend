import { actions } from "../action-types/dashboard-action-types";
import { _state } from "../states/dashboard-state";

export const dashboardReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.FETCH_DASHBOARD_COUNT_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false
            };
        case actions.FETCH_DASHBOARD_COUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                dashboardCountItem: payload,
                isSuccessful: true,
            };
        case actions.FETCH_DASHBOARD_COUNT_FAILED:
            return {
                ...state,
                loading: false,
                isSuccessful: false,
                message: payload
            };
        default:
            return state;
    }
}