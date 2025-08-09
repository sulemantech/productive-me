import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

// Icon components for use in the app
const Icons = {
  Flame: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </Svg>
  ),
  BarChart2: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 20V10" /><Path d="M12 20V4" /><Path d="M6 20v-6" />
    </Svg>
  ),
  ChevronLeft: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="m15 18-6-6 6-6" />
    </Svg>
  ),
  CheckCircle2: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" /><Path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  BookText: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><Path d="M8 7h6" /><Path d="M8 11h8" />
    </Svg>
  ),
  ListTodo: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Rect x="3" y="5" width="6" height="6" rx="1" /><Path d="m3 17h18" /><Path d="m12 17h9" /><Path d="m3 12h11" /><Path d="m12 5h9" />
    </Svg>
  ),
  Target: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Circle cx="12" cy="12" r="10" /><Circle cx="12" cy="12" r="6" /><Circle cx="12" cy="12" r="2" />
    </Svg>
  ),
  Timer: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Line x1="10" x2="14" y1="2" y2="2" /><Path d="M12 14v-4" /><Path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14.1" /><Path d="M12 2v2" />
    </Svg>
  ),
  X: (props) => (
    <Svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 6 6 18"/><Path d="m6 6 12 12"/>
    </Svg>
  ),
};

// Mock data generator for the calendar
const generateMonthlyData = () => {
  const data = [];
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const prayersCompletion = Math.floor(Math.random() * 6);
    const dhikrCompletion = Math.random() < 0.8 ? 1 : 0;
    const todosCompletion = Math.floor(Math.random() * 10);
    const focusSessions = Math.floor(Math.random() * 4);
    data.push({
      day: i,
      prayers: prayersCompletion,
      dhikr: dhikrCompletion,
      todos: todosCompletion,
      focus: focusSessions,
    });
  }
  return data;
};

