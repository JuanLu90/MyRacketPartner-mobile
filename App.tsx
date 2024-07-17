import { Text, ScrollView, StyleSheet } from "react-native";
import Layout from "./src/components/Layout";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Layout>
            <Text style={{ color: "white" }}>LAYOUTTT</Text>
          </Layout>
        </ScrollView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  text: {
    color: "white",
  },
});

export default App;
