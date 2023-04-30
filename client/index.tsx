import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'

import App from './components/App'

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <Auth0Provider
    domain="tohora-2023-joon.au.auth0.com"
    clientId="cxRrUeWMYe8WrPUlC6QVzLqUw5XdZPeM"
    redirectUri={window.location.origin}
    audience="https://fruits/api"
  >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Auth0Provider>
)
