import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { BlueprintScene } from '../components/BlueprintScene';
import { GearCluster, Gear } from '../components/Gear';
import { SchematicFrame, DimensionBar } from '../components/LineDraw';
import {
  TitleBlock,
  SectionHead,
  BPButton,
  StatBox,
  FadeItem,
} from '../components/BlueprintUI';
import { BP, spacing } from '../lib/blueprint';
import { profile, socials, techModules } from '../lib/data';
import type { MainTabParamList } from '../App';

export function HomeScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<MainTabParamList>>();

  return (
    <BlueprintScene>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <TitleBlock
            title="Blueprint Portfolio"
            subtitle="Mechanical schematic identity for a senior Android engineer"
            drawingNo={profile.drawingNo}
            revision={profile.revision}
            badge={profile.available ? 'AVAILABLE' : undefined}
          />

          <Animated.View entering={FadeInUp.duration(550)} style={styles.hero}>
            <View style={styles.heroTop}>
              <View style={styles.avatarFrame}>
                <Image
                  source={{ uri: profile.avatar }}
                  style={styles.avatar}
                  contentFit="cover"
                />
                <View style={styles.avatarCap}>
                  <Text style={styles.avatarCapText}>FIG. 01</Text>
                </View>
              </View>
              <GearCluster />
            </View>

            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.role}>{profile.title}</Text>
            <Text style={styles.tagline}>{profile.tagline}</Text>

            <DimensionBar label="IDENTITY SPAN" delay={200} />

            <View style={styles.meta}>
              <Ionicons name="location-outline" size={13} color={BP.line} />
              <Text style={styles.metaText}>{profile.location}</Text>
              <Text style={styles.metaSep}>|</Text>
              <Text style={styles.metaText}>{profile.company}</Text>
            </View>

            <View style={styles.stats}>
              {profile.stats.map((s) => (
                <StatBox key={s.label} value={s.value} label={s.label} />
              ))}
            </View>

            <View style={styles.actions}>
              <BPButton
                title="Modules"
                icon="cube-outline"
                onPress={() => navigation.navigate('Modules')}
                style={{ flex: 1 }}
              />
              <BPButton
                title="AI Draft"
                icon="sparkles-outline"
                variant="outline"
                onPress={() => navigation.navigate('Draftsman')}
                style={{ flex: 1 }}
              />
            </View>
          </Animated.View>

          <SectionHead
            code="SHT·A"
            title="Technical Modules"
            subtitle="Project assemblies ready for exploded inspection"
          />
          <View style={styles.modGrid}>
            {techModules.slice(0, 4).map((m, i) => (
              <FadeItem key={m.id} index={i}>
                <Pressable
                  onPress={() => navigation.navigate('Modules')}
                  style={styles.modCard}
                >
                  <View style={styles.modTop}>
                    <Text style={styles.modNo}>{m.moduleNo}</Text>
                    <Gear size={22} teeth={6} duration={5000 + i * 400} />
                  </View>
                  <Text style={styles.modTitle} numberOfLines={2}>
                    {m.title}
                  </Text>
                  <Text style={styles.modCat}>{m.category}</Text>
                </Pressable>
              </FadeItem>
            ))}
          </View>

          <SectionHead code="SHT·B" title="Reference Links" />
          <View style={styles.links}>
            {socials.slice(0, 4).map((s, i) => (
              <FadeItem key={s.id} index={i}>
                <Pressable
                  onPress={() => Linking.openURL(s.url)}
                  style={styles.link}
                >
                  <Ionicons
                    name={s.icon as keyof typeof Ionicons.glyphMap}
                    size={18}
                    color={BP.lineBright}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.linkName}>{s.name}</Text>
                    <Text style={styles.linkHandle} numberOfLines={1}>
                      {s.handle}
                    </Text>
                  </View>
                </Pressable>
              </FadeItem>
            ))}
          </View>

          <SchematicFrame delay={100} style={{ marginBottom: 18 }}>
            <Text style={styles.ctaTitle}>Initiate Collaboration</Text>
            <Text style={styles.ctaSub}>
              {profile.location} · {profile.timezone} · Android systems engineering
            </Text>
            <View style={styles.ctaRow}>
              <BPButton
                title="Website"
                icon="globe-outline"
                onPress={() => Linking.openURL(profile.website)}
              />
              <BPButton
                title="LinkedIn"
                icon="logo-linkedin"
                variant="outline"
                onPress={() => Linking.openURL(profile.linkedin)}
              />
              <BPButton
                title="Contact"
                icon="mail-outline"
                variant="ghost"
                onPress={() => navigation.navigate('Contact')}
              />
            </View>
          </SchematicFrame>

          <Text style={styles.footer}>
            {profile.drawingNo} · {profile.revision} · © 2026 {profile.name}
          </Text>
          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>
    </BlueprintScene>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  hero: { marginBottom: 22 },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarFrame: {
    width: 96,
    height: 96,
    borderWidth: 2,
    borderColor: BP.line,
    padding: 3,
  },
  avatar: { width: '100%', height: '100%' },
  avatarCap: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    backgroundColor: BP.bgDeep,
    borderWidth: 1,
    borderColor: BP.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  avatarCapText: {
    color: BP.accent,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1,
  },
  name: {
    color: BP.ink,
    fontSize: 26,
    fontWeight: '900',
  },
  role: {
    color: BP.lineBright,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  tagline: {
    color: BP.inkMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  metaText: { color: BP.inkSecondary, fontSize: 12 },
  metaSep: { color: BP.inkFaint },
  stats: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  actions: { flexDirection: 'row', gap: 10 },
  modGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 22,
  },
  modCard: {
    width: '48%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    minHeight: 100,
  },
  modTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modNo: {
    color: BP.accent,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  modTitle: {
    color: BP.ink,
    fontWeight: '800',
    fontSize: 13,
    lineHeight: 17,
  },
  modCat: {
    color: BP.inkMuted,
    fontSize: 10,
    marginTop: 6,
    fontWeight: '600',
  },
  links: { gap: 8, marginBottom: 22 },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
  },
  linkName: { color: BP.ink, fontWeight: '800', fontSize: 13 },
  linkHandle: { color: BP.inkMuted, fontSize: 11, marginTop: 2 },
  ctaTitle: {
    color: BP.ink,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  ctaSub: {
    color: BP.inkMuted,
    fontSize: 12,
    marginBottom: 14,
    lineHeight: 18,
  },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  footer: {
    textAlign: 'center',
    color: BP.inkFaint,
    fontSize: 10,
    letterSpacing: 1,
  },
});
