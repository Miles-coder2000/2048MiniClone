import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';

// Wrap Text in Animated for safe animations
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function Title({ value, isNew, hasMerged }) {
  const scale = useSharedValue(isNew || hasMerged ? 0 : 1);
  const opacity = useSharedValue(isNew ? 0 : 1);

  // Animate tile appearance or merge
  useEffect(() => {
    if (isNew) {
      scale.value = withSpring(1, { damping: 6, stiffness: 150 });
      opacity.value = withTiming(1, { duration: 200 });
    } else if (hasMerged) {
      scale.value = withSpring(1.2, { damping: 6, stiffness: 150 }, () => {
        scale.value = withSpring(1, { damping: 6, stiffness: 150 });
      });
    }
  }, [isNew, hasMerged]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));

  return (
    <Animated.View style={[styles.tile, animatedStyle, { backgroundColor: getTileColor(value) }]}>
      {value !== 0 && (
        <AnimatedText style={[styles.text, value > 4 && { color: '#f9f6f2' }]}>
          {value}
        </AnimatedText>
      )}
    </Animated.View>
  );
}

// Tile colors similar to 2048
function getTileColor(value) {
  switch (value) {
    case 2: return '#eee4da';
    case 4: return '#ede0c8';
    case 8: return '#f2b179';
    case 16: return '#f59563';
    case 32: return '#f67c5f';
    case 64: return '#f65e3b';
    case 128: return '#edcf72';
    case 256: return '#edcc61';
    case 512: return '#edc850';
    case 1024: return '#edc53f';
    case 2048: return '#edc22e';
    default: return '#cdc1b4';
  }
}

const styles = StyleSheet.create({
  tile: {
    width: 70,
    height: 70,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#776e65',
  },
});
