import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/empleados/empleados'
import ListadoEmpleados from './ListadoEmpleados';


const ms2p = (state) => {
    return { ...state.empleados };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ListadoEmpleados);
