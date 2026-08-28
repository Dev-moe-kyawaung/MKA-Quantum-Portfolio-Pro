import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlueprintScene } from '../components/BlueprintScene';
import {
  TitleBlock,
  SectionHead,
  SkillGauge,
} from '../components/BlueprintUI';
import { BP, spacing } from '../lib/blueprint';
import { skills, type Skill } from '../lib/data';

const CATS: { key: Skill['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'web', label: 'Web' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'data', label: 'Data' },
  { key: 'tools', label: 'Tools' },
];

export function SkillsScreen() {
  const [active, setActive] = useState<Skill['category'] | 'all'>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return skills;
    return skills.filter((s) => s.category === active);
  }, [active]);

  return (
    <BlueprintScene>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={{ paddingHorizontal: spacing.lg }}>
          <TitleBlock
            title="Parts & Skills"
            subtitle="Tolerance gauges for the engineering toolkit"
            drawingNo="DWG-PARTS"
            revision="REV D"
            badge={`${filtered.length} PARTS`}
          />
        </View>

        <FlatList
          horizontal
          data={CATS}
          keyExtractor={(i) => i.key}
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, marginBottom: 6 }}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, gap: 8 }}
          renderItem={({ item }) => {
            const on = active === item.key;
            return (
              <Pressable
                onPress={() => setActive(item.key)}
                style={[styles.chip, on && styles.chipOn]}
              >
                <Text style={[styles.chipText, on && styles.chipTextOn]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.name}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingBottom: 36,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginBottom: 8 }}>
              <SectionHead code="TOL·01" title="Proficiency Tolerances" />
              <View style={styles.summary}>
                <Sum value={`${skills.length}`} label="Total" />
                <View style={styles.div} />
                <Sum
                  value={`${skills.filter((s) => s.level >= 85).length}`}
                  label="Expert"
                />
                <View style={styles.div} />
                <Sum value="Kotlin" label="Primary" />
              </View>
            </View>
          }
          renderItem={({ item, index }) => (
            <SkillGauge
              name={item.name}
              icon={item.icon}
              level={item.level}
              partNo={item.partNo}
              index={index}
            />
          )}
        />
      </SafeAreaView>
    </BlueprintScene>
  );
}

function Sum({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ color: BP.lineBright, fontWeight: '900', fontSize: 18 }}>
        {value}
      </Text>
      <Text style={styles.sumLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
  },
  chipOn: {
    borderColor: BP.borderStrong,
    backgroundColor: 'rgba(94,176,255,0.12)',
  },
  chipText: { color: BP.inkMuted, fontWeight: '700', fontSize: 12 },
  chipTextOn: { color: BP.lineBright },
  summary: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    paddingVertical: 14,
    marginBottom: 12,
  },
  div: { width: 1, backgroundColor: BP.border },
  sumLabel: {
    color: BP.inkMuted,
    fontSize: 10,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
