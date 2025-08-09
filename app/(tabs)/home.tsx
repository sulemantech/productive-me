import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🌙</Text>
          </View>
          <Text style={styles.greeting}>Assalamu Alaikum, Sulman!</Text>
        </View>
        <Text style={styles.notification}>🔔</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
        {/* Daily Prayers */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Daily Prayers</Text>
          <View style={styles.prayersRow}>
            {['🌅 Fajr', '☀️ Dhuhr', '🌞 Asr', '🌇 Maghrib', '🌃 Isha'].map((item, index) => {
              const isCompleted = index < 2;
              const [icon, name] = item.split(' ');
              return (
                <View key={index} style={[styles.prayerCard, isCompleted && styles.prayerCompleted]}>
                  <Text style={styles.prayerIcon}>{icon}</Text>
                  <Text style={styles.prayerText}>{name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.progressLabel}>3/5 Prayers Completed</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '60%' }]} />
          </View>
        </View>

        {/* Quran Corner */}
        <View style={[styles.sectionCard, styles.quranSection]}>
          <Text style={styles.quranTitle}>Quran Corner</Text>
          <Text style={styles.quranSubtext}>My Quran Goal Today: Recite Surah Al-Fatiha</Text>
          <View style={[styles.progressBarContainer, { backgroundColor: '#ffffff55' }]}>
            <View style={[styles.progressBarFill, { width: '80%', backgroundColor: '#fff' }]} />
          </View>
          <TouchableOpacity style={styles.quranButton}>
            <Text style={styles.quranButtonText}>Start Reciting</Text>
          </TouchableOpacity>
        </View>

        {/* Dhikr & Dua */}
        <View style={[styles.sectionCard, styles.dhikrSection]}>
          <Text style={styles.quranTitle}>Dhikr & Dua</Text>
          <View style={styles.dhikrRow}>
            <TouchableOpacity style={styles.dhikrButton}>
              <Text style={styles.dhikrButtonText}>Subhanallah</Text>
            </TouchableOpacity>
            <Text style={styles.dhikrCount}>Count: 35</Text>
          </View>
          <Text style={styles.dhikrQuote}>
            "Dua of the Day: O Allah, grant us good in this world and good in the Hereafter..."
          </Text>
        </View>

        {/* Spiritual Goals */}
        <View style={[styles.sectionCard, styles.spiritualSection]}>
          <Text style={styles.quranTitle}>Spiritual Goals</Text>
          <Text style={styles.goalText}>• Memorize Ayatul Kursi (50% complete)</Text>
          <Text style={styles.goalText}>• Learn Wudu Steps (Completed) ✅</Text>
          <Text style={styles.goalText}>• Read Hadith of the Day (Pending)</Text>
        </View>

        {/* Footer Message */}
        <Text style={styles.footerQuote}>
          "Masha'Allah! You're building great habits!"
        </Text>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      {/* <View style={styles.navbar}>
        {['🏠 Home', '⏰ Reminder', '📅 Calendar', '👤 Profile'].map((item, index) => {
          const [icon, label] = item.split(' ');
          const isActive = index === 0;
          return (
            <View key={index} style={styles.navItem}>
              <Text style={[styles.navIcon, isActive && styles.navActive]}>{icon}</Text>
              <Text style={[styles.navLabel, isActive && styles.navActive]}>{label}</Text>
            </View>
          );
        })}
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    backgroundColor: '#7E95D4',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconText: {
    color: 'white',
    fontSize: 18,
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#3F3D56',
  },
  notification: {
    fontSize: 20,
  },
  scrollArea: {
    paddingBottom: 100,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 12,
  },
  prayersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prayerCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  prayerCompleted: {
    backgroundColor: '#D4EDDA',
    borderWidth: 2,
    borderColor: '#7BC4BD',
  },
  prayerIcon: {
    fontSize: 18,
  },
  prayerText: {
    fontWeight: '600',
    fontSize: 12,
    color: '#3F3D56',
  },
  progressLabel: {
    marginTop: 8,
    textAlign: 'center',
    color: '#8A8696',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F08C4B',
  },
  quranSection: {
    backgroundColor: '#7BC4BD',
  },
  quranTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  quranSubtext: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
  },
  quranButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quranButtonText: {
    color: '#7BC4BD',
    fontWeight: 'bold',
  },
  dhikrSection: {
    backgroundColor: '#E69686',
  },
  dhikrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  dhikrButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  dhikrButtonText: {
    color: '#E69686',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dhikrCount: {
    color: '#fff',
    fontSize: 20,
  },
  dhikrQuote: {
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 12,
  },
  spiritualSection: {
    backgroundColor: '#F5A623',
  },
  goalText: {
    color: '#fff',
    marginBottom: 4,
  },
  footerQuote: {
    textAlign: 'center',
    color: '#8A8696',
    fontStyle: 'italic',
    marginVertical: 16,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    backgroundColor: '#F08C4B',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    zIndex: 10,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    color: '#8A8696',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8A8696',
  },
  navActive: {
    color: '#F08C4B',
  },
});
