import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function NewReminderScreen() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [recurrence, setRecurrence] = useState('none');
  const [isActive, setIsActive] = useState(true);

  // Function to handle saving the reminder
  const handleSaveReminder = () => {
    const reminderData = { title, date, time, recurrence, isActive };
    console.log("Reminder saved:", reminderData);
    // In a real app, you would save this data and navigate back.
    // e.g., navigation.goBack();
  };

  return (
    <View style={styles.mobileContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#06b6d4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Reminder</Text>
      </View>

      {/* Scrollable Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Reminder Form */}
        <View style={styles.formContainer}>
          {/* Reminder Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Daily Dhikr"
              placeholderTextColor="#64748b"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Date and Time */}
          <View style={styles.row}>
            <View style={styles.inputGroupFlex}>
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.textInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#64748b"
                value={date}
                onChangeText={setDate}
              />
              {/* For a real app, you would use a native date picker here */}
            </View>
            <View style={styles.inputGroupFlex}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.textInput}
                placeholder="HH:MM"
                placeholderTextColor="#64748b"
                value={time}
                onChangeText={setTime}
              />
              {/* For a real app, you would use a native time picker here */}
            </View>
          </View>

          {/* Recurrence */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recurrence</Text>
            <TextInput
              style={styles.textInput}
              placeholder="None, Daily, Weekly..."
              placeholderTextColor="#64748b"
              value={recurrence}
              onChangeText={setRecurrence}
            />
            {/* For a real app, this would be a Picker component */}
          </View>

          {/* Active Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.label}>Active</Text>
            <Switch
              trackColor={{ false: "#64748b", true: "#06b6d4" }}
              thumbColor={"#fff"}
              onValueChange={setIsActive}
              value={isActive}
            />
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveReminder}
        >
          <Text style={styles.saveButtonText}>Save Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mobileContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0f172a", // bg-slate-900
    // minHeight: "100%", // Not needed with flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#0f172a", // bg-slate-900
    shadowColor: "#000",
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
    fontWeight: "bold",
    color: "white",
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 80, // Add padding to not obstruct the save button
  },
  formContainer: {
    flex: 1,
    width: "100%",
    marginTop: 16, // space-y-6 equivalent
  },
  inputGroup: {
    marginBottom: 24, // space-y-6 equivalent
  },
  inputGroupFlex: {
    flex: 1,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#cbd5e1", // text-slate-300
    marginBottom: 4,
  },
  textInput: {
    marginTop: 4,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#334155", // bg-slate-700
    borderWidth: 1,
    borderColor: "#475569", // border-slate-600
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16, // space-x-4 equivalent
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24, // space-y-6 equivalent
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#0f172a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#06b6d4", // bg-cyan-500
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
