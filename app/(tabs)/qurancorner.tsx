import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const QuranCorner = ({ onNavigateToReader }) => {
  const [pagesRead, setPagesRead] = useState(0);
  const pagesGoal = 5; // Example daily goal

  const handleLogPage = () => {
    // Increment the number of pages read, up to the goal
    setPagesRead(prev => Math.min(prev + 1, pagesGoal));
  };

  const progressPercentage = (pagesRead / pagesGoal) * 100;

  return (
    <View style={quranTrackerStyles.card}>
      <Text style={quranTrackerStyles.cardTitle}>Quran Recitation Tracker</Text>
      <View style={quranTrackerStyles.progressContainer}>
        <Text style={quranTrackerStyles.progressText}>{pagesRead} / {pagesGoal}</Text>
        <Text style={quranTrackerStyles.progressSubtext}>pages read today</Text>
      </View>
      <View style={quranTrackerStyles.progressBarBackground}>
        <View style={[quranTrackerStyles.progressBarFill, { width: `${progressPercentage}%` }]} />
      </View>
      <TouchableOpacity
        onPress={handleLogPage}
        style={[quranTrackerStyles.fullWidthButtonMarginTop, quranTrackerStyles.logButton]}
      >
        <Text style={quranTrackerStyles.fullWidthButtonText}>Log a Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNavigateToReader}
        style={[quranTrackerStyles.fullWidthButtonMarginTop, quranTrackerStyles.readButton]}
      >
        <Text style={quranTrackerStyles.fullWidthButtonText}>Read Quran</Text>
      </TouchableOpacity>
    </View>
  );
};

const quranTrackerStyles = StyleSheet.create({
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
  progressBarBackground: {
    height: 8,
    backgroundColor: '#475569',
    borderRadius: 9999,
    marginTop: 8,
    overflow: 'hidden',
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
  progressBarFill: {
    height: '100%',
    backgroundColor: '#06b6d4',
    borderRadius: 9999,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#06b6d4',
  },
  progressSubtext: {
    fontSize: 16,
    color: '#94a3b8',
    marginLeft: 8,
    marginBottom: 6,
  },
  logButton: {
    backgroundColor: '#16a34a', // A nice green color
  },
  readButton: {
    backgroundColor: '#475569', // A different, subtle color
  },
});

export default QuranCorner;