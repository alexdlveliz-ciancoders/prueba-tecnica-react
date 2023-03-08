import { handleActions } from "redux-actions";
import { api } from "api"

const LOADER = 'EMPLEADO_LOADER'
const LIST_EMPLEADOS = 'LIST_EMPLEADOS'
const EMPLEADO = 'EMPLEADO'

// Pure Actions
export const setLoader = loader => ({
    type: LOADER,
    loader
})

export const setData = data => ({
    type: LIST_EMPLEADOS,
    data
})

export const setItem = item => ({
    type: EMPLEADO,
    item
})

// Actions
const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore()['empleados']
    const params = { page }
    dispatch(setLoader(true))
    api.get('empleados', params)
        .then(response => {
            dispatch(setData(response))
        })
        .catch(() => {
            dispatch(setData({results: [], count: 0}))
        })
        .finally(() => {
            dispatch(setLoader(false))
        })
}

export const actions = {
    listar
}

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader
        }
    },
    [LIST_EMPLEADOS]: (state, { data }) => {
        return {
            ...state,
            data
        }
    }
}

export const initialState = {
    loader: false,
    data: {
        results: [],
        count: 0
    },
    item: {}
}

export default handleActions(reducers, initialState)