// Main Progress Screen Component
const ProgressScreen = () => {
  const [activeMetric, setActiveMetric] = useState('prayers');
  const [monthlyData, setMonthlyData] = useState([]);
  // New state for the modal visibility and content
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    setMonthlyData(generateMonthlyData());
  }, []);

  const getMetricDetails = (metric) => {
    switch (metric) {
      case 'prayers':
        return {
          title: 'Prayer Completion',
          icon: <Icons.CheckCircle2 style={{ color: '#fff' }} width={24} height={24} />,
        };
      case 'dhikr':
        return {
          title: 'Dhikr Completion',
          icon: <Icons.BookText style={{ color: '#fff' }} width={24} height={24} />,
        };
      case 'todos':
        return {
          title: 'Todos Completion',
          icon: <Icons.ListTodo style={{ color: '#fff' }} width={24} height={24} />,
        };
      case 'focus':
        return {
          title: 'Focus Sessions',
          icon: <Icons.Timer style={{ color: '#fff' }} width={24} height={24} />,
        };
      default:
        return {
          title: 'Prayer Completion',
          icon: <Icons.CheckCircle2 style={{ color: '#fff' }} width={24} height={24} />,
        };
    }
  };

  const getColorForDay = (metric, dayData) => {
    let completion = 0;
    if (metric === 'prayers') {
      completion = dayData.prayers / 5;
    } else if (metric === 'dhikr') {
      completion = dayData.dhikr;
    } else if (metric === 'todos') {
      completion = Math.min(dayData.todos / 5, 1);
    } else if (metric === 'focus') {
      completion = Math.min(dayData.focus / 3, 1);
    }

    if (completion >= 1) return styles.bgEmerald500;
    if (completion >= 0.8) return styles.bgEmerald400;
    if (completion >= 0.6) return styles.bgEmerald300;
    if (completion >= 0.4) return styles.bgEmerald200;
    if (completion > 0) return styles.bgEmerald100;
    return styles.bgSlate700;
  };

  // Function to handle day tap and show the modal
  const handleDayPress = (dayData) => {
    const metric = activeMetric;
    const metricDetails = getMetricDetails(metric);
    const value = dayData[metric];

    let message;
    if (metric === 'prayers') {
        message = `You completed ${value} out of 5 prayers.`;
    } else if (metric === 'dhikr') {
        message = `Your Dhikr goal was ${value === 1 ? 'completed' : 'not completed'}.`;
    } else if (metric === 'todos') {
        message = `You completed ${value} todos.`;
    } else if (metric === 'focus') {
        message = `You completed ${value} focus sessions.`;
    }

    setModalContent({
      title: metricDetails.title,
      icon: metricDetails.icon,
      value: value,
      message: message,
      day: dayData.day,
    });
    setModalVisible(true);
  };

  const metricDetails = getMetricDetails(activeMetric);
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

  // Create an array of day cells, including spacers for the start of the month
  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<View key={`spacer-${i}`} style={styles.dayCellSpacer} />);
  }
  monthlyData.forEach((dayData, index) => {
    calendarCells.push(
      <TouchableOpacity
        key={index}
        style={[styles.dayCell, getColorForDay(activeMetric, dayData)]}
        onPress={() => handleDayPress(dayData)} // Tapping a day triggers the modal
      >
        <Text style={styles.dayText}>{dayData.day}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icons.ChevronLeft color="#22d3ee" width={24} height={24} />
        </TouchableOpacity>
        {/* The header title is now centered using absolute positioning */}
        <Text style={styles.headerTitle}>Your Progress</Text>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Key Streaks & Progress */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <Icons.Flame color="#fff" width={24} height={24} />
            </View>
            <Text style={styles.statsTextMain}>12 Days</Text>
            <Text style={styles.statsTextSub}>Prayer Streak</Text>
          </View>
          <View style={styles.statsCard}>
            <View style={styles.statsIconContainer}>
              <Icons.BarChart2 color="#fff" width={24} height={24} />
            </View>
            <Text style={styles.statsTextMain}>84%</Text>
            <Text style={styles.statsTextSub}>Overall Progress</Text>
          </View>
        </View>

        {/* Metric Selector for Heatmap */}
        <View style={styles.metricSelector}>
          <TouchableOpacity
            style={[styles.metricButton, activeMetric === 'prayers' && styles.metricButtonActive]}
            onPress={() => setActiveMetric('prayers')}
          >
            <Text style={[styles.metricButtonText, activeMetric === 'prayers' && styles.metricButtonTextActive]}>Prayers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.metricButton, activeMetric === 'dhikr' && styles.metricButtonActive]}
            onPress={() => setActiveMetric('dhikr')}
          >
            <Text style={[styles.metricButtonText, activeMetric === 'dhikr' && styles.metricButtonTextActive]}>Dhikr</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.metricButton, activeMetric === 'todos' && styles.metricButtonActive]}
            onPress={() => setActiveMetric('todos')}
          >
            <Text style={[styles.metricButtonText, activeMetric === 'todos' && styles.metricButtonTextActive]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.metricButton, activeMetric === 'focus' && styles.metricButtonActive]}
            onPress={() => setActiveMetric('focus')}
          >
            <Text style={[styles.metricButtonText, activeMetric === 'focus' && styles.metricButtonTextActive]}>Focus</Text>
          </TouchableOpacity>
        </View>

        {/* Heatmap Calendar */}
        <View style={styles.heatmapCard}>
          <View style={styles.heatmapTitleContainer}>
            {metricDetails.icon}
            <Text style={styles.heatmapTitleText}>{metricDetails.title}</Text>
          </View>
          <View style={styles.calendarGrid}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={`day-header-${index}`} style={styles.dayHeader}>{day}</Text>
            ))}
            {calendarCells}
          </View>
          <View style={styles.legendContainer}>
            <Text style={styles.legendText}>Completion Legend</Text>
            <View style={styles.legendItems}>
              <Text style={styles.legendTextLow}>Low</Text>
              <View style={[styles.legendBox, styles.bgSlate700]} />
              <View style={[styles.legendBox, styles.bgEmerald100]} />
              <View style={[styles.legendBox, styles.bgEmerald200]} />
              <View style={[styles.legendBox, styles.bgEmerald300]} />
              <View style={[styles.legendBox, styles.bgEmerald400]} />
              <View style={[styles.legendBox, styles.bgEmerald500]} />
              <Text style={styles.legendTextHigh}>High</Text>
            </View>
          </View>
        </View>

        {/* Performance Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Performance Insights</Text>
          <View style={styles.insightsItem}>
            <Icons.CheckCircle2 style={styles.insightsIconGreen} width={20} height={20} />
            <Text style={styles.insightsText}>You have a perfect prayer attendance streak of 12 days.</Text>
          </View>
          <View style={styles.insightsItem}>
            <Icons.BookText style={styles.insightsIconCyan} width={20} height={20} />
            <Text style={styles.insightsText}>Your average Dhikr goal completion is 85% this month.</Text>
          </View>
          <View style={styles.insightsItem}>
            <Icons.ListTodo style={styles.insightsIconBlue} width={20} height={20} />
            <Text style={styles.insightsText}>You completed an average of 4.2 todos per day this month.</Text>
          </View>
          <View style={styles.insightsItem}>
            <Icons.Target style={styles.insightsIconYellow} width={20} height={20} />
            <Text style={styles.insightsText}>You completed 14 focus sessions this month.</Text>
          </View>
        </View>
      </ScrollView>

      {/* Tooltip Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Icons.X color="#94a3b8" width={20} height={20} />
            </TouchableOpacity>
            <View style={styles.modalIconContainer}>
              {modalContent.icon}
            </View>
            <Text style={styles.modalTitle}>Day {modalContent.day}</Text>
            <Text style={styles.modalSubtitle}>{modalContent.title}</Text>
            <Text style={styles.modalText}>{modalContent.message}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // slate-900
    color: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 20,
    overflow: 'hidden',
    paddingHorizontal: 16, // Added horizontal padding for "margin"
    paddingTop: 16, // Added top padding
    paddingBottom: 20, // Added bottom padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
    paddingBottom: 16,
    backgroundColor: '#0f172a',
    position: 'relative', // Added position relative for absolute title
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute', // Centering with absolute position
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20, // Add bottom padding for the last element
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: '#334155', // slate-700
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  statsIconContainer: {
    backgroundColor: '#06b6d4', // cyan-500
    borderRadius: 9999, // full rounded
    padding: 8,
    marginBottom: 8,
  },
  statsTextMain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22d3ee', // cyan-400
  },
  statsTextSub: {
    fontSize: 12,
    color: '#94a3b8', // slate-400
    textAlign: 'center',
  },
  metricSelector: {
    flexDirection: 'row',
    backgroundColor: '#334155', // slate-700
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
  },
  metricButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  metricButtonActive: {
    backgroundColor: '#06b6d4', // cyan-500
  },
  metricButtonText: {
    fontWeight: '600',
    color: '#cbd5e1', // slate-300
  },
  metricButtonTextActive: {
    color: '#fff',
  },
  heatmapCard: {
    backgroundColor: '#334155', // slate-700
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heatmapTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  heatmapTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayHeader: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    color: '#94a3b8', // slate-400
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dayCellSpacer: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  legendContainer: {
    alignItems: 'center',
  },
  legendText: {
    fontSize: 12,
    color: '#94a3b8', // slate-400
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendTextLow: {
    fontSize: 12,
    color: '#94a3b8',
    marginRight: 8,
  },
  legendTextHigh: {
    fontSize: 12,
    color: '#94a3b8',
    marginLeft: 8,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  insightsCard: {
    backgroundColor: '#334155', // slate-700
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  insightsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightsText: {
    fontSize: 14,
    color: '#cbd5e1', // slate-300
    flex: 1,
    marginLeft: 12,
  },
  insightsIconGreen: {
    color: '#22c55e', // green-500
  },
  insightsIconCyan: {
    color: '#22d3ee', // cyan-400
  },
  insightsIconBlue: {
    color: '#60a5fa', // blue-400
  },
  insightsIconYellow: {
    color: '#facc15', // yellow-400
  },
  bgSlate700: { backgroundColor: '#334155' },
  bgEmerald100: { backgroundColor: '#d1fae5' },
  bgEmerald200: { backgroundColor: '#a7f3d0' },
  bgEmerald300: { backgroundColor: '#6ee7b7' },
  bgEmerald400: { backgroundColor: '#34d399' },
  bgEmerald500: { backgroundColor: '#10b981' },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1e293b', // slate-800
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  modalIconContainer: {
    backgroundColor: '#06b6d4',
    borderRadius: 9999,
    padding: 12,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
  },
  modalText: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ProgressScreen;
