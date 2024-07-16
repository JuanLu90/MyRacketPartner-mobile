import { Text, ScrollView, StyleSheet } from "react-native";
import Layout from "./src/components/Layout";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Layout>
          <Text style={{ color: "white" }}>LAYOUTTT</Text>
        </Layout>
      </ScrollView>
    </SafeAreaProvider>
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
