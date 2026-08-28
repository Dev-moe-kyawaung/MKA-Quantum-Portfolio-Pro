import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BP } from '../lib/blueprint';

const { width, height } = Dimensions.get('window');

function GridOverlay() {
  const shift = useSharedValue(0);
  useEffect(() => {
    shift.value = withRepeat(
      withTiming(1, { duration: 12000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shift.value, [0, 1], [0, 24]) }],
  }));

  const cells = 18;
  const step = Math.ceil(width / 8);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      {Array.from({ length: cells }).map((_, i) => (
        <View
          key={`v-${i}`}
          style={{
            position: 'absolute',
            left: i * step,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: i % 4 === 0 ? BP.gridStrong : BP.grid,
          }}
        />
      ))}
      {Array.from({ length: Math.ceil(height / step) + 2 }).map((_, i) => (
        <View
          key={`h-${i}`}
          style={{
            position: 'absolute',
            top: i * step,
            left: 0,
            right: 0,
            height: 1,
            backgroundColor: i % 4 === 0 ? BP.gridStrong : BP.grid,
          }}
        />
      ))}
    </Animated.View>
  );
}

function Crosshair({ top, left }: { top: number; left: number }) {
  return (
    <View style={[styles.cross, { top, left }]} pointerEvents="none">
      <View style={[styles.crossH, { backgroundColor: BP.lineDim }]} />
      <View style={[styles.crossV, { backgroundColor: BP.lineDim }]} />
    </View>
  );
}

export function BlueprintScene({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[BP.bgDeep, BP.bg, '#0a2740']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <GridOverlay />
      <Crosshair top={48} left={24} />
      <Crosshair top={height * 0.42} left={width - 48} />
      <Crosshair top={height * 0.72} left={40} />
      {/* Title block frame corners */}
      <View style={[styles.corner, styles.tl]} />
      <View style={[styles.corner, styles.tr]} />
      <View style={[styles.corner, styles.bl]} />
      <View style={[styles.corner, styles.br]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BP.bg },
  content: { flex: 1 },
  cross: { position: 'absolute', width: 28, height: 28 },
  crossH: { position: 'absolute', top: 13, left: 0, right: 0, height: 1 },
  crossV: { position: 'absolute', left: 13, top: 0, bottom: 0, width: 1 },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: BP.lineDim,
  },
  tl: { top: 10, left: 10, borderTopWidth: 2, borderLeftWidth: 2 },
  tr: { top: 10, right: 10, borderTopWidth: 2, borderRightWidth: 2 },
  bl: { bottom: 70, left: 10, borderBottomWidth: 2, borderLeftWidth: 2 },
  br: { bottom: 70, right: 10, borderBottomWidth: 2, borderRightWidth: 2 },
});
