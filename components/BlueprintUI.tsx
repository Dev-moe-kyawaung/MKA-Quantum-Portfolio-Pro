import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BP, radius } from '../lib/blueprint';
import { DrawLine } from './LineDraw';

export function TitleBlock({
  title,
  subtitle,
  drawingNo,
  revision,
  badge,
}: {
  title: string;
  subtitle?: string;
  drawingNo?: string;
  revision?: string;
  badge?: string;
}) {
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.titleBlock}>
      <View style={styles.tbTop}>
        <Text style={styles.tbOrg}>SENIOR ENGINEER PORTFOLIO</Text>
        {badge ? (
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.tbTitle}>{title}</Text>
      {subtitle ? <Text style={styles.tbSub}>{subtitle}</Text> : null}
      <DrawLine delay={150} style={{ marginTop: 12 }} />
      <View style={styles.tbMeta}>
        {drawingNo ? <Text style={styles.metaItem}>{drawingNo}</Text> : null}
        {revision ? <Text style={styles.metaItem}>{revision}</Text> : null}
        <Text style={styles.metaItem}>SCALE 1:1</Text>
      </View>
    </Animated.View>
  );
}

export function SectionHead({
  code,
  title,
  subtitle,
}: {
  code?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginBottom: 14, marginTop: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {code ? <Text style={styles.code}>{code}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={{ flex: 1 }}>
          <DrawLine delay={80} color={BP.lineDim} />
        </View>
      </View>
      {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
    </View>
  );
}

export function BPButton({
  title,
  onPress,
  icon,
  variant = 'primary',
  style,
  loading,
}: {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: 'primary' | 'outline' | 'ghost';
  style?: ViewStyle;
  loading?: boolean;
}) {
  const scale = useSharedValue(1);
  const anim = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      disabled={loading}
    >
      <Animated.View
        style={[
          styles.btn,
          isPrimary && styles.btnPrimary,
          variant === 'outline' && styles.btnOutline,
          variant === 'ghost' && styles.btnGhost,
          style,
          anim,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={isPrimary ? BP.bgDeep : BP.line} />
        ) : (
          <>
            {icon ? (
              <Ionicons name={icon} size={16} color={isPrimary ? BP.bgDeep : BP.lineBright} />
            ) : null}
            <Text style={[styles.btnText, { color: isPrimary ? BP.bgDeep : BP.lineBright }]}>
              {title}
            </Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
}

export function SpecChip({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.spec}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

export function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function SkillGauge({
  name,
  icon,
  level,
  partNo,
  index = 0,
}: {
  name: string;
  icon: string;
  level: number;
  partNo?: string;
  index?: number;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      index * 50,
      withTiming(level / 100, { duration: 900, easing: Easing.out(Easing.cubic) })
    );
  }, [level, index]);

  const fill = useAnimatedStyle(() => ({
    width: `${p.value * 100}%`,
  }));

  return (
    <View style={styles.gauge}>
      <View style={styles.gaugeTop}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          {partNo ? <Text style={styles.partNo}>{partNo}</Text> : null}
          <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={14} color={BP.line} />
          <Text style={styles.gaugeName}>{name}</Text>
        </View>
        <Text style={styles.gaugeLvl}>{level}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, fill]} />
        {Array.from({ length: 10 }).map((_, i) => (
          <View
            key={i}
            style={[styles.tickMark, { left: `${(i + 1) * 10}%` }]}
          />
        ))}
      </View>
    </View>
  );
}

export function FadeItem({
  children,
  index = 0,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 55).springify().damping(16)}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    borderWidth: 1,
    borderColor: BP.borderStrong,
    backgroundColor: 'rgba(14, 34, 54, 0.9)',
    padding: 14,
    marginBottom: 18,
  },
  tbTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tbOrg: {
    color: BP.line,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: BP.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: BP.accent },
  badgeText: {
    color: BP.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  tbTitle: {
    color: BP.ink,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  tbSub: {
    color: BP.inkMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  tbMeta: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  metaItem: {
    color: BP.inkFaint,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  code: {
    color: BP.accent,
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1.2,
  },
  sectionTitle: {
    color: BP.ink,
    fontWeight: '800',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  sectionSub: {
    color: BP.inkMuted,
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 2,
  },
  btnPrimary: {
    backgroundColor: BP.lineBright,
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: BP.borderStrong,
    backgroundColor: 'transparent',
  },
  btnGhost: {
    backgroundColor: BP.accentDim,
    borderWidth: 1,
    borderColor: BP.accent + '55',
  },
  btnText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  spec: {
    borderWidth: 1,
    borderColor: BP.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    minWidth: 72,
  },
  specLabel: {
    color: BP.inkFaint,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  specValue: {
    color: BP.lineBright,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  stat: {
    flex: 1,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    color: BP.lineBright,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    color: BP.inkMuted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  gauge: {
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    marginBottom: 10,
  },
  gaugeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  partNo: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  gaugeName: { color: BP.ink, fontWeight: '700', fontSize: 13 },
  gaugeLvl: { color: BP.lineBright, fontWeight: '900', fontSize: 12 },
  track: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    height: '100%',
    backgroundColor: BP.line,
  },
  tickMark: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: BP.bgDeep,
    opacity: 0.7,
  },
});
