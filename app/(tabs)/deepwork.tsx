import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Main screen component for the Deep Work Session
const DeepWorkSession = ({ onBack }) => {
  // Timer state management
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // UI state management
  const [sessionGoal, setSessionGoal] = useState('');
  const [dhikrReminder, setDhikrReminder] = useState(false);
  const [reflectionPopup, setReflectionPopup] = useState(false);
  const [showCustomTimerModal, setShowCustomTimerModal] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState('');

  // Effect hook to handle the timer logic
  useEffect(() => {
    let intervalId;

    if (isRunning && secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      // Timer has finished, reset and show an alert
      setIsRunning(false);
      Alert.alert(
        'Session Complete',
        'Deep Work session complete! Time for a break.',
        [
          { text: 'OK', onPress: () => setSecondsRemaining(initialSeconds) }
        ]
      );
    }

    // Cleanup function to clear the interval when the component unmounts or state changes
    return () => clearInterval(intervalId);
  }, [isRunning, secondsRemaining, initialSeconds]);

  // Function to start or pause the timer
  const handleSessionControl = () => {
    setIsRunning(!isRunning);
  };

  // Function to toggle between default 25-minute timer and custom
  const handleSetDefaultTimer = () => {
    setInitialSeconds(25 * 60);
    setSecondsRemaining(25 * 60);
    setIsRunning(false);
  };

  // Function to handle custom timer input
  const handleCustomTimerSave = () => {
    const minutes = parseInt(customMinutesInput, 10);
    if (!isNaN(minutes) && minutes > 0) {
      setInitialSeconds(minutes * 60);
      setSecondsRemaining(minutes * 60);
      setIsRunning(false);
      setShowCustomTimerModal(false);
      setCustomMinutesInput('');
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number for minutes.');
    }
  };

  // Format the time for display (e.g., 25:00)
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Progress bar calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - (secondsRemaining / initialSeconds);
  const strokeDashoffset = circumference * progress;

  // Function to simulate a back action
  const handleBack = () => {
    console.log('Back button pressed. This would typically close the current screen.');
    // In a real app with react-navigation, you would call navigation.goBack() here.
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        {/* Header with back button and title */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Deep Work Session</Text>
        </View>

        {/* Timer Display Section */}
        <View style={styles.timerContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            {/* Background circle */}
            <Circle
              stroke="#4A5568"
              strokeWidth="8"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Progress ring */}
            <Circle
              stroke="#06B6D4"
              strokeWidth="8"
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
              originX="50"
              originY="50"
              rotation="-90"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
          <View style={styles.timerTextWrapper}>
            <Text style={styles.timerText}>{formatTime(secondsRemaining)}</Text>
            <View style={styles.timerModeButtons}>
              <TouchableOpacity onPress={handleSetDefaultTimer}>
                <Text style={styles.timerModeText}>{Math.floor(initialSeconds / 60)} min</Text>
              </TouchableOpacity>
              <Text style={styles.timerModeSeparator}> / </Text>
              <TouchableOpacity onPress={() => setShowCustomTimerModal(true)}>
                <Text style={styles.timerModeText}>Custom</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Motivational Text */}
        <Text style={styles.motivationalText}>"Focus is a form of worship."</Text>

        {/* Start / Pause Button */}
        <TouchableOpacity
          style={[styles.sessionButton, isRunning ? styles.pauseButton : styles.startButton]}
          onPress={handleSessionControl}
        >
          <Text style={styles.sessionButtonText}>
            {isRunning ? 'Pause' : 'Start Session'}
          </Text>
        </TouchableOpacity>

        {/* Session Goal Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>What will you focus on?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Draft client report"
            placeholderTextColor="#9CA3AF"
            value={sessionGoal}
            onChangeText={setSessionGoal}
          />
        </View>

        {/* Optional Reminders */}
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxWrapper}>
            <Switch
              trackColor={{ false: '#767577', true: '#06B6D4' }}
              thumbColor={dhikrReminder ? '#F4F3F4' : '#F4F3F4'}
              onValueChange={setDhikrReminder}
              value={dhikrReminder}
            />
            <Text style={styles.checkboxLabel}>Remind me to do dhikr after session</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <Switch
              trackColor={{ false: '#767577', true: '#06B6D4' }}
              thumbColor={reflectionPopup ? '#F4F3F4' : '#F4F3F4'}
              onValueChange={setReflectionPopup}
              value={reflectionPopup}
            />
            <Text style={styles.checkboxLabel}>Show post-session reflection popup</Text>
          </View>
        </View>

        {/* Session History / Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Session Stats</Text>
          <View style={styles.statsList}>
            <Text style={styles.statsItem}>✅ 4 sessions completed this week</Text>
            <Text style={styles.statsItem}>🔥 Streak: 3 days in a row</Text>
            <Text style={styles.statsItem}>📈 Most focused time: 10am - 12pm</Text>
          </View>
        </View>
      </View>

      {/* Custom Timer Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showCustomTimerModal}
        onRequestClose={() => setShowCustomTimerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Custom Time</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              placeholder="Enter minutes (e.g., 45)"
              placeholderTextColor="#9CA3AF"
              value={customMinutesInput}
              onChangeText={setCustomMinutesInput}
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowCustomTimerModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSaveButton]}
                onPress={handleCustomTimerSave}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 20, // Added margin at the top
    backgroundColor: '#1E293B', // Corresponds to bg-slate-800
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8, // For Android shadow
    padding: 24,
    width: '100%',
    maxWidth: 384, // Corresponds to max-w-sm
    alignItems: 'center',
  },
  // New style for the header container to align title and back button
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },
  // New style for the back button
  backButton: {
    position: 'absolute',
    left: 0,
    paddingRight: 10, // Add some padding to not overlap with the title
    zIndex: 1, // Ensure the button is clickable
  },
  backButtonText: {
    fontSize: 24,
    color: '#CBD5E1', // Corresponds to text-slate-300
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC', // Corresponds to text-white
    textAlign: 'center', // Center the title within the container
    flex: 1, // Allow the title to take up remaining space
  },
  timerContainer: {
    position: 'relative',
    width: 256, // Corresponds to w-64
    height: 256, // Corresponds to h-64
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerTextWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#22D3EE', // Corresponds to text-cyan-400
  },
  timerModeButtons: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  timerModeText: {
    color: '#9CA3AF', // Corresponds to text-slate-400
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  timerModeSeparator: {
    color: '#9CA3AF',
    marginHorizontal: 4,
    fontSize: 14,
  },
  motivationalText: {
    color: '#9CA3AF', // Corresponds to text-slate-400
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  sessionButton: {
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 9999, // Corresponds to rounded-full
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#06B6D4', // Corresponds to bg-cyan-500
  },
  pauseButton: {
    backgroundColor: '#FB923C', // Corresponds to bg-orange-500
  },
  sessionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
  inputContainer: {
    width: '100%',
    marginTop: 32,
  },
  label: {
    color: '#9CA3AF', // Corresponds to text-slate-400
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#334155', // Corresponds to bg-slate-700
    borderWidth: 1,
    borderColor: '#475569', // Corresponds to border-slate-600
    color: '#F8FAFC', // Corresponds to text-white
    fontSize: 16,
  },
  checkboxContainer: {
    width: '100%',
    marginTop: 24,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    color: '#CBD5E1', // Corresponds to text-slate-300
    fontSize: 14,
    marginLeft: 8,
  },
  statsContainer: {
    width: '100%',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#475569', // Corresponds to border-slate-700
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  statsList: {
    // Styling for the list items
  },
  statsItem: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#334155',
    borderWidth: 1,
    borderColor: '#475569',
    color: '#F8FAFC',
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 9999,
    backgroundColor: '#475569',
    marginHorizontal: 8,
    alignItems: 'center',
  },
  modalSaveButton: {
    backgroundColor: '#06B6D4',
  },
  modalButtonText: {
    color: '#F8FAFC',
    fontWeight: '600',
  },
});

export default DeepWorkSession;
