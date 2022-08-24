import { StatusBar } from "expo-status-bar";
import Stack from "./Navigators/Stack";
import { Provider } from "react-redux";
import store from "./store";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect} from "react";
// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
// ]);
export default function App() {
  SplashScreen.preventAutoHideAsync();
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    onLayoutRootView();
  }, []);

  return (
    <>
        <Provider store={store}>
          <StatusBar style="auto" />
          {/* Navigators */}
          <Stack />
        </Provider>
    </>
  );
}
