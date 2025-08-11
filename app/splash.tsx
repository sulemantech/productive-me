import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Reusing the Target icon from the ProgressScreen
const Target = (props) => (
  <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Circle cx="12" cy="12" r="6" />
    <Circle cx="12" cy="12" r="2" />
  </Svg>
);

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Target color="#06b6d4" width={80} height={80} />
      </View>
      <Text style={styles.appName}>Productivity Tracker</Text>
      <Text style={styles.tagline}>Your daily progress, visualized.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 16,
    color: '#94a3b8', // slate-400
    marginTop: 8,
  },
});

export default SplashScreen;
