import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';

export default function AssetExample() {
  const [expanded, setExpanded] = React.useState(true);
  const animationHeight = React.useRef(new Animated.Value(2)).current;

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    if (expanded) {
      Animated.timing(animationHeight, {
        duration: 1000,
        toValue: 60,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 1000,
        toValue: 5,
        easing: Easing.linear,
      }).start();
    }
  }, [expanded]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          toggleExpansion();
        }}>
        <Animated.View style={[{height: animationHeight}]}>
          <Text numberOfLines={expanded ? 30 : 2} ellipsizeMode="tail">
            {' line 1'}
            {'\n'}
            {'line 2'}
            {'\n'}
            {'line 3'}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
