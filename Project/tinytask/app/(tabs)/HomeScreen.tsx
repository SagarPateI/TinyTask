// app/tabs/HomeScreen.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

const HomeScreen = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20, // Added for a bit of padding
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    dateText: {
      fontSize: 18,
      textAlign: 'center',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

  const currentDate = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayOfWeek = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, User</Text>
      <Text style={styles.dateText}>
        {`${dayOfWeek}, ${month} ${dayOfMonth}`}
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
};

export default HomeScreen;
