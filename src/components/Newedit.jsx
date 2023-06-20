import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';
// import CreateEmployeeComponent from './CreateEmployeeComponent';
// import axios from 'axios';


class Editlist extends Component {
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
    
        // axios.delete('http://localhost:8090/api/v1/employees/'+id)
    
        // .then(res => {
    
        //   window.location.reload();
         
    
        // })
    
        // .catch(err => console.log(err));
    
    //     EmployeeService.deleteEmployee(id).then( res => {
    //         this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
    //     });
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

    render() {
        return (
            
            <div>
                <nav style={{backgroundColor:"black"}}>
                <Link to='/employees' style={{fontFamily:"FrankRuehl",fontSize:"20px"}}>Back</Link>
                {/* <Link to='/employees' style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}>Home</Link>  */}
                {/* <Link to='/add-employee' style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}>Add</Link> */}
                {/* <Link to='/'style={{margin:"10px",fontFamily:"FrankRuehl",fontSize:"20px"}}>Log out</Link>  */}
             
            
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
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td> {employee.department}</td>
                                             <td> {employee.salary}</td>
                                             <td> {employee.gender}</td>
                                             <td> {employee.dob}</td>
                                             <td>
                                          <Link to={`/update-employee/${employee.id}`}><button style={{marginLeft:"60px"}} onClick={ () => this.editEmployee(employee.id)} className="btn btn-success" >Edit</button></Link>
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

export default Editlist
