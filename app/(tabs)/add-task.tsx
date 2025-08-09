// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from 'react-native';



// import { Calendar } from 'react-native-calendars';

// export default function AddTaskScreen() {
//   const router = useRouter();

//   const [title, setTitle] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const categories = [
//     { name: 'Spiritual', icon: 'book-outline' },
//     { name: 'Personal', icon: 'person-outline' },
//     { name: 'Reminders', icon: 'alarm-outline' },
//     { name: 'Masjid', icon: 'location-outline' },
//   ];

//   const handleSave = () => {
//     if (!title || !selectedDate || !selectedCategory) {
//       Alert.alert('Incomplete', 'Please fill in all fields');
//       return;
//     }

//     // Simulate saving logic
//     console.log({
//       title,
//       date: selectedDate,
//       category: selectedCategory,
//     });

//     Alert.alert('Success', 'Task Saved!');
//     router.back(); // Go back to calendar
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.scroll}>
//         <Text style={styles.title}>Add New Task</Text>

//         <Text style={styles.label}>Task Title</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter title"
//           value={title}
//           onChangeText={setTitle}
//         />

//         <Text style={styles.label}>Select Date</Text>
//         <Calendar
//           onDayPress={(day) => setSelectedDate(day.dateString)}
//           markedDates={
//             selectedDate ? { [selectedDate]: { selected: true } } : {}
//           }
//           style={styles.calendar}
//         />

//         <Text style={styles.label}>Select Category</Text>
//         <View style={styles.categoryContainer}>
//           {categories.map((cat) => (
//             <Pressable
//               key={cat.name}
//               onPress={() => setSelectedCategory(cat.name)}
//               style={[
//                 styles.category,
//                 selectedCategory === cat.name && styles.categorySelected,
//               ]}
//             >
//               <Ionicons name={cat.icon} size={20} />
//               <Text style={styles.categoryText}>{cat.name}</Text>
//             </Pressable>
//           ))}
//         </View>

//         <Pressable style={styles.saveBtn} onPress={handleSave}>
//           <Text style={styles.saveText}>Save Task</Text>
//         </Pressable>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scroll: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   label: {
//     marginTop: 15,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     borderRadius: 6,
//     marginTop: 5,
//   },
//   calendar: {
//     marginTop: 10,
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   categoryContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 10,
//   },
//   category: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 20,
//     marginRight: 10,
//     marginBottom: 10,
//   },
//   categorySelected: {
//     backgroundColor: '#b896f4',
//     borderColor: '#a37bf1',
//   },
//   categoryText: {
//     marginLeft: 6,
//   },
//   saveBtn: {
//     backgroundColor: '#3b4051',
//     padding: 14,
//     borderRadius: 8,
//     marginTop: 30,
//     alignItems: 'center',
//   },
//   saveText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTask() {
  const [task, setTask] = useState('');
  const router = useRouter();

  const handleSave = () => {
    if (!task.trim()) {
      Alert.alert('Task is empty');
      return;
    }

    console.log('Task:', task); // You can store it to state or DB later
    Alert.alert('Task Saved!', task);
    setTask('');
    router.back(); // Go back to previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task here..."
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderColor: '#b896f4',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#b896f4',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
