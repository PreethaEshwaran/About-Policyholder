import React from 'react';
import { Form, Button } from 'react-bootstrap';
import formJSON from './formData.json';
import { useState, useEffect } from 'react';
import Element from './Element';
import FormLayout from './FormLayout';
import { FormContext ,AddressContext,DriverAddressContext,HideAddressContext,DriverFindAddressContext} from './FormContext';
import FileUpload from './FileUpload';
import axios from "axios";


function DynamicForm() {
  const [users, setUser] = useState([]);

  
  const [personal_details_elements, setPersonal_details_elements] = useState(formJSON[0]);

 

  const [contact_details_elements, setContact_details_elements] = useState(formJSON[1]);

 
  const [other_details_elements, setOther_details_elements] = useState(formJSON[2]);
  const [driver_details_elements, setdriver_details_elements] = useState(formJSON[3]);


  

  const { personal_details_fields, personal_details_page_label,page_description } = personal_details_elements ?? {}
  const { contact_details_fields, contact_details_page_label } = contact_details_elements ?? {}
  const { other_details_fields, other_details_page_label } = other_details_elements ?? {}
  const { about_driver_fields, about_driver_page_label } = driver_details_elements ?? {}
 const loadAddress = async () => {
    const response = await fetch("https://run.mocky.io/v3/00c77025-ac6e-4bf7-8892-7b40aa93572b");
    const vehicleDetailsData = await response.json();
    console.log(vehicleDetailsData);
    
    const contact_details_newElements = { ...contact_details_elements }
contact_details_newElements.contact_details_fields.forEach(row => {    row.fields.forEach(field => {
    
    if(field.field_id === "City/Town_Id"){
    field.field_value = vehicleDetailsData.City;
    }
    if(field.field_id === "Country_Id"){
      field.field_value = vehicleDetailsData.Country;
      }
      setContact_details_elements(contact_details_newElements);

    })
    });
  }


  const driverFindAddress = async () => {
    const response = await fetch("https://run.mocky.io/v3/00c77025-ac6e-4bf7-8892-7b40aa93572b");
    const vehicleDetailsData = await response.json();
    console.log(vehicleDetailsData);
    
    const driver_details_newElements = { ...driver_details_elements }
    driver_details_newElements.about_driver_fields.forEach(row => {
      row.fields.forEach(field => {
        
        if(field.field_id === "driverAddress1_Id"){
    field.field_value = vehicleDetailsData.AddressLine1;
    }
    if(field.field_id === "driverAddress2_Id"){
      field.field_value = vehicleDetailsData.AddressLine2;
      }
      if(field.field_id === "driverCountry_Id"){
        field.field_value = vehicleDetailsData.Country;
        }
    if(field.field_id === "driverCity/Town_Id"){
      field.field_value = vehicleDetailsData.City;
      }
    setdriver_details_elements(driver_details_newElements);


    })
    });
  }



const hideDetails=()=>{
  console.log("hide");
  const driver_details_newElements = { ...driver_details_elements }
    driver_details_newElements.about_driver_fields.forEach(row => {
      row.fields.forEach(field => {
       
          

field.field_value=" ";
setdriver_details_elements(driver_details_newElements);

      })

    });

}

 




const driverloadAddress =  () => {
    const contact_details_newElements = { ...contact_details_elements }
    contact_details_newElements.contact_details_fields.forEach(row => {
 row.fields.forEach(field => {
 
 const driver_details_newElements = { ...driver_details_elements }
 console.log( driver_details_newElements);
 driver_details_newElements.about_driver_fields.forEach(driver_row => {
 driver_row.fields.forEach(driver_field => {
 if(field.field_id == "Address1_Id"){
 if(driver_field.field_id == "driverAddress1_Id"){
 driver_field.field_value = field.field_value;
 
 }
 }
 if(field.field_id == "Address2_Id"){
  if(driver_field.field_id == "driverAddress2_Id"){
  driver_field.field_value = field.field_value;
  }
  }
  if(field.field_id == "Country_Id"){
  if(driver_field.field_id == "driverCountry_Id"){
  driver_field.field_value = field.field_value;
  }
  }
  if(field.field_id == "City/Town_Id"){
  if(driver_field.field_id == "driverCity/Town_Id"){
  driver_field.field_value = field.field_value;
  }
  }
  
  if(field.field_id == "Postal Code_Id"){
  if(driver_field.field_id == "driverPostal Code_Id"){
  driver_field.field_value = field.field_value;
  }
  }
 
 })
 });
 
 })
 });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const personal_details_newElements = { ...personal_details_elements }
    personal_details_newElements.personal_details_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value === "" && field.field_mandatory === "yes") {
          field.errors = "Should not be empty";
          setPersonal_details_elements(personal_details_newElements);
        }
      })
    });

    const contact_details_newElements = { ...contact_details_elements }
    contact_details_newElements.contact_details_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value === "" && field.field_mandatory === "yes") {
          field.errors = "Should not be empty";
          setContact_details_elements(contact_details_newElements);
        }
      })
    });
    const other_details_newElements = { ...other_details_elements }
    other_details_newElements.other_details_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value === "" && field.field_mandatory === "yes") {
          field.errors = "Should not be empty";
          setOther_details_elements(other_details_newElements);
        }
      })
    });
    const driver_details_newElements = { ...driver_details_elements }
    driver_details_newElements.about_driver_fields.forEach(row => {
      row.fields.forEach(field => {

        if (field.field_value === "" && field.field_mandatory === "yes") {
          field.errors = "Should not be empty";
          setdriver_details_elements(driver_details_newElements);
        }
      })
    });

    
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
        if ((field.field_id === "Policy Holder's First Name_Id") || (field.field_id === "Policy Holder's Last Name_Id")) {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^[a-zA-Z]+$/)) {

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
        if (field.field_id === "Contact Number_Id") {

          if (field.field_value !== "") {

            if (!field.field_value.match(/^\d{10}$/)) {
              field.errors = "should be 10 numbers";

            }


          }
        }

        if (field.field_id === "Email Address_Id") {
          if (field.field_value !== "") {
            if (!field.field_value.match("^(.+)@(.+)$")) {
              field.errors = "Invalid";
            }
          }
        }
        if ((field.field_id === "Address1_Id") || (field.field_id === "Address2_Id")) {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^[a-zA-Z0-9]+$/)) {

              field.errors = "invalid";
            }
          }
        }
        if (field.field_id === "Postal Code_Id") {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^\d{6}$/)) {

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
        if (field.yes_options) {
          field.yes_options.forEach(yes_option => {
            if (id === yes_option.field_id) {
              switch (yes_option.field_type) {
                case 'checkbox':
                  yes_option.field_value = event.target.checked;
                  break;

                case 'multiple_select':
                  yes_option.field_value = Array.from(event.target.selectedOptions, option => option.value);
                  break;

                default:
                  yes_option.field_value = event.target.value;
                  break;
              }
            }
          })
        }



        if (field.conviction_table_fields) {
          field.conviction_table_fields.forEach(sub_field => {
            if (id === sub_field.field_id) {
              switch (sub_field.field_type) {
                case 'checkbox':
                  sub_field.field_value = event.target.checked;
                  break;

                case 'multiple_select':
                  sub_field.field_value = Array.from(event.target.selectedOptions, option => option.value);
                  break;

                default:
                  sub_field.field_value = event.target.value;
                  break;
              }
            }
          })
        }



        field.errors = "";
        if ((field.field_id === "Policy holder Occupation_Id") || (field.field_id === "Occupation Type_Id")||(field.field_id === "industry_Id")|| (field.field_id === "other car_Id")) {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^[a-zA-Z]+$/)) {

              field.errors = "Must be a String";
            }
          }
        }

        setOther_details_elements(other_details_elements)
      })
    });



    const driver_details_newElements = { ...driver_details_elements }
    driver_details_newElements.about_driver_fields.forEach(row => {
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
        if ((field.field_id === "Driver's First Name_Id") || (field.field_id === "Driver's Last Name_Id") || (field.field_id === "Driver's permanent citizen_Id")) {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^[a-zA-Z]+$/)) {

              field.errors = "Must be a String";
            }
          }
        }

        if((field.field_id === "driver's Contact Number_Id" ) ||(field.field_id === "Driver's Licensenumber_Id")){

          if (field.field_value !== "") {

            if (!field.field_value.match(/^\d{10}$/)) {
              field.errors = "should be 10 numbers";

            }


          }
        }

        if (field.field_id === "driver's Email Address_Id") {
          if (field.field_value !== "") {
            if (!field.field_value.match("^(.+)@(.+)$")) {
              field.errors = "Invalid";
            }
          }
        }
        if ((field.field_id === "driverAddress1_Id") || (field.field_id === "driverAddress2_Id")) {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^[a-zA-Z0-9]+$/)) {

              field.errors = "invalid";
            }
          }
        }
        if (field.field_id === "driverPostal Code_Id") {
          if (field.field_value !== "") {

            if (!field.field_value.match(/^\d{6}$/)) {

              field.errors = "Should be 6 digit";
            }
          }
        }








      setdriver_details_elements(driver_details_newElements);

      })
    });

  }

  return (


    

















    <FormContext.Provider value={{ handleChange }}>

<AddressContext.Provider value={{ loadAddress }}>
<DriverAddressContext.Provider value={{ driverloadAddress }}>
<HideAddressContext.Provider value={{ hideDetails }}>
<DriverFindAddressContext.Provider value={{ driverFindAddress }}>

      <Form className="container">
        <div className="PersonalDetails">
          <h5 id="title">{personal_details_page_label}</h5>
          <h5 id="description">{page_description}</h5>


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
<h3>{about_driver_page_label}</h3>


{
  about_driver_fields.map((field, i) => {
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

        <Button variant="success" className="button-rounded" type="submit" >
          Back
          </Button>
         {'    '}
        <Button variant="success" className="button-rounded" type="submit" onClick={(e) => handleSubmit(e)}>
          Continue
          </Button>
          
          
      </Form>
      </DriverFindAddressContext.Provider>  
      </HideAddressContext.Provider>  
      </DriverAddressContext.Provider>  
    </AddressContext.Provider>
    </FormContext.Provider>
   

  );
}

export default DynamicForm;