import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

// Assuming you have your real dbController in the same directory
import { dbController } from '../services/dbController';

const surahNames = [
  'Al-Fatihah', 'Al-Baqarah', 'Al Imran', 'An-Nisa', 'Al-Maidah', 'Al-Anam',
  'Al-Araf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Rad',
  'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Taha',
  'Al-Anbiya', 'Al-Hajj', 'Al-Muminun', 'An-Nur', 'Al-Furqan', 'As-Shuara',
  'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum', 'Luqman', 'As-Sajdah',
  'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad', 'Az-Zumar',
  'Ghafir', 'Fussilat', 'As-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah',
  'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat',
  'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqiah', 'Al-Hadid',
  'Al-Mujadilah', 'Al-Hashr', 'Al-Mumtahanah', 'As-Saff', 'Al-Jumuah',
  'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk',
  'Al-Qalam', 'Al-Haqqah', 'Al-Maarij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil',
  'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba',
  'An-Naziat', 'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin',
  'Al-Inshiqaq', 'Al-Buruj', 'At-Tariq', 'Al-Ala', 'Al-Ghashiyah', 'Al-Fajr',
  'Al-Balad', 'As-Shams', 'Al-Layl', 'Ad-Duha', 'Ash-Sharh', 'At-Tin',
  'Al-Alaq', 'Al-Qadr', 'Al-Bayyinah', 'Az-Zalzalah', 'Al-Adiyat',
  'Al-Qariah', 'At-Takathur', 'Al-Asr', 'Al-Humazah', 'Al-Fil', 'Quraish',
  'Al-Maun', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas',
  'Al-Falaq', 'An-Nas'
];

const surahTotalVerses = {
  1: 7, 2: 286, 3: 200, 4: 176, 5: 120, 6: 165, 7: 206, 8: 75, 9: 129, 10: 109,
  11: 123, 12: 111, 13: 43, 14: 52, 15: 99, 16: 128, 17: 111, 18: 110, 19: 98,
  20: 135, 21: 112, 22: 78, 23: 118, 24: 64, 25: 77, 26: 227, 27: 93, 28: 88,
  29: 69, 30: 60, 31: 34, 32: 30, 33: 73, 34: 54, 35: 45, 36: 83, 37: 182,
  38: 88, 39: 75, 40: 85, 41: 54, 42: 53, 43: 89, 44: 59, 45: 37, 46: 35,
  47: 38, 48: 29, 49: 18, 50: 45, 51: 60, 52: 49, 53: 62, 54: 55, 55: 78,
  56: 96, 57: 29, 58: 22, 59: 24, 60: 13, 61: 14, 62: 11, 63: 11, 64: 18,
  65: 12, 66: 12, 67: 30, 68: 52, 69: 52, 70: 44, 71: 28, 72: 28, 73: 20,
  74: 56, 75: 40, 76: 31, 77: 50, 78: 40, 79: 46, 80: 42, 81: 29, 82: 19,
  83: 36, 84: 25, 85: 22, 86: 17, 87: 19, 88: 26, 89: 30, 90: 20, 91: 15,
  92: 21, 93: 11, 94: 8, 95: 8, 96: 19, 97: 5, 98: 8, 99: 8, 100: 11,
  101: 11, 102: 8, 103: 3, 104: 9, 105: 5, 106: 4, 107: 7, 108: 3, 109: 6,
  110: 3, 111: 5, 112: 4, 113: 5, 114: 6
};

