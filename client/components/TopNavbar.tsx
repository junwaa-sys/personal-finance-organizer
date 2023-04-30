import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Button } from '@tremor/react'
import { NavLink } from 'react-router-dom'

export default function TopNavbar() {
  const { user, logout, loginWithRedirect } = useAuth0()
  return (
    <>
      <div className="flex h-20 flex-row-reverse rounded border bg-gray-300">
        <div className="mr-4 self-center">
          <IfAuthenticated>
            <Button
              size="sm"
              onClick={() => {
                logout()
              }}
            >
              Sign out
            </Button>
            {/* {user && <p>Signed in as: {user?.nickname}</p>} */}
          </IfAuthenticated>

          <IfNotAuthenticated>
            <Button
              size="sm"
              onClick={() => {
                loginWithRedirect()
              }}
            >
              Sign in
            </Button>
          </IfNotAuthenticated>
        </div>
        <div className="mr-4 grow self-center ">
          <div></div>
        </div>
        <div className="ml-4 self-center">
          <NavLink to={'/'}>HOME</NavLink>
        </div>
      </div>
    </>
  )
}
