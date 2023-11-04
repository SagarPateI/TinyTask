// app/tabs/CalendarScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const onDayPress = (day: any) => {
    console.log('selected day', day);
    // perform actions when a day is selected
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
        // mark a specific date
          '2023-11-08': { selected: true, marked: true, selectedColor: 'blue' },
        }}
      />
    </View>
  );
};

export default CalendarScreen;
