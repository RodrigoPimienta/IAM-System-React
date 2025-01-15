import { useState } from "react"

import accessDefault  from '../mocks/access.json'

export const Access = () => {
    const [access, setAccess] = useState(accessDefault)
  return (
    <div className="container-fluid">
        <h2>Access</h2>
        <table className="striped">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Profile</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    access.map((item, index) => (
                        <tr key={index}>
                            <td>{item.user}</td>
                            <td>{item.profile}</td>
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
    </div>
  )
}
