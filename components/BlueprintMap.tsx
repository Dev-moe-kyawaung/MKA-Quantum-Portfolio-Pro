import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  type SharedValue,
} from 'react-native-reanimated';
import { BP } from '../lib/blueprint';
import type { BlueprintTemplate } from '../lib/data';

type Props = {
  template: BlueprintTemplate;
  height?: number;
};

type LaidOutNode = BlueprintTemplate['nodes'][number] & {
  px: number;
  py: number;
};

export function BlueprintMap({ template, height = 280 }: Props) {
  const [w, setW] = useState(320);
  const draw = useSharedValue(0);

  useEffect(() => {
    draw.value = 0;
    draw.value = withTiming(1, { duration: 1100, easing: Easing.out(Easing.cubic) });
  }, [template.id]);

  const onLayout = (e: LayoutChangeEvent) => {
    setW(e.nativeEvent.layout.width);
  };

  const nodes: LaidOutNode[] = useMemo(
    () =>
      template.nodes.map((n) => ({
        ...n,
        px: 24 + n.x * (w - 48),
        py: 24 + n.y * (height - 48),
      })),
    [template, w, height]
  );

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  return (
    <View onLayout={onLayout} style={[styles.canvas, { height }]}>
      {template.edges.map((e, i) => {
        const a = nodeMap.get(e.from);
        const b = nodeMap.get(e.to);
        if (!a || !b) return null;
        return (
          <EdgeLine
            key={`${e.from}-${e.to}`}
            x1={a.px}
            y1={a.py}
            x2={b.px}
            y2={b.py}
            label={e.label}
            delay={i * 90}
            progress={draw}
          />
        );
      })}

      {nodes.map((n, i) => (
        <MapNode key={n.id} node={n} index={i} progress={draw} />
      ))}

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>{template.title}</Text>
        <Text style={styles.legendSub}>AUTO-GENERATED SCHEMATIC</Text>
      </View>
    </View>
  );
}

function EdgeLine({
  x1,
  y1,
  x2,
  y2,
  label,
  delay,
  progress,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  delay: number;
  progress: SharedValue<number>;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy) || 1;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const style = useAnimatedStyle(() => {
    const t = Math.max(0, Math.min(1, progress.value * 1.2 - delay / 1200));
    return {
      width: interpolate(t, [0, 1], [0, length]),
      opacity: interpolate(t, [0, 1], [0, 0.85]),
    };
  });

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: x1,
        top: y1,
        height: 14,
        transform: [{ rotate: `${angle}deg` }],
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <Animated.View
        style={[
          {
            height: 1.5,
            backgroundColor: BP.line,
            marginTop: 0,
          },
          style,
        ]}
      />
      <Text
        style={{
          marginTop: 3,
          marginLeft: 8,
          color: BP.inkFaint,
          fontSize: 8,
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function MapNode({
  node,
  index,
  progress,
}: {
  node: LaidOutNode;
  index: number;
  progress: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const t = Math.max(0, Math.min(1, progress.value * 1.4 - index * 0.08));
    return {
      opacity: t,
      transform: [{ scale: interpolate(t, [0, 1], [0.6, 1]) }],
    };
  });

  const color =
    node.kind === 'ui'
      ? BP.lineBright
      : node.kind === 'cloud'
        ? BP.accent
        : node.kind === 'storage'
          ? BP.success
          : BP.line;

  return (
    <Animated.View
      style={[
        styles.node,
        {
          left: node.px - 42,
          top: node.py - 18,
          borderColor: color,
        },
        style,
      ]}
    >
      <View style={[styles.nodeDot, { backgroundColor: color }]} />
      <Text style={styles.nodeLabel} numberOfLines={2}>
        {node.label}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: '100%',
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: 'rgba(7, 16, 28, 0.9)',
    overflow: 'hidden',
    position: 'relative',
  },
  node: {
    position: 'absolute',
    width: 84,
    borderWidth: 1,
    backgroundColor: BP.bgPaper,
    paddingVertical: 6,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  nodeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  nodeLabel: {
    color: BP.ink,
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 12,
  },
  legend: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: 'rgba(11,26,43,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  legendTitle: {
    color: BP.ink,
    fontSize: 10,
    fontWeight: '800',
  },
  legendSub: {
    color: BP.accent,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 2,
  },
});
