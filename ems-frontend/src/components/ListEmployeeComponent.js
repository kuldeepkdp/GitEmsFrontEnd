import React, {useEffect, useState} from 'react'
import { listEmployees, deleteEmployee } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'

function ListEmployeeComponent() {

    const [employees , setEmployees] = useState([])

    useEffect(()=>{
        getAllEmployee()
    }, [])

    function getAllEmployee(){

        listEmployees().then((response)=> {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })

    }

   const navigator = useNavigate()

function addNewEmployee(){

    navigator('/add-employee')

}

function updateEmployee(id){
    navigator(`/edit-employee/${id}`)
}

function removeEmployee(id){
    deleteEmployee(id).then((response)=>{
        getAllEmployee()
    }).catch(error=>{
        console.log(error.data)
    })
}
    return (
        <div className="container">
            <h1> List Of Employee </h1>
            <button type="button" className="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    employees.map(employee=>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button></td>
                            <td><button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)}>Delete</button></td>
                        </tr>)
                   }
                </tbody>
            </table>

        </div>
    )
}

export default ListEmployeeComponent;