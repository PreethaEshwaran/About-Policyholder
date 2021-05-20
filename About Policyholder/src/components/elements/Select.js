import React, { useContext } from 'react'
import { Form } from 'react-bootstrap';
import '../App.css';
import { FormContext } from '../FormContext';

const Select = ({ field_id, field_label, field_placeholder, field_value, field_options, errors}) => {

    const { handleChange } = useContext(FormContext)

    return (
        <Form.Group>
            <Form.Label>{field_label}</Form.Label>
            <Form.Control className="form-field" as="select" value={field_value} onChange={event => handleChange(field_id, event)}>
            <option >-- Please Select --</option>
                {field_options.length > 0 && field_options.map((option, i) =>
                    <option value={option.option_label} key={i}>{option.option_label}</option>

                )}
                </Form.Control>
            <span style={{color: "red"}}>{errors ? errors : ""}</span>
        </Form.Group>
    )
}

export default Select