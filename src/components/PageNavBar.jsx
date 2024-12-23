import { Dropdown } from 'react-bootstrap';






const PageNavBar = (props)=>{
    
     
      return (
          <>
                <nav className="main-header navbar navbar-expand navbar-dark">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" onClick={props.onControlTab} href="#" role="button"><i className="fas fa-bars"></i></a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="index3.html" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item d-none d-sm-inline-block">
                            <a href="#" className="nav-link">Contact</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i className="fas fa-search"></i>
                        </a>
                        <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search"></i>
                                </button>
                                <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                <i className="fas fa-times"></i>
                                </button>
                            </div>
                            </div>
                        </form>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <Dropdown>
                            <Dropdown.Toggle className="nav-link" >
                                <i className="far fa-bell"></i>
                                <span className="badge badge-warning navbar-badge">15</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell"></i>
                            <span className="badge badge-warning navbar-badge">15</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">15 Notifications</span>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-envelope mr-2"></i> 4 new messages
                                <span className="float-right text-muted text-sm">3 mins</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-users mr-2"></i> 8 friend requests
                                <span className="float-right text-muted text-sm">12 hours</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <i className="fas fa-file mr-2"></i> 3 new reports
                                <span className="float-right text-muted text-sm">2 days</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                        <i className="fas fa-th-large"></i>
                        </a>
                    </li>
                    </ul>
                </nav>
          </>
      )

}

export default PageNavBar;