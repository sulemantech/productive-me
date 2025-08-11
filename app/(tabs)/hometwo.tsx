import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import Svg, { Circle } from 'react-native-svg';

/**
 * The DhikrScreen component with a counter and phrase cycling.
 * All text is properly wrapped in Text components.
 *
 * @param {object} props - Component props.
 * @param {function} props.onBack - Function to navigate back to the previous screen.
 */
const DhikrScreen = ({ onBack }) => {
  const [dhikrCount, setDhikrCount] = useState(0);
  const dhikrPhrases = ["Subhanallah", "Alhamdulillah", "Allahu Akbar", "La ilaha illallah"];
  const [dhikrIndex, setDhikrIndex] = useState(0);

  const handleDhikrPress = () => {
    setDhikrCount(prevCount => prevCount + 1);
  };

  const handleReset = () => {
    setDhikrCount(0);
  };

  const handleNextDhikr = () => {
    setDhikrIndex(prevIndex => (prevIndex + 1) % dhikrPhrases.length);
  };

  return (
    <View style={dhikrStyles.container}>
      <View style={dhikrStyles.header}>
        <TouchableOpacity onPress={onBack} style={dhikrStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#06b6d4" />
        </TouchableOpacity>
        <Text style={dhikrStyles.headerTitle}>Dhikr & Dua</Text>
      </View>

      <View style={dhikrStyles.content}>
        <View style={dhikrStyles.controlsRow}>
          <TouchableOpacity onPress={handleNextDhikr} style={dhikrStyles.controlButton}>
            <Text style={dhikrStyles.controlButtonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset} style={dhikrStyles.controlButtonReset}>
            <Ionicons name="refresh-circle" size={24} color="#f87171" />
          </TouchableOpacity>
        </View>

        <Text style={dhikrStyles.dhikrPhrase}>{dhikrPhrases[dhikrIndex]}</Text>

        <TouchableOpacity
          onPress={handleDhikrPress}
          style={dhikrStyles.counterButton}
          activeOpacity={0.8}
        >
          <Text style={dhikrStyles.counterText}>{dhikrCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dhikrStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 48,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  controlButton: {
    backgroundColor: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonReset: {
    backgroundColor: '#475569',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dhikrPhrase: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 40,
  },
  counterButton: {
    backgroundColor: '#06b6d4',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  counterText: {
    color: 'white',
    fontSize: 72,
    fontWeight: 'bold',
  },
});

/**
 * The DeepWorkScreen component with a pomodoro timer and progress bar.
 * This is the same component from the previous conversation.
 */
const DeepWorkScreen = ({ onBack }) => {
  const [initialSeconds, setInitialSeconds] = useState(25 * 60);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionGoal, setSessionGoal] = useState('');
  const [dhikrReminder, setDhikrReminder] = useState(false);
  const [reflectionPopup, setReflectionPopup] = useState(false);
  const [showCustomTimerModal, setShowCustomTimerModal] = useState(false);
  const [customMinutesInput, setCustomMinutesInput] = useState('');

  useEffect(() => {
    let intervalId;
    if (isRunning && secondsRemaining > 0) {
      intervalId = setInterval(() => {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsRunning(false);
      Alert.alert(
        'Session Complete',
        'Deep Work session complete! Time for a break.',
        [ { text: 'OK', onPress: () => setSecondsRemaining(initialSeconds) } ]
      );
    }
    return () => clearInterval(intervalId);
  }, [isRunning, secondsRemaining, initialSeconds]);

  const handleSessionControl = () => setIsRunning(!isRunning);
  const handleSetDefaultTimer = () => {
    setInitialSeconds(25 * 60);
    setSecondsRemaining(25 * 60);
    setIsRunning(false);
  };
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
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = 1 - (secondsRemaining / initialSeconds);
  const strokeDashoffset = circumference * progress;

  return (
    <ScrollView
      style={deepWorkStyles.scrollView}
      contentContainerStyle={deepWorkStyles.contentContainer}
    >
      <View style={deepWorkStyles.card}>
        <View style={deepWorkStyles.headerContainer}>
          <TouchableOpacity onPress={onBack} style={deepWorkStyles.backButton}>
            <Text style={deepWorkStyles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={deepWorkStyles.title}>Deep Work Session</Text>
        </View>

        <View style={deepWorkStyles.timerContainer}>
          <Svg height="100%" width="100%" viewBox="0 0 100 100">
            <Circle
              stroke="#4A5568"
              strokeWidth="8"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
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
          <View style={deepWorkStyles.timerTextWrapper}>
            <Text style={deepWorkStyles.timerText}>{formatTime(secondsRemaining)}</Text>
            <View style={deepWorkStyles.timerModeButtons}>
              <TouchableOpacity onPress={handleSetDefaultTimer}>
                <Text style={deepWorkStyles.timerModeText}>{Math.floor(initialSeconds / 60)} min</Text>
              </TouchableOpacity>
              <Text style={deepWorkStyles.timerModeSeparator}> / </Text>
              <TouchableOpacity onPress={() => setShowCustomTimerModal(true)}>
                <Text style={deepWorkStyles.timerModeText}>Custom</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={deepWorkStyles.motivationalText}>"Focus is a form of worship."</Text>

        <TouchableOpacity
          style={[deepWorkStyles.sessionButton, isRunning ? deepWorkStyles.pauseButton : deepWorkStyles.startButton]}
          onPress={handleSessionControl}
        >
          <Text style={deepWorkStyles.sessionButtonText}>
            {isRunning ? 'Pause' : 'Start Session'}
          </Text>
        </TouchableOpacity>

        <View style={deepWorkStyles.inputContainer}>
          <Text style={deepWorkStyles.label}>What will you focus on?</Text>
          <TextInput
            style={deepWorkStyles.input}
            placeholder="e.g., Draft client report"
            placeholderTextColor="#9CA3AF"
            value={sessionGoal}
            onChangeText={setSessionGoal}
          />
        </View>
        <View style={deepWorkStyles.checkboxContainer}>
          <View style={deepWorkStyles.checkboxWrapper}>
            <Switch
              trackColor={{ false: '#767577', true: '#06B6D4' }}
              thumbColor={dhikrReminder ? '#F4F3F4' : '#F4F3F4'}
              onValueChange={setDhikrReminder}
              value={dhikrReminder}
            />
            <Text style={deepWorkStyles.checkboxLabel}>Remind me to do dhikr after session</Text>
          </View>
          <View style={deepWorkStyles.checkboxWrapper}>
            <Switch
              trackColor={{ false: '#767577', true: '#06B6D4' }}
              thumbColor={reflectionPopup ? '#F4F3F4' : '#F4F3F4'}
              onValueChange={setReflectionPopup}
              value={reflectionPopup}
            />
            <Text style={deepWorkStyles.checkboxLabel}>Show post-session reflection popup</Text>
          </View>
        </View>
        <View style={deepWorkStyles.statsContainer}>
          <Text style={deepWorkStyles.statsTitle}>Session Stats</Text>
          <View style={deepWorkStyles.statsList}>
            <Text style={deepWorkStyles.statsItem}>✅ 4 sessions completed this week</Text>
            <Text style={deepWorkStyles.statsItem}>🔥 Streak: 3 days in a row</Text>
            <Text style={deepWorkStyles.statsItem}>📈 Most focused time: 10am - 12pm</Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCustomTimerModal}
        onRequestClose={() => setShowCustomTimerModal(false)}
      >
        <View style={deepWorkStyles.modalOverlay}>
          <View style={deepWorkStyles.modalContent}>
            <Text style={deepWorkStyles.modalTitle}>Set Custom Time</Text>
            <TextInput
              style={deepWorkStyles.modalInput}
              keyboardType="numeric"
              placeholder="Enter minutes (e.g., 45)"
              placeholderTextColor="#9CA3AF"
              value={customMinutesInput}
              onChangeText={setCustomMinutesInput}
            />
            <View style={deepWorkStyles.modalButtonRow}>
              <TouchableOpacity
                style={deepWorkStyles.modalButton}
                onPress={() => setShowCustomTimerModal(false)}
              >
                <Text style={deepWorkStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[deepWorkStyles.modalButton, deepWorkStyles.modalSaveButton]}
                onPress={handleCustomTimerSave}
              >
                <Text style={deepWorkStyles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const deepWorkStyles = StyleSheet.create({
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
    marginTop: 20,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    padding: 24,
    width: '100%',
    maxWidth: 384,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 24,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingRight: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: '#CBD5E1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    flex: 1,
  },
  timerContainer: {
    position: 'relative',
    width: 256,
    height: 256,
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
    color: '#22D3EE',
  },
  timerModeButtons: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  timerModeText: {
    color: '#9CA3AF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  timerModeSeparator: {
    color: '#9CA3AF',
    marginHorizontal: 4,
    fontSize: 14,
  },
  motivationalText: {
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  sessionButton: {
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButton: {
    backgroundColor: '#06B6D4',
  },
  pauseButton: {
    backgroundColor: '#FB923C',
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
    color: '#9CA3AF',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#334155',
    borderWidth: 1,
    borderColor: '#475569',
    color: '#F8FAFC',
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
    color: '#CBD5E1',
    fontSize: 14,
    marginLeft: 8,
  },
  statsContainer: {
    width: '100%',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#475569',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  statsList: {},
  statsItem: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
  },
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

/**
 * The main HomeTwoScreen component which handles the navigation state.
 */
export default function HomeTwoScreen() {
  const [currentDate, setCurrentDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [completedPrayers, setCompletedPrayers] = useState([]);
  const [prayerSchedule, setPrayerSchedule] = useState([]);
  const [loadingPrayers, setLoadingPrayers] = useState(true);
  const [error, setError] = useState(null);
  
  const [showDhikrScreen, setShowDhikrScreen] = useState(false);
  const [showDeepWorkScreen, setShowDeepWorkScreen] = useState(false);

  // Helper function to get an icon based on prayer name
  const getPrayerIcon = (prayerName) => {
    switch (prayerName) {
      case 'Fajr': return '🌅';
      case 'Dhuhr': return '☀️';
      case 'Asr': return '🌞';
      case 'Maghrib': return '🌇';
      case 'Isha': return '🌃';
      default: return '🕌';
    }
  };

  useEffect(() => {
    // Helper to get Gregorian date
    const getGregorianDate = () => {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return now.toLocaleDateString('en-US', options);
    };

    // Helper to get Hijri date
    const getHijriDate = () => {
      // In a real app, you would fetch this from an API
      return '1 Dhu al-Hijjah, 1446 AH';
    };
    
    // Function to fetch prayer times from the API
    const fetchPrayerTimes = async () => {
      try {
        setLoadingPrayers(true);
        // Ask for location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied. Prayer times may not be accurate.');
          setLoadingPrayers(false);
          return;
        }

        // Get coordinates
        let location = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = location.coords;

        // Reverse geocode to get city & country
        let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (!geocode || !geocode[0]) throw new Error('Unable to get city info');

        let city = geocode[0].city || geocode[0].subregion;
        let country = geocode[0].country;

        // Fetch prayer times
        let res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
        );
        let data = await res.json();
        
        if (data.code === 200 && data.data) {
          const timings = data.data.timings;
          // Filter to only include the 5 main prayers and convert to an array of objects
          const mainPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
          const newPrayerSchedule = mainPrayers.map(prayerName => ({
            name: prayerName,
            time: timings[prayerName]
          }));
          setPrayerSchedule(newPrayerSchedule);
          // Initialize completed prayers state with false for each prayer
          setCompletedPrayers(new Array(newPrayerSchedule.length).fill(false));
        } else {
          throw new Error('API error: Could not retrieve prayer times.');
        }
      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError(err.message || 'An unexpected error occurred while fetching prayer times.');
      } finally {
        setLoadingPrayers(false);
      }
    };
    
    // Set dates and fetch prayer times
    setCurrentDate(getGregorianDate());
    setHijriDate(getHijriDate());
    fetchPrayerTimes();
  }, []);

  const handlePrayerPress = (index) => {
    const newCompletedPrayers = [...completedPrayers];
    newCompletedPrayers[index] = !newCompletedPrayers[index];
    setCompletedPrayers(newCompletedPrayers);
  };

  const completedCount = completedPrayers.filter(Boolean).length;
  const totalPrayers = prayerSchedule.length;
  const progressPercentage = totalPrayers > 0 ? (completedCount / totalPrayers) * 100 : 0;
  
  if (showDhikrScreen) {
    return <DhikrScreen onBack={() => setShowDhikrScreen(false)} />;
  }
  if (showDeepWorkScreen) {
    return <DeepWorkScreen onBack={() => setShowDeepWorkScreen(false)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerLeft}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>🌙</Text>
            </View>
            <Text style={styles.greeting}>Assalamu Alaikum, MetaFront!</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="notifications" size={24} color="#06b6d4" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottomRow}>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Text style={styles.dateDivider}>•</Text>
          <Text style={styles.dateText}>{hijriDate}</Text>
        </View>
      </View>
      <ScrollView style={styles.contentArea}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hadith of the Day</Text>
          <Text style={styles.cardTextItalic}>
            "The Messenger of Allah, peace be upon him, said: 'Verily, deeds are only by intentions, and verily, every man shall have only what he intended.'"
          </Text>
          <Text style={styles.cardSourceText}>— Sahih Bukhari</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Prayers</Text>
          {loadingPrayers ? (
            <ActivityIndicator size="large" color="#06b6d4" style={{ marginTop: 20 }} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <View style={styles.prayerGrid}>
                {prayerSchedule.map((prayer, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.prayerButton,
                      completedPrayers[index] ? styles.prayerButtonCompleted : styles.prayerButtonPending
                    ]}
                    onPress={() => handlePrayerPress(index)}
                  >
                    <Text style={styles.prayerIcon}>{getPrayerIcon(prayer.name)}</Text>
                    <Text style={styles.prayerNameText}>{prayer.name}</Text>
                    <Text style={styles.prayerTimeText}>{prayer.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.prayerStatusText}>{`${completedCount}/${totalPrayers} Prayers Completed`}</Text>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
              </View>
            </>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Deep Work Session</Text>
          <Text style={styles.cardTextItalicCentered}>"Focus is a form of worship."</Text>
          <TouchableOpacity 
            style={styles.fullWidthButton}
            onPress={() => setShowDeepWorkScreen(true)}
          >
            <Text style={styles.fullWidthButtonText}>Start New Session</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Productivity Score</Text>
          <View style={styles.scoreRow}>
            <View style={styles.scoreLeft}>
              <Text style={styles.scoreMain}>75</Text>
              <Text style={styles.scorePercent}>%</Text>
            </View>
            <View style={styles.scoreRight}>
              <Text style={styles.scoreDetail}>Target: 80%</Text>
              <Text style={styles.scoreDetail}>Last Week: 68%</Text>
            </View>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '75%' }]} />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quran Corner</Text>
          <Text style={styles.cardText}>My Quran Goal Today: Recite Surah Al-Fatiha</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: '80%' }]} />
          </View>
          <TouchableOpacity style={styles.fullWidthButtonMarginTop}>
            <Text style={styles.fullWidthButtonText}>Start Reciting</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dhikr & Dua</Text>
          <Text style={styles.cardText}>Engage in the remembrance of Allah with our interactive counter.</Text>
          <TouchableOpacity 
            onPress={() => setShowDhikrScreen(true)} 
            style={styles.fullWidthButtonMarginTop}
          >
            <Text style={styles.fullWidthButtonText}>Go to Dhikr Counter</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spiritual Goals</Text>
          <View style={styles.goalItem}>
            <Text style={styles.goalIconCompleted}>✅</Text>
            <Text style={styles.goalText}>Learn Wudu Steps</Text>
          </View>
          <View style={styles.goalItem}>
            <Text style={styles.goalIconPending}>☐</Text>
            <Text style={styles.goalText}>Memorize Ayatul Kursi (50% complete)</Text>
          </View>
          <View style={styles.goalItem}>
            <Text style={styles.goalIconPending}>☐</Text>
            <Text style={styles.goalText}>Read Hadith of the Day (Pending)</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
  },
  header: {
    width: '100%',
    backgroundColor: '#0f172a',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#06b6d4',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  profileIconText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  notificationIcon: {
    padding: 4,
  },
  headerBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#94a3b8',
    fontSize: 14,
  },
  dateText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  dateDivider: {
    color: '#64748b',
    fontSize: 14,
    marginHorizontal: 8,
  },
  contentArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: 'white',
  },
  cardText: {
    color: '#cbd5e1',
    marginBottom: 16,
  },
  cardTextItalic: {
    color: '#cbd5e1',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  cardTextItalicCentered: {
    color: '#cbd5e1',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  cardSourceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#06b6d4',
    textAlign: 'right',
  },
  prayerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },
  prayerButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerButtonCompleted: {
    backgroundColor: '#16a34a', // green-700
  },
  prayerButtonPending: {
    backgroundColor: '#475569', // slate-600
  },
  prayerIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  prayerNameText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    marginTop: 4,
  },
  prayerTimeText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#cbd5e1',
    marginTop: 2,
  },
  prayerStatusText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#475569',
    borderRadius: 9999,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 9999,
  },
  fullWidthButton: {
    width: '100%',
    backgroundColor: '#06b6d4',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  fullWidthButtonMarginTop: {
    width: '100%',
    backgroundColor: '#06b6d4',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  fullWidthButtonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  scoreMain: {
    fontSize: 48,
    fontWeight: '700',
    color: '#06b6d4',
  },
  scorePercent: {
    fontSize: 18,
    color: '#94a3b8',
    marginLeft: 8,
  },
  scoreRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scoreDetail: {
    color: '#94a3b8',
    fontSize: 12,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalIconCompleted: {
    width: 20,
    fontSize: 18,
    color: '#22c55e',
    textAlign: 'center',
  },
  goalIconPending: {
    width: 20,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  goalText: {
    color: '#cbd5e1',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  }
});
