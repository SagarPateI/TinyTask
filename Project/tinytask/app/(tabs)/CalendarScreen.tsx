import React from "react";
import { Calendar } from "react-native-calendars";
import { useThemeColor, View } from "../../components/Themed";

const CalendarScreen = () => {
  const backgroundColor = useThemeColor(
    {
      light: "#FFFFFF", // Light gray background color
      dark: "#000000", // Dark gray background color
    },
    "background"
  );

  const onDayPress = (day: any) => {
    console.log("selected day", day.dateString);
    // perform actions when a day is selected
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          // mark a specific date
          "2023-11-08": { selected: true, marked: true, selectedColor: "blue" },
        }}
      />
    </View>
  );
};

export default CalendarScreen;
