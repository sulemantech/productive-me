import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as NavigationBar from 'expo-navigation-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import CommunityScreen from './(tabs)/community';
import HabitsScreen from './(tabs)/habits';
import HomeScreen from './(tabs)/home';
import DeepWorkScreen from './(tabs)/meditation';
import ProgressScreen from './(tabs)/progress';

// const HabitsScreen = () => (
//   <View style={styles.placeholderContainer}>
//     <Text style={styles.placeholderText}>Habits Screen</Text>
//   </View>
// );

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  useEffect(() => {
    const hideNavigation = async () => {
      await NavigationBar.setVisibilityAsync('hidden'); // Hide navigation bar
      await NavigationBar.setBehaviorAsync('overlay-swipe'); // Allow swipe to reveal
    };
    hideNavigation();
  }, []);

  return (
    <Tab.Navigator
      // screenOptions={{
      //   tabBarStyle: {
      //     backgroundColor: '#374151',
      //     borderTopWidth: 0,
      //     paddingTop: 10,
      //     paddingBottom: 12,
      //     height: 80,
      //   },
      //   tabBarIconStyle: { marginBottom: -2 },
      //   tabBarActiveTintColor: '#ffffff',
      //   tabBarInactiveTintColor: '#9ca3af',
      //   tabBarLabelStyle: { fontSize: 12, marginTop: 4, fontWeight: 'bold' },
      //   headerShown: false,
      // }}
      screenOptions={{
  tabBarStyle: {
    backgroundColor: '#374151',
    borderTopWidth: 0,
    paddingTop: 10,
    paddingBottom: 12,
    height: 80,
  },
  tabBarIconStyle: { marginBottom: -2 },
  tabBarActiveTintColor: '#ffffff',
  tabBarInactiveTintColor: '#9ca3af',
  tabBarLabelStyle: {
    fontSize: 10, // 👈 smaller text size
    marginTop: 4,
    fontWeight: 'bold',
  },
  headerShown: false,
}}

    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Habits"
        component={HabitsScreen}
        options={{
          tabBarLabel: 'Habits',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => (
           <Ionicons name="stats-chart-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Focus"
        component={DeepWorkScreen}
        options={{
          tabBarLabel: 'Focus',
          tabBarIcon: ({ color }) => (
            <Ionicons name="timer-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
});
