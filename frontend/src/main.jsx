import React from "react";
import ReactDOM from "react-dom/client";
import store from "./store";
import { Provider } from "react-redux";
import LoginScreen from "./pages/LoginPage.jsx";
import RegistrationScreen from "./pages/RegistrationPage.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Homepage from "./pages/Homepage.jsx";
import { CoachProfile, Courses } from "./features/auth/coach";
import PrivateRoute from "./components/PrivateRoute";
import { ResourceNotFound } from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegistrationScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<CoachProfile />} />
        <Route path="/profile/courses" element={<Courses />} />

      </Route>
      <Route path="/*" element={<ResourceNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
