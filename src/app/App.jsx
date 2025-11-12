import "../styles/_app.scss";
import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import EgretTheme from "./EgretLayout/EgretTheme/EgretTheme";
import AppContext from "./appContext";
import history from "history.js";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import EgretLayout from "./EgretLayout/EgretLayout";
import AuthGuard from "./auth/AuthGuard";
import "../styles/nprogress.css";
import { loadProgressBar } from "axios-progress-bar";
import { observer } from "mobx-react";

loadProgressBar();
const App = () => {
  return (
    <>
      <AppContext.Provider value={{ routes }}>
        <Provider store={Store}>
          <EgretTheme>
            <Auth>
              <Router history={history}>
                <AuthGuard>
                  <EgretLayout />
                </AuthGuard>
              </Router>
            </Auth>
          </EgretTheme>
        </Provider>
      </AppContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default observer(App);
