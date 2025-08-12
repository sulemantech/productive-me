import { Ionicons } from "@expo/vector-icons"; // Using Ionicons to match your code
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const DhikrScreen = ({ onBack }) => {
  const [dhikrCount, setDhikrCount] = useState(0);
  const dhikrPhrases = ["Subhanallah", "Alhamdulillah", "Allahu Akbar", "La ilaha illallah"];
  const [dhikrIndex, setDhikrIndex] = useState(0);

  const handleDhikrPress = () => {
    setDhikrCount(prevCount => prevCount + 1);
  };

  const handleReset = () => {
    setDhikrCount(0);
  };

  const handleNextDhikr = () => {
    setDhikrIndex(prevIndex => (prevIndex + 1) % dhikrPhrases.length);
  };  

  return (
    <View style={dhikrStyles.container}>
      <View style={dhikrStyles.header}>
        <TouchableOpacity onPress={onBack} style={dhikrStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#06b6d4" />
        </TouchableOpacity>
        <Text style={dhikrStyles.headerTitle}>Dhikr & Dua</Text>
      </View>

      <View style={dhikrStyles.content}>
        <View style={dhikrStyles.controlsRow}>
          <TouchableOpacity onPress={handleNextDhikr} style={dhikrStyles.controlButton}>
            <Text style={dhikrStyles.controlButtonText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReset} style={dhikrStyles.controlButtonReset}>
            <Ionicons name="refresh-circle" size={24} color="#f87171" />
          </TouchableOpacity>
        </View>

        <Text style={dhikrStyles.dhikrPhrase}>{dhikrPhrases[dhikrIndex]}</Text>

        <TouchableOpacity
          onPress={handleDhikrPress}
          style={dhikrStyles.counterButton}
          activeOpacity={0.8}
        >
          <Text style={dhikrStyles.counterText}>{dhikrCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const dhikrStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 16,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 48,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  controlButton: {
    backgroundColor: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonReset: {
    backgroundColor: '#475569',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dhikrPhrase: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 40,
  },
  counterButton: {
    backgroundColor: '#06b6d4',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  counterText: {
    color: 'white',
    fontSize: 72,
    fontWeight: 'bold',
  },
});

export default DhikrScreen;


// import { Ionicons } from "@expo/vector-icons"; // Using Ionicons to match your code
// import React, { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const DhikrScreen = ({ onBack }) => {
//   const [dhikrCount, setDhikrCount] = useState(0);
//   const dhikrPhrases = ["Subhanallah", "Alhamdulillah", "Allahu Akbar", "La ilaha illallah"];
//   const [dhikrIndex, setDhikrIndex] = useState(0);

//   // Function to handle the main dhikr button press
//   const handleDhikrPress = () => {
//     setDhikrCount(prevCount => prevCount + 1);
//   };

//   // Function to reset the counter
//   const handleReset = () => {
//     setDhikrCount(0);
//   };

//   // Function to cycle to the next dhikr phrase
//   const handleNextDhikr = () => {
//     setDhikrIndex(prevIndex => (prevIndex + 1) % dhikrPhrases.length);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with back button */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={onBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#06b6d4" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Dhikr & Dua</Text>
//       </View>

//       <View style={styles.content}>
//         {/* Dhikr phrase and controls */}
//         <View style={styles.controlsRow}>
//           <TouchableOpacity onPress={handleNextDhikr} style={styles.controlButton}>
//             <Text style={styles.controlButtonText}>Next</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleReset} style={styles.controlButtonReset}>
//             <Ionicons name="refresh-circle" size={24} color="#f87171" />
//           </TouchableOpacity>
//         </View>

//         {/* The Dhikr Phrase Display */}
//         <Text style={styles.dhikrPhrase}>{dhikrPhrases[dhikrIndex]}</Text>

//         {/* The main counter button */}
//         <TouchableOpacity
//           onPress={handleDhikrPress}
//           style={styles.counterButton}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.counterText}>{dhikrCount}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0f172a',
//     padding: 16,
//     justifyContent: 'flex-start',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     position: 'relative',
//     width: '100%',
//   },
//   backButton: {
//     position: 'absolute',
//     left: 0,
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingBottom: 48,
//   },
//   controlsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 24,
//   },
//   controlButton: {
//     backgroundColor: '#475569',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   controlButtonReset: {
//     backgroundColor: '#475569',
//     padding: 8,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   controlButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   dhikrPhrase: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#cbd5e1',
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   counterButton: {
//     backgroundColor: '#06b6d4',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   counterText: {
//     color: 'white',
//     fontSize: 72,
//     fontWeight: 'bold',
//   },
// });

// export default DhikrScreen;
