import { useState } from "react"
import profilesDefault  from '../mocks/profiles.json'

export const Profiles = () => {
    const [profiles, setProfiles] = useState(profilesDefault)
  return (
    <div className="container-fluid">
        <h2>Profiles</h2>
        <table className="striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    profiles.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
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
