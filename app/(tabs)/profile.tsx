import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.backButton}>{'<'}</Text>
        <Text style={styles.screenTitle}>My Profile</Text>
        <View style={styles.placeholderSpace} />
      </View> */}

      {/* Content */}
      <ScrollView contentContainerStyle={styles.contentArea}>
        {/* Avatar */}
        <View style={styles.profileAvatarContainer}>
          <Image
            source={{ uri: 'https://placehold.co/100x100/7E95D4/ffffff?text=Avatar' }}
            style={styles.profileAvatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.profileName}>Sulman Shah</Text>
        <Text style={styles.profileTagline}>Explorer of Faith</Text>

        {/* Achievements */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>My Achievements</Text>
          {[
            ['🏆', 'Prayer Master (Completed 30-Day Streak)'],
            ['🌟', 'Quran Reciter (Completed Surah Al-Kahf)'],
            ['🏅', 'Dhikr Champion (1000+ Dhikr Count)'],
          ].map(([icon, text], i) => (
            <View key={i} style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>{icon}</Text>
              <Text style={styles.achievementText}>{text}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Settings & Options</Text>
          {[
            'Edit Profile Details',
            'Manage Rewards',
            'Parental Dashboard',
            'Help & Support',
            'Sign Out',
          ].map((text, i, arr) => (
            <View key={i} style={[styles.settingsOption, i === arr.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.optionText}>{text}</Text>
              <Text style={styles.optionArrow}>{'>'}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View style={styles.navBar}>
        {[
          ['🏠', 'Home'],
          ['⏰', 'Reminder'],
          ['📅', 'Calendar'],
          ['👤', 'Profile'],
        ].map(([icon, label], i) => (
          <View key={i} style={[styles.navItem, label === 'Profile' && styles.activeNavItem]}>
            <Text style={styles.navIcon}>{icon}</Text>
            <Text style={styles.navLabel}>{label}</Text>
          </View>
        ))}
      </View> */}
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 24,
    color: '#3F3D56',
    fontWeight: 'bold',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3F3D56',
  },
  placeholderSpace: {
    width: 28,
  },
  contentArea: {
    padding: 16,
    alignItems: 'center',
  },
  profileAvatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  profileAvatar: {
    width: '90%',
    height: '90%',
    borderRadius: 9999,
    resizeMode: 'cover',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7BC4BD',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  editIcon: {
    color: '#fff',
    fontSize: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3F3D56',
    marginBottom: 8,
  },
  profileTagline: {
    fontSize: 14,
    color: '#8A8696',
    marginBottom: 24,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3F3D56',
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  achievementText: {
    fontSize: 14,
    color: '#3F3D56',
  },
  settingsOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 14,
    color: '#3F3D56',
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 16,
    color: '#8A8696',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    color: '#F08C4B',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});