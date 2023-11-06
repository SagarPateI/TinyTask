import React from "react";
import { Calendar } from "react-native-calendars";
import { useThemeColor, View } from "../../components/Themed";

const CalendarScreen = () => {
  const backgroundColor = useThemeColor(
    {
      light: "#f0f0f0", // Light gray background color
      dark: "#333333", // Dark gray background color
    },
    "background"
  );

  const onDayPress = (day: any) => {
    console.log("selected day", day);
    // perform actions when a day is selected
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <View style={{ flex: 1, backgroundColor }}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            // mark a specific date
            "2023-11-08": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
          style={{ backgroundColor }} // Optional: Some libraries might allow setting a background color directly
        />
      </View>
    </View>
  );
};

export default CalendarScreen;