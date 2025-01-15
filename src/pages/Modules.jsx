import { useState } from "react"
import modulesDefault  from '../mocks/modules.json'


export const Modules = () => {
    const [modules, setModules] = useState(modulesDefault)
    return (
      <div className="container-fluid">
          <h2>Modules</h2>
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
                      modules.map((item, index) => (
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
