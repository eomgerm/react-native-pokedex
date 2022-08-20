import { View, useWindowDimensions, ScrollView, Text, Animated, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import Constants from "expo-constants";
import Pokemon from "../../../../types/pokemon";
import About from "./Tabs/About";
import AppColors from "../../../../styles/colors";
import { BaseSyntheticEvent, useMemo, useRef, useState } from "react";
import BaseStats from "./Tabs/BaseStats";
import Evolution from "./Tabs/Evolution";
import Moves from "./Tabs/Moves";

type DetailsProps = {
  pokemon: Pokemon;
};

type Tabs = "About" | "Base Stats" | "Evolution" | "Moves";

export type TabProps = {
  pokemon: Pokemon;
  currentTab: "About" | "Base Stats" | "Evolution" | "Moves";
};

const tabs = [
  { name: "About", tab: About },
  { name: "Base Stats", tab: BaseStats },
  { name: "Evolution", tab: Evolution },
  { name: "Moves", tab: Moves },
];

const Details = ({ pokemon }: DetailsProps) => {
  const { height, width } = useWindowDimensions();
  const [currentTab, setCurrentTab] = useState<Tabs>("About");

  const scrollViewRef = useRef<ScrollView>(null);
  const handlePressTabButton = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    }
  };

  const translateX = useMemo(() => new Animated.Value(0), []);

  const indicatorStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: tabs.map((_, index) => width * index),
          outputRange: tabs.map((_, index) => ((width - 54) / 4) * index),
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: translateX,
          },
        },
      },
    ],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const {
          nativeEvent: {
            contentOffset: { x },
          },
        } = event;

        if (x === width * 0) {
          setCurrentTab("About");
        } else if (x === width * 1) {
          setCurrentTab("Base Stats");
        } else if (x === width * 2) {
          setCurrentTab("Evolution");
        } else if (x === width * 3) {
          setCurrentTab("Moves");
        }
      },
    }
  );

  return (
    <View
      style={{
        height: height - (Constants.statusBarHeight + 64),
        backgroundColor: "white",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
      }}
    >
      <View style={{ width: 50, height: 5, backgroundColor: "#ccc", borderRadius: 2.5, alignSelf: "center", marginVertical: 10 }} />

      <View
        style={{
          marginHorizontal: 27,
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomColor: "#dddddd",
          borderBottomWidth: 2,
          position: "relative",
        }}
      >
        {tabs.map(({ name }, index) => {
          const color = {
            color: translateX.interpolate({
              inputRange: [(index - 1) * width, index * width, (index + 1) * width],
              outputRange: ["grey", "black", "grey"],
              extrapolate: "clamp",
            }),
          };

          return (
            <TouchableOpacity
              key={index}
              style={{ width: (width - 54) / 4, justifyContent: "center", alignItems: "center", paddingBottom: 18, paddingTop: 12 }}
              onPress={() => handlePressTabButton(index)}
            >
              <Animated.Text style={{ fontFamily: "CircularStdBold", fontSize: 18, ...color }}>{name}</Animated.Text>
            </TouchableOpacity>
          );
        })}
        <Animated.View
          style={{
            height: 2,
            width: (width - 54) / 4,
            backgroundColor: AppColors.blue,
            position: "absolute",
            bottom: -1.5,
            left: 0,
            ...indicatorStyle,
          }}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEventThrottle={0.1}
        showsHorizontalScrollIndicator={false}
      >
        {tabs.map(({ name, tab: Tab }) => (
          <View key={name} style={{ width, paddingHorizontal: 27, paddingVertical: 18 }}>
            <Tab pokemon={pokemon} currentTab={currentTab} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Details;
