import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const router = useRouter();

  const agendaItems = [
    { icon: 'mosque', label: 'Fajr Prayer', time: '05:30 AM', checked: true, color: '#7E95D4' },
    { icon: 'book', label: 'Recite Surah Al-Kahf', time: 'After Fajr', checked: true, color: '#7BC4BD' },
    { icon: 'hands', label: 'Dhikr: 100x Subhanallah', time: 'Morning', checked: false, color: '#E69686' },
    { icon: 'star', label: 'Learn a new Hadith', time: '09:00 AM', checked: false, color: '#F08C4B' },
    { icon: 'bulb', label: 'Islamic Event: Eid al-Adha (Day 3)', time: 'All Day', checked: null, color: '#F08C4B' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#3F3D56" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Calendar</Text>
        <View style={{ width: 28 }} />
      </View> */}

      <ScrollView contentContainerStyle={styles.content}>
        {/* Calendar Nav */}
        <View style={styles.calendarNav}>
          <Ionicons name="chevron-back" size={24} color="#F08C4B" />
          <Text style={styles.month}>August 2025</Text>
          <Ionicons name="chevron-forward" size={24} color="#F08C4B" />
        </View>

        {/* Dummy Calendar Grid */}
        <View style={styles.calendarGrid}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
          {Array.from({ length: 30 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setSelectedDay(i + 1)}
              style={[
                styles.calendarDay,
                selectedDay === i + 1 && styles.currentDay,
                i === 5 && styles.hasStreak,
                i === 6 && styles.hasSchedule,
              ]}
            >
              <Text style={styles.dayText}>{i + 1}</Text>
            </TouchableOpacity>

          ))}
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          {['All', 'Prayers', 'Quran', 'Dhikr', 'Goals', 'Events'].map((filter, i) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterBtn, i === 0 && styles.activeFilter]}
            >
              <Text style={[styles.filterText, i === 0 && styles.activeFilterText]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Agenda Card */}
        <View style={styles.agendaCard}>
          <Text style={styles.agendaHeading}>
  Activities for August {selectedDay || 6}, 2025
</Text>

          {agendaItems.map((item, idx) => (
            <View key={idx} style={styles.agendaItem}>
              <View style={styles.agendaLeft}>
                <Text style={[styles.agendaIcon, { color: item.color }]}>•</Text>
                <View>
                  <Text style={[styles.agendaText, item.checked && styles.strike]}>
                    {item.label}
                  </Text>
                  <Text style={styles.agendaTime}>{item.time}</Text>
                </View>
              </View>
              {item.checked !== null && (
                <Text style={[styles.checkbox, item.checked && styles.checked]}>✔</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/modal/test')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3F3D56',
  },
  content: {
    padding: 16,
  },
  calendarNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  month: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3F3D56',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#8A8696',
    fontSize: 12,
    marginBottom: 4,
  },
  calendarDay: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0EEE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasStreak: {
    borderWidth: 2,
    borderColor: '#7BC4BD',
  },
  hasSchedule: {
    borderBottomWidth: 4,
    borderBottomColor: '#7E95D4',
  },
  currentDay: {
    backgroundColor: '#F08C4B',
  },
  dayText: {
    color: '#3F3D56',
    fontWeight: '500',
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  filterBtn: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterText: {
    fontSize: 13,
    color: '#8A8696',
  },
  activeFilter: {
    backgroundColor: '#F08C4B',
    borderColor: '#F08C4B',
  },
  activeFilterText: {
    color: '#fff',
  },
  agendaCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  agendaHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3F3D56',
    marginBottom: 12,
  },
  agendaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  agendaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  agendaIcon: {
    fontSize: 18,
  },
  agendaText: {
    fontSize: 15,
    color: '#3F3D56',
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#B0B0B0',
  },
  agendaTime: {
    fontSize: 12,
    color: '#8A8696',
  },
  checkbox: {
    fontSize: 18,
    color: '#E0E0E0',
  },
  checked: {
    color: '#7BC4BD',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    backgroundColor: '#F08C4B',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
