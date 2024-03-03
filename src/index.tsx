import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import ConfApp from "./confSetting/ConfApp";
import TranslationApp from "./translate/TranslateApp";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "typeface-roboto-mono";
import "./assets/fonts/fonts.css";
import ImagesPage from "./imageList/imagePage";
import { Provider as JotaiProvider } from "jotai";
import RouteChangeHandler from "./common/routerHandler/RouteChangeHandler";
import { SnackbarProvider } from "./common/snackBar/SnackbarProvider";
import SignInSignUpPage from "./login/Login";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router>
      <JotaiProvider>
        <RouteChangeHandler />
        <SnackbarProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/images" replace />} />
            <Route path="/conf" element={<ConfApp />} />
            <Route path="/translate" element={<TranslationApp />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/login" element={<SignInSignUpPage />} />
          </Routes>
        </SnackbarProvider>
      </JotaiProvider>
    </Router>
  </React.StrictMode>
);
