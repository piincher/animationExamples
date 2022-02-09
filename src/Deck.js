import React, { useRef } from "react";
import { Text, View, Animated, PanResponder, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const Deck = ({ data, renderCard }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: () => {},
    })
  ).current;
  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...position.getLayout(), transform: [{ rotate }] };
  };
  const renderCards = () => {
    return data.map((item, idx) => {
      if (idx === 0) {
        return (
          <Animated.View
            key={item.id}
            style={getCardStyle()}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }

      return renderCard(item);
    });
  };
  return <View>{renderCards()}</View>;
};

export default Deck;
