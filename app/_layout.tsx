// app/TabsLayout.tsx
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeepWorkSession from './(tabs)/deepwork';
import HomeTwoScreen from './(tabs)/hometwo';
import UserProfile from './(tabs)/profiletwo';
import ProgressScreen from './(tabs)/progress';
import ReminderTwoScreen from './(tabs)/reminder-two';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Set the active and inactive icon colors
        tabBarActiveTintColor: '#22D3EE',
        tabBarInactiveTintColor: '#94A3B8',
        // Style the tab bar container
        tabBarStyle: {
          backgroundColor: '#1E293B', // A dark slate color for the tab bar
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 5,
        },
        // Style the header bar at the top of each screen
        headerStyle: {
          backgroundColor: '#0F172A', // A very dark slate for the header
        },
        headerTintColor: '#E2E8F0', // Light text color for the header title
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={HomeTwoScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Reminders"
        component={ReminderTwoScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Deep Work"
        component={DeepWorkSession}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Add Task"
        component={AddTaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          ),
        }}
      /> */}
      
      {/* <Tab.Screen
        name="Streak"
        component={StreakScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
