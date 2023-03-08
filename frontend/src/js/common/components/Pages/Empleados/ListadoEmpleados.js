import React, { Component } from 'react'
import { TableHeaderColumn } from 'react-bootstrap-table'
import Grid from '../../Utils/Grid'
import { standardActions } from '../../Utils/Grid/StandardActions'


class ListadoEmpleados extends Component {
    componentDidMount() {
        const { listar } = this.props
        listar()
    }

    render() {
        const { data, loader } = this.props
        return (
            <div className="py-4">
                <h2>Listado de empleados</h2>
                <div className="row">
                    <div className="mb-4 col-lg-12">
                        <div className="mb-4 card card-small">
                            <div className="border-bottom card-header d-flex justify-content-center">
                                <h3 className="m-0">Empleados</h3>
                            </div>
                            <div className='p-0 px-3 pt-3'>
                                <Grid data={data} loading={loader}>
                                    <TableHeaderColumn
                                        isKey
                                        dataField='codigo'
                                    >
                                        Código
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='nombre'
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField='apellido'
                                    >
                                        Apellido
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="id"
                                        dataAlign="center"
                                        dataFormat={standardActions({ editar: 'empleados', eliminar: () => {} })}
                                    >
                                        Acciones
                                    </TableHeaderColumn>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListadoEmpleados