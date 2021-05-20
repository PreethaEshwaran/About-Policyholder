import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { FormContext } from '../FormContext';
import '../App.css';

function TextInput({field_id, field_label, field_placeholder, field_value, errors}){

    const { handleChange } = useContext(FormContext)
    
    return (
        <Form.Group>
            <Form.Label>{field_label}</Form.Label>
            <Form.Control className="form-field" placeholder={field_placeholder? field_placeholder : " "} value={field_value} onChange={event => handleChange(field_id, event)}/>
            <span style={{color: "red"}}>{errors ? errors : ""}</span>
        </Form.Group>
      );
}

export default TextInput;