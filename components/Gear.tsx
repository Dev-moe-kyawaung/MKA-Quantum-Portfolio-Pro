import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { BP } from '../lib/blueprint';

type Props = {
  size?: number;
  teeth?: number;
  duration?: number;
  reverse?: boolean;
  color?: string;
};

export function Gear({
  size = 64,
  teeth = 10,
  duration = 8000,
  reverse = false,
  color = BP.line,
}: Props) {
  const rot = useSharedValue(0);

  useEffect(() => {
    rot.value = withRepeat(
      withTiming(1, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, [duration]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${(reverse ? -1 : 1) * rot.value * 360}deg` }],
  }));

  const toothW = size * 0.14;
  const toothH = size * 0.18;
  const hub = size * 0.34;

  return (
    <Animated.View style={[{ width: size, height: size }, style]}>
      <View
        style={[
          styles.rim,
          {
            width: size * 0.72,
            height: size * 0.72,
            borderRadius: (size * 0.72) / 2,
            borderColor: color,
            left: size * 0.14,
            top: size * 0.14,
          },
        ]}
      />
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (i / teeth) * 360;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: size / 2 - toothW / 2,
              top: size / 2 - toothH / 2,
              width: toothW,
              height: size * 0.92,
              marginTop: -size * 0.21,
              alignItems: 'center',
              transform: [{ rotate: `${angle}deg` }],
            }}
          >
            <View
              style={{
                width: toothW,
                height: toothH,
                borderWidth: 1.5,
                borderColor: color,
                backgroundColor: BP.bgPaper,
              }}
            />
          </View>
        );
      })}
      <View
        style={[
          styles.hub,
          {
            width: hub,
            height: hub,
            borderRadius: hub / 2,
            borderColor: color,
            left: (size - hub) / 2,
            top: (size - hub) / 2,
          },
        ]}
      >
        <View
          style={{
            width: hub * 0.35,
            height: hub * 0.35,
            borderRadius: 99,
            backgroundColor: color,
          }}
        />
      </View>
    </Animated.View>
  );
}

export function GearCluster() {
  return (
    <View style={styles.cluster}>
      <View style={{ position: 'absolute', left: 0, top: 8 }}>
        <Gear size={72} teeth={12} duration={9000} />
      </View>
      <View style={{ position: 'absolute', left: 52, top: 0 }}>
        <Gear size={48} teeth={8} duration={7000} reverse color={BP.accent} />
      </View>
      <View style={{ position: 'absolute', left: 28, top: 48 }}>
        <Gear size={36} teeth={7} duration={5000} color={BP.lineBright} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rim: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'rgba(11, 26, 43, 0.85)',
  },
  hub: {
    position: 'absolute',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BP.bgDeep,
  },
  cluster: {
    width: 110,
    height: 100,
  },
});
