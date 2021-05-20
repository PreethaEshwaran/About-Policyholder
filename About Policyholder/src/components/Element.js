import React from 'react';
import TextInput from './elements/TextInput'
import DateInput from './elements/DateInput'
import Select from './elements/Select'
import Radio from './elements/Radio'
import YearPicker from './elements/YearPicker'

function Element({ field }){
        switch (field.field_type) {
            case 'text':
                return (
                <TextInput
                    field_id={field.field_id}
                    field_label={field.field_label}
                    field_placeholder={field.field_placeholder}
                    field_value={field.field_value}
                    errors={field.errors}
    
                />)
            
            case 'date':
                return (<DateInput
                    field_id={field.field_id}
                    field_label={field.field_label}
                    field_placeholder={field.field_placeholder}
                    field_value={field.field_value}
                    errors={field.errors}
    
                />)

            case 'year':
                return (<YearPicker
                    field_id={field.field_id}
                    field_label={field.field_label}
                    field_placeholder={field.field_placeholder}
                    field_value={field.field_value}
                    errors={field.errors}
    
                />)

            case 'select':
                return (<Select
                    field_id={field.field_id}
                    field_label={field.field_label}
                    field_value={field.field_value}
                    field_options={field.field_options}
                    errors={field.errors}
    
                />)
            
            case 'radio':
                return (<Radio
                    field_id={field.field_id}
                    field_label={field.field_label}
                    field_value={field.field_value}
                    field_options={field.field_options}
                    errors={field.errors}
    
                />)

            default:
                return null;
        }
}

export default Element;