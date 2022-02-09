import React, { useRef } from "react";
import { Text, View, Animated, PanResponder } from "react-native";

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
    return { ...position.getLayout(), transform: [{ rotate: "45deg" }] };
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
