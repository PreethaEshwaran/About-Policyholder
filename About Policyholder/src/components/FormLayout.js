import React from 'react';
import Element from './Element';
import { Form, Col } from 'react-bootstrap';

function FormLayout({ field } ){
    const fields = field.fields;

        return (
            <Form.Row>
                {fields.map((field, i) => {
                    return (
                    <Col key={i}>
                        <Element
                            key={i}
                            field={field}
                        />
                    </Col>
                    );
                })}
            </Form.Row>
          
        );
}

export default FormLayout;