const QuranReaderScreen = ({ onBack = () => {} }) => {
    const [timer, setTimer] = useState(0);
     const [juzNumber, setJuzNumber] = useState(1); // Set an initial value
     const [ayahsRead, setAyahsRead] = useState(0); // New state to track total verses read
  const intervalRef = useRef();
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [currentSurah, setCurrentSurah] = useState(4);
  const [currentAyah, setCurrentAyah] = useState(35);
  const [ayahData, setAyahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalAyahsInCurrentSurah, setTotalAyahsInCurrentSurah] = useState(0);

   useEffect(() => {
    // Start the timer when the component mounts
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // The empty dependency array ensures this effect runs only once
  
  useEffect(() => {
    const initializeDbAndFetchAyah = async () => {
      try {
        await dbController.init();
        setIsDbInitialized(true);
        //setLoading(true);
        const initialData = await dbController.getAyahWithTranslation(currentSurah, currentAyah);
        const total = await dbController.getTotalAyahsInSurah(currentSurah);
        setAyahData(initialData);
        setTotalAyahsInCurrentSurah(total);
        const juz = await dbController.getJuzForAyah(currentSurah, currentAyah);
         setAyahsRead(1); // Initialize the count for the first ayah
        setJuzNumber(juz); // Update the state
      } catch (e) {
        console.error("Failed to initialize DB or fetch initial data:", e);
      } finally {
        //setLoading(false);
      }
    };
    initializeDbAndFetchAyah();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!isDbInitialized) return;
      //setLoading(true);
      try {
        const data = await dbController.getAyahWithTranslation(currentSurah, currentAyah);
        const total = await dbController.getTotalAyahsInSurah(currentSurah);
        setAyahData(data);
        setTotalAyahsInCurrentSurah(total);
        const juz = await dbController.getJuzForAyah(currentSurah, currentAyah);
        setJuzNumber(juz); // Update the state
      } catch (e) {
        console.error("Failed to fetch data:", e);
        setAyahData(null);
        setTotalAyahsInCurrentSurah(0);
      } finally {
        //setLoading(false);
      }
    };
    fetchData();
  }, [currentSurah, currentAyah, isDbInitialized]);

  // A helper function to format the time as MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const handleNextAyah = async () => {
    //setLoading(true);
    const nextAyah = await dbController.getNextAyah(currentSurah, currentAyah);
    if (nextAyah) {
      setCurrentSurah(nextAyah.surah_number);
      setCurrentAyah(nextAyah.verse_number);
      setAyahsRead(prevAyahs => prevAyahs + 1); // Increment the count
    } else {
    //  setLoading(false);
    }
  };

  const handlePreviousAyah = async () => {
    //setLoading(true);
    const previousAyah = await dbController.getPreviousAyah(currentSurah, currentAyah);
    if (previousAyah) {
      setCurrentSurah(previousAyah.surah_number);
      setCurrentAyah(previousAyah.verse_number);
      setAyahsRead(prevAyahs => Math.max(0, prevAyahs - 1)); // Decrement the count, but not below 0
    } else {
    //  setLoading(false);
    }
  };
  const onGoToSettings = () => {
 
};

  const progressPercentage = totalAyahsInCurrentSurah > 0
    ? (currentAyah / totalAyahsInCurrentSurah) * 100
    : 0;

  const remainingAyahs = totalAyahsInCurrentSurah - currentAyah;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor={styles.container.backgroundColor} />

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.navArrowButton} onPress={onBack}>
            <Text style={{color: '#fff', fontSize: 24}}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <View style={styles.headerIconContainer}>
              <Text style={{ color: '#e91e63', fontSize: 16 }}>♥</Text>
              <Text style={styles.headerIconText}>2.8K</Text>
            </View>
            
            <View style={styles.headerIconContainer}>
              <Text style={{ color: '#fff', fontSize: 16 }}>♦</Text>
              <Text style={styles.headerIconText}>2</Text>
            </View>
            {/* <View style={styles.headerIconContainer}>
              <Text style={{ color: '#fff', fontSize: 16 }}>⏱</Text>
              <Text style={styles.headerIconText}>00:03</Text>
            </View> */}
            <View style={styles.headerIconContainer}>
  <Text style={{ color: '#fff', fontSize: 16 }}>⏱</Text>
  <Text style={styles.headerIconText}>{formatTime(timer)}</Text>
