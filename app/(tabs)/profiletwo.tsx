import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

// --- Reusable SVG Icon Components ---
const ChevronLeft = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='m15 18-6-6 6-6' />
  </Svg>
);

const ChevronRight = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='m9 18 6-6-6-6' />
  </Svg>
);

const Edit = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z' />
    <Path d='m15 5 4 4' />
  </Svg>
);

const User = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
    <Circle cx='12' cy='7' r='4' />
  </Svg>
);

const Bell = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
    <Path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
  </Svg>
);

const Settings = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.39a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2-1.93v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 1.93v-.18a2 2 0 0 0-2-2z' />
    <Circle cx='12' cy='12' r='3' />
  </Svg>
);

const Lock = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Rect width='18' height='11' x='3' y='11' rx='2' ry='2' />
    <Path d='M7 11V7a5 5 0 0 1 10 0v4' />
  </Svg>
);

const HelpCircle = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Circle cx='12' cy='12' r='10' />
    <Path d='M9.09 9a3 3 0 0 1 5.45 0' />
    <Path d='M12 13v2' />
    <Path d='M12 17h.01' />
  </Svg>
);

const LogOut = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
    <Polyline points='16 17 21 12 16 7' />
    <Line x1='21' x2='9' y1='12' y2='12' />
  </Svg>
);

