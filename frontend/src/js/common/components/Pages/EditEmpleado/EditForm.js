/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { renderField } from '../../Utils/renderField';


class EditForm extends Component {


    render() {
        const { handleSubmit } = this.props;

        return (
            <form action="" onSubmit={handleSubmit} className="py-4">
            <div className="border-top p-0 px-3 pt-3">
                <div className="mb-3 col-12">
                    <strong className="text-muted d-block mb-2">Editar Empleado</strong>
                    <div className="row">
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="codigo">Código</label>
                            <Field
                            type="text"
                                name="codigo"
                                placeholder="Código"
                                component={renderField}
                                className="form-control"

                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="nombre">Nombre</label>
                            <Field
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                component={renderField}
                                className="form-control"

                            />
                        </div>
                        <div className="col-md-6 col-12 mb-2">
                            <label htmlFor="apellido">Apellido</label>
                            <Field
                            type="text"
                                name="apellido"
                                placeholder="Apellido"
                                component={renderField}
                                className="form-control"
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className="d-flex">
                        <button className="btn btn-primary mx-auto mb-3">Actualizar</button>
                    </div>
            </form>
        );
    }
}


export default reduxForm({
    form: 'empleado', // a unique identifier for this form
})(EditForm);
