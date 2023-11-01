import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarViewScreen = () => {
  const currentMonth = "October 2023";
  const activities = {
    "2023-10-05": [{ time: "08:00 AM", title: "Meeting", type: "work" }],
    "2023-10-10": [{ time: "10:30 AM", title: "Gym", type: "personal" }],
    // ... (other activities for respective dates)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.currentMonth}>{currentMonth}</Text>
      <Calendar
        markedDates={markActivities(activities)}
      />
      {renderActivities(activities)}
    </View>
  );
};

const markActivities = (activities) => {
  let markedDates = {};

  for (const date in activities) {
    if (activities.hasOwnProperty(date)) {
      markedDates[date] = { marked: true };
    }
  }

  return markedDates;
};

const renderActivities = (activities) => {
  return Object.entries(activities).map(([date, events]) => {
    return (
      <View key={date} style={styles.activitiesOverlay}>
        {events.map((activity, index) => (
          <View
            key={`${date}-${index}`}
            style={[
              styles.activityBlock,
              { backgroundColor: getColorForType(activity.type) },
            ]}
          >
            <Text>{activity.time}</Text>
            <Text>{activity.title}</Text>
          </View>
        ))}
      </View>
    );
  });
};

const getColorForType = (type) => {
  switch (type) {
    case "work":
      return "#FF6347";
    case "personal":
      return "#66CDAA";
    default:
      return "#6495ED";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  currentMonth: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  activitiesOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  activityBlock: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
});

export default CalendarViewScreen;