const Search = ({ size = 24, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Circle cx='11' cy='11' r='8' />
    <Path d='m21 21-4.3-4.3' />
  </Svg>
);

const Laptop = ({ size = 16, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9' />
    <Line x1='2' x2='22' y1='16' y2='16' />
    <Line x1='6' x2='6' y1='18' y2='22' />
    <Line x1='18' x2='18' y1='18' y2='22' />
  </Svg>
);

const Smartphone = ({ size = 16, color = 'currentColor' }) => (
  <Svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke={color}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <Rect width='14' height='20' x='5' y='2' rx='2' ry='2' />
    <Path d='M12 18h.01' />
  </Svg>
);

// --- Reusable Components ---
const Header = ({ title, onBackPress, showEdit = false }) => (
  <View style={styles.header}>
    {onBackPress && (
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <ChevronLeft size={24} color='#22d3ee' />
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
    {showEdit && (
      <TouchableOpacity>
        <Edit size={24} color='#22d3ee' />
      </TouchableOpacity>
    )}
  </View>
);

const MenuItem = ({ icon, title, onPress, showChevron = true }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.menuItem}
  >
    <View style={styles.menuIconContainer}>
      {icon}
    </View>
    <Text style={styles.menuItemTitle}>{title}</Text>
    {showChevron && <ChevronRight size={24} color='#94a3b8' />}
  </TouchableOpacity>
);

// --- Main Screens ---
const MainProfileScreen = ({ onNavigate }) => (
  <ScrollView style={styles.screenContainer}>
    {/* Profile Info Section */}
    <View style={styles.profileInfoContainer}>
      <Image
        source={{
          uri: 'https://placehold.co/128x128/334155/e2e8f0?text=SS',
        }}
        style={styles.profileImage}
      />
      <View style={styles.profileTextContainer}>
        <Text style={styles.profileName}>MetaFront LLP</Text>
        <Text style={styles.profileEmail}>info@metafront.net</Text>
      </View>
    </View>

    {/* Settings Menu */}
    <View style={styles.settingsMenuContainer}>
      <MenuItem
        icon={<User color='white' size={24} />}
        title='Account Settings'
        onPress={() => onNavigate('accountSettings')}
      />
      <View style={styles.divider} />
      <MenuItem
        icon={<Bell color='white' size={24} />}
        title='Notifications'
        onPress={() => onNavigate('notifications')}
      />
      <View style={styles.divider} />
      <MenuItem
        icon={<Settings color='white' size={24} />}
        title='Preferences'
        onPress={() => onNavigate('preferences')}
      />
      <View style={styles.divider} />
      <MenuItem
        icon={<Lock color='white' size={24} />}
        title='Privacy & Security'
        onPress={() => onNavigate('privacySecurity')}
      />
      <View style={styles.divider} />
      <MenuItem
        icon={<HelpCircle color='white' size={24} />}
        title='Help & Support'
        onPress={() => onNavigate('helpSupport')}
      />
      <TouchableOpacity
        onPress={() => console.log('Log out')}
        style={styles.logoutButton}
      >
        <View style={styles.logoutIconContainer}>
          <LogOut color='white' size={24} />
        </View>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const AccountSettingsScreen = ({ onBack }) => (
  <View style={styles.screenFull}>
    <Header title='Account Settings' onBackPress={onBack} />
    <ScrollView style={styles.screenScroll}>
      <View style={styles.inputSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value='MetaFront LLP'
            placeholderTextColor='#94a3b8'
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            value='info@metafront.net'
            placeholderTextColor='#94a3b8'
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            value='********'
            secureTextEntry={true}
            placeholderTextColor='#94a3b8'
          />
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
);

const NotificationsScreen = ({ onBack }) => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <View style={styles.screenFull}>
      <Header title='Notifications' onBackPress={onBack} />
      <ScrollView style={styles.screenScroll}>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Email Notifications</Text>
          <Switch
            onValueChange={setEmailEnabled}
            value={emailEnabled}
            trackColor={{ false: '#475569', true: '#06b6d4' }}
            thumbColor={'#ffffff'}
          />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>Push Notifications</Text>
          <Switch
            onValueChange={setPushEnabled}
            value={pushEnabled}
            trackColor={{ false: '#475569', true: '#06b6d4' }}
            thumbColor={'#ffffff'}
          />
        </View>
        <View style={styles.notificationItem}>
          <Text style={styles.notificationText}>SMS Notifications</Text>
          <Switch
            onValueChange={setSmsEnabled}
            value={smsEnabled}
            trackColor={{ false: '#475569', true: '#06b6d4' }}
            thumbColor={'#ffffff'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const PreferencesScreen = ({ onBack }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [language, setLanguage] = useState('en');

  return (
    <View style={styles.screenFull}>
      <Header title='Preferences' onBackPress={onBack} />
      <ScrollView style={styles.screenScroll}>
        <View style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Dark Mode</Text>
          <Switch
            onValueChange={setDarkModeEnabled}
            value={darkModeEnabled}
            trackColor={{ false: '#475569', true: '#06b6d4' }}
            thumbColor={'#ffffff'}
          />
        </View>
        <View style={styles.languageContainer}>
          <Text style={styles.languageTitle}>Language</Text>
          <View style={styles.languageDisplay}>
            <Text style={styles.languageText}>{language === 'en' ? 'English' : 'Spanish'}</Text>
          </View>
          <Text style={styles.languageNote}>
            Note: Native select/dropdowns require a library like @react-native-picker/picker.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const PrivacySecurityScreen = ({ onBack }) => {
  const [shareData, setShareData] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(true);

  return (
    <View style={styles.screenFull}>
      <Header title='Privacy & Security' onBackPress={onBack} />
      <ScrollView style={styles.screenScroll}>
        <View style={styles.activityContainer}>
          <Text style={styles.activityTitle}>
            Account Activity
          </Text>
          <View style={styles.activityItem}>
            <Laptop color='#94a3b8' style={styles.activityIcon} />
            <Text style={styles.activityText}>
              Last login: 10:30 AM, Today (Windows)
            </Text>
          </View>
          <View style={styles.activityItem}>
            <Smartphone color='#94a3b8' style={styles.activityIcon} />
            <Text style={styles.activityText}>
              Last login: 09:15 AM, Today (iOS)
            </Text>
          </View>
        </View>

        <View style={styles.dataPermissionsContainer}>
          <Text style={styles.dataPermissionsTitle}>
            Data & Permissions
          </Text>
          <View style={styles.dataPermissionItem}>
            <Text style={styles.dataPermissionText}>
              Share app data with partners
            </Text>
            <Switch
              onValueChange={setShareData}
              value={shareData}
              trackColor={{ false: '#475569', true: '#06b6d4' }}
              thumbColor={'#ffffff'}
            />
          </View>
          <View style={styles.dataPermissionItem}>
            <Text style={styles.dataPermissionText}>
              Allow personalized ads
            </Text>
            <Switch
              onValueChange={setPersonalizedAds}
              value={personalizedAds}
              trackColor={{ false: '#475569', true: '#06b6d4' }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        <View style={styles.securityActionsContainer}>
          <Text style={styles.securityActionsTitle}>
            Security Actions
          </Text>
          <TouchableOpacity style={styles.logoutAllButton}>
            <Text style={styles.logoutAllButtonText}>
              Log out of all devices
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const HelpSupportScreen = ({ onBack }) => (
  <View style={styles.screenFull}>
    <Header title='Help & Support' onBackPress={onBack} />
    <ScrollView style={styles.screenScroll}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search for help...'
          placeholderTextColor='#94a3b8'
        />
        <View style={styles.searchIconContainer}>
          <Search size={20} color='#94a3b8' />
        </View>
      </View>

      <View style={styles.commonTopicsContainer}>
        <Text style={styles.commonTopicsTitle}>Common Topics</Text>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>How to reset your password</Text>
          <ChevronRight size={20} color='#94a3b8' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>Managing your subscription</Text>
          <ChevronRight size={20} color='#94a3b8' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topicItem}>
          <Text style={styles.topicText}>Report an issue</Text>
          <ChevronRight size={20} color='#94a3b8' />
        </TouchableOpacity>
      </View>

      <View style={styles.contactSupportContainer}>
        <Text style={styles.contactSupportTitle}>
          Can't find what you're looking for?
        </Text>
        <TouchableOpacity style={styles.contactSupportButton}>
          <Text style={styles.contactSupportButtonText}>
            Contact Support
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
);

const UserProfile = () => {
  const [currentScreen, setCurrentScreen] = useState('main');

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('main');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return <MainProfileScreen onNavigate={handleNavigate} />;
      case 'accountSettings':
        return <AccountSettingsScreen onBack={handleBack} />;
      case 'notifications':
        return <NotificationsScreen onBack={handleBack} />;
      case 'preferences':
        return <PreferencesScreen onBack={handleBack} />;
      case 'privacySecurity':
        return <PrivacySecurityScreen onBack={handleBack} />;
      case 'helpSupport':
        return <HelpSupportScreen onBack={handleBack} />;
      default:
        return <MainProfileScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif'
  },
  screenFull: {
    flex: 1,
  },
  screenScroll: {
    flex: 1,
    padding: 24,
  },
  screenContainer: {
    flex: 1,
    padding: 24,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemTitle: {
    fontWeight: '600',
    flex: 1,
    color: 'white',
  },
  menuIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#06b6d4',
    borderRadius: 20,
    marginRight: 16,
  },
  profileInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 16,
  },
  profileTextContainer: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileEmail: {
    fontSize: 14,
    color: '#94a3b8',
  },
  settingsMenuContainer: {
    backgroundColor: '#334155',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#475569',
    marginLeft: 16,
    marginRight: 16,
  },
  logoutButton: {
    width: '100%',
    textAlign: 'left',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#ef4444',
    borderRadius: 20,
    marginRight: 16,
  },
  logoutText: {
    fontWeight: '600',
    color: '#f87171',
  },
  inputSection: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginBottom: 4,
  },
  input: {
    height: 48,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#334155',
    color: 'white',
    paddingHorizontal: 12,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  saveButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#06b6d4',
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationText: {
    fontWeight: '600',
    color: 'white',
  },
  preferenceItem: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  preferenceText: {
    fontWeight: '600',
    color: 'white',
  },
  languageContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageTitle: {
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  languageDisplay: {
    borderRadius: 6,
    backgroundColor: '#475569',
    color: 'white',
    padding: 8,
  },
  languageText: {
    color: 'white',
  },
  languageNote: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 8,
  },
  activityContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityIcon: {
    marginRight: 8,
  },
  activityText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  dataPermissionsContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dataPermissionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  dataPermissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dataPermissionText: {
    fontWeight: '600',
    color: 'white',
    flexShrink: 1, // To prevent text from overflowing
  },
  securityActionsContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  securityActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  logoutAllButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ef4444',
    borderRadius: 8,
  },
  logoutAllButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchInput: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#334155',
    borderColor: 'transparent',
    borderWidth: 1,
    color: 'white',
  },
  searchIconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  commonTopicsContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  commonTopicsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  topicText: {
    color: 'white',
  },
  contactSupportContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 16,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactSupportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  contactSupportButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#06b6d4',
    borderRadius: 8,
  },
  contactSupportButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserProfile;
