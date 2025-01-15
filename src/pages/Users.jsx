import { useState } from "react"
import usersDefault  from '../mocks/users.json'

export const Users = () => {
    const [users, setUsers] = useState(usersDefault)
  return (
    <div className="container-fluid">
        <h2>Users</h2>
        <table className="striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                {
                                    item.status === 1
                                    ? <span className="badge bg-success">Active</span> 
                                    : <span className="badge bg-danger">Inactive</span>
                                }
                            </td>
                            <td></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>  )
}
