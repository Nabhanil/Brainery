import AuthPage from "./components/Authorization/auth"
import { Dashboard } from "./components/Ui/Dashboard"
import { BrowserRouter,Routes, Route } from "react-router-dom"

function App() {



  return (

    

      <>

      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
      
        
      </>
    
  )
}

export default App
