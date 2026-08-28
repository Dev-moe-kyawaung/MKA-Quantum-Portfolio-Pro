import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlueprintScene } from '../components/BlueprintScene';
import { Gear } from '../components/Gear';
import { SchematicFrame } from '../components/LineDraw';
import {
  TitleBlock,
  SectionHead,
  BPButton,
  FadeItem,
} from '../components/BlueprintUI';
import { BP, spacing } from '../lib/blueprint';
import { profile, experiences, focuses, certifications } from '../lib/data';

export function AboutScreen() {
  return (
    <BlueprintScene>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <TitleBlock
            title="Engineer Sheet"
            subtitle="Identity block · experience log · credential index"
            drawingNo={profile.drawingNo}
            revision={profile.revision}
          />

          <SchematicFrame delay={80} style={{ padding: 0, marginBottom: 18 }}>
            <Image
              source={{ uri: profile.headerImage }}
              style={{ width: '100%', height: 90 }}
              contentFit="cover"
            />
            <LinearGradient
              colors={['transparent', BP.bgPaper]}
              style={styles.fade}
            />
            <View style={styles.profileBody}>
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.role}>{profile.title}</Text>
                <Text style={styles.meta}>
                  {profile.company} · {profile.location}
                </Text>
              </View>
              <Gear size={40} teeth={8} duration={8000} />
            </View>
          </SchematicFrame>

          <SectionHead code="BIO·01" title="Specification Notes" />
          {profile.bio.split('\n\n').map((p, i) => (
            <FadeItem key={i} index={i}>
              <Text style={styles.bio}>{p}</Text>
            </FadeItem>
          ))}

          <SectionHead code="VEC·02" title="Focus Vectors" />
          <View style={styles.focusGrid}>
            {focuses.map((f, i) => (
              <FadeItem key={f.title} index={i}>
                <View style={styles.focusCard}>
                  <Ionicons
                    name={f.icon as keyof typeof Ionicons.glyphMap}
                    size={18}
                    color={BP.line}
                  />
                  <Text style={styles.focusTitle}>{f.title}</Text>
                  <Text style={styles.focusDesc}>{f.desc}</Text>
                </View>
              </FadeItem>
            ))}
          </View>

          <SectionHead code="LOG·03" title="Experience Log" />
          {experiences.map((exp, idx) => (
            <FadeItem key={exp.id} index={idx}>
              <View style={styles.exp}>
                <View style={styles.expRail}>
                  <View style={styles.expDot} />
                  {idx < experiences.length - 1 ? <View style={styles.expLine} /> : null}
                </View>
                <View style={styles.expBody}>
                  <Text style={styles.period}>{exp.period}</Text>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.expDesc}>{exp.description}</Text>
                  {exp.highlights.map((h) => (
                    <View key={h} style={styles.hi}>
                      <Ionicons name="checkmark" size={14} color={BP.line} />
                      <Text style={styles.hiText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </FadeItem>
          ))}

          <SectionHead code="CRT·04" title="Credential Index" />
          {certifications.map((c, i) => (
            <FadeItem key={c.id} index={i}>
              <View style={styles.cert}>
                <Text style={styles.sheet}>{c.sheet}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.certCat}>{c.category}</Text>
                  <Text style={styles.certTitle}>{c.title}</Text>
                  <Text style={styles.certIssuer}>{c.issuer}</Text>
                </View>
                <Ionicons
                  name={c.icon as keyof typeof Ionicons.glyphMap}
                  size={18}
                  color={BP.lineBright}
                />
              </View>
            </FadeItem>
          ))}

          <SectionHead code="REF·05" title="External References" />
          <BPButton
            title="Portfolio Website"
            icon="globe-outline"
            onPress={() => Linking.openURL(profile.website)}
            style={{ marginBottom: 10 }}
          />
          <BPButton
            title="Gravatar"
            icon="person-circle-outline"
            variant="outline"
            onPress={() => Linking.openURL(profile.gravatar)}
            style={{ marginBottom: 10 }}
          />
          <BPButton
            title="LinkedIn"
            icon="logo-linkedin"
            variant="ghost"
            onPress={() => Linking.openURL(profile.linkedin)}
          />

          <View style={{ height: 32 }} />
        </ScrollView>
      </SafeAreaView>
    </BlueprintScene>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  fade: { position: 'absolute', left: 0, right: 0, top: 40, height: 50 },
  profileBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    marginTop: -20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderColor: BP.line,
  },
  name: { color: BP.ink, fontWeight: '900', fontSize: 16 },
  role: { color: BP.lineBright, fontWeight: '700', fontSize: 12, marginTop: 2 },
  meta: { color: BP.inkMuted, fontSize: 11, marginTop: 4 },
  bio: {
    color: BP.inkSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  focusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  focusCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    marginBottom: 10,
  },
  focusTitle: {
    color: BP.ink,
    fontWeight: '800',
    fontSize: 13,
    marginTop: 8,
  },
  focusDesc: {
    color: BP.inkMuted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  exp: { flexDirection: 'row', marginBottom: 4 },
  expRail: { width: 16, alignItems: 'center' },
  expDot: {
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: BP.line,
    backgroundColor: BP.bgDeep,
    marginTop: 6,
  },
  expLine: { flex: 1, width: 2, backgroundColor: BP.border, marginVertical: 4 },
  expBody: {
    flex: 1,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    marginLeft: 8,
    marginBottom: 12,
  },
  period: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  expRole: { color: BP.ink, fontWeight: '800', fontSize: 15, marginTop: 4 },
  company: { color: BP.inkMuted, marginTop: 2, marginBottom: 8 },
  expDesc: {
    color: BP.inkSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  hi: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  hiText: { color: BP.inkSecondary, fontSize: 12, flex: 1 },
  cert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    marginBottom: 8,
  },
  sheet: {
    color: BP.accent,
    fontWeight: '900',
    fontSize: 14,
    width: 28,
  },
  certCat: {
    color: BP.line,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  certTitle: { color: BP.ink, fontWeight: '800', fontSize: 14, marginTop: 2 },
  certIssuer: { color: BP.inkMuted, fontSize: 11, marginTop: 2 },
});
