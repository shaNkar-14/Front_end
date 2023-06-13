import React, { Component } from 'react'

import EmployeeService from '../services/EmpService';

import { Link } from 'react-router-dom';

class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            firstName: '',
            lastName: '',
            emailId: '',
            department:'',
            salary:'',
            gender:'',
            dob:''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }
    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob};
        console.log('employee => ' + JSON.stringify(employee));
        const conf= window.confirm("Do you want to save ?"+employee);
        if(conf){
            EmployeeService.createEmployee(employee)
            .then(res =>{
                <Link to='/employees'> this.props.history.push('/employees');</Link>
                window.location.replace("/employees");
            });
        }
    }
    changeFirstNameHandler= (event) => {

        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }
    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }
    changeDepartmentHandler= (event) => {
        this.setState({department: event.target.value});
    }
    changeSalaryHandler= (event) => {
        this.setState({salary: event.target.value});
    }
    changeGenderHandler= (event) => {
        this.setState({gender: event.target.value});
    }
    changeDobHandler= (event) => {
        this.setState({dob: event.target.value});
    }
    cancel(){
        this.props.history.push('/employees');
    }
    render(){

        return(<div>
            <div>
                <Link to='/employees'> <button className="btn btn-danger" size="xl" style={{marginLeft: "10px",size:'xl'}}>Back</button></Link>
                </div>
               <div className = "container" >
                    <div className = "row">
                        <div className = "d-flex w-50 vh-50 justify-content-center align-items-center" style={{ margin: '0rem',backgroundColor:'' }}>
                            <div className = "card-body" >
                                <form>
                                    <div className = "form-group" style={{alignItems:"-moz-initial"}}>
                                    <h3 className="text-center" style={{fontFamily:'Georgia',fontSize:50}} >Add Employee Details</h3>
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName}  required onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} required onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required> Department: </label>
                                        <select  name="department" className="form-control"
                                            value={this.state.department} required onChange={this.changeDepartmentHandler}>
                                                <option>None</option>
                                                <option>Accounts</option>
                                                <option>Sales</option>
                                                <option>Development</option>
                                                <option>Testing</option>
                                                </select>
                                        {/* <input placeholder="Department" name="department" className="form-control"
                                            value={this.state.department} required onChange={this.changeDepartmentHandler}/> */}
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} required> Salary: </label>
                                        <input  type='number'placeholder="salary" name="salary" className="form-control"
                                            value={this.state.salary} required onChange={this.changeSalaryHandler}/>
                                    </div>
                                    {/* <div className = "form-group">
                                        <label style={{fontFamily:'Quire Sans',fontSize:25}} required> Gender: </label>
                                        <select  name="gender" className="form-control"
                                            value={this.state.gender} required onChange={this.changeGenderHandler}>
                                                <option>None</option>
                                                <option>Male</option>
                                                <option>Female</option>

                                                
                                        </select>
                                    </div> */}
                                    <div style={{marginLeft:"70px"}}>
                                        <label style={{fontFamily:'Garamond',fontSize:25}}> Gender: </label>
                                        <label style={{fontFamily:'Garamond',fontSize:25}}>
                                        <input  type="radio" value="Male" checked={this.state.gender === "Male"} onChange={this.changeGenderHandler} /> Male </label>

                                        <label style={{fontFamily:'Garamond',fontSize:25}}>
                                        <input  type="radio" value="Female" checked={this.state.gender === "Female"} onChange={this.changeGenderHandler} /> Female </label>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'Garamond',fontSize:25}}> DateofBirth: </label>
                                        <input placeholder="dob" name="dob" className="form-control"  type='date'
                                           value={this.state.dob} required onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className = "form-group">
                                    <Link to='/employees'><button className="btn btn-success" onClick={this.saveEmployee} >Save</button></Link>
                                    <Link to='/employees'> <button className="btn btn-danger" value ="submit" type="reset" style={{marginLeft: "10px"}}>Cancel</button></Link>
                                    </div>                            
                                </form>
                            </div>
                     </div>
                    </div>
               </div>
        </div>
    )

    }
    }
export default AddEmployee