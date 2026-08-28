import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { profile, socials } from '../lib/data';

const DRAFT_KEY = '@bp_contact_draft';

export function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(DRAFT_KEY).then((raw) => {
      if (!raw) return;
      try {
        const d = JSON.parse(raw);
        setName(d.name || '');
        setEmail(d.email || '');
        setMessage(d.message || '');
      } catch {
        /* ignore */
      }
    });
  }, []);

  const saveDraft = (n: string, e: string, m: string) => {
    AsyncStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ name: n, email: e, message: m })
    ).catch(() => undefined);
  };

  const onSend = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Incomplete form', 'Fill name, email, and message.');
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Blueprint inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    );
    try {
      await Linking.openURL(`mailto:${profile.email}?subject=${subject}&body=${body}`);
      await AsyncStorage.removeItem(DRAFT_KEY);
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      Alert.alert('Mail unavailable', `Reach me at ${profile.email}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <BlueprintScene>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <TitleBlock
              title="Contact Sheet"
              subtitle="Open a work order · hire · collaborate"
              drawingNo="DWG-CONTACT"
              revision="REV A"
              badge="OPEN"
            />

            <View style={styles.direct}>
              <Direct
                icon="mail"
                label="Email"
                value={profile.email}
                onPress={() => Linking.openURL(`mailto:${profile.email}`)}
              />
              <Direct
                icon="call"
                label="Call"
                value={profile.phone}
                onPress={() => Linking.openURL(`tel:${profile.phone}`)}
              />
            </View>

            <SectionHead code="CH·01" title="Channel Index" />
            {socials.map((s, i) => (
              <FadeItem key={s.id} index={i}>
                <Pressable
                  onPress={() => Linking.openURL(s.url)}
                  style={styles.social}
                >
                  <Ionicons
                    name={s.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={BP.lineBright}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.socialName}>{s.name}</Text>
                    <Text style={styles.socialHandle}>{s.handle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={BP.inkFaint} />
                </Pressable>
              </FadeItem>
            ))}

            <SectionHead
              code="MSG·02"
              title="Transmission Form"
              subtitle="Drafts auto-save on this device"
            />
            <SchematicFrame delay={60}>
              <Field
                label="Name"
                value={name}
                placeholder="Your name"
                onChange={(t) => {
                  setName(t);
                  saveDraft(t, email, message);
                }}
              />
              <Field
                label="Email"
                value={email}
                placeholder="you@company.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onChange={(t) => {
                  setEmail(t);
                  saveDraft(name, t, message);
                }}
              />
              <Field
                label="Message"
                value={message}
                placeholder="Describe the assignment..."
                multiline
                onChange={(t) => {
                  setMessage(t);
                  saveDraft(name, email, t);
                }}
              />
              <BPButton
                title="Submit Work Order"
                icon="send"
                onPress={onSend}
                loading={sending}
              />
            </SchematicFrame>

            <View style={styles.footerCard}>
              <Gear size={40} teeth={8} duration={9000} color={BP.accent} />
              <View style={{ flex: 1 }}>
                <Text style={styles.footerTitle}>Open to opportunities</Text>
                <Text style={styles.footerSub}>
                  Android Senior · consulting · {profile.location}
                </Text>
              </View>
            </View>

            <Text style={styles.footer}>
              {profile.drawingNo} · © 2026 {profile.name}
            </Text>
            <View style={{ height: 32 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BlueprintScene>
  );
}

function Direct({
  icon,
  label,
  value,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.directCard}>
      <Ionicons name={icon} size={18} color={BP.line} />
      <Text style={styles.directLabel}>{label}</Text>
      <Text style={styles.directValue} numberOfLines={1}>
        {value}
      </Text>
    </Pressable>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChange: (t: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'words' | 'sentences';
}) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={BP.inkFaint}
        multiline={multiline}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline && { minHeight: 110 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: spacing.lg, paddingBottom: 24 },
  direct: { flexDirection: 'row', gap: 10, marginBottom: 18 },
  directCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    gap: 6,
  },
  directLabel: {
    color: BP.line,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  directValue: { color: BP.inkSecondary, fontSize: 11 },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 12,
    marginBottom: 8,
  },
  socialName: { color: BP.ink, fontWeight: '800' },
  socialHandle: { color: BP.inkMuted, fontSize: 12, marginTop: 2 },
  fieldLabel: {
    color: BP.inkMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: 'rgba(0,0,0,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: BP.ink,
    fontSize: 15,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: BP.border,
    backgroundColor: BP.bgSheet,
    padding: 14,
    marginTop: 18,
  },
  footerTitle: { color: BP.ink, fontWeight: '900', fontSize: 14 },
  footerSub: { color: BP.inkMuted, fontSize: 12, marginTop: 4 },
  footer: {
    textAlign: 'center',
    color: BP.inkFaint,
    marginTop: 16,
    fontSize: 10,
    letterSpacing: 1,
  },
});
