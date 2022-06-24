import { useFonts } from "expo-font";
import Navigation from "./components/Navigation";

export default function App() {
  const [isFontLoaded] = useFonts({
    CircularStdBlack: require("./assets/fonts/CircularStd-Black.ttf"),
    CircularStdBold: require("./assets/fonts/CircularStd-Bold.ttf"),
    CircularStdBook: require("./assets/fonts/CircularStd-Book.ttf"),
    CircularStdMedium: require("./assets/fonts/CircularStd-Medium.ttf"),
  });

  return isFontLoaded && <Navigation />;
}