</View>
          </View>
          {/* <TouchableOpacity>
            <Text style={{ color: '#fff', fontSize: 24 }}>⚙</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onGoToSettings} style={styles.settingsButton}>
        <Text style={{ color: '#fff', fontSize: 24 }}>⚙</Text>
      </TouchableOpacity>
        </View>

        {/* Progress Section */}
        {/* <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Lvl 01</Text>
            </View>
            <Text style={styles.progressTitle}>Break the egg</Text>
            <Text style={styles.progressTotal}>Total: 0 min</Text>
          </View>
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownDigit}>0</Text>
            <Text style={styles.countdownDigit}>1</Text>
            <Text style={styles.countdownDigit}>5</Text>
            <Text style={styles.countdownDigit}>7</Text>
          </View>
        </View> */}

        {/* Verse Navigation Section */}
        {/* Verse Navigation Section */}
        <View style={styles.verseNavContainer}>
          <View style={styles.verseNavInfo}>
            <Text style={styles.verseNavText}>{currentAyah}/{totalAyahsInCurrentSurah}</Text>
            <Text style={styles.verseNavText}>Juz {juzNumber}: {remainingAyahs} Verses Left</Text>
            <Text style={styles.verseNavText}>{Math.round(progressPercentage)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}></View>
          </View>
        </View>

        {/* Main scrollable content area */}
        <ScrollView style={styles.mainContentScrollView}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
          ) : (
            <>
              {/* Main Verse Card for Arabic text */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <TouchableOpacity><Text style={{ color: '#4a148c', fontSize: 20 }}>🔍</Text></TouchableOpacity>
                  <TouchableOpacity><Text style={{ color: '#4a148c', fontSize: 20 }}>🔊</Text></TouchableOpacity>
                  <View style={styles.verseInfo}>
                    <Text style={styles.verseTitle}>{surahNames[currentSurah-1]}</Text>
                    <Text style={styles.verseSubtitle}>{currentAyah}/{totalAyahsInCurrentSurah}</Text>
                  </View>
                  <View style={styles.cardHeaderRight}>
                    <View style={styles.cardHeaderIconContainer}>
                      <Text style={{ color: '#e91e63', fontSize: 16 }}>♥</Text>
                      <Text style={styles.cardHeaderIconText}>573</Text>
                    </View>
                    <TouchableOpacity><Text style={{ color: '#4a148c', fontSize: 20 }}>🔖</Text></TouchableOpacity>
                  </View>
                </View>
                <View style={styles.arabicContent}>
                  <Text style={styles.arabicText}>
                    {ayahData?.text || 'لا يوجد نص عربي متاح.'}
                  </Text>
                </View>
              </View>

              {/* English Translation Section (outside the card) */}
              <View style={styles.translationContainer}>
  <View style={styles.translationHeader}>
    <Text style={styles.translationTitle}>Translation:</Text>
    <Text style={styles.translationVerseNumber}>{currentAyah}/{totalAyahsInCurrentSurah}</Text>
  </View>
  <Text style={styles.englishText}>
    {ayahData?.english_text || 'No English text available.'}
  </Text>
</View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={handlePreviousAyah}
          disabled={loading || (currentSurah === 1 && currentAyah === 1)}
        >
          <Text style={{ color: '#fff', fontSize: 24 }}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Completed</Text>
        </TouchableOpacity>
        <View style={styles.bottomNavRight}>
           <View style={styles.ayahsReadContainer}>
            <Text style={styles.plusText}>+{ayahsRead}</Text>
          </View>
          <TouchableOpacity
            style={styles.bottomNavButton}
            onPress={handleNextAyah}
            disabled={loading || (currentSurah === 114 && currentAyah === surahTotalVerses[114])}
          >
            <Text style={{ color: '#fff', fontSize: 24 }}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#322345', // Replaced with a color that more closely matches the home screen's background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 20,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  headerIconText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    alignItems: 'center',
    marginBottom: 10,
  },
  levelBadge: {
    backgroundColor: '#382b4a', // Matched with the dark grey-purple color from other cards
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  levelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressTotal: {
    color: '#fff',
    fontSize: 12,
  },
  countdownContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  countdownDigit: {
    backgroundColor: '#382b4a', // Matched with the dark grey-purple color from other cards
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 8,
  },
   settingsButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  verseNavContainer: {
    marginTop: 20,
    paddingHorizontal: 30,
    gap: 5,
  },
  verseNavInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  verseNavText: {
    color: '#fff',
    alignSelf: 'flex-start',
    fontSize: 12,
  },
  progressBar: {
    height: 5,
    backgroundColor: '#382b4a', // Matched with the dark grey-purple color from other cards
    borderRadius: 5,
    width: '100%',
    marginTop: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  mainContentScrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  verseInfo: {
    alignItems: 'center',
    flex: 1,
  },
  verseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#322345',
  },
  verseSubtitle: {
    fontSize: 12,
    color: '#9e9e9e',
  },
  cardHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardHeaderIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardHeaderIconText: {
    fontSize: 14,
    color: '#322345',
  },
  arabicContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  arabicText: {
    fontSize: 24,
    textAlign: 'right', // Added for right-to-left text flow
    lineHeight: 40,
    // fontFamily: 'Amiri', // This font needs to be loaded for proper Arabic script rendering
    color: '#424242',
  },
  translationContainer: {
  marginHorizontal: 20,
  marginTop: 10,
  padding: 20,
  backgroundColor: '#382b4a', // Using the dark grey-purple from the home screen cards
  borderRadius: 15,
},
translationHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},
translationTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
},
translationVerseNumber: {
  fontSize: 16,
  color: '#9e9e9e',
},
englishText: {
  fontSize: 16,
  lineHeight: 24,
  color: '#fff',
},
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 'auto',
  },
  navArrowButton: {
    backgroundColor: '#382b4a', // Matched with the dark grey-purple color from other cards
    padding: 15,
    borderRadius: 50,
  },
  bottomNavButton: {
    backgroundColor: '#382b4a', // Matched with the dark grey-purple color from other cards
    padding: 15,
    borderRadius: 50,
  },
  doneButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doneButtonText: {
    color: '#322345',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
   ayahsReadContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  plusText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 10,
  },
});

export default QuranReaderScreen;