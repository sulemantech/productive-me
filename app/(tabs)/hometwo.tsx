import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeTwoScreen() {
  const [currentDate, setCurrentDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  // New state to track which prayers are completed.
  const [completedPrayers, setCompletedPrayers] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Function to get the Gregorian date
    const getGregorianDate = () => {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return now.toLocaleDateString('en-US', options);
    };

    // A real app would use a library for accurate Hijri conversion.
    // For this example, we'll use a hardcoded value as in the original HTML.
    const getHijriDate = () => {
      return '1 Dhu al-Hijjah, 1446 AH';
    };

    setCurrentDate(getGregorianDate());
    setHijriDate(getHijriDate());
  }, []);

  // Function to handle a prayer button press
  const handlePrayerPress = (index) => {
    // Create a new array to avoid mutating the state directly
    const newCompletedPrayers = [...completedPrayers];
    // Toggle the boolean value at the selected index
    newCompletedPrayers[index] = !newCompletedPrayers[index];
    // Update the state with the new array
    setCompletedPrayers(newCompletedPrayers);
  };

  // Calculate the number of completed prayers
  const completedCount = completedPrayers.filter(Boolean).length;
  const totalPrayers = completedPrayers.length;
  // Calculate the progress percentage
  const progressPercentage = (completedCount / totalPrayers) * 100;
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Top Row: Greeting & Notifications */}
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
        {/* Bottom Row: Dates */}
        <View style={styles.headerBottomRow}>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Text style={styles.dateDivider}>•</Text>
          <Text style={styles.dateText}>{hijriDate}</Text>
        </View>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView style={styles.contentArea}>
        {/* Hadith of the Day */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Hadith of the Day</Text>
          <Text style={styles.cardTextItalic}>
            "The Messenger of Allah, peace be upon him, said: 'Verily, deeds are only by intentions, and verily, every man shall have only what he intended.'"
          </Text>
          <Text style={styles.cardSourceText}>— Sahih Bukhari</Text>
        </View>

        {/* Daily Prayer Tracker */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Daily Prayers</Text>
          <View style={styles.prayerGrid}>
            {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.prayerButton,
                  // Use the state to determine the style dynamically
                  completedPrayers[index] ? styles.prayerButtonCompleted : styles.prayerButtonPending
                ]}
                // Add the onPress handler to toggle the prayer status
                onPress={() => handlePrayerPress(index)}
              >
                {/* Emojis for consistency with HTML, or you could use icons like in your example. */}
                <Text style={styles.prayerIcon}>{
                  index === 0 ? '🌅' : index === 1 ? '☀️' : index === 2 ? '🌞' : index === 3 ? '🌇' : '🌃'
                }</Text>
                <Text style={styles.prayerButtonText}>{prayer}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Use the calculated count to update the status text */}
          <Text style={styles.prayerStatusText}>{`${completedCount}/${totalPrayers} Prayers Completed`}</Text>
          <View style={styles.progressBarBackground}>
            {/* Use the calculated percentage for the progress bar width */}
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
          </View>
        </View>

        {/* Deep Work Session */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Deep Work Session</Text>
          <Text style={styles.cardTextItalicCentered}>"Focus is a form of worship."</Text>
          <TouchableOpacity style={styles.fullWidthButton}>
            <Text style={styles.fullWidthButtonText}>Start New Session</Text>
          </TouchableOpacity>
        </View>

        {/* Productivity Score */}
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

        {/* Quran Corner */}
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

        {/* Dhikr & Dua */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dhikr & Dua</Text>
          <View style={styles.dhikrRow}>
            <Text style={styles.dhikrText}>Dhikr:</Text>
            <TouchableOpacity style={styles.dhikrButton}>
              <Text style={styles.dhikrButtonText}>Subhanallah</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dhikrCountRow}>
            <Text style={styles.dhikrText}>Count:</Text>
            <Text style={styles.dhikrCount}>35</Text>
          </View>
        </View>

        {/* Spiritual Goals */}
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

      {/* Bottom Navigation Bar */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="home" size={24} color="#06b6d4" />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="alarm" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Reminder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#94a3b8" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View> */}
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
  prayerButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    marginTop: 4,
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
    borderRadius: 9999, // full rounded
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
  dhikrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dhikrCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dhikrText: {
    fontSize: 18,
    color: '#cbd5e1',
  },
  dhikrButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  dhikrButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dhikrCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#06b6d4',
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
  bottomNav: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0f172a',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingVertical: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  navItemActive: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: '#94a3b8',
  },
  navTextActive: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    color: '#06b6d4',
  },
});
