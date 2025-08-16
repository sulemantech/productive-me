import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Generalized screen for each setting item
const DetailScreen = ({ onGoBack, title }) => {
  const insets = useSafeAreaInsets();
  const [selectedGoal, setSelectedGoal] = useState(10); // Default to 10 Verses per day

  const goalCards = [
    { verses: 1, text: "Verse per day" },
    { verses: 3, text: "Verses per day" },
    { verses: 5, text: "Verses per day" },
    { verses: 10, text: "Verses per day" }
  ];

  // Function to render the specific "Daily Quran Goal" screen
  const renderDailyGoalScreen = () => (
    <View style={styles.dailyGoalContainer}>
      <Text style={styles.subheading}>Your daily goal</Text>
      <View style={styles.goalCardsGrid}>
        {goalCards.map((goal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.goalCard, selectedGoal === goal.verses && styles.selectedGoalCard]}
            onPress={() => setSelectedGoal(goal.verses)}
          >
            <Text style={styles.goalText}>{goal.verses}</Text>
            <Text style={styles.goalSubtext}>{goal.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.tipBox}>
        <Ionicons name="information-circle-outline" size={24} color="#f5f5f5" />
        <Text style={styles.tipText}>
          Starting with a high target makes it difficult to maintain the habit long term!
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {title === "Daily Quran Goal" ? (
        renderDailyGoalScreen()
      ) : (
        <View style={styles.content}>
          <Text style={styles.contentText}>Content for "{title}" will be displayed here.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const SettingsScreen = ({ onBack = () => {} }) => {
  const insets = useSafeAreaInsets();
  
  const [showTranslation, setShowTranslation] = useState(true);
  const [readingLevels, setReadingLevels] = useState(true);

  // Array of setting items to render
  const settingItems = [
    { title: "Alerts", hasToggle: false },
    { title: "Notifications", hasToggle: false },
    { title: "Hide Hasanat", hasToggle: false },
    { title: "Reciter", hasToggle: false },
    { title: "Quran Script", hasToggle: false },
    { title: "Daily Quran Goal", hasToggle: false },
    { title: "Change Password", hasToggle: false },
    { title: "Change Email Address", hasToggle: false },
    { title: "Change Name", hasToggle: false },
    { title: "Font Size", hasToggle: false },
    { title: "Translation", hasToggle: false },
    { title: "Vibration", hasToggle: false },
    { title: "Show Translation", hasToggle: true, isToggled: showTranslation, onToggle: setShowTranslation },
    { title: "Reading Levels", hasToggle: true, isToggled: readingLevels, onToggle: setReadingLevels }
  ];

  // Reusable component for each setting item
  const SettingItem = ({ title, hasToggle, onToggle, isToggled, onPress }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={hasToggle ? null : onPress} // Only navigate if there's no toggle switch
      activeOpacity={hasToggle ? 1 : 0.7}
    >
      <Text style={styles.settingText}>{title}</Text>
      {hasToggle ? (
        <Switch
          trackColor={{ false: "#4d3d5d", true: "#4a148c" }}
          thumbColor={isToggled ? "#fff" : "#f4f3f4"}
          ios_backgroundColor="#4d3d5d"
          onValueChange={onToggle}
          value={isToggled}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#a0a0a0" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView style={styles.settingsList}>
        {settingItems.map((item, index) => (
          <SettingItem
            key={index}
            title={item.title}
            hasToggle={item.hasToggle}
            isToggled={item.isToggled}
            onToggle={() => item.onToggle(!item.isToggled)}
            onPress={() => onSelectSetting(item.title)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#322345',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    padding: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4d3d5d',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  // New styles for the daily goal screen
  dailyGoalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  subheading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
  },
  goalCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  goalCard: {
    width: (width - 60) / 2,
    height: (width - 60) / 4,
    backgroundColor: '#4d3d5d',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedGoalCard: {
    backgroundColor: '#4a148c',
    borderColor: '#4a148c',
    borderWidth: 2,
  },
  goalText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  goalSubtext: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  tipBox: {
    borderWidth: 2,
    borderColor: '#e0b2a7',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#504163',
    marginTop: 10,
  },
  tipText: {
    color: '#f5f5f5',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
});

export default SettingsScreen;
