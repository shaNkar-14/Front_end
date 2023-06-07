import React, { Component } from 'react'
import EmployeeService from '../services/EmpService';
import { Link } from 'react-router-dom';
// import CreateEmployeeComponent from './CreateEmployeeComponent';
// import axios from 'axios';


class ListEmployeeComponent extends Component {
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
            
            <div style={{backgroundImage:`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTNa0xtQZDXjzU90-6xcgAP0ca8BeasKR7lpFnQ-u1-Q&usqp=CAU&ec=48665698')`, height: '900px'}}>
                <div className='container'>
                    <h2 className="text-center">Employees List</h2>
                    <div className = "row">
                        <Link to='/add-employee'><button className='btn btn-primary'>Add Employee</button></Link>                    
                    </div>
                    <br></br>
                    <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead class='thead-dark'>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Employee Department</th>
                                    <th> Employee Salary</th>
                                    <th> Employee Gender</th>
                                    <th> Employee DateOfBirth</th>
                                    
                                    <th style={{width:"270px",textAlign:"center"}}> Actions</th>
                                   
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
                                          <Link to={`/update-employee/${employee.id}`}><button style={{marginLeft:"20px"}} onClick={ () => this.editEmployee(employee.id)} className="btn btn-success" >Edit</button></Link>
                                           <Link to={'/employees'}><button style={{marginLeft:"20px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button></Link>
                                            <Link to={`/view-employee/${employee.id}`}><button style={{marginLeft:"20px"}}onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info">View</button></Link>
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

export default ListEmployeeComponent
