import { Ionicons } from "@expo/vector-icons";
import { Audio } from 'expo-av'; // Import the Audio module
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * DhikrScreen component to display morning, evening, or protection duas with audio playback.
 * It receives a prop `dhikrType` to determine which set of duas to show.
 *
 * @param {object} props - The component's props.
 * @param {function} props.onBack - Function to navigate back to the previous screen.
 * @param {string} props.dhikrType - The type of dhikr to display ('Morning', 'Evening', or 'Protection').
 */
export default function DhikrScreen({ onBack, dhikrType }) {
  // A comprehensive list of authentic duas for Morning, Evening, and Protection.
  // The 'count' property is the recommended number of recitations.
  // I've added a placeholder 'audio' property for where you would link your sound files.
  const duas = {
    Morning: [
      {
        id: 1,
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "Aʿūdhu bi kalimāti Allāhi al-tāmmāti min sharri mā khalaq.",
        translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        count: 3,
        audio: "https://example.com/audio/morning_dua1.mp3", // Placeholder for audio file
      },
      {
        id: 2,
        arabic: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismillāhi al-ladhī lā yaḍurru ma'a is-mihi shay'un fi al-arḍi wa lā fi al-samā'i, wa huwa al-Samīʿu al-ʿAlīm.",
        translation: "In the name of Allah, with whose name nothing on Earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.",
        count: 3,
        audio: "https://example.com/audio/morning_dua2.mp3",
      },
      {
        id: 3,
        arabic: "حَسْبِيَ اللهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
        transliteration: "Ḥasbī Allāhu lā ilāha illā huwa, ʿalayhi tawakkaltu wa huwa rabbu al-ʿArshi al-ʿaẓīm.",
        translation: "Allah is sufficient for me. There is no god but Him. In Him I have put my trust, and He is the Lord of the Mighty Throne.",
        count: 7,
        audio: "https://example.com/audio/morning_dua3.mp3",
      },
      {
        id: 4,
        arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ رَبِّ الْعَالَمِينَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ فَتْحَهُ، وَنَصْرَهُ، وَنُورَهُ، وَبَرَكَتَهُ، وَهُدَاهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهِ وَشَرِّ مَا بَعْدَهُ",
        transliteration: "Aṣbaḥnā wa aṣbaḥa al-mulku lillāhi Rabbi al-ʿālamīn. Allāhumma innī as'aluka khayra hādhā al-yawmi fatḥahu, wa naṣrahu, wa nūrahu, wa barakatahu, wa hudāhu, wa aʿūdhu bika min sharri mā fīhi wa sharri mā baʿdah.",
        translation: "We have reached the morning, and at this very time, all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this day, its victory, its help, its light, its blessing, and its guidance. I seek refuge in You from the evil of this day and the evil of what follows it.",
        count: 1,
        audio: "https://example.com/audio/morning_dua4.mp3",
      },
      {
        id: 5,
        arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
        transliteration: "Allāhumma bika aṣbaḥnā, wa bika amsaynā, wa bika naḥyā, wa bika namūtu, wa ilayka al-nushūr.",
        translation: "O Allah, by You we enter the morning, by You we enter the evening, by You we live, and by You we die, and to You is the resurrection.",
        count: 1,
        audio: "https://example.com/audio/morning_dua5.mp3",
      },
      {
        id: 6,
        arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
        transliteration: "Subḥāna Allāhi wa bi-ḥamdihi.",
        translation: "Glorified is Allah and praised is He.",
        count: 100,
        audio: "https://example.com/audio/morning_dua6.mp3",
      },
      {
        id: 7,
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي، فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration: "Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa anā ʿabduka, wa anā ʿalā ʿahdika wa waʿdika mā istaṭaʿtu. Aʿūdhu bika min sharri mā ṣanaʿtu, abū'u laka bi-niʿmatika ʿalayya, wa abū'u bi-dhanbī, fa-ghfir lī, fa-innahu lā yaghfiru al-dhunūba illā anta.",
        translation: "O Allah, You are my Lord, there is no god but You. You created me, and I am Your slave, and I hold to Your covenant and promise as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.",
        count: 1,
        audio: "https://example.com/audio/morning_dua7.mp3",
      },
    ],
    Evening: [
      {
        id: 8,
        arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
        transliteration: "Amsaynā wa amsa al-mulku lillāh.",
        translation: "We have reached the evening, and the dominion belongs to Allah.",
        count: 1,
        audio: "https://example.com/audio/evening_dua1.mp3",
      },
      {
        id: 9,
        arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
        transliteration: "Yā Ḥayyu yā Qayyūmu bi-raḥmatika astaghīth.",
        translation: "O The Ever-Living, O The Sustainer, I seek help in Your mercy.",
        count: 1,
        audio: "https://example.com/audio/evening_dua2.mp3",
      },
      {
        id: 10,
        arabic: "أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "Aʿūdhu bi kalimāti Allāhi al-tāmmāti min sharri mā khalaq.",
        translation: "I seek refuge in the perfect words of Allah from the evil of what He has created.",
        count: 3,
        audio: "https://example.com/audio/evening_dua3.mp3",
      },
      {
        id: 11,
        arabic: "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ، وَعَلَى كَلِمَةِ الْإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
        transliteration: "Amsaynā ʿalā fiṭrati al-Islām, wa ʿalā kalimati al-ikhlāṣ, wa ʿalā dīni nabīyinā Muḥammad, wa ʿalā millati abīnā Ibrāhīma ḥanīfan musliman wa mā kāna min al-mushrikīn.",
        translation: "We have reached the evening upon the natural religion of Islam, and upon the word of sincerity, and upon the religion of our Prophet Muhammad, and upon the faith of our father Abraham, who was a pure monotheist and not of those who associate partners with Allah.",
        count: 1,
        audio: "https://example.com/audio/evening_dua4.mp3",
      },
      {
        id: 12,
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
        transliteration: "Allāhumma innī as'aluka al-ʿāfiyata fi al-dunyā wa al-ākhirah. Allāhumma innī as'aluka al-ʿafwa wa al-ʿāfiyata fi dīnī wa dunyāya wa ahlī wa mālī.",
        translation: "O Allah, I ask You for well-being in this world and in the Hereafter. O Allah, I ask You for forgiveness and well-being in my religion, my worldly affairs, my family, and my wealth.",
        count: 1,
        audio: "https://example.com/audio/evening_dua5.mp3",
      },
      {
        id: 13,
        arabic: "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
        transliteration: "Allāhumma mā aṣbaḥa bī min niʿmatin aw bi-aḥadin min khalqika fa-minka waḥdaka lā sharīka lak, fa-laka al-ḥamdu wa laka al-shukr.",
        translation: "O Allah, whatever blessing has come to me or to any of Your creation in the morning, it is from You alone, You have no partner. All praise and thanks are due to You.",
        count: 1,
        audio: "https://example.com/audio/evening_dua6.mp3",
      },
    ],
    Protection: [
      {
        id: 14,
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        transliteration: "Allāhumma innī aʿūdhu bika min ʿadhābi Jahannam, wa min ʿadhābi al-qabr, wa min fitnati al-maḥyā wa al-mamāt, wa min sharri fitnati al-Masīḥi al-Dajjāl.",
        translation: "O Allah, I seek refuge in You from the punishment of Hell, and from the punishment of the grave, and from the trials of life and death, and from the evil of the trial of Al-Masih Ad-Dajjal.",
        count: 1,
        audio: "https://example.com/audio/protection_dua1.mp3",
      },
      {
        id: 15,
        arabic: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "Aʿūdhu bi-llāhi min al-Shayṭāni al-rajīm.",
        translation: "I seek refuge in Allah from the accursed Shaytan.",
        count: 1,
        audio: "https://example.com/audio/protection_dua2.mp3",
      },
      {
        id: 16,
        arabic: "اللَّهُمَّ إِنِّي أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
        transliteration: "Allāhumma innī astaghfiruka wa atūbu ilayk.",
        translation: "O Allah, I seek Your forgiveness and repent to You.",
        count: 100,
        audio: "https://example.com/audio/protection_dua3.mp3",
      },
      {
        id: 17,
        arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ",
        transliteration: "Lā ḥawla wa lā quwwata illā billāh.",
        translation: "There is no might or power except with Allah.",
        count: 1,
        audio: "https://example.com/audio/protection_dua4.mp3",
      },
    ]
  };

  const [counters, setCounters] = useState({});
  const [sound, setSound] = useState(null); // State to hold the audio object

  // Get the correct duas based on the dhikrType prop
  const currentDuas = duas[dhikrType] || [];

  // Reset counters whenever the dhikrType changes
  useEffect(() => {
    const initialCounters = {};
    currentDuas.forEach(dua => {
      initialCounters[dua.id] = 0;
    });
    setCounters(initialCounters);
  }, [dhikrType, currentDuas.length]);

  // Clean up function to unload the sound when the component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Function to handle audio playback
  const playAudio = async (uri) => {
    // Unload any previously playing sound
    if (sound) {
      await sound.unloadAsync();
    }

    // Play the new sound
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleIncrement = (id) => {
    setCounters(prevCounters => {
      const newCount = (prevCounters[id] || 0) + 1;
      return {
        ...prevCounters,
        [id]: newCount,
      };
    });
  };

  const handleResetAll = () => {
    const initialCounters = {};
    currentDuas.forEach(dua => {
      initialCounters[dua.id] = 0;
    });
    setCounters(initialCounters);
  };

  const getDuaStatus = (id, count) => {
    if (counters[id] >= count) {
      return "Completed";
    } else if (counters[id] > 0) {
      return "In Progress";
    }
    return "Pending";
  };

  const getStatusStyle = (id, count) => {
    const status = getDuaStatus(id, count);
    if (status === "Completed") {
      return styles.duaCardCompleted;
    }
    return styles.duaCardPending;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{dhikrType} Duas</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetAll}>
          <Ionicons name="refresh-circle" size={30} color="#06b6d4" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentArea}>
        {currentDuas.map(dua => (
          <TouchableOpacity
            key={dua.id}
            style={[styles.duaCard, getStatusStyle(dua.id, dua.count)]}
            onPress={() => handleIncrement(dua.id)}
          >
            <Text style={styles.duaArabic}>{dua.arabic}</Text>
            <Text style={styles.duaTransliteration}>{dua.transliteration}</Text>
            <Text style={styles.duaTranslation}>{dua.translation}</Text>

            <View style={styles.footerContainer}>
              {dua.audio && (
                <TouchableOpacity
                  onPress={() => playAudio(dua.audio)}
                  style={styles.playButton}
                >
                  <Ionicons name="play-circle" size={36} color="#06b6d4" />
                </TouchableOpacity>
              )}
              <View style={styles.counterAndStatusContainer}>
                <View style={styles.counterContainer}>
                  <Text style={styles.counterText}>
                    {counters[dua.id] || 0} / {dua.count}
                  </Text>
                </View>
                <Text style={styles.duaStatusText}>{getDuaStatus(dua.id, dua.count)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  resetButton: {
    padding: 8,
  },
  contentArea: {
    flex: 1,
    padding: 16,
  },
  duaCard: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  duaCardPending: {
    borderColor: 'rgba(6, 182, 212, 0.5)',
  },
  duaCardCompleted: {
    borderColor: 'rgba(22, 163, 74, 0.5)', // green-700
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
  },
  duaArabic: {
    color: 'white',
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 10,
  },
  duaTransliteration: {
    color: '#cbd5e1',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  duaTranslation: {
    color: '#94a3b8',
    marginBottom: 15,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  counterAndStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterContainer: {
    backgroundColor: '#334155',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  counterText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  duaStatusText: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  playButton: {
    // No absolute positioning needed here, it's now part of the flow.
  }
});
