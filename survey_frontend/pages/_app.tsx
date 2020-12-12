import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default MyApp;
