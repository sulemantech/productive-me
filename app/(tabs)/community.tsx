import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Assuming you have @expo/vector-icons installed

const { width } = Dimensions.get('window');

// Mock data for the community challenges
const communityChallenges = [
  {
    id: '1',
    title: '30-Day Quran Challenge',
    members: 154,
    buttonText: 'Join',
    buttonColor: '#4f46e5', // indigo-600
  },
  {
    id: '2',
    title: 'Healthy Ramadan Challenge',
    members: 88,
    buttonText: 'Join',
    buttonColor: '#4f46e5', // indigo-600
  },
];

// Mock data for the prayer groups
const prayerGroups = [
  {
    id: '1',
    title: 'Fajr Friends Group',
    onlineMembers: 7,
    buttonText: 'View',
    buttonColor: '#10b981', // green-600
  },
  {
    id: '2',
    title: 'Zuhr Team',
    onlineMembers: 3,
    buttonText: 'View',
    buttonColor: '#10b981', // green-600
  },
];

export default function CommunityScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Productive Muslims</Text>
          <View style={styles.profileContainer}>
            <Text style={styles.pointsText}>12,450 pts</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileInitial}>S</Text>
            </View>
          </View>
        </View>

        {/* Main Content Area - Scrollable */}
        <ScrollView 
          style={styles.mainContent} 
          contentContainerStyle={styles.mainContentPadding}
        >
          {/* Community Screen Content */}
          <View style={styles.communityContent}>
            <Text style={styles.communityTitle}>Community Hub</Text>

            {/* Community Challenges Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Community Challenges</Text>
              <Text style={styles.sectionSubtitle}>Join a challenge and achieve your goals with others!</Text>
              <View style={styles.itemContainer}>
                {communityChallenges.map(challenge => (
                  <View key={challenge.id} style={styles.challengeItem}>
                    <View>
                      <Text style={styles.challengeTitle}>{challenge.title}</Text>
                      <Text style={styles.challengeSubtitle}>Join {challenge.members} members</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: challenge.buttonColor }]}
                      onPress={() => alert(`Joining ${challenge.title}`)} // Using alert for example
                    >
                      <Text style={styles.buttonText}>{challenge.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            {/* Prayer Groups Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Prayer Groups</Text>
              <Text style={styles.sectionSubtitle}>Pray on time with your friends.</Text>
              <View style={styles.itemContainer}>
                {prayerGroups.map(group => (
                  <View key={group.id} style={styles.challengeItem}>
                    <View>
                      <Text style={styles.challengeTitle}>{group.title}</Text>
                      <Text style={styles.challengeSubtitle}>{group.onlineMembers} members online</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: group.buttonColor }]}
                      onPress={() => alert(`Viewing ${group.title}`)} // Using alert for example
                    >
                      <Text style={styles.buttonText}>{group.buttonText}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            
            {/* Public Accountability Button */}
            <TouchableOpacity 
              style={styles.shareButton}
              onPress={() => alert("Sharing progress...")}
            >
              <Text style={styles.shareButtonText}>Share My Progress with the Community</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        {/* <View style={styles.navBar}>
          <TouchableOpacity style={styles.navItem}>
            <Feather name="layout" size={24} color="#6b7280" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="list-outline" size={24} color="#6b7280" />
            <Text style={styles.navText}>Habits</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="timer-outline" size={24} color="#6b7280" />
            <Text style={styles.navText}>Focus</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navItem, styles.navItemSelected]}>
            <Ionicons name="people-outline" size={24} color="#fff" />
            <Text style={[styles.navText, styles.navTextSelected]}>Community</Text>
          </TouchableOpacity>
        </View> */}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827', // bg-gray-900
  },
  container: {
    flex: 1,
    backgroundColor: '#1f2937', // bg-gray-800
    borderRadius: 24,
    overflow: 'hidden',
    maxWidth: width,
    minHeight: '100%',
  },
  header: {
    backgroundColor: '#374151', // bg-gray-700
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E5E7EB', // text-gray-100
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FACC15', // text-yellow-400
    marginRight: 12,
  },
  profileBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4b5563', // bg-gray-600
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9ca3af', // text-gray-400
  },
  mainContent: {
    flex: 1,
  },
  mainContentPadding: {
    padding: 24,
  },
  communityContent: {
    flex: 1,
    paddingBottom: 20, // Add some padding for the scrollable content
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  sectionCard: {
    backgroundColor: '#374151', // bg-gray-700
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D1D5DB', // text-gray-300
    marginBottom: 12,
  },
  sectionSubtitle: {
    color: '#9ca3af', // text-gray-400
    fontSize: 14,
    marginBottom: 16,
  },
  itemContainer: {
    rowGap: 16,
  },
  challengeItem: {
    backgroundColor: '#1f2937', // bg-gray-800
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB', // text-gray-200
  },
  challengeSubtitle: {
    fontSize: 12,
    color: '#9ca3af', // text-gray-400
    marginTop: 4,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  shareButton: {
    backgroundColor: '#0d9488', // bg-teal-600
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  navBar: {
    backgroundColor: '#374151', // bg-gray-700
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  navItemSelected: {
    color: '#fff',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    color: '#9ca3af', // text-gray-400
  },
  navTextSelected: {
    color: '#fff',
  },
});
