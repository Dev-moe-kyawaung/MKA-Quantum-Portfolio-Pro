import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlueprintScene } from '../components/BlueprintScene';
import { AIDraftsman } from '../components/AIDraftsman';
import { TitleBlock, SectionHead } from '../components/BlueprintUI';
import { SchematicFrame } from '../components/LineDraw';
import { spacing, BP } from '../lib/blueprint';
import { Text } from 'react-native';

export function DraftsmanScreen() {
  return (
    <BlueprintScene>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <TitleBlock
            title="AI Draftsman"
            subtitle="Generates blueprint-style architecture maps on demand"
            drawingNo="DWG-AI-ASSIST"
            revision="REV A"
            badge="ONLINE"
          />

          <SectionHead
            code="AI·01"
            title="Schematic Generator"
            subtitle="Line-draw node graphs with annotated edges and draftsman notes"
          />

          <AIDraftsman />

          <SchematicFrame delay={100} style={{ marginTop: 18 }}>
            <Text style={styles.helpTitle}>How it works</Text>
            <Text style={styles.helpText}>
              1. Choose an architecture prompt or randomize{`\n`}
              2. Gears spin while the sheet is inked{`\n`}
              3. Nodes and edges animate onto the blueprint canvas{`\n`}
              4. Draftsman notes list engineering callouts
            </Text>
          </SchematicFrame>

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </BlueprintScene>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  helpTitle: {
    color: BP.ink,
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 8,
  },
  helpText: {
    color: BP.inkSecondary,
    fontSize: 12,
    lineHeight: 20,
  },
});
