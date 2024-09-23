// DEPENDENCIES
import { useEffect } from "react";
import { Provider } from "react-redux";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";

// REDUX
import { store } from "store/store";

// ENV
// import {
//   REACT_APP_WEB_GOOGLE_CLIENT_ID,
//   REACT_APP_ANDROID_GOOGLE_CLIENT_ID,
//   REACT_APP_IOS_GOOGLE_CLIENT_ID,
// } from "@env";

// COMPONENTS
import LayoutComponent from "pages/Layout/Layout";

// FUNCTION
const Layout = () => {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     expoClientId: REACT_APP_WEB_GOOGLE_CLIENT_ID,
  //     webClientId: REACT_APP_WEB_GOOGLE_CLIENT_ID, // Client ID de Google para web
  //     androidClientId: REACT_APP_ANDROID_GOOGLE_CLIENT_ID,
  //     iosClientId: REACT_APP_IOS_GOOGLE_CLIENT_ID, // Client ID de Google para iOS
  //     offlineAccess: true,
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <LayoutComponent />
    </Provider>
  );
};

export default Layout;
