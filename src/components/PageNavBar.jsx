import { Dropdown } from 'react-bootstrap';






const PageNavBar = (props)=>{
    
     
      return (
          <>
                <nav className="app-nav-bar main-header navbar navbar-expand navbar-dark">
                        
                    <a className="desktop-nav-sidebtn" href="#" role="button" >
                        <i className="fas fa-bars"></i>
                    </a>

                    <ul className="navbar-nav ml-auto">

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

                        <li className="nav-item" onClick={props.onToggleSideBar}>
                            <a className="nav-link" href="#" role="button" >
                                <i className="fas fa-bars"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
          </>
      )

}

export default PageNavBar;