import Routes from "./components/Routes";
import { useFonts } from "expo-font";

export default function App() {
  const [isFontsLoaded] = useFonts({
    CircularStdBook: require("./assets/fonts/CircularStd-Book.ttf"),
    CircularStdMedium: require("./assets/fonts/CircularStd-Medium.ttf"),
    CircularStdBold: require("./assets/fonts/CircularStd-Bold.ttf"),
    CircularStdBlack: require("./assets/fonts/CircularStd-Black.ttf"),
  });

  return isFontsLoaded && <Routes />;
}
