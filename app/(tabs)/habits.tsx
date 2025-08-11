import React, { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Icon components for reusability
const PlusIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M5 12h14" />
    <Path d="M12 5v14" />
  </Svg>
);

const XIcon = (props) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M18 6 6 18" />
    <Path d="m6 6 12 12" />
  </Svg>
);

const FlameIcon = (props) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07.98-1.07 2.42-2 4-2.22 4.92-1.93 12.44-2 17h.08C4.58 20.37 6.5 18 8.5 14.5Z" />
    <Path d="M14.5 8.5a2.5 2.5 0 0 0-3 2.5c0 1.38.5 2 1 3 1.07-.98 1.07-2.42 2-4 2.22-4.92 1.93-12.44 2-17h-.08C18.42 3.63 16.5 6 14.5 8.5Z" />
    <Path d="M17.5 12.5A2.5 2.5 0 0 0 20 10c0-1.38-.5-2-1-3-1.07.98-1.07 2.42 2-4 2.22-4.92 1.93-12.44 2-17h-.08C21.58 16.37 19.5 14 17.5 12.5Z" />
  </Svg>
);

// Habit item component
const HabitItem = ({ habit }) => (
  <View style={styles.habitItem}>
    <View style={styles.habitItemHeader}>
      <View style={styles.habitCheckboxContainer}>
        <View style={styles.checkbox}></View>
        <Text style={styles.habitName}>{habit.name}</Text>
      </View>
      <View style={styles.streakContainer}>
        <FlameIcon color="#4ade80" />
        <Text style={styles.streakText}>{habit.streak}</Text>
      </View>
    </View>
    <Text style={styles.habitMotivation}>{habit.motivation}</Text>
    <Text style={styles.habitFrequency}>Frequency: {habit.frequency}</Text>
  </View>
);

// Goal item component
const GoalItem = ({ goal }) => (
  <View style={styles.goalItem}>
    <Text style={styles.goalName}>{goal.name}</Text>
    <Text style={styles.goalDescription}>{goal.description}</Text>
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBar, { width: `${goal.progress}%` }]} />
    </View>
    <View style={styles.progressTextContainer}>
      <Text style={styles.progressText}>{goal.progress}% Complete</Text>
      <Text style={styles.progressText}>Target: {goal.targetDate}</Text>
    </View>
  </View>
);

