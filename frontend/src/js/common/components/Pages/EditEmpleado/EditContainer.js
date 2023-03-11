/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { Component } from 'react';
import EditForm from './EditForm';



class EditContainer extends Component {

 componentDidMount() {
        const { params: { id } } = this.props.match;
        const { getEmpleado } = this.props;
        getEmpleado(id)
    }

  submit = (values) => {
    const { updateEmpleado }=this.props
    updateEmpleado(values)
  };

  render() {
    return (
        <EditForm onSubmit={this.submit}
      />
    );
  }
}

export default EditContainer;
