import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function withRouter(Children){
    return(props)=>{
        const match={params:useParams()};
        return  <Children{...props} match={match}/>
    }
}
const emailState = {
    emailId: '',
    error: ''
}
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;



class EditEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id:this.props.match.params.id,
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
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            let employee =res.data;
            this.setState({firstName:employee.firstName,
            lastName:employee.lastName,
             emailId:employee.emailId,
             department:employee.department,
             salary:employee.salary,
             gender:employee.gender,
             dob:employee.dob

    });
});
    }
    updateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob};
        console.log('employee => ' + JSON.stringify(employee));
        if (this.state.firstName.length === 0) {
            alert("firstName field is Empty");
          }
         else if (this.state.lastName.length === 0) {
            alert("lastName field is Empty");
          }
          else if(!this.state.emailId || regex.test(this.state.emailId) === false){
            this.setState({
                error: alert( "email format is incorrect"),
                emailState
            });
            return false;
        }
          else if (this.state.department.length === 0) {
            alert("Department field is Empty");
          }
          else if (this.state.salary.length === 0) {
            alert("salary field is Empty");
          }
          else if (this.state.gender.length === 0) {
            alert("gender field is Empty");
          }
          else if (this.state.dob.length === 0) {
            alert("dob field is Empty");
          }
        else if(window.confirm("Do you want to save ?"))
        { EmployeeService.updateEmployee(employee,this.state.id)
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
        return( <div>
            <br></br>
               <div className = "container">
                    <div className = "row">
                        <div className = " w-50 vh-50 justify-content-center align-items-center" style={{ margin: '5rem',backgroundColor:'' }}>
                            
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                          <h3 className="text-center" style={{fontFamily:'Georgia',fontSize:50}} >Edit Employee Details</h3>
                                        <label style={{fontFamily:'-moz-initial'}}> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control" 
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control" 
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control" 
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> Department: </label>
                                        <select required name="department" className="form-control"
                                            value={this.state.department} onChange={this.changeDepartmentHandler}>
                                                <option>None</option>
                                                <option>Accounts</option>
                                                <option>Sales</option>
                                                <option>Development</option>
                                                <option>Testing</option>
                                                </select>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> Salary: </label>
                                        <input placeholder="salary" name="salary" className="form-control" 
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
                                    </div>
                                    <div style={{marginLeft:"70px"}}>
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}}> Gender: </label>
                                        
                                        <input required type="radio" value="Male" checked={this.state.gender === "Male"} onChange={this.changeGenderHandler} /> Male 

                                        
                                        <input required type="radio" value="Female" checked={this.state.gender === "Female"} onChange={this.changeGenderHandler} /> Female
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial'}}> DateofBirth: </label>
                                        <input placeholder="dob" name="dob" className="form-control"  type='date'
                                            value={this.state.dob} onChange={this.changeDobHandler}/>
                                    </div>
                                    <div className = "form-group">
                                    
                                    <Link to='/employees'><button className="btn btn-success"  onClick={this.updateEmployee}>Save</button></Link>
                                    <Link to='/employees'> <button className="btn btn-info"  style={{marginLeft: "10px"}}>Cancel</button></Link>
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


export default withRouter(EditEmployee)
