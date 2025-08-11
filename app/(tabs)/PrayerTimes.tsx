import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function PrayerTimes() {
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        // Ask for permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          setLoading(false);
          return;
        }

        // Get coordinates
        let location = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = location.coords;

        // Reverse geocode to get city & country
        let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (!geocode || !geocode[0]) throw new Error('Unable to get city info');

        let city = geocode[0].city || geocode[0].subregion;
        let country = geocode[0].country;

        // Fetch prayer times
        let res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`
        );
        let data = await res.json();

        if (data.code === 200) {
          setTimings(data.data.timings);
        } else {
          throw new Error('API error');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimings();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#06b6d4" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Prayer Times</Text>
      {Object.entries(timings).map(([name, time]) => (
        <Text key={name} style={styles.timeText}>{name}: {time}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    marginTop: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10
  },
  timeText: {
    color: '#cbd5e1',
    fontSize: 16,
    marginBottom: 4
  },
  error: {
    color: 'red',
    marginTop: 20
  }
});
