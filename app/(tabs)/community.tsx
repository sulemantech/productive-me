import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// In-memory data for habits and goals
const initialHabits = [
  { name: 'Pray Fajr', streak: 15, frequency: 'Daily', motivation: 'To start my day with a connection to Allah and seek His blessings.' },
  { name: 'Read 10 pages of the Quran', streak: 7, frequency: 'Daily', motivation: 'To deepen my understanding of Islam.' },
];

const initialGoals = [
  { name: 'Memorize Surah Al-Kahf', description: 'This Surah protects from the Dajjal.', targetDate: '2024-12-31', milestones: ['Memorize first 10 verses', 'Memorize last 10 verses'], progress: 45 },
  { name: 'Read a book on Seerah', description: 'To learn more about the life of the Prophet (ﷺ).', targetDate: '2024-09-30', milestones: ['Read first 5 chapters'], progress: 90 },
];

const duas = [
  "O Allah, make me of the people of Paradise.",
  "My Lord, increase me in knowledge.",
  "O Allah, give us good in this world and good in the Hereafter.",
  "O Allah, purify my heart from hypocrisy.",
  "All praise is for Allah.",
  "There is no power nor strength except with Allah."
];

const totalTime = 25 * 60; // 25 minutes in seconds
const breakTime = 5 * 60;  // 5 minutes in seconds
const CIRCLE_RADIUS = 120;
const CIRCLE_STROKE_WIDTH = 8;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function App() {
  // State variables to manage the UI and app data
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [habits, setHabits] = useState(initialHabits);
  const [goals, setGoals] = useState(initialGoals);
  const [isHabitModalVisible, setIsHabitModalVisible] = useState(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitMotivation, setNewHabitMotivation] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState('');
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalTargetDate, setNewGoalTargetDate] = useState('');
  const [newGoalMilestones, setNewGoalMilestones] = useState('');

  // Pomodoro Timer state
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [timerInitialTime, setTimerInitialTime] = useState(totalTime);
  const [currentDua, setCurrentDua] = useState(duas[0]);
  const intervalRef = useRef(null);

  // Hook to handle the timer interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            // Timer has ended
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (isBreak) {
              // Break is over, start a new work session
              setIsBreak(false);
              setTimerInitialTime(totalTime);
              setTimeRemaining(totalTime);
            } else {
              // Work session is over, start break
              setIsBreak(true);
              setTimerInitialTime(breakTime);
              setTimeRemaining(breakTime);
              const randomDua = duas[Math.floor(Math.random() * duas.length)];
              setCurrentDua(randomDua);
            }
            // Automatically restart the timer for the next phase
            setIsRunning(true);
            return 0; // Return 0 to restart the loop correctly
          }
        });
      }, 1000);
    }
    // Cleanup function to clear the interval
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  // Timer control functions
  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTimerInitialTime(totalTime);
    setTimeRemaining(totalTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const progressOffset = CIRCLE_CIRCUMFERENCE - (timeRemaining / timerInitialTime) * CIRCLE_CIRCUMFERENCE;

  // Handle forms
  const handleAddHabit = () => {
    if (newHabitName) {
      const newHabit = {
        name: newHabitName,
        streak: 0,
        frequency: newHabitFrequency || 'Daily',
        motivation: newHabitMotivation,
      };
      setHabits([...habits, newHabit]);
      setIsHabitModalVisible(false);
      setNewHabitName('');
      setNewHabitMotivation('');
      setNewHabitFrequency('');
    }
  };

  const handleAddGoal = () => {
    if (newGoalName) {
      const newGoal = {
        name: newGoalName,
        description: newGoalDescription,
        targetDate: newGoalTargetDate,
        milestones: newGoalMilestones.split(',').map(s => s.trim()),
        progress: 0,
      };
      setGoals([...goals, newGoal]);
      setIsGoalModalVisible(false);
      setNewGoalName('');
      setNewGoalDescription('');
      setNewGoalTargetDate('');
      setNewGoalMilestones('');
    }
  };

  // Render a single habit item
  const renderHabitItem = (habit, index) => (
    <View key={index} style={styles.habitItem}>
      <View style={styles.habitItemRow}>
        <View style={styles.habitCheckboxContainer}>
          <TouchableOpacity style={styles.habitCheckbox}>
            <Icon name="check" size={18} color="transparent" />
          </TouchableOpacity>
          <Text style={styles.habitText}>{habit.name}</Text>
        </View>
        <View style={styles.streakContainer}>
          <Icon name="fire" size={20} color="#4ade80" />
          <Text style={styles.streakText}>{habit.streak}</Text>
        </View>
      </View>
      <Text style={styles.habitMotivation}>{habit.motivation}</Text>
      <Text style={styles.habitFrequency}>Frequency: {habit.frequency}</Text>
    </View>
  );

  // Render a single goal item
  const renderGoalItem = (goal, index) => (
    <View key={index} style={styles.goalItem}>
      <Text style={styles.goalName}>{goal.name}</Text>
      <Text style={styles.goalDescription}>{goal.description}</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBar, { width: `${goal.progress}%` }]} />
      </View>
      <View style={styles.goalInfoRow}>
        <Text style={styles.goalInfoText}>{goal.progress}% Complete</Text>
        <Text style={styles.goalInfoText}>Target: {goal.targetDate}</Text>
      </View>
    </View>
  );

  // Conditional rendering for the main content screens
  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Current Streak 🔥</Text>
              <Text style={styles.streakNumber}>15</Text>
              <Text style={styles.streakDescription}>Days of consistent prayer and habits.</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Focus Mode</Text>
              <Text style={styles.sectionDescription}>Start a focused work session with a spiritual break.</Text>
              <TouchableOpacity style={[styles.button, styles.indigoButton]} onPress={() => setActiveScreen('pomodoro')}>
                <Text style={styles.buttonText}>Start Pomodoro Timer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Progress</Text>
              <Text style={styles.sectionDescription}>View and track your daily habits and goals.</Text>
              <TouchableOpacity style={[styles.button, styles.tealButton]} onPress={() => setActiveScreen('habits')}>
                <Text style={styles.buttonText}>Go to Habits & Goals</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        );
      case 'habits':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.screenHeader}>
              <Text style={styles.screenHeaderTitle}>Habits & Goals</Text>
            </View>
            <View style={styles.listSection}>
              <View style={styles.listSectionHeader}>
                <Text style={styles.listTitle}>Daily Habits</Text>
                <TouchableOpacity onPress={() => setIsHabitModalVisible(true)} style={styles.addButton}>
                  <Icon name="plus" size={24} color="#E5E7EB" />
                </TouchableOpacity>
              </View>
              <View style={styles.listContainer}>
                {habits.map(renderHabitItem)}
              </View>
            </View>
            <View style={styles.listSection}>
              <View style={styles.listSectionHeader}>
                <Text style={styles.listTitle}>Long-Term Goals</Text>
                <TouchableOpacity onPress={() => setIsGoalModalVisible(true)} style={styles.addButton}>
                  <Icon name="plus" size={24} color="#E5E7EB" />
                </TouchableOpacity>
              </View>
              <View style={styles.listContainer}>
                {goals.map(renderGoalItem)}
              </View>
            </View>
          </ScrollView>
        );
      case 'pomodoro':
        return (
          <View style={styles.pomodoroContainer}>
            <Text style={styles.pomodoroTitle}>Pomodoro Timer</Text>
            <View style={styles.timerCircleContainer}>
              <Svg height={CIRCLE_RADIUS * 2 + CIRCLE_STROKE_WIDTH} width={CIRCLE_RADIUS * 2 + CIRCLE_STROKE_WIDTH}>
                <Circle
                  stroke="#4b5563"
                  strokeWidth={CIRCLE_STROKE_WIDTH}
                  fill="transparent"
                  r={CIRCLE_RADIUS}
                  cx={CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2}
                  cy={CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2}
                />
                <Circle
                  stroke={isBreak ? '#facc15' : '#4ade80'}
                  strokeWidth={CIRCLE_STROKE_WIDTH}
                  fill="transparent"
                  r={CIRCLE_RADIUS}
                  cx={CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2}
                  cy={CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2}
                  strokeDasharray={CIRCLE_CIRCUMFERENCE}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  transform={`rotate(-90, ${CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2}, ${CIRCLE_RADIUS + CIRCLE_STROKE_WIDTH / 2})`}
                />
              </Svg>
              <View style={styles.timerDisplayContainer}>
                <Text style={styles.timerDisplayText}>{formatTime(timeRemaining)}</Text>
              </View>
            </View>
            {isBreak && (
              <View style={styles.breakMessage}>
                <Text style={styles.breakMessageTitle}>Break time! Recite this:</Text>
                <Text style={styles.breakMessageText}>{currentDua}</Text>
              </View>
            )}
            <View style={styles.pomodoroButtons}>
              <TouchableOpacity
                style={[
                  styles.pomodoroButton,
                  isRunning ? styles.redButton : styles.greenButton,
                ]}
                onPress={startPauseTimer}>
                <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.pomodoroButton, styles.grayButton]}
                onPress={resetTimer}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'community':
        return (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.screenHeaderTitle}>Community Hub</Text>
            <View style={styles.section}>
              <Text style={styles.listTitle}>Community Challenges</Text>
              <Text style={styles.sectionDescription}>Join a challenge and achieve your goals with others!</Text>
              <View style={styles.communityItem}>
                <View>
                  <Text style={styles.communityItemTitle}>30-Day Quran Challenge</Text>
                  <Text style={styles.communityItemMembers}>Join 154 members</Text>
                </View>
                <TouchableOpacity style={[styles.communityButton, styles.indigoButton]}>
                  <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.communityItem}>
                <View>
                  <Text style={styles.communityItemTitle}>Healthy Ramadan Challenge</Text>
                  <Text style={styles.communityItemMembers}>Join 88 members</Text>
                </View>
                <TouchableOpacity style={[styles.communityButton, styles.indigoButton]}>
                  <Text style={styles.buttonText}>Join</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.listTitle}>Prayer Groups</Text>
              <Text style={styles.sectionDescription}>Pray on time with your friends.</Text>
              <View style={styles.communityItem}>
                <View>
                  <Text style={styles.communityItemTitle}>Fajr Friends Group</Text>
                  <Text style={styles.communityItemMembers}>7 members online</Text>
                </View>
                <TouchableOpacity style={[styles.communityButton, styles.greenButton]}>
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.communityItem}>
                <View>
                  <Text style={styles.communityItemTitle}>Zuhr Team</Text>
                  <Text style={styles.communityItemMembers}>3 members online</Text>
                </View>
                <TouchableOpacity style={[styles.communityButton, styles.greenButton]}>
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={[styles.button, styles.tealButton, { marginTop: 16 }]}>
              <Text style={styles.buttonText}>Share My Progress with the Community</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2937" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productive Muslims</Text>
        <View style={styles.profileContainer}>
          <Text style={styles.pointsText}>12,450 pts</Text>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>S</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('dashboard')}>
          <Icon name="view-dashboard" size={24} color={activeScreen === 'dashboard' ? '#E5E7EB' : '#9ca3af'} />
          <Text style={[styles.navText, activeScreen === 'dashboard' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('habits')}>
          <Icon name="format-list-checks" size={24} color={activeScreen === 'habits' ? '#E5E7EB' : '#9ca3af'} />
          <Text style={[styles.navText, activeScreen === 'habits' && styles.navTextActive]}>Habits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('pomodoro')}>
          <Icon name="timer-sand" size={24} color={activeScreen === 'pomodoro' ? '#E5E7EB' : '#9ca3af'} />
          <Text style={[styles.navText, activeScreen === 'pomodoro' && styles.navTextActive]}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('community')}>
          <Icon name="account-group" size={24} color={activeScreen === 'community' ? '#E5E7EB' : '#9ca3af'} />
          <Text style={[styles.navText, activeScreen === 'community' && styles.navTextActive]}>Community</Text>
        </TouchableOpacity>
      </View>

      {/* Add Habit Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isHabitModalVisible}
        onRequestClose={() => setIsHabitModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsHabitModalVisible(false)}>
              <Icon name="close" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add a New Habit</Text>
            <TextInput
              style={styles.input}
              placeholder="Habit Name"
              placeholderTextColor="#9ca3af"
              value={newHabitName}
              onChangeText={setNewHabitName}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Motivation / Reason"
              placeholderTextColor="#9ca3af"
              multiline
              value={newHabitMotivation}
              onChangeText={setNewHabitMotivation}
            />
            <TextInput
              style={styles.input}
              placeholder="Target Frequency (e.g., 'Daily')"
              placeholderTextColor="#9ca3af"
              value={newHabitFrequency}
              onChangeText={setNewHabitFrequency}
            />
            <TouchableOpacity style={[styles.button, styles.indigoButton]} onPress={handleAddHabit}>
              <Text style={styles.buttonText}>Add Habit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Goal Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isGoalModalVisible}
        onRequestClose={() => setIsGoalModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setIsGoalModalVisible(false)}>
              <Icon name="close" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add a New Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Goal Name"
              placeholderTextColor="#9ca3af"
              value={newGoalName}
              onChangeText={setNewGoalName}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              placeholderTextColor="#9ca3af"
              multiline
              value={newGoalDescription}
              onChangeText={setNewGoalDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Target Date (e.g., 'YYYY-MM-DD')"
              placeholderTextColor="#9ca3af"
              value={newGoalTargetDate}
              onChangeText={setNewGoalTargetDate}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Milestones (comma-separated)"
              placeholderTextColor="#9ca3af"
              multiline
              value={newGoalMilestones}
              onChangeText={setNewGoalMilestones}
            />
            <TouchableOpacity style={[styles.button, styles.indigoButton]} onPress={handleAddGoal}>
              <Text style={styles.buttonText}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    backgroundColor: '#1f2937',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    ...Platform.select({
      ios: { paddingTop: 50 },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#facc15',
    marginRight: 12,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4b5563',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  mainContent: {
    flex: 1,
    padding: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    backgroundColor: '#1f2937',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#4ade80',
    textAlign: 'center',
  },
  streakDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  indigoButton: {
    backgroundColor: '#4f46e5',
  },
  tealButton: {
    backgroundColor: '#14b8a6',
  },
  greenButton: {
    backgroundColor: '#22c55e',
  },
  redButton: {
    backgroundColor: '#ef4444',
  },
  grayButton: {
    backgroundColor: '#4b5563',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  navBar: {
    backgroundColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#9ca3af',
  },
  navTextActive: {
    color: '#E5E7EB',
  },
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  screenHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  listSection: {
    marginBottom: 24,
  },
  listSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E5E7EB',
  },
  addButton: {
    padding: 8,
    backgroundColor: '#4f46e5',
    borderRadius: 24,
  },
  listContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  habitItem: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
  },
  habitItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  habitCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  habitCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4b5563',
    backgroundColor: '#1f2937',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4ade80',
    marginLeft: 4,
  },
  habitMotivation: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  habitFrequency: {
    fontSize: 10,
    color: '#6b7280',
  },
  goalItem: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
  },
  goalName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  goalDescription: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    marginTop: 4,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#4b5563',
    borderRadius: 4,
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  goalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  goalInfoText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  pomodoroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pomodoroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 32,
  },
  timerCircleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: CIRCLE_RADIUS * 2 + CIRCLE_STROKE_WIDTH,
    height: CIRCLE_RADIUS * 2 + CIRCLE_STROKE_WIDTH,
  },
  timerDisplayContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerDisplayText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#E5E7EB',
  },
  breakMessage: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
    width: '90%',
    alignItems: 'center',
  },
  breakMessageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
  },
  breakMessageText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
  pomodoroButtons: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 16,
  },
  pomodoroButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  communityItem: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  communityItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
  },
  communityItemMembers: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  communityButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#374151',
    color: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