const HabitsScreen = () => {
  // State for habits, goals, and modal visibility
  const [habits, setHabits] = useState([
    { name: 'Pray Fajr', streak: 15, frequency: 'Daily', motivation: 'To start my day with a connection to Allah and seek His blessings.' },
    { name: 'Read 10 pages of Quran', streak: 7, frequency: 'Daily', motivation: 'To deepen my understanding of Islam.' }
  ]);
  const [goals, setGoals] = useState([
    { name: 'Memorize Surah Al-Kahf', description: 'This Surah protects from the Dajjal.', targetDate: '2024-12-31', milestones: ['Memorize first 10 verses', 'Memorize last 10 verses'], progress: 45 },
    { name: 'Read a book on Seerah', description: 'To learn more about the life of the Prophet (ﷺ).', targetDate: '2024-09-30', milestones: ['Read first 5 chapters'], progress: 90 }
  ]);
  const [isHabitModalVisible, setHabitModalVisible] = useState(false);
  const [isGoalModalVisible, setGoalModalVisible] = useState(false);

  // State for new habit form fields
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitMotivation, setNewHabitMotivation] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState('');

  // State for new goal form fields
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalTargetDate, setNewGoalTargetDate] = useState('');
  const [newGoalMilestones, setNewGoalMilestones] = useState('');

  // Handlers for adding new items
  const handleAddHabit = () => {
    if (newHabitName) {
      const newHabit = {
        name: newHabitName,
        streak: 0,
        motivation: newHabitMotivation,
        frequency: newHabitFrequency,
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setNewHabitMotivation('');
      setNewHabitFrequency('');
      setHabitModalVisible(false);
    }
  };

  const handleAddGoal = () => {
    if (newGoalName) {
      const newGoal = {
        name: newGoalName,
        description: newGoalDescription,
        targetDate: newGoalTargetDate,
        milestones: newGoalMilestones.split(',').map(m => m.trim()).filter(m => m.length > 0),
        progress: 0,
      };
      setGoals([...goals, newGoal]);
      setNewGoalName('');
      setNewGoalDescription('');
      setNewGoalTargetDate('');
      setNewGoalMilestones('');
      setGoalModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Habits & Goals</Text>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          {/* Daily Habits Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Habits</Text>
              <TouchableOpacity onPress={() => setHabitModalVisible(true)} style={styles.addButton}>
                <PlusIcon color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              {habits.map((habit, index) => (
                <HabitItem key={index} habit={habit} />
              ))}
            </View>
          </View>

          {/* Long-Term Goals Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Long-Term Goals</Text>
              <TouchableOpacity onPress={() => setGoalModalVisible(true)} style={styles.addButton}>
                <PlusIcon color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
              {goals.map((goal, index) => (
                <GoalItem key={index} goal={goal} />
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Add Habit Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isHabitModalVisible}
          onRequestClose={() => setHabitModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setHabitModalVisible(false)} style={styles.modalCloseButton}>
                <XIcon color="#9ca3af" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add a New Habit</Text>
              <View style={styles.formContainer}>
                <View>
                  <Text style={styles.formLabel}>Habit Name</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newHabitName}
                    onChangeText={setNewHabitName}
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Motivation / Reason</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newHabitMotivation}
                    onChangeText={setNewHabitMotivation}
                    multiline
                    placeholder="Why do you want to build this habit?"
                    placeholderTextColor="#6b7280"
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Target Frequency</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newHabitFrequency}
                    onChangeText={setNewHabitFrequency}
                    placeholder="e.g., 'Daily', '5 times a week'"
                    placeholderTextColor="#6b7280"
                  />
                </View>
                <TouchableOpacity onPress={handleAddHabit} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Add Habit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Add Goal Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isGoalModalVisible}
          onRequestClose={() => setGoalModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setGoalModalVisible(false)} style={styles.modalCloseButton}>
                <XIcon color="#9ca3af" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add a New Goal</Text>
              <View style={styles.formContainer}>
                <View>
                  <Text style={styles.formLabel}>Goal Name</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newGoalName}
                    onChangeText={setNewGoalName}
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Description</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newGoalDescription}
                    onChangeText={setNewGoalDescription}
                    multiline
                    placeholder="Why is this goal important?"
                    placeholderTextColor="#6b7280"
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Target Date</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newGoalTargetDate}
                    onChangeText={setNewGoalTargetDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#6b7280"
                  />
                </View>
                <View>
                  <Text style={styles.formLabel}>Milestones</Text>
                  <TextInput
                    style={styles.formInput}
                    value={newGoalMilestones}
                    onChangeText={setNewGoalMilestones}
                    multiline
                    placeholder="e.g., Read chapter 1, complete chapter 2, etc."
                    placeholderTextColor="#6b7280"
                  />
                </View>
                <TouchableOpacity onPress={handleAddGoal} style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Add Goal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827',
  },
  container: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  header: {
    backgroundColor: '#374151',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E5E7EB',
  },
  mainContent: {
    flex: 1,
    padding: 24,
    paddingBottom:0,
    marginBottom:30
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#d1d5db',
  },
  addButton: {
    backgroundColor: '#4f46e5',
    padding: 12,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listContainer: {
    backgroundColor: '#374151',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 16,
  },
  habitItem: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  habitItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4b5563',
    backgroundColor: '#111827',
  },
  habitName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#e5e7eb',
    marginLeft: 12,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    color: '#4ade80',
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 16,
  },
  habitMotivation: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 8,
  },
  habitFrequency: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  goalItem: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  goalName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#e5e7eb',
  },
  goalDescription: {
    fontSize: 14,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
  progressBarBackground: {
    width: '100%',
    backgroundColor: '#4b5563',
    height: 8,
    borderRadius: 9999,
    marginTop: 8,
  },
  progressBar: {
    backgroundColor: '#2563eb',
    height: 8,
    borderRadius: 9999,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#e5e7eb',
    marginBottom: 16,
  },
  formContainer: {
    gap: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
    marginBottom: 4,
  },
  formInput: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 12,
    color: '#e5e7eb',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4b5563',
  },
  submitButton: {
    backgroundColor: '#4f46e5',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HabitsScreen;
