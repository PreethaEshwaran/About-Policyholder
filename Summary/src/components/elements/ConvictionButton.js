import React, { useContext, useEffect, useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { FormContext } from '../FormContext';
import '../App.css';
import Table from './Table';

function ConvictionButton({field_id, field_label, field_placeholder, field_value, field_mandatory, conviction_table_fields, errors}){

    const { handleChange } = useContext(FormContext)

    const [showConvictionButton, setShowConvictionButton] = useState(true);
    const [showConvictionTable, setShowConvictionTable] = useState(false);

    useEffect(()=>{
        const conviction_button = document.getElementById("conviction_button");
        conviction_button.onclick = function () {
            if (conviction_button.name == "button") {
                setShowConvictionTable(true);
                setShowConvictionButton(false);
            }
            }
    },[])

    const showButton = ()=>{
        setShowConvictionTable(false);
        setShowConvictionButton(true);
    }
    
    return (
        <>
        <Button style={{display: ( showConvictionButton ? 'block' : 'none')}} className="button-rounded" name="button" id="conviction_button" >
            {field_label}
        </Button>

        <div style={{display: ( showConvictionTable ? 'block' : 'none')}}> 
            <Table action={showButton}/>
        </div>
        </>
      );
}

export default ConvictionButton;