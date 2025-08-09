import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RemindersScreen() {
  const [toggles, setToggles] = useState({
    fajr: true,
    dhuhr: false,
    asr: true,
    maghrib: false,
    isha: true,
    quran: true,
    dua: false,
  });

  const toggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.back}>{'<'} </Text>
        <Text style={styles.title}>Reminders</Text>
        <Text style={styles.placeholder}> </Text>
      </View> */}

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Prayer Times</Text>

          {[
            ['Fajr', '05:30 AM', 'fajr'],
            ['Dhuhr', '01:15 PM', 'dhuhr'],
            ['Asr', '04:45 PM', 'asr'],
            ['Maghrib', '07:20 PM', 'maghrib'],
            ['Isha', '08:50 PM', 'isha'],
          ].map(([label, time, key]) => (
            <View key={key} style={styles.item}>
              <View>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
              <Pressable
                style={[styles.toggle, toggles[key] && styles.toggleActive]}
                onPress={() => toggle(key)}
              >
                <View style={[styles.handle, toggles[key] && styles.handleActive]} />
              </Pressable>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Tasks</Text>

          {[
            ['Recite Quran', 'After Fajr', 'quran'],
            ['Learn a new Dua', '09:00 AM', 'dua'],
          ].map(([label, time, key]) => (
            <View key={key} style={styles.item}>
              <View>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
              <Pressable
                style={[styles.toggle, toggles[key] && styles.toggleActive]}
                onPress={() => toggle(key)}
              >
                <View style={[styles.handle, toggles[key] && styles.handleActive]} />
              </Pressable>
            </View>
          ))}

          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New Reminder</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  back: {
    fontSize: 24,
    color: '#3F3D56',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3F3D56',
  },
  placeholder: {
    width: 24,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3F3D56',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3F3D56',
  },
  time: {
    fontSize: 14,
    color: '#8A8696',
  },
  toggle: {
    width: 40,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#7BC4BD',
  },
  handle: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 2,
    elevation: 2,
  },
  handleActive: {
    marginLeft: 18,
  },
  addButton: {
    marginTop: 12,
    backgroundColor: '#F08C4B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
