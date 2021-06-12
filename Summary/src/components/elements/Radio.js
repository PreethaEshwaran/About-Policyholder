import React, { useContext, Fragment,useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import '../App.css';
import { FormContext, DriverAddressContext, HideAddressContext,DriverFindAddressContext } from '../FormContext';
import Element from '../Element';
import ClaimTable from './ClaimTable';

function Radio({ field_id, field_label, field_placeholder, field_value, field_mandatory, yes_options, field_options, errors }) {

    


    const { handleChange } = useContext(FormContext)
    const { driverloadAddress } = useContext(DriverAddressContext);
    const { hideDetails } = useContext(HideAddressContext);
    const { driverFindAddress } = useContext(DriverFindAddressContext);


    const [yesChecked, setyesChecked] = React.useState(false)
    const [showClaim, setshowClaim] = React.useState(false)
    const [showClaimTable, setshowClaimTable] = React.useState(false)
    const [showFindAddress, setshowFindAddress] = React.useState(false)
    

   
    const showTable=()=>{
        setshowClaimTable(true);
        setshowClaim(false);
    }
    const showdriverFindAddress=()=>{
        driverFindAddress();
    }
   
            

    const radioButtonCheck = (e) => {


        if (document.getElementById('car_modifications_yes').checked) {
            setyesChecked(true);
        }
        else setyesChecked(false);

        if (document.getElementById('sameAddress').checked) {
            driverloadAddress();

        }

        if (document.getElementById('differentAddress').checked) {
            hideDetails();
            setshowFindAddress(true);


        }
        else setshowFindAddress(false);

        if (document.getElementById('yesclaim').checked) {
            setshowClaim(true);

        }
        else setshowClaim(false);

    }


    return (
        <Form.Group>

            <Form.Label id="radio-button-label">{field_label}</Form.Label>{field_mandatory == "yes" ? <span className="mandatory"><b> * </b></span> : " "}<br />
            <Row>
                {field_options.length > 0 && field_options.map((option, i) =>
                    <Fragment key={i} >
                        <Col lg={3}>
                            <Form.Group id="radio-button-field" className="radio-button" onClick={(e) => radioButtonCheck(e)} >
                                <input id={option.option_id} name={field_id} className="radio-button-input" type="radio" value={option.option_label} checked={field_value === option.option_label} onChange={event => handleChange(field_id, event)} />
                                {' '}{' '}
                                <Form.Label>{option.option_label}</Form.Label>
                            </Form.Group>
                        </Col>

                    </Fragment>
                )}
            </Row>

            <span style={{ color: "red" }}>{errors ? errors : ""}</span>

            <div style={{ display: (yesChecked ? 'block' : 'none') }}>
                <Row>
                    {yes_options.length > 0 && yes_options.map((yes_option, i) => {

                        return (
                            <Col lg={5}>
                                <Element
                                    key={i}
                                    field={yes_option}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </div>


            <div style={{ display: (showClaim ? 'block' : 'none') }}>
                <Button id="AddClaimId" name="button" onClick={showTable}>Add Claim</Button>
                
            </div>
            <div style={{display: ( showClaimTable ? 'block' : 'none')}} > 
            <ClaimTable />
        </div>
        <div style={{ display: (showFindAddress ? 'block' : 'none') }}>
                <Button onClick={showdriverFindAddress}>Find Address</Button>
                
            </div>


        </Form.Group>
    );
}

export default Radio;