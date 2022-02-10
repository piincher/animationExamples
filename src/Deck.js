import React, { useRef } from "react";
import { Text, View, Animated, PanResponder, Dimensions } from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_ANIMATION = 250;
const Deck = ({ data, renderCard }) => {
  const [index, setIndex] = React.useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: {
        x,
        y: 0,
      },
      duration: SWIPE_OUT_ANIMATION,
      useNativeDriver: false,
    }).start(() => {});
  };

  const onSwipeCompleted = (direction) => {
    const { onSwipeLeft, onSwipeRight } = props;
    const item = data[index];
    direction === "right" ? onSwipeRight(item) : -onSwipeLeft(item);
  };
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };
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
Deck.defaultProps = {
  onSwipeRight: () => {},
  onSwipeLeft: () => {},
};
