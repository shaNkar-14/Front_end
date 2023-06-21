import React, { Component } from 'react'

import EmployeeService from '../services/EmpService';

import { Link,useParams } from 'react-router-dom';

const emailState = {
    emailId: '',
    error: ''
}
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
            dob:'',
            image:""
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }
    emailValidation(){
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!this.state.emailId || regex.test(this.state.emailId) === false){
            this.setState({
                error: alert( "Email is not valid")
            });
            return false;
        }
        return true;
    }

    saveEmployee = (event) => {
        event.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId,department :this.state.department,salary:this.state.salary,gender:this.state.gender,dob:this.state.dob,image:this.state.image};
        console.log('employee => ' + JSON.stringify(employee));
    
        if (this.state.firstName.length ===0) {
            alert("firstName contain atleast  3 characters ");
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
            alert("Department field is Empty")
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
        else if(window.confirm("Do you want to save ?")){
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

    handleImageChange = (e) => {
        
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            // this.setState({ base64String : event.target.result.split(",")[1]});
            const base64String = event.target.result.split(",")[1];
           this.setState({image:base64String});
        };
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
        if (file) {
          reader.readAsDataURL(file);
        }
      };  
       renderUserImage = () => {
        if (this.state.image) {
          return (
            <img src={`data:image/jpeg;base64,${this.state.image}`} alt="User" style={{height:150, width:150}}  className="user-image" />
          );
        }
        return null;
      };
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
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} > First Name: </label>
                                        <input required placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName}   onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} > Last Name: </label>
                                        <input required placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName}  onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} > Email Id: </label>
                                        <input required placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} > Department: </label>
                                        <select required name="department" className="form-control"
                                            value={this.state.department} onChange={this.changeDepartmentHandler}>
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
                                        <label style={{fontFamily:'-moz-initial',fontSize:25}} > Salary: </label>
                                        <input required type='number'placeholder="salary" name="salary" className="form-control"
                                            value={this.state.salary} onChange={this.changeSalaryHandler}/>
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
                                        <label style={{fontFamily:'Garamond',fontSize:25}}> Gender: 
                                        <input required type="radio" value="Male" style={{marginLeft:"10px"}} checked={this.state.gender === "Male"} onChange={this.changeGenderHandler} /> Male 
                                   
                                        <input required type="radio" value="Female" style={{marginLeft:"10px"}} checked={this.state.gender === "Female"} onChange={this.changeGenderHandler} /> Female </label>
                                    </div>
                                    <div className = "form-group">
                                        <label style={{fontFamily:'Garamond',fontSize:25}}> DateofBirth:</label>
                                        <input required placeholder="dob" name="dob" className="form-control"  type='date'
                                           value={this.state.dob}  onChange={this.changeDobHandler}/>
                                    </div>

                                    <div className="form-group" >

<label style={{fontFamily:'-moz-initial',color:'aqua',fontSize:25}} >Image</label>

<input type="file"  accept="image/*"    onChange={this.handleImageChange}  className="form-control"  required  />

           {this.renderUserImage()}

<small className="form-text text-muted">Upload a profile picture for the user.</small>

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