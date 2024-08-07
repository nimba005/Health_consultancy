import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const DeleteAccount = lazy(() => import("./pages/DeleteAccount"));
const Patients = lazy(() => import("./pages/Patients"));
const Consultations = lazy(() => import("./pages/Consultations"));
const ResponsiveDrawer = lazy(() => import("./components/SidePanel/Drawer"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />

          <Route path="/dashboard" element={<ResponsiveDrawer />}>
            <Route path="consultations" element={<Consultations />} />
            <Route path="patients" element={<Patients />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App