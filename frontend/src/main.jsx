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

import Homepage from "./pages/Homepage.jsx";
import {
  CoachProfile,
  Courses,
  EditProfile,
  EditCoursePage,
} from "./features/auth/coach";
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
        <Route path="/profile/edit" element={<EditProfile />} />
      </Route>
      <Route path="courses/" element={<PrivateRoute />}>
        <Route path="" element={<Courses />} />
        <Route path="edit/:courseId" element={<EditCoursePage />} />
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
