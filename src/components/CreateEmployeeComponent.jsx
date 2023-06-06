import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';

class CreateEmployeeComponent extends Component {
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
    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob};
        console.log('employee => ' + JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res =>{
            <Link to='/employees'>this.props.history.push('/employees');</Link>
        });
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
        return(<div style={{backgroundImage:`url('https://thumbs.dreamstime.com/z/beach-waves-top-view-turquoise-water-background-top-view-summer-seascape-air-top-view-drone-travel-image-139843239.jpg')`, height: '900px'}}>

            <br></br>
               <div className = "container" >
                    <div className = "row">
                        <div className = "d-flex w-50 vh-50 justify-content-center align-items-center" style={{ margin: '0rem',backgroundColor:'' }}>
                            
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group"  >
                                    <h3 className="text-center" style={{fontFamily:'cursive',color:'aqua',fontSize:50}} >Add employee</h3>
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control" 
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> Department: </label>
                                        <input placeholder="Department" name="department" className="form-control" 
                                            value={this.state.department} onChange={this.changeDepartmentHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> Salary: </label>
                                        <input placeholder="salary" name="salary" className="form-control" 
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> Gender: </label>
                                        <select placeholder="Enter M or F" name="gender" className="form-control" 
                                            value={this.state.gender} onChange={this.changeGenderHandler}>
                                                <option>Male</option>
                                                <option>Female</option>
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',color:'teal',fontSize:25}}> DateofBirth: </label>
                                        <input placeholder="dob" name="dob" className="form-control"  type='date'
                                            value={this.state.dob} onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className = "form-group">
                                    <Link to='/employees'><button className="btn btn-success" onClick={this.saveEmployee} >Save</button></Link>
                                    <Link to='/employees'> <button className="btn btn-info"  style={{marginLeft: "10px"}}>Ok</button></Link>
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


export default CreateEmployeeComponent
