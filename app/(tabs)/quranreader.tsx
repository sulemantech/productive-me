import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * A standalone component for reading the Quran, with functionality to track reading progress.
 * @param {Function} onBack - A function to navigate back from this screen.
 * @param {Function} onFinishReading - A callback to pass reading progress (surah name, ayah count) to a parent component.
 */
const QuranReaderScreen = ({ 
    onBack = () => console.log('Back button pressed'), 
    onFinishReading = (surahName, ayahCount) => console.log(`Finished reading ${ayahCount} ayahs from ${surahName}`)
}) => {
    // State to store the list of surahs
    const [surahs, setSurahs] = useState([]);
    // State to store the currently selected surah
    const [selectedSurah, setSelectedSurah] = useState(null);
    // State to store the fetched text of the selected surah
    const [surahText, setSurahText] = useState(null);
    // State to manage loading indicators
    const [loading, setLoading] = useState(true);
    // State for error handling
    const [error, setError] = useState(null);
    // State to control the visibility of the surah selection modal
    const [showSurahModal, setShowSurahModal] = useState(false);
    // State to keep track of the ayahs that have been marked as read in the current session
    const [readAyahs, setReadAyahs] = useState([]);
    // State to count the number of ayahs read in the current session
    const [sessionReadCount, setSessionReadCount] = useState(0);

    // Effect to fetch the list of surahs from the API when the component mounts
    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch('https://api.alquran.cloud/v1/surah');
                const data = await response.json();
                if (data.code === 200 && data.data) {
                    setSurahs(data.data);
                    // Automatically select the first surah on initial load
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

    // Effect to fetch the text of the selected surah whenever it changes
    useEffect(() => {
        if (selectedSurah) {
            const fetchSurahText = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.number}/editions/quran-uthmani`);
                    const data = await response.json();
                    if (data.code === 200 && data.data && data.data.length > 0) {
                        setSurahText(data.data[0]);
                        // Reset the reading session when a new surah is selected
                        setReadAyahs([]);
                        setSessionReadCount(0);
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

    // Handler for selecting a new surah from the modal
    const handleSurahSelect = (surah) => {
        setSelectedSurah(surah);
        setShowSurahModal(false);
    };

    // Handler for marking an ayah as read. Prevents double counting.
    const handleReadAyah = (ayahNumber) => {
        if (!readAyahs.includes(ayahNumber)) {
            setReadAyahs([...readAyahs, ayahNumber]);
            setSessionReadCount(sessionReadCount + 1);
        }
    };

    // Handler for the back button, which also sends reading progress to a parent component
    // const handleBackWithProgress = () => {
    //     if (selectedSurah) {
    //         onFinishReading(selectedSurah.englishName, sessionReadCount);
    //     }
    //     onBack();
    // };
    // Inside QuranReaderScreen.js
const handleBackWithProgress = () => {
    if (selectedSurah) {
        // This line sends the surah name and session count back to the HomeScreen
        onFinishReading(selectedSurah.englishName, sessionReadCount);
    }
    onBack();
};

    return (
        <View style={quranReaderStyles.container}>
            <View style={quranReaderStyles.header}>
                <TouchableOpacity onPress={handleBackWithProgress} style={quranReaderStyles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#06b6d4" />
                </TouchableOpacity>
                <Text style={quranReaderStyles.headerTitle}>Quran Reader</Text>
            </View>

            {/* Button to open the surah selection modal */}
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
                            <TouchableOpacity
                                key={ayah.numberInSurah}
                                style={[quranReaderStyles.ayahContainer, readAyahs.includes(ayah.numberInSurah) ? quranReaderStyles.ayahRead : null]}
                                onPress={() => handleReadAyah(ayah.numberInSurah)}
                            >
                                <Text style={quranReaderStyles.ayahArabicText}>{ayah.text}</Text>
                                <Text style={quranReaderStyles.ayahNumber}>{ayah.numberInSurah}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <Text style={quranReaderStyles.errorText}>No surah data available. Please select a surah to view.</Text>
                )}
            </ScrollView>

            {/* Modal for surah selection */}
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
    ayahRead: {
        backgroundColor: 'rgba(6, 182, 212, 0.2)',
        borderRadius: 8,
        padding: 8,
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
