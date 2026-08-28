import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HomeScreen } from './screens/HomeScreen';
import { ModulesScreen } from './screens/ModulesScreen';
import { DraftsmanScreen } from './screens/DraftsmanScreen';
import { SkillsScreen } from './screens/SkillsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ContactScreen } from './screens/ContactScreen';
import { BP } from './lib/blueprint';

export type MainTabParamList = {
  Home: undefined;
  Modules: undefined;
  Draftsman: undefined;
  Skills: undefined;
  About: undefined;
  Contact: undefined;
};

export type RootStackParamList = {
  Main: { screen?: keyof MainTabParamList } | undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: BP.bg,
    card: BP.bg,
    primary: BP.lineBright,
    text: BP.ink,
    border: BP.border,
    notification: BP.accent,
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: BP.lineBright,
        tabBarInactiveTintColor: BP.inkFaint,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ color, size, focused }) => {
          const map: Record<
            keyof MainTabParamList,
            keyof typeof Ionicons.glyphMap
          > = {
            Home: focused ? 'home' : 'home-outline',
            Modules: focused ? 'cube' : 'cube-outline',
            Draftsman: focused ? 'sparkles' : 'sparkles-outline',
            Skills: focused ? 'speedometer' : 'speedometer-outline',
            About: focused ? 'person' : 'person-outline',
            Contact: focused ? 'mail' : 'mail-outline',
          };
          return (
            <Ionicons
              name={map[route.name as keyof MainTabParamList]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Modules" component={ModulesScreen} />
      <Tab.Screen
        name="Draftsman"
        component={DraftsmanScreen}
        options={{ title: 'AI Draft' }}
      />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={BP.lineBright} size="large" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    backgroundColor: BP.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    backgroundColor: BP.tabBar,
    borderTopColor: BP.border,
    borderTopWidth: 1,
    height: 64,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
