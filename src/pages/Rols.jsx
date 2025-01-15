import { useState } from "react"
import rolsDefault  from '../mocks/rols.json'


export const Rols = ({module}) => {
    const [rols, setRols] = useState(rolsDefault)
    return (
      <div className="container-fluid">
          <h2>{module} - Rols</h2>
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
                      rols.map((item, index) => (
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
      </div>
    )
}
