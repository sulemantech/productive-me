import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Line, Path, Polyline, Rect } from 'react-native-svg';

// Reusable component for the reminder item
const ReminderItem = ({ reminder, onToggleChange }) => {
  const toggleStyle = reminder.completed
    ? styles.toggleLabelActive
    : styles.toggleLabelInactive;
  const toggleCircleStyle = reminder.completed
    ? styles.toggleCircleActive
    : styles.toggleCircleInactive;

  return (
    <View style={styles.reminderCard}>
      <View style={[styles.iconContainer, reminder.completed ? styles.iconBgGreen : styles.iconBgCyan]}>
        {reminder.icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.reminderText, reminder.completed && styles.completedText]}>
          {reminder.text}
        </Text>
        <Text style={styles.reminderTime}>{reminder.time}</Text>
      </View>
      <TouchableOpacity onPress={() => onToggleChange(reminder.id)} style={toggleStyle}>
        <View style={toggleCircleStyle} />
      </TouchableOpacity>
    </View>
  );
};

// Main Reminder Screen Component
const ReminderTwoScreen = () => {
  // Use state to manage the list of reminders.
  const [reminders, setReminders] = useState([
    {
      id: 1,
      text: 'Fajr Prayer',
      time: 'Today at 5:30 AM',
      completed: true,
      icon: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Polyline points="20 6 9 17 4 12" />
        </Svg>
      ),
    },
    {
      id: 2,
      text: 'Daily Dhikr',
      time: 'Today at 7:00 PM',
      completed: false,
      icon: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <Path d="M8 7h6" />
          <Path d="M8 11h8" />
        </Svg>
      ),
    },
    {
      id: 3,
      text: 'Check Weekly Todos',
      time: 'Every Friday',
      completed: false,
      icon: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Rect x="3" y="5" width="6" height="6" rx="1" />
          <Path d="m3 17h18" />
          <Path d="m12 17h9" />
          <Path d="m3 12h11" />
          <Path d="m12 5h9" />
        </Svg>
      ),
    },
    {
      id: 4,
      text: 'Focus Session',
      time: 'Tomorrow at 10:00 AM',
      completed: false,
      icon: (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Line x1="10" x2="14" y1="2" y2="2" />
          <Path d="M12 14v-4" />
          <Path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14.1" />
          <Path d="M12 2v2" />
        </Svg>
      ),
    },
  ]);

  // Function to handle toggle switch changes
  const handleToggleChange = (id) => {
    setReminders(prevReminders =>
      prevReminders.map(reminder =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  // Calculate progress
  const completedReminders = reminders.filter(r => r.completed).length;
  const totalReminders = reminders.length;
  const progressPercentage = (completedReminders / totalReminders) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <Path d="m15 18-6-6 6-6"/>
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView style={styles.content}>
        {/* Daily Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Today's Progress</Text>
          <Text style={styles.progressCount}>{completedReminders} of {totalReminders} reminders completed</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        {/* Today's Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {reminders.filter(r => r.time.startsWith('Today')).map(reminder => (
            <ReminderItem key={reminder.id} reminder={reminder} onToggleChange={handleToggleChange} />
          ))}
        </View>
        
        {/* Upcoming Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {reminders.filter(r => !r.time.startsWith('Today')).map(reminder => (
            <ReminderItem key={reminder.id} reminder={reminder} onToggleChange={handleToggleChange} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M5 12h14"/>
          <Path d="M12 5v14"/>
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    color: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 20,
    overflow: 'hidden',
    padding: 16,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor: '#0f172a', // slate-900
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  progressCard: {
    backgroundColor: '#334155', // slate-700
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  progressCount: {
    fontSize: 14,
    color: '#94a3b8', // slate-400
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#475569', // slate-600
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#06b6d4', // cyan-500
    borderRadius: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155', // slate-700
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconBgGreen: {
    backgroundColor: '#22c55e', // green-500
  },
  iconBgCyan: {
    backgroundColor: '#06b6d4', // cyan-500
  },
  textContainer: {
    flex: 1,
  },
  reminderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#94a3b8', // slate-400
  },
  reminderTime: {
    fontSize: 12,
    color: '#94a3b8', // slate-400
  },
  toggleLabelActive: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#06b6d4', // cyan-500
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 2,
  },
  toggleLabelInactive: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#64748b', // slate-500
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 2,
  },
  toggleCircleActive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  toggleCircleInactive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#06b6d4', // cyan-500
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReminderTwoScreen;
