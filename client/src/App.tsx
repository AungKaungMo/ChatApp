import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthPage from './pages/auth'
import ChatPage from './pages/chat'
import ProfilePage from './pages/profile'
import { useLoginStore } from "./store/auth.store"
import { ReactNode } from "react"

interface MyChildren {
  children: ReactNode
}

const PrivateRoute = ({children}: MyChildren) => {
  const { user } = useLoginStore();
  console.log(user, 'suer')
  return user ? children : <Navigate to="/auth" />
}

const AuthRoute = ({children}: MyChildren) => {
  const { user } = useLoginStore();
  return user ?  <Navigate to="/chat" /> : children
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthRoute><AuthPage /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/contacts" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App