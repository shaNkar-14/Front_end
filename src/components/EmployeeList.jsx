import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';
import Editlist from './Newedit';
// import CreateEmployeeComponent from './CreateEmployeeComponent';
// import axios from 'axios';


class EmployeeList extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
         this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }
    

    deleteEmployee(id){
        const conf= window.confirm("Do you want to delete ?");

        if(conf){
            EmployeeService.deleteEmployee(id)
            .then( res => {
                this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
                window.location.reload();

            });
     }
    
}
    viewEmployee(id){
        <Link to={`/view-employee/${id}`}>this.props.history.push(`/view-employee/${id}`);</Link>
    }
    editEmployee(id){
        <Link to={`/update-employee/${id}`}>this.props.history.push(`/update-employee/${id}`);</Link>
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){

        this.props.history.push('/add-employee');
    }

    renderUserImage = (employee) => {

        if (employee.image && typeof employee.image === 'string') {
    
          const blobData = atob(employee.image);
    
          const arrayBuffer = new ArrayBuffer(blobData.length);
    
          const uintArray = new Uint8Array(arrayBuffer);
    
          for (let i = 0; i < blobData.length; i++) {
    
            uintArray[i] = blobData.charCodeAt(i);
    
          }
    
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    
     
    
          const base64String = URL.createObjectURL(blob);
    
          return (
    
            <img
    
              src={base64String}
    
              alt="User"
    
              style={{height:70, width:70}}
    
            />
    
          );
    
        } else if (employee.image && Array.isArray(employee.image)) {
    
          const base64String = btoa(String.fromCharCode.apply(null, employee.image));
    
          return (
    
            <img
    
              src={`data:image/jpeg;base64,${base64String}`}
    
              alt="User"
    
              style={{height:70, width:70}}
    
            />
    
          );
    
        }
    
        return null;
    
      };

    render() {
        return (
            
            <div>
                <nav style={{backgroundColor:"black"}}> 
                <Link to='/employees' style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}>Home</Link> 
                <Link to='/add-employee' style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}>Add</Link> 
                <Link to='/edit' style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}> Edit</Link> 
                <Link to='/'style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}>Log Out</Link> 
            
                </nav>
                <div className='container'>
                    <h2 className="text-center">Employees List</h2>
                    <div className = "row">
                                           
                    </div>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead style={{}}>
                                <tr>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}>Image</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Firstname</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Lastname</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Email Id</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Department</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Salary</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> Gender</th>
                                    <th style={{textAlign:"center",fontFamily:"FrankRuehl"}}> DateOfBirth</th>
                                    
                                    <th style={{width:"200px",textAlign:"center",fontFamily:"FrankRuehl"}}> Actions</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            <td>{this.renderUserImage(employee)}</td>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td> {employee.department}</td>
                                             <td> {employee.salary}</td>
                                             <td> {employee.gender}</td>
                                             <td> {employee.dob}</td>
                                             <td>
                                          {/* <Link to={`/update-employee/${employee.id}`}><button style={{marginLeft:"20px"}} onClick={ () => this.editEmployee(employee.id)} className="btn btn-success" >Edit</button></Link> */}
                                           <Link to={'/employees'}><button style={{marginLeft:"60px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button></Link>
                                            {/* <Link to={`/view-employee/${employee.id}`}><button style={{marginLeft:"20px"}}onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button></Link> */}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeList
