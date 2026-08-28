import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  interpolate,
  FadeInDown,
  type SharedValue,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BP } from '../lib/blueprint';
import { type TechModule } from '../lib/data';
import { SpecChip } from './BlueprintUI';
import { DrawLine } from './LineDraw';

type Props = {
  module: TechModule;
  index?: number;
  expanded?: boolean;
  onToggle?: () => void;
};

export function ExplodedModule({ module, index = 0, expanded, onToggle }: Props) {
  const open = useSharedValue(expanded ? 1 : 0);
  const draw = useSharedValue(0);

  useEffect(() => {
    open.value = withSpring(expanded ? 1 : 0, { damping: 16, stiffness: 120 });
    if (expanded) {
      draw.value = 0;
      draw.value = withTiming(1, { duration: 900, easing: Easing.out(Easing.cubic) });
    }
  }, [expanded]);

  const bodyStyle = useAnimatedStyle(() => ({
    maxHeight: interpolate(open.value, [0, 1], [0, 560]),
    opacity: interpolate(open.value, [0, 0.25, 1], [0, 0.35, 1]),
    marginTop: interpolate(open.value, [0, 1], [0, 10]),
  }));

  const statusColor =
    module.status === 'PRODUCTION'
      ? BP.success
      : module.status === 'APPROVED'
        ? BP.lineBright
        : module.status === 'IN REVIEW'
          ? BP.accent
          : BP.inkMuted;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).duration(400)}
      style={styles.wrap}
    >
      <Pressable onPress={onToggle} style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBox, { borderColor: statusColor }]}>
            <Ionicons
              name={module.icon as keyof typeof Ionicons.glyphMap}
              size={18}
              color={statusColor}
            />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.row}>
              <Text style={styles.modNo}>{module.moduleNo}</Text>
              <Text style={[styles.status, { color: statusColor }]}>{module.status}</Text>
            </View>
            <Text style={styles.title}>{module.title}</Text>
            <Text style={styles.sub}>{module.subtitle}</Text>
          </View>
          <Ionicons
            name={expanded ? 'remove-outline' : 'add-outline'}
            size={20}
            color={BP.line}
          />
        </View>
      </Pressable>

      <Animated.View style={[styles.body, bodyStyle]}>
        <DrawLine delay={0} />
        <Text style={styles.summary}>{module.summary}</Text>

        <Text style={styles.sectionLabel}>EXPLODED LAYERS</Text>
        <View style={styles.layers}>
          {module.layers.map((layer, i) => (
            <LayerRow
              key={layer.name}
              index={i}
              total={module.layers.length}
              name={layer.name}
              note={layer.note}
              progress={draw}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>SCHEMATIC DIAGRAM</Text>
        <View style={styles.diagram}>
          {module.layers.slice(0, 4).map((b, i) => (
            <DiagBox
              key={b.name}
              name={b.name}
              index={i}
              total={Math.min(4, module.layers.length)}
              progress={draw}
            />
          ))}
          <View style={styles.diagCallout}>
            <Text style={styles.diagCalloutText}>
              {module.category} · {module.moduleNo}
            </Text>
          </View>
        </View>

        <View style={styles.specs}>
          {module.specs.map((s) => (
            <SpecChip key={s.label} label={s.label} value={s.value} />
          ))}
          <SpecChip label="Scale" value={module.scale} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

function LayerRow({
  index,
  total,
  name,
  note,
  progress,
}: {
  index: number;
  total: number;
  name: string;
  note: string;
  progress: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const local = Math.max(0, Math.min(1, progress.value * total - index));
    return {
      transform: [{ translateY: interpolate(local, [0, 1], [0, index * 4]) }],
      opacity: interpolate(local, [0, 1], [0.35, 1]),
      borderColor: local > 0.5 ? BP.lineBright : BP.border,
    };
  });

  return (
    <Animated.View style={[styles.layer, style]}>
      <View style={styles.layerIndex}>
        <Text style={styles.layerIndexText}>{index + 1}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.layerName}>{name}</Text>
        <Text style={styles.layerNote}>{note}</Text>
      </View>
      <View style={styles.leader} />
    </Animated.View>
  );
}

function DiagBox({
  name,
  index,
  total,
  progress,
}: {
  name: string;
  index: number;
  total: number;
  progress: SharedValue<number>;
}) {
  const style = useAnimatedStyle(() => {
    const local = Math.max(0, Math.min(1, progress.value * total - index * 0.55));
    return {
      opacity: local,
      transform: [
        { translateY: interpolate(local, [0, 1], [12, index * 6]) },
        { scale: interpolate(local, [0, 1], [0.92, 1]) },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.diagBox,
        {
          zIndex: 10 - index,
          marginTop: index === 0 ? 0 : -8,
          width: `${92 - index * 6}%` as unknown as number,
          alignSelf: 'center',
        },
        style,
      ]}
    >
      <Text style={styles.diagText}>{name}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: 'rgba(14, 34, 54, 0.88)',
    marginBottom: 12,
    overflow: 'hidden',
  },
  header: { padding: 14 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BP.bgSheet,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 2 },
  modNo: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  status: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: { color: BP.ink, fontWeight: '800', fontSize: 15 },
  sub: { color: BP.inkMuted, fontSize: 11, marginTop: 2 },
  body: { paddingHorizontal: 14, paddingBottom: 14, overflow: 'hidden' },
  summary: {
    color: BP.inkSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 14,
  },
  sectionLabel: {
    color: BP.line,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 8,
    marginTop: 4,
  },
  layers: { marginBottom: 12 },
  layer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgDeep,
    padding: 10,
    marginBottom: 6,
  },
  layerIndex: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: BP.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layerIndexText: { color: BP.lineBright, fontSize: 11, fontWeight: '900' },
  layerName: { color: BP.ink, fontWeight: '700', fontSize: 13 },
  layerNote: { color: BP.inkMuted, fontSize: 11, marginTop: 2 },
  leader: {
    width: 24,
    height: 1,
    backgroundColor: BP.lineDim,
  },
  diagram: {
    borderWidth: 1,
    borderColor: BP.border,
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 14,
    minHeight: 120,
    justifyContent: 'center',
  },
  diagBox: {
    borderWidth: 1,
    borderColor: BP.line,
    backgroundColor: 'rgba(94,176,255,0.08)',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  diagText: {
    color: BP.ink,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  diagCallout: {
    marginTop: 12,
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: BP.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  diagCalloutText: {
    color: BP.accent,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  specs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
