import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { Routes, Route } from 'react-router-dom'
import TopNavbar from './TopNavbar'
import SideNavBar from './SideNavBar'
import Home from './Home'
import DashBoard from './DashBoard'
import Payees from './payees/Payees'
import Transactions from './transactions/Transactions'
import Payables from './Payables'
import Categories from './Categories'
import Budgets from './Budgets'

function App() {
  return (
    <>
      <div className="container mx-auto">
        <TopNavbar />
        <div className="relative flex min-h-screen">
          <IfAuthenticated>
            <SideNavBar />
            <div className="ml-2 flex-1 p-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/payees" element={<Payees />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/payables" element={<Payables />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/budgets" element={<Budgets />} />
              </Routes>
            </div>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <div>
              <h1>Please Login to use the service</h1>
            </div>
          </IfNotAuthenticated>
        </div>
      </div>
    </>
  )
}

export default App
