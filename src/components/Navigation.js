import { Link } from "react-router-dom";


const Navigation = () => {

  return (
    <div className="breadcrumb-bar">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12 col-12">
            <nav className="page-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
              </ol>
            </nav>
            <h2 className="breadcrumb-title">Doctor Appointment</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation;