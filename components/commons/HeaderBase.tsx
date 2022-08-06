import { PropsWithChildren } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HeaderBase = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <View style={{ height: 64, paddingHorizontal: 24, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 46 }}>
      {children}
    </View>
  );
};

export default HeaderBase;
