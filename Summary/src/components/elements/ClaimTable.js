import React from "react";
import { render } from "react-dom";
import { Form, Button} from 'react-bootstrap';

class ClaimTable extends React.Component {
    
  state = {
    rows: [{}]
  };

  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    this.setState({
      rows
    });
  };

  handleAddRow = (e) => {
    e.preventDefault();
    const item = {
        Claim_Details:"",
        Claim_Date:"",
        Claim_Amount:"",
        Claim_Type:""

    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };

//   handleRemoveRow = (e) => {
//     e.preventDefault();
//     this.setState({
//       rows: this.state.rows.slice(0, -1)
//     });
//   };

  handleRemoveSpecificRow = (idx) => (e) => {
    e.preventDefault();
    const rows = [...this.state.rows]
    if(rows.length === 1){
        const rows = [...this.state.rows];
        rows[idx] = {
            Claim_Details:null,
        Claim_Date:null,
        Claim_Amount:null,
        Claim_Type:null
        };
        this.setState({
        rows
        });
        document.getElementById("conviction_date_0").value = null;
        document.getElementById("dvla_code_0").value = null;
        document.getElementById("points_incurred_0").value = null;
        document.getElementById("fine_incurred_0").value = null;
     

       
    }
    else{
        rows.splice(idx, 1);
        this.setState({ rows });
    }
  }

  render() {
    return (
      <div>
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    <th className="text-center" style={{fontSize: "17px"}}> Claim Details</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Cliam Date</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Claim Amount</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Claim Type</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>
                      <Form.Control 
                        id="Claim_Details_0"
                        type="text" 
                        name="Claim_Details"
                        className="form-field form-control" 
                        value={this.state.rows[idx].Claim_Details}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                    <Form.Control
                        id="Claim_Date_0"
                        type="date" 
                        name="Claim_Date"
                        className="form-field form-control"
                        value={this.state.rows[idx].Claim_Date}
                        onChange={this.handleChange(idx)}
                        format="dd-mm-yyyy" 
                        />
                    </td>
                    <td>
                        <Form.Control 
                        id=" Claim_Amount_0"
                        type="number" 
                        name=" Claim_Amount"
                        className="form-field form-control" 
                        value={this.state.rows[idx].Claim_Amount}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control
                        id="Claim_Type_0"
                        type="select" 
                        name="Claim_Type"
                        className="form-field form-control" 
                        value={this.state.rows[idx].Claim_Type}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Claim
              </button>
              {/* <button
                onClick={this.handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button> */}
            </div>
          </div>
      </div>
    );
  }
}

export default ClaimTable;