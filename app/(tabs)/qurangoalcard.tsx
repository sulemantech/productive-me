import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * A reusable Goal Card component for the Tazkai 360 app, specifically for Quran goals.
 * This component tracks daily verses read and updates the progress.
 * @param {Function} onNavigateToReader - A function to be called when the "Read Quran" button is pressed.
 */
const QuranGoalCard = ({ onNavigateToReader }) => {
    // State to track the number of verses read and the daily target
    const [versesRead, setVersesRead] = useState(0);
    const dailyTarget = 10;

    // Calculate the progress percentage
    const progressPercentage = (versesRead / dailyTarget) * 100;

    // Note: The handleReadQuran function has been removed as per the user's request.
    // The button now calls the onNavigateToReader function passed in as a prop.

    return (
        <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header}>
                <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>Goal</Text>
                    <Text style={styles.goalDescription}>6 Al-Anaam | 7/165</Text>
                </View>
                <Text style={styles.goalProgress}>{progressPercentage.toFixed(0)}%</Text>
            </View>

            {/* Body Section with progress bar */}
            <View style={styles.body}>
                <Text style={styles.dailyProgress}>{versesRead}/{dailyTarget} verses per day</Text>
                
                {/* Progress Bar Container */}
                <View style={styles.progressBarContainer}>
                    {/* Progress Bar Fill */}
                    <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
                </View>
            </View>

            {/* Button Section */}
            <TouchableOpacity
                style={[styles.button, versesRead >= dailyTarget ? styles.buttonDisabled : null]}
                onPress={onNavigateToReader} // Calling the new prop function
                activeOpacity={0.7}
                disabled={versesRead >= dailyTarget} // Disable button when target is reached
            >
                <Text style={styles.buttonText}>
                    {versesRead >= dailyTarget ? 'Goal Reached' : 'Read Quran'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 384,
        backgroundColor: '#4E3A85',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#4E3A85',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    goalInfo: {
        flexDirection: 'column',
    },
    goalTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    goalProgress: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    body: {
        paddingHorizontal: 24,
        paddingTop: 0,
        paddingBottom: 24,
    },
    goalDescription: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 0,
    },
    dailyProgress: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#8A7BB9',
        borderRadius: 9999,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 9999,
    },
    button: {
        margin: 24,
        marginTop: 0,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        backgroundColor: 'black',
        alignItems: 'center',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    buttonDisabled: {
        backgroundColor: '#333333',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default QuranGoalCard;
