import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import '../App.css';
import { FormContext } from '../FormContext';

function DateInput({field_id, field_label, field_placeholder, field_value, errors}){

    const { handleChange } = useContext(FormContext)
    
    return (
        <Form.Group>
            <Form.Label>{field_label}</Form.Label>
            <Form.Control className="form-field" type="date" value={field_value} format="dd-mm-yyyy" onChange={event => handleChange(field_id, event)}/>
            <span style={{color: "red"}}>{errors ? errors : ""}</span>
        </Form.Group>
      );
}

export default DateInput;