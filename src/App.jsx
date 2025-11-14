import { ToastContainer } from 'react-toastify'
import './App.css'
import AuthProvider, { useAuth } from './providers/AuthProvider'
import Layout from './components/layout/Layout'
import Router from './routes/Router'

function AppContent() {
  const { loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Layout>
      <Router />
    </Layout>
  )
}

function App() {
  return (
    <div>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}

export default App
