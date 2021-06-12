import React from "react";
import { render } from "react-dom";
import { Form, Button} from 'react-bootstrap';

class Table extends React.Component {
    
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
    console.log(rows);
  };

  handleAddRow = (e) => {
    e.preventDefault();
    const item = {
        conviction_date: "",
        dvla_code: "",
        points_incurred: "",
        fine_incurred: "",
        ban_length: "",
        driver_breathlaysed: "",
        breathalyser_reading: "",
        offense_type: "",
        offense_type: ""
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
            conviction_date:null,
            dvla_code:null,
            points_incurred:null,
            fine_incurred:null,
            ban_length:null,
            driver_breathlaysed:null,
            breathalyser_reading:null,
            offense_type:null,
            offense_type:null
        };
        this.setState({
        rows
        });
        document.getElementById("conviction_date_0").value = null;
        document.getElementById("dvla_code_0").value = null;
        document.getElementById("points_incurred_0").value = null;
        document.getElementById("fine_incurred_0").value = null;
        document.getElementById("ban_length_0").value = null;
        document.getElementById("driver_breathlaysed_0").value = null;
        document.getElementById("breathalyser_reading_0").value = null;
        document.getElementById("offense_type_0").value = null;

        const showButton = this.props.action;
        showButton();
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
                    <th className="text-center" style={{fontSize: "17px"}}>Conviction Date</th>
                    <th className="text-center" style={{fontSize: "17px"}}>DVLA Code</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Points Incurred</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Fine Incurred</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Ban Length</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Has Driver Breathlaysed</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Breathalyser Reading</th>
                    <th className="text-center" style={{fontSize: "17px"}}>Has Offense Type</th>
                    <th />
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>
                        <Form.Control
                        id="conviction_date_0"
                        type="date" 
                        name="conviction_date"
                        className="form-field form-control"
                        value={this.state.rows[idx].name}
                        onChange={this.handleChange(idx)}
                        format="dd-mm-yyyy" 
                        />
                    </td>
                    <td>
                        <Form.Control
                        id="dvla_code_0"
                        type="number" 
                        name="dvla_code"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control 
                        id="points_incurred_0"
                        type="number" 
                        name="points_incurred"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control
                        id="fine_incurred_0"
                        type="number" 
                        name="fine_incurred"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control 
                        id="ban_length_0"
                        type="number" 
                        name="ban_length"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control 
                        id="driver_breathlaysed_0"
                        type="number" 
                        name="driver_breathlaysed"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control 
                        id="breathalyser_reading_0"
                        type="number" 
                        name="breathalyser_reading"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
                        onChange={this.handleChange(idx)}
                        />
                    </td>
                    <td>
                        <Form.Control 
                        id="offense_type_0"
                        type="text" 
                        name="offense_type"
                        className="form-field form-control" 
                        value={this.state.rows[idx].mobile}
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
                        <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                       
                        >
                          Edit
                        </button>
                          </td>
                  
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add Conviction
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

export default Table;