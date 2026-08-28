import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
  interpolate,
  FadeInDown,
} from 'react-native-reanimated';
import { BP } from '../lib/blueprint';

/** Horizontal dimension line that draws itself */
export function DrawLine({
  delay = 0,
  color = BP.line,
  height = 1,
  style,
}: {
  delay?: number;
  color?: string;
  height?: number;
  style?: ViewStyle;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      delay,
      withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) })
    );
  }, [delay]);

  const anim = useAnimatedStyle(() => ({
    width: `${interpolate(p.value, [0, 1], [0, 100])}%`,
    opacity: interpolate(p.value, [0, 0.1, 1], [0, 1, 1]),
  }));

  return (
    <View style={[{ height, overflow: 'hidden', width: '100%' }, style]}>
      <Animated.View style={[{ height, backgroundColor: color }, anim]} />
    </View>
  );
}

/** Frame that strokes in like a schematic border */
export function SchematicFrame({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      delay,
      withTiming(1, { duration: 700, easing: Easing.out(Easing.cubic) })
    );
  }, [delay]);

  const borderAnim = useAnimatedStyle(() => ({
    opacity: interpolate(p.value, [0, 1], [0.2, 1]),
    borderColor: BP.line,
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(450)}
      style={[styles.frame, style, borderAnim]}
    >
      <View style={[styles.tick, styles.tickTL]} />
      <View style={[styles.tick, styles.tickTR]} />
      <View style={[styles.tick, styles.tickBL]} />
      <View style={[styles.tick, styles.tickBR]} />
      {children}
    </Animated.View>
  );
}

export function DimensionBar({
  label,
  delay = 0,
}: {
  label: string;
  delay?: number;
}) {
  return (
    <View style={styles.dim}>
      <View style={styles.dimEnd} />
      <DrawLine delay={delay} height={1} style={{ flex: 1 }} />
      <Animated.Text
        entering={FadeInDown.delay(delay + 200)}
        style={styles.dimLabel}
      >
        {label}
      </Animated.Text>
      <DrawLine delay={delay + 100} height={1} style={{ flex: 1 }} />
      <View style={styles.dimEnd} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 14,
    position: 'relative',
  },
  tick: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderColor: BP.accent,
  },
  tickTL: { top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 },
  tickTR: { top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 },
  tickBL: { bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 },
  tickBR: { bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 },
  dim: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  dimEnd: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: BP.line,
  },
  dimLabel: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
});
