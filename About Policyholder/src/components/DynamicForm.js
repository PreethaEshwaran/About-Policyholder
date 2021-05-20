import React from 'react';
import { Form, Button } from 'react-bootstrap';
import formJSON from './formData.json';
import { useState, useEffect } from 'react';
import Element from './Element';
import FormLayout from './FormLayout';
import { FormContext } from './FormContext';
import FileUpload from './FileUpload';

function DynamicForm() {

  const [personal_details_elements, setPersonal_details_elements] = useState(formJSON[0]);

  useEffect(() => {
  }, [])
  const [contact_details_elements, setContact_details_elements] = useState(formJSON[1]);

  useEffect(() => {
  }, [])
  const [other_details_elements, setOther_details_elements] = useState(formJSON[2]);

  useEffect(() => {
  }, [])
  const { personal_details_fields, personal_details_page_label } = personal_details_elements ?? {}
  const { contact_details_fields, contact_details_page_label } = contact_details_elements ?? {}
  const { other_details_fields, other_details_page_label } = other_details_elements ?? {}

  const handleSubmit = (event) => {
    event.preventDefault();

    const personal_details_newElements = { ...personal_details_elements }
    personal_details_newElements.personal_details_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value == "" && field.field_mandatory == "yes") {
          field.errors = "Should not be empty";
          setPersonal_details_elements(personal_details_newElements);
        }
      })
    });

    const contact_details_newElements = { ...contact_details_elements }
    contact_details_newElements.contact_details_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value == "" && field.field_mandatory == "yes") {
          field.errors = "Should not be empty";
          setContact_details_elements(contact_details_newElements);
        }
      })
    });
    const other_details_newElements = { ...other_details_elements }
    other_details_newElements.other_details_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value == "" && field.field_mandatory == "yes") {
          field.errors = "Should not be empty";
          setOther_details_elements(other_details_newElements);
        }
      })
    });

    console.log(personal_details_elements)

  }

  const handleChange = (id, event) => {
    const newElements = { ...personal_details_elements }
    newElements.personal_details_fields.forEach(row => {
      row.fields.forEach(field => {
        if (id === field.field_id) {
          switch (field.field_type) {
            case 'checkbox':
              field.field_value = event.target.checked;
              break;

            case 'multiple_select':
              field.field_value = Array.from(event.target.selectedOptions, option => option.value);
              break;

            default:
              field.field_value = event.target.value;
              break;
          }
        }

        field.errors = "";
        if((field.field_id === "Policy Holder's First Name_Id")||(field.field_id === "Policy Holder's Last Name_Id") ){
          if(field.field_value != ""){

            if(!field.field_value.match(/^[a-zA-Z]+$/)){

              field.errors = "Must be a String";
              }
          }
        }

        setPersonal_details_elements(newElements)
      })
    });



    const contact_details_newElements = { ...contact_details_elements }
    contact_details_newElements.contact_details_fields.forEach(row => {
      row.fields.forEach(field => {
        if (id === field.field_id) {
          switch (field.field_type) {
            case 'checkbox':
              field.field_value = event.target.checked;
              break;

            case 'multiple_select':
              field.field_value = Array.from(event.target.selectedOptions, option => option.value);
              break;

            default:
              field.field_value = event.target.value;
              break;
          }
        }

        field.errors = "";
        if(field.field_id === "Contact Number_Id"){
         
          if(field.field_value != ""  ){
           
            if(!field.field_value.match(/^\d{10}$/)){
                field.errors = "should be 10 numbers";
            
          }
         

          }
        }
  
        if(field.field_id === "Email Address_Id" ){
          if(field.field_value != ""){
            if(!field.field_value.match("^(.+)@(.+)$")){
                            field.errors = "Invalid";
            }
          }
        }
        if((field.field_id === "Address1_Id")||(field.field_id === "Address2_Id") ){
          if(field.field_value != ""){

            if(!field.field_value.match(/^[a-zA-Z0-9]+$/)){

              field.errors = "invalid";
              }
          }
        }
        if(field.field_id === "Postal Code_Id" ){
          if(field.field_value != ""){

            if(!field.field_value.match(/^\d{6}$/)){

              field.errors = "Should be 6 digit";
              }
          }
        }


        setContact_details_elements(contact_details_elements)
      })
    });


    const other_details_newElements = { ...other_details_elements }
    other_details_newElements.other_details_fields.forEach(row => {
      row.fields.forEach(field => {
        if (id === field.field_id) {
          switch (field.field_type) {
            case 'checkbox':
              field.field_value = event.target.checked;
              break;

            case 'multiple_select':
              field.field_value = Array.from(event.target.selectedOptions, option => option.value);
              break;

            default:
              field.field_value = event.target.value;
              break;
          }
        }

        field.errors = "";
        if((field.field_id === "Policy holder Occupation_Id")||(field.field_id === "Occupation Type_Id") ){
          if(field.field_value != ""){

            if(!field.field_value.match(/^[a-zA-Z]+$/)){

              field.errors = "Must be a String";
              }
          }
        }

        setOther_details_elements(other_details_elements)
      })
    });

  }

  return (

    <FormContext.Provider value={{ handleChange }}>
      <Form className="container">
        <div className="PersonalDetails">
          <h5 id="title">{personal_details_page_label}</h5>


          {
            personal_details_fields.map((field, i) => {
              if (field.layout === "row") {
                return (
                  <FormLayout
                    key={i}
                    field={field}
                  />
                );
              }
              else {
                return (
                  <Element
                    key={i}
                    field={field.personal_details_fields[0]}
                  />
                );
              }
            })
          }

        </div>
        <h3>{contact_details_page_label}</h3>


        {
          contact_details_fields.map((field, i) => {
            if (field.layout === "row") {
              return (
                <FormLayout
                  key={i}
                  field={field}
                />
              );
            }
            else {
              return (
                <Element
                  key={i}
                  field={field.fields[0]}
                />
              );
            }
          })
        }


        <h3>{other_details_page_label}</h3>


        {
          other_details_fields.map((field, i) => {
            if (field.layout === "row") {
              return (
                <FormLayout
                  key={i}
                  field={field}
                />
              );
            }
            else {
              return (
                <Element
                  key={i}
                  field={field.fields[0]}
                />
              );
            }
          })
        }


        <FileUpload />


        <Button variant="success" className="button-rounded" type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
          </Button>
      </Form>
    </FormContext.Provider>
  );
}

export default DynamicForm;