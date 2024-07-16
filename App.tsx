import { Text } from "react-native";
import Layout from "./src/components/Layout";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <SafeAreaProvider>
      <Layout>
        <Text style={{ color: "white" }}>LAYOUTTTTT</Text>
      </Layout>
    </SafeAreaProvider>
  );
}

export default App;
