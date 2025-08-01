import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import AppRoutes from "./rotes/AppRoutes";
import './App.css';


function App() {
  return (
  <BrowserRouter>
      <AuthProvider>
        <AppRoutes/>
        </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
