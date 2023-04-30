import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Button } from '@tremor/react'
import { NavLink } from 'react-router-dom'

export default function SideNavBar() {
  const { user, logout, loginWithRedirect } = useAuth0()

  return (
    <>
      <div className="w-40 rounded border bg-gray-300">
        <nav className="">
          <NavLink to={'/dashboard'}>
            <div className="p-2 hover:bg-gray-100">Dash board</div>
          </NavLink>
          <NavLink to={'/payees'}>
            <div className="p-2 hover:bg-gray-100">Payees</div>
          </NavLink>
          <NavLink to={'/transactions'}>
            <div className="p-2 hover:bg-gray-100">Transactions</div>
          </NavLink>
          <NavLink to={'/payables'}>
            <div className="p-2 hover:bg-gray-100">Payables</div>
          </NavLink>
          <NavLink to={'/categories'}>
            <div className="p-2 hover:bg-gray-100">Categories</div>
          </NavLink>
          <NavLink to={'/budgets'}>
            <div className="p-2 hover:bg-gray-100">Budgets</div>
          </NavLink>
        </nav>
      </div>
    </>
  )
}
