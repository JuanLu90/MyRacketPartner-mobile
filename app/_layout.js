import { useEffect } from "react";
import {
  REACT_APP_WEB_GOOGLE_CLIENT_ID,
  REACT_APP_IOS_GOOGLE_CLIENT_ID,
} from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import LayoutComponent from "../src/components/Layout";

export default function Layout() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: REACT_APP_WEB_GOOGLE_CLIENT_ID, // Client ID de Google para web
      iosClientId: REACT_APP_IOS_GOOGLE_CLIENT_ID, // Client ID de Google para iOS
      offlineAccess: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <LayoutComponent />
    </Provider>
  );
}
