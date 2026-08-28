import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlueprintScene } from '../components/BlueprintScene';
import { ExplodedModule } from '../components/ExplodedModule';
import { Gear } from '../components/Gear';
import {
  TitleBlock,
  SectionHead,
  BPButton,
} from '../components/BlueprintUI';
import { BP, spacing } from '../lib/blueprint';
import { techModules, profile } from '../lib/data';

export function ModulesScreen() {
  const [openId, setOpenId] = useState<string | null>(techModules[0].id);

  return (
    <BlueprintScene>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <TitleBlock
            title="Tech Modules"
            subtitle="Exploded-view project reveals with animated layer diagrams"
            drawingNo="DWG-MOD-SET"
            revision="REV B"
            badge={`${techModules.length} PARTS`}
          />

          <View style={styles.banner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerKicker}>ASSEMBLY INSTRUCTIONS</Text>
              <Text style={styles.bannerText}>
                Tap a module to explode its layers. Schematic plates separate with
                dimensioned callouts — like a mechanical parts catalog.
              </Text>
            </View>
            <Gear size={56} teeth={10} duration={7000} color={BP.lineBright} />
          </View>

          <SectionHead
            code="ASM·01"
            title="Module Catalog"
            subtitle="Production-grade Android system assemblies"
          />

          {techModules.map((m, i) => (
            <ExplodedModule
              key={m.id}
              module={m}
              index={i}
              expanded={openId === m.id}
              onToggle={() => setOpenId((id) => (id === m.id ? null : m.id))}
            />
          ))}

          <BPButton
            title="Open Public Portfolio"
            icon="open-outline"
            onPress={() => Linking.openURL(profile.website)}
            style={{ marginTop: 8 }}
          />

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </BlueprintScene>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  banner: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 14,
    marginBottom: 18,
  },
  bannerKicker: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  bannerText: {
    color: BP.inkSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});
