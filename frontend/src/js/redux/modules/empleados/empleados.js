import { handleActions } from "redux-actions";
import { api } from "api"
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { goBack, push } from "react-router-redux";
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
const getEmpleado = (id) => (dispatch, getStore) => {

    dispatch(setLoader(true))
    api.get(`empleados/${id}`, {})
        .then(response => {
            console.log('res',response)
            dispatch(initializeForm('empleado', response));
            dispatch(setItem(response))
        })
        .catch(() => {
            dispatch(setItem({}))
        })
        .finally(() => {
            dispatch(setLoader(false))
        })
}
const updateEmpleado = (data = {}, attachments=[]) => (dispatch, getStore) => {

    dispatch(setLoader(true))
    api.putAttachments(`empleados/update_empleado`, data, attachments)
        .then(response => {
            console.log('res',response)
            dispatch(setItem(response))
            NotificationManager.success('Datos actualizados exitosamente', 'Satisfactorio', 1000);
            dispatch(goBack());
        })
        .catch(() => {
            NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false))
        })
}
const deleteEmpleado = (id) => (dispatch, getStore) => {

    dispatch(setLoader(true))
    api.eliminar(`empleados/${id}`, {})
        .then(response => {
            dispatch(listar())
            NotificationManager.success('Empleado eliminado exitosamente', 'Satisfactorio', 1000);
        })
        .catch(() => {
            NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
        })
        .finally(() => {
            dispatch(setLoader(false))
        })
}

export const actions = {
    listar,
    getEmpleado,
    updateEmpleado,
    deleteEmpleado
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
    },
    [EMPLEADO]: (state, { item }) => {
        return {
            ...state,
            item
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
