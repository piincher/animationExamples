import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, LogBox } from "react-native";

const Ball = () => {
  const position = useRef(new Animated.ValueXY()).current;

  const animated = Animated.spring(position, {
    toValue: { x: 200, y: 500 },
    useNativeDriver: true,
  });
  animated.start();

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  );
};

export default Ball;

const styles = StyleSheet.create({
  ball: {
    height: 60,
    width: 60,
    borderWidth: 30,
    borderRadius: 30,

    borderColor: "black",
  },
});
