import React, { useContext } from 'react';
import DatePicker from "react-datepicker";
import '../App.css';
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';
import { FormContext } from '../FormContext';

function YearPicker({field_id, field_label, field_placeholder, field_value, errors}){

    const { handleChange } = useContext(FormContext)
    
    return (
        <Form.Group>
            <Form.Label>{field_label}</Form.Label>
            <DatePicker selected={field_value} showYearPicker dateFormat="yyyy" onChange={event => handleChange(field_id, event)} dropdownMode="select"/>
        </Form.Group>
      );
}

export default YearPicker;