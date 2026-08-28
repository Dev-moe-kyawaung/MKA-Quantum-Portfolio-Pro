import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BP } from '../lib/blueprint';
import { blueprintTemplates, type BlueprintTemplate } from '../lib/data';
import { BlueprintMap } from './BlueprintMap';
import { BPButton } from './BlueprintUI';
import { Gear } from './Gear';

type Props = {
  compact?: boolean;
};

export function AIDraftsman({ compact }: Props) {
  const [selected, setSelected] = useState<BlueprintTemplate | null>(null);
  const [generating, setGenerating] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generate = (tpl: BlueprintTemplate) => {
    setGenerating(true);
    setSelected(null);
    // Simulate drafting delay for schematic transition feel
    setTimeout(() => {
      setSelected(tpl);
      setHistory((h) => [tpl.title, ...h].slice(0, 5));
      setGenerating(false);
    }, 900);
  };

  const randomGenerate = () => {
    const tpl =
      blueprintTemplates[Math.floor(Math.random() * blueprintTemplates.length)];
    generate(tpl);
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>AI DRAFTSMAN</Text>
          <Text style={styles.title}>Blueprint Architecture Maps</Text>
          <Text style={styles.sub}>
            On-demand schematic generation for Android system assemblies
          </Text>
        </View>
        <Gear size={52} teeth={9} duration={6000} color={BP.accent} />
      </View>

      <View style={styles.prompts}>
        {blueprintTemplates.map((t) => {
          const active = selected?.id === t.id;
          return (
            <Pressable
              key={t.id}
              onPress={() => generate(t)}
              style={[styles.prompt, active && styles.promptActive]}
            >
              <Ionicons
                name="construct-outline"
                size={14}
                color={active ? BP.accent : BP.line}
              />
              <Text
                style={[styles.promptText, active && { color: BP.accent }]}
                numberOfLines={2}
              >
                {t.prompt}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <BPButton
        title={generating ? 'Drafting…' : 'Generate Random Map'}
        icon="sparkles-outline"
        onPress={randomGenerate}
        loading={generating}
        style={{ marginBottom: 14 }}
      />

      {generating ? (
        <View style={styles.loading}>
          <ActivityIndicator color={BP.lineBright} />
          <Text style={styles.loadingText}>Plotting nodes · inking edges · annotating callouts</Text>
          <View style={styles.loadingGears}>
            <Gear size={36} duration={2000} />
            <Gear size={28} duration={1600} reverse color={BP.accent} />
          </View>
        </View>
      ) : null}

      {selected && !generating ? (
        <Animated.View entering={FadeInDown.duration(400)}>
          <BlueprintMap template={selected} height={compact ? 240 : 300} />
          <View style={styles.notes}>
            <Text style={styles.notesTitle}>DRAFTSMAN NOTES</Text>
            {selected.notes.map((n, i) => (
              <View key={i} style={styles.noteRow}>
                <Text style={styles.noteIdx}>{i + 1}</Text>
                <Text style={styles.noteText}>{n}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      ) : null}

      {!selected && !generating ? (
        <View style={styles.empty}>
          <Ionicons name="map-outline" size={32} color={BP.lineDim} />
          <Text style={styles.emptyText}>
            Select a prompt or generate a random architecture blueprint
          </Text>
        </View>
      ) : null}

      {history.length > 0 ? (
        <View style={styles.history}>
          <Text style={styles.histLabel}>RECENT SHEETS</Text>
          <Text style={styles.histItems}>{history.join('  ·  ')}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderColor: BP.borderStrong,
    backgroundColor: 'rgba(14, 34, 54, 0.92)',
    padding: 14,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  kicker: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.6,
  },
  title: {
    color: BP.ink,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 4,
  },
  sub: {
    color: BP.inkMuted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  prompts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  prompt: {
    width: '48%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 10,
    minHeight: 64,
    gap: 6,
  },
  promptActive: {
    borderColor: BP.accent,
    backgroundColor: BP.accentDim,
  },
  promptText: {
    color: BP.inkSecondary,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 15,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: BP.border,
    borderStyle: 'dashed',
    marginBottom: 8,
  },
  loadingText: {
    color: BP.inkMuted,
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
  },
  loadingGears: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    alignItems: 'center',
  },
  notes: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: BP.border,
    padding: 12,
  },
  notesTitle: {
    color: BP.line,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 8,
  },
  noteRow: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  noteIdx: {
    color: BP.accent,
    fontWeight: '900',
    fontSize: 11,
    width: 14,
  },
  noteText: { flex: 1, color: BP.inkSecondary, fontSize: 12, lineHeight: 17 },
  empty: {
    alignItems: 'center',
    paddingVertical: 36,
    borderWidth: 1,
    borderColor: BP.border,
    borderStyle: 'dashed',
    gap: 10,
  },
  emptyText: {
    color: BP.inkMuted,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  history: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BP.border,
  },
  histLabel: {
    color: BP.inkFaint,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  histItems: {
    color: BP.inkMuted,
    fontSize: 11,
    marginTop: 4,
  },
});
