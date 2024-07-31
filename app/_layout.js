import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import LayoutComponent from "../src/components/Layout";

export default function Layout() {
  return (
    <Provider store={store}>
      <LayoutComponent />
    </Provider>
  );
}
