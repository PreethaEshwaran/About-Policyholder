import React, { useContext, useEffect, useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { AddressContext } from '../FormContext';
import '../App.css';

function ButtonInput({field_id, field_label, field_placeholder, field_value, field_mandatory,  errors}){

    const { loadAddress } = useContext(AddressContext);
    
    

    useEffect(() => {
        const postalCode =document.getElementById("Postal Code_Id");
        const AddressLine1 =document.getElementById("Address1_Id");
        const AddressLine2 =document.getElementById("Address2_Id");
        
        document.getElementById("findAddress_Id").onclick = function () {
            if(postalCode.value && AddressLine1.value && AddressLine2.value ){
                 loadAddress();
        }
    }


       

        
      }, []);

      return (
        
            <Button className="button-rounded" id={field_id}>{field_label}</Button>
      );
}

export default ButtonInput;