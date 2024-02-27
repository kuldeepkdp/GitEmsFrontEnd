import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const navigator = useNavigate()
    
    const {id} = useParams()

    useEffect(()=>{
        if(id){
            getEmployee(id).then((respnse)=>{
                setFirstName(respnse.data.firstName)
                setLastName(respnse.data.lastName)
                setEmail(respnse.data.email)
            }).catch(error => {
                console.error(error)
            })
        }

    },[id])

    function saveEmployee(e) {
        e.preventDefault()

        const employee = { firstName, lastName, email }

        console.log(employee)

        if(id){
            updateEmployee(id, employee).then((response)=>{
                console.log(response.data)
                navigator('/employees')
            }).catch((error)=>{
                console.log(error)
            })

        }else{

            createEmployee(employee).then((response) => {
                console.log(response.data)
                navigator('/employees')
            }).catch((error)=>{
                console.log(error)
            })
        }     
    }

    function pageTitle(){
        if(id){
         return <h1 className='text-center'> Update Employee </h1>
        }
        else{
        return  <h1 className='text-center'> Add Employee </h1>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className="mb-3 mt-3">
                                <label className="form-label">First Name</label>
                                <input type="text" 
                                className="form-control" 
                                id="firstname" 
                                value={firstName} 
                                onChange={(e)=>setFirstName(e.target.value)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" 
                                className="form-control" 
                                id="lastname" 
                                value={lastName} 
                                onChange={(e)=>setLastName(e.target.value)}  />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Email</label>
                                <input type="text" 
                                className="form-control" 
                                id="email" 
                                value={email} 
                                onChange={(e)=>setEmail(e.target.value)}  />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={saveEmployee}>Submit</button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default EmployeeComponent