import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-brand">Job App</div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Home
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Create Job
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
