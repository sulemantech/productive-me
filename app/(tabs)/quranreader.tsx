import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const QuranReaderScreen = ({ onBack }) => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahText, setSurahText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSurahModal, setShowSurahModal] = useState(false); // NEW: State for the surah selection modal

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        if (data.code === 200 && data.data) {
          setSurahs(data.data);
          setSelectedSurah(data.data[0]);
        } else {
          throw new Error('Could not fetch surah list.');
        }
      } catch (err) {
        setError('Failed to load surahs.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      const fetchSurahText = async () => {
        setLoading(true);
        setError(null);
        try {
          // Use a dynamic surah number once you uncomment this line
          const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/editions/quran-uthmani`);
          // const response = await fetch("http://api.alquran.cloud/v1/surah/1/editions/quran-uthmani");
          const data = await response.json();

          // console.log("API Response:", data);

          // The API returns an array, so we need to access the first element
          // The data you need is at data.data[0]
          if (data.code === 200 && data.data && data.data.length > 0) {
            setSurahText(data.data[0]);
          } else {
            throw new Error('Could not fetch surah text.');
          }
        } catch (err) {
          setError('Failed to load surah text.');
          console.error("Error fetching surah:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSurahText();
    }
  }, [selectedSurah]);

  const handleSurahSelect = (surah) => {
    setSelectedSurah(surah);
    setShowSurahModal(false);
  };

  return (
    <View style={quranReaderStyles.container}>
      <View style={quranReaderStyles.header}>
        <TouchableOpacity onPress={onBack} style={quranReaderStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#06b6d4" />
        </TouchableOpacity>
        <Text style={quranReaderStyles.headerTitle}>Quran Reader</Text>
      </View>

      {/* Updated: Surah Selection button */}
      <TouchableOpacity
        onPress={() => setShowSurahModal(true)}
        style={quranReaderStyles.surahSelectorContainer}
      >
        <Text style={quranReaderStyles.surahSelectorText}>
          {selectedSurah ? selectedSurah.englishName : 'Select Surah'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#cbd5e1" />
      </TouchableOpacity>

      <ScrollView style={quranReaderStyles.surahContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#06b6d4" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={quranReaderStyles.errorText}>{error}</Text>
        ) : surahText && surahText.ayahs ? (
          <View>
            <Text style={quranReaderStyles.surahTitle}>{surahText.englishName}</Text>
            {surahText.ayahs.map((ayah, index) => (
              <View key={ayah.numberInSurah} style={quranReaderStyles.ayahContainer}>
                <Text style={quranReaderStyles.ayahArabicText}>{ayah.text}</Text>
                <Text style={quranReaderStyles.ayahNumber}>{ayah.numberInSurah}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={quranReaderStyles.errorText}>No surah data available. Please select a surah to view.</Text>
        )}
      </ScrollView>

      {/* NEW: Surah Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSurahModal}
        onRequestClose={() => setShowSurahModal(false)}
      >
        <View style={quranReaderStyles.modalOverlay}>
          <View style={quranReaderStyles.modalContent}>
            <Text style={quranReaderStyles.modalTitle}>Select a Surah</Text>
            <ScrollView style={{ width: '100%' }}>
              {surahs.map((surah, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSurahSelect(surah)}
                  style={quranReaderStyles.surahItem}
                >
                  <Text style={quranReaderStyles.surahItemText}>{surah.englishName}</Text>
                  <Text style={quranReaderStyles.surahItemArabicName}>{surah.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setShowSurahModal(false)}
              style={quranReaderStyles.modalCloseButton}
            >
              <Text style={quranReaderStyles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const quranReaderStyles = StyleSheet.create({
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
  surahSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  surahSelectorText: {
    color: 'white',
    fontSize: 16,
  },
  surahContent: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 16,
  },
  surahTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
  },
  ayahContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  ayahArabicText: {
    flex: 1,
    fontSize: 22,
    color: '#f8fafc',
    textAlign: 'right',
    lineHeight: 36,
  },
  ayahNumber: {
    fontSize: 16,
    color: '#06b6d4',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  surahItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#475569',
    width: '100%',
  },
  surahItemText: {
    color: '#F8FAFC',
    fontSize: 16,
  },
  surahItemArabicName: {
    color: '#CBD5E1',
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 24,
    backgroundColor: '#06B6D4',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 9999,
  },
  modalCloseButtonText: {
    color: '#F8FAFC',
    fontWeight: '600',
  },
});

export default QuranReaderScreen;