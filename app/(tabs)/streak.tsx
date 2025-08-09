import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const categories = [
  { name: 'Prayer', icon: 'hand-left-outline' },
  { name: 'Quran', icon: 'book-outline' },
  { name: 'Dikr', icon: 'heart-outline' },
  { name: 'Sadaqah', icon: 'cash-outline' },
  { name: 'Fasting', icon: 'flame-outline' },
];

const history = [
  { date: '2025-08-07', status: 'success', category: 'Prayer' },
  { date: '2025-08-06', status: 'success', category: 'Prayer' },
  { date: '2025-08-05', status: 'fail', category: 'Prayer' },
  { date: '2025-08-04', status: 'success', category: 'Quran' },
  { date: '2025-08-03', status: 'success', category: 'Sadaqah' },
  { date: '2025-08-04', status: 'success', category: 'Sadaqah' },
  { date: '2025-08-03', status: 'success', category: 'Sadaqah' },
  { date: '2025-08-02', status: 'fail', category: 'Fasting' },
  { date: '2025-08-01', status: 'success', category: 'Fasting' },
];

export default function StreakScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].name);

  const filteredHistory = history.filter(
    (item) => item.category === selectedCategory
  );

  // Calculate streak
  const calculateStreak = (list: typeof history) => {
    let streak = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].status === 'success') {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const sortedHistory = [...filteredHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalStreak = calculateStreak(sortedHistory);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/fire.png')}
          style={styles.streakIcon}
        />
        <Text style={styles.streakCount}>{totalStreak}-Day Streak</Text>
        <Text style={styles.streakSubtext}>Keep up the Barakah!</Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Your Deeds</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesRow}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <Pressable
  key={cat.name}
  style={[
    styles.category,
    {
      backgroundColor: isSelected ? '#e0dcfb' : '#f1f2f6',
      borderWidth: 1,
      borderColor: isSelected ? '#6c5ce7' : '#ddd',
    },
    isSelected && styles.selectedShadow, // Only apply shadow when selected
  ]}
  onPress={() => setSelectedCategory(cat.name)}
>

              <Ionicons
                name={cat.icon}
                size={26}
                color={isSelected ? '#6c5ce7' : '#3b4051'}
              />
              <Text
                style={[
                  styles.categoryText,
                  isSelected && { fontWeight: 'bold', color: '#6c5ce7' },
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* History */}
      <Text style={styles.sectionTitle}>Streak History</Text>
      <View style={styles.historyList}>
        {sortedHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyDate}>{item.date}</Text>
            <Ionicons
              name={
                item.status === 'success'
                  ? 'checkmark-circle'
                  : 'close-circle'
              }
              size={22}
              color={item.status === 'success' ? '#27ae60' : '#e74c3c'}
            />
          </View>
        ))}
      </View>

      <Pressable style={styles.keepGoingBtn}>
        <Text style={styles.keepGoingText}>Keep Going 🚀</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  streakIcon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  streakCount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fd6e00',
  },
  streakSubtext: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 10,
    color: '#3b4051',
  },
  categoriesRow: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  category: {
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
    padding: 14,
    borderRadius: 12,
    marginRight: 14,
    width: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryText: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    color: '#3b4051',
  },
  historyList: {
    backgroundColor: '#fafafa',
    padding: 15,
    borderRadius: 10,
    borderColor: '#eee',
    borderWidth: 1,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  historyDate: {
    fontSize: 14,
    color: '#444',
  },
  keepGoingBtn: {
    backgroundColor: '#3b4051',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  keepGoingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
