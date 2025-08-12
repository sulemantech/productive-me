import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DhikrScreen from "./dhikr";
import { default as MeditationScreen } from "./meditation";
import QuranCorner from "./qurancorner";
import QuranReaderScreen from "./quranreader";


/**
 * The main HomeScreen component which handles the navigation state.
 */
export default function HomeScreen() {
  const [currentDate, setCurrentDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [completedPrayers, setCompletedPrayers] = useState([]);
  const [prayerSchedule, setPrayerSchedule] = useState([]);
  const [loadingPrayers, setLoadingPrayers] = useState(true);
  const [error, setError] = useState(null);
  const [currentDay, setCurrentDay] = useState('');
  const [activeTab, setActiveTab] = useState('Today'); // New state for tabs

  // UPDATED: Using a unique abbreviation for each day
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const [showDhikrScreen, setShowDhikrScreen] = useState(false);
  const [showDeepWorkScreen, setShowDeepWorkScreen] = useState(false);
  // NEW: State for the Quran Reader screen
  const [showQuranReaderScreen, setShowQuranReaderScreen] = useState(false);
  const [showMeditationScreen, setShowMeditationScreen] = useState(false);


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
      // Corrected options object with `as const`
      const options = { weekday: 'short', month: 'short', day: 'numeric' } as const;

      // FIX: Get the full weekday abbreviation instead of just the first character.
      const dayAbbreviation = now.toLocaleDateString('en-US', { weekday: 'short' });
      setCurrentDay(dayAbbreviation);

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

        // Step 1: Ask for location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied. Showing default prayer times.');
          // Fallback to default city/country
          return await getPrayerTimesByCity('Karachi', 'Pakistan');
        }

        // Step 2: Get current location
        let location = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = location.coords;

        // Step 3: Reverse geocode with timeout (5s)
        let city = 'Karachi';
        let country = 'Pakistan';

        try {
          let geocode = await Promise.race([
            Location.reverseGeocodeAsync({ latitude, longitude }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Reverse geocode timeout')), 5000))
          ]);

          if (geocode && geocode[0]) {
            city = geocode[0].city || geocode[0].subregion || city;
            country = geocode[0].country || country;
          }
        } catch (geoErr) {
          console.warn('Reverse geocode failed, using fallback:', geoErr);
        }

        // Step 4: Fetch prayer times by city/country
        await getPrayerTimesByCity(city, country);

      } catch (err) {
        console.error("Error fetching prayer times:", err);
        setError(err.message || 'An unexpected error occurred while fetching prayer times.');
      } finally {
        setLoadingPrayers(false);
      }
    };

    // Helper function to fetch prayer times
    const getPrayerTimesByCity = async (city, country) => {
      let res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
      );
      let data = await res.json();

      if (data.code === 200 && data.data) {
        const timings = data.data.timings;
        const mainPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        const newPrayerSchedule = mainPrayers.map(prayerName => ({
          name: prayerName,
          time: timings[prayerName]
        }));
        setPrayerSchedule(newPrayerSchedule);
        setCompletedPrayers(new Array(newPrayerSchedule.length).fill(false));
      } else {
        throw new Error('API error: Could not retrieve prayer times.');
      }
    };


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
  // UPDATED: Now we show the MeditationScreen
  if (showMeditationScreen) {
    return <MeditationScreen onBack={() => setShowMeditationScreen(false)} />;
  }
  // NEW: Check for the Quran Reader screen
  if (showQuranReaderScreen) {
    return <QuranReaderScreen onBack={() => setShowQuranReaderScreen(false)} />;
  }
  // This is no longer used, but kept for clarity and to show the change
  if (showDeepWorkScreen) {
    return <DeepWorkScreen onBack={() => setShowDeepWorkScreen(false)} />;
  }

  // A simple component to display the stats with a cute icon
  const StatsCard = ({ title, value, icon, iconStyle }) => (
    <View style={styles.statsCard}>
      <View style={[styles.statsCardIconContainer, iconStyle]}>
        <Text style={styles.statsCardIcon}>{icon}</Text>
      </View>
      <Text style={styles.statsCardTitle}>{title}</Text>
      <Text style={styles.statsCardValue}>{value}</Text>
    </View>
  );

  // Conditional content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Today':
        return (
          <View style={styles.tabContent}>
            <StatsCard title="Prayers" value="5/5" icon="🕌" iconStyle={styles.statsCardIconHasanat} />
            <StatsCard title="Verses" value="9.0K" icon="📖" iconStyle={styles.statsCardIconVerses} />
            <StatsCard title="Dhikr" value="29m" icon="📿" iconStyle={styles.statsCardIconTime} />
            <StatsCard title="Meditation" value="20mins" icon="🧘" iconStyle={styles.statsCardIconPages} />
          </View>
        );
      case 'Week':
        return (
          <View style={styles.tabContent}>
               <StatsCard title="Prayers" value="35/35" icon="🕌" iconStyle={styles.statsCardIconHasanat} />
            <StatsCard title="Verses" value="900K" icon="📖" iconStyle={styles.statsCardIconVerses} />
            <StatsCard title="Dhikr" value="5hours" icon="📿" iconStyle={styles.statsCardIconTime} />
            <StatsCard title="Meditation" value="3hours" icon="🧘" iconStyle={styles.statsCardIconPages} />
          </View>
        );
      case 'All':
        return (
            <View style={styles.tabContent}>
               <StatsCard title="Prayers" value="35/35" icon="🕌" iconStyle={styles.statsCardIconHasanat} />
            <StatsCard title="Verses" value="900K" icon="📖" iconStyle={styles.statsCardIconVerses} />
            <StatsCard title="Dhikr" value="5hours" icon="📿" iconStyle={styles.statsCardIconTime} />
            <StatsCard title="Meditation" value="3hours" icon="🧘" iconStyle={styles.statsCardIconPages} />
          </View>
        );
      default:
        return null;
    }
  };

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
      {/* NEW: Days of the week tracker */}
      <View style={styles.daysTracker}>
        {daysOfWeek.map((day, index) => (
          <View
            key={index}
            style={[
              styles.dayButton,
              day === currentDay && styles.dayButtonActive
            ]}
          >
            <Text style={[styles.dayText, day === currentDay && styles.dayTextActive]}>{day}</Text>
          </View>
        ))}
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
        {/* Tab section */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Today' && styles.activeTab]}
            onPress={() => setActiveTab('Today')}
          >
            <Text style={[styles.tabText, activeTab === 'Today' && styles.tabTextActive]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Week' && styles.activeTab]}
            onPress={() => setActiveTab('Week')}
          >
            <Text style={[styles.tabText, activeTab === 'Week' && styles.tabTextActive]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'All' && styles.activeTab]}
            onPress={() => setActiveTab('All')}
          >
            <Text style={[styles.tabText, activeTab === 'All' && styles.tabTextActive]}>All</Text>
          </TouchableOpacity>
        </View>

        {/* Render the content for the active tab */}
        {renderTabContent()}
        
        {/* UPDATED: Meditation & Reflection card */}
        <View style={[styles.card, styles.meditationCard]}>
          <Text style={styles.cardTitle}>Meditation & Reflection</Text>
          <Text style={styles.cardTextItalicCentered}>"Verily, in the remembrance of Allah do hearts find rest."</Text>
          <TouchableOpacity
            style={styles.fullWidthButton}
            onPress={() => setShowMeditationScreen(true)} // UPDATED: Changed the state to show the new screen
          >
            <Text style={styles.fullWidthButtonText}>Start Session</Text>
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

        {/* NEW: The updated QuranCorner component with navigation */}
        <QuranCorner onNavigateToReader={() => setShowQuranReaderScreen(true)} />

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
  // NEW: Styles for the days tracker
  daysTracker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#1E293B', // The background color of the full pill-shaped container
    borderRadius: 9999, // Makes the container a pill shape
    padding: 5,
  },
  dayButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
    borderRadius: 9999, // Makes each day button a pill shape
  },
  dayButtonActive: {
    backgroundColor: '#522197', // Changed to match the tab selection color
  },
  dayText: {
    color: '#94a3b8', // The light gray text color for unselected days
    fontWeight: 'bold',
  },
  dayTextActive: {
    color: 'white', // The white text color for the selected day
  },
  contentArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  // UPDATED: Made cards transparent and added borders
  card: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)', // Transparent background
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.5)', // Subtle cyan border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  // NEW: A different style for the meditation card
  meditationCard: {
    backgroundColor: 'rgba(78, 59, 137, 0.5)', // Purple transparent background
    borderColor: 'rgba(139, 92, 246, 0.5)', // Subtle purple border
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
  },
  // NEW: Styles for the tab bar and content
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 50,
    backgroundColor: '#1c1c1c',
    overflow: 'hidden',
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 50,
  },
  activeTab: {
    backgroundColor: '#522197', // A nice purple for the active state
  },
  tabText: {
    color: '#8e8e93',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  // UPDATED:
  tabContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center the cards
    gap: 20, // Use gap for consistent spacing between cards
  },
  // UPDATED: Made the stats cards smaller, transparent, and removed marginBottom
  statsCard: {
    width: '40%', // Reduced width for smaller squares
    aspectRatio: 1, // This is the key change: makes the height equal to the width
    backgroundColor: 'rgba(28, 28, 28, 0.5)', // Transparent background
    borderRadius: 16,
    padding: 10, // Reduced padding to fit content better
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.5)', // A subtle purple border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  statsCardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5, // Reduced margin
    position: 'relative',
    overflow: 'hidden',
  },
  statsCardIcon: {
    fontSize: 24, // Reduced font size for the icon
  },
  statsCardTitle: {
    color: '#8e8e93',
    fontSize: 14, // Reduced font size for the title
    fontWeight: '500',
    marginBottom: 3, // Reduced margin
    textAlign: 'center',
  },
  statsCardValue: {
    color: '#fff',
    fontSize: 16, // Reduced font size for the value
    fontWeight: '700',
    textAlign: 'center',
  },
  // Specific styles for each card icon background
  statsCardIconHasanat: {
    backgroundColor: 'rgba(255, 105, 180, 0.2)', // Pink with some transparency
    shadowColor: '#ff69b4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  statsCardIconVerses: {
    backgroundColor: 'rgba(0, 191, 255, 0.2)', // Blue with some transparency
    shadowColor: '#00bfff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  statsCardIconTime: {
    backgroundColor: 'rgba(255, 165, 0, 0.2)', // Orange with some transparency
    shadowColor: '#ffa500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  statsCardIconPages: {
    backgroundColor: 'rgba(50, 205, 50, 0.2)', // Green with some transparency
    shadowColor: '#32cd32',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});
