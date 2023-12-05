//CalendarScreen.tsx
import groupBy from 'lodash/groupBy';
import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ColorPicker, { Swatches } from "reanimated-color-picker";
import { format } from "date-fns";
import axios from "axios";

const EVENT_COLOR = "#e6add8";
const today = new Date();

export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );

const INITIAL_TIME = { hour: 9, minutes: 0 };


const swatchColors = [
  "#fd5959",
  "#ff9c6d",
  "#fcff82",
  "#AFE1AF",
  "#cadefc",
  "#c3bef0",
  "#cca8e9",
];

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [eventsByDate, setEventsByDate] = useState({});
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventSummary, setNewEventSummary] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEventColor, setSelectedEventColor] = useState(EVENT_COLOR);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(
    false
  );
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [newEventStart, setNewEventStart] = useState("");
  const [newEventEnd, setNewEventEnd] = useState("");
  const [marked, setMarked] = useState({
    [`${getDate()}`]: { marked: true },
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://tinytaskapp2.loca.lt/events");
      const fetchedEvents = response.data;

      console.log('Fetched Events:', fetchedEvents);

      const eventsByDate = groupBy(fetchedEvents, (e) =>
        CalendarUtils.getCalendarDateString(e.start)
      );
      const marked = generateMarkedObject(eventsByDate);

      setEventsByDate(eventsByDate);
      setMarked(marked);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const onDateChanged = (date: string, source: string) => {
    console.log('onDateChanged: ', date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month: any, updateSource: any) => {
    console.log('onMonthChange: ', month, updateSource);
  };

  const handleAddEventButton = () => {
    setIsModalVisible(true);
  };

  const hideTimePicker = () => {
    setIsStartTimePickerVisible(false);
    setIsEndTimePickerVisible(false);
  };

  const handleCreateEvent = async () => {
    console.log("Request data:", {
      title: newEventTitle || "New Event",
      summary: newEventSummary || "",
      start: newEventStart,
      end: newEventEnd,
      color: selectedEventColor,
    });

    try {
      if (newEventTitle.trim() !== "") {
        console.log("Before making the request");
        const response = await axios.post(
          "https://tinytaskapp2.loca.lt/events",
          {
            title: newEventTitle || "New Event",
            summary: newEventSummary || "",
            start: newEventStart,
            end: newEventEnd,
            color: selectedEventColor,
          }
        );

        if (response.status === 201) {
          const newEvent = response.data;

          setEventsByDate({ ...eventsByDate, [newEventStart]: [newEvent] });
          setMarked({ ...marked, [newEventStart]: { marked: true } });
          fetchData();
          // Display success message
          console.log("Event created successfully:", newEvent);
          Alert.alert("Event created successfully");
        } else {
          // Display failure message
          Alert.alert("Failed to create event");
        }
      } else {
        // If event title is empty, display an alert
        Alert.alert("Event title cannot be empty");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      // Display error message
      Alert.alert("Error creating event");
    }

    // Close the modal after creating the event
    setIsModalVisible(false);
  };

  const handleTimePickerConfirm = (date: Date, isStartTime: boolean) => {
    const formattedTime = format(date, "HH:mm");
    if (isStartTime) {
      setSelectedStartTime(date);
      setNewEventStart(`${currentDate} ${formattedTime}:00`);
    } else {
      setSelectedEndTime(date);
      setNewEventEnd(`${currentDate} ${formattedTime}:00`);
    }
    hideTimePicker();
  };

  const timelineProps: Partial<TimelineProps> = {
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  const generateMarkedObject = (eventsByDate: {
    [key: string]: TimelineEventProps[];
  }): { [key: string]: { marked: boolean } } => {
    const marked: { [key: string]: { marked: boolean } } = {};

    for (const date in eventsByDate) {
      marked[date] = { marked: true };
    }

    return marked;
  };

  return (
    <CalendarProvider
      date={currentDate}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
    >
      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={handleAddEventButton}
      >
        <Text style={styles.buttonAddEvent}>Add Event</Text>
      </TouchableOpacity>

      <ExpandableCalendar
        firstDay={1}
        hideArrows
        markedDates={marked}
      />

      <TimelineList
        events={eventsByDate}
        timelineProps={timelineProps}
        showNowIndicator
        scrollToFirst
        initialTime={INITIAL_TIME}
    
      />

      <Modal
        testID={"modal"}
        isVisible={isModalVisible}
        backdropColor="#B4B3DB"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              value={newEventTitle}
              onChangeText={(text) => setNewEventTitle(text)}
              style={styles.inputEvent}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
              value={newEventSummary}
              onChangeText={(text) => setNewEventSummary(text)}
              style={styles.inputSummary}
            />

            {/* Start Time */}
            <TouchableOpacity
              onPress={() => setIsStartTimePickerVisible(true)}
            >
              <Text style={styles.label}>Start Time</Text>
              <Text>{format(selectedStartTime, "HH:mm a")}</Text>
            </TouchableOpacity>

            {/* Start Time Picker */}
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={(date) => handleTimePickerConfirm(date, true)}
              onCancel={() => setIsStartTimePickerVisible(false)}
            />

            {/* End Time */}
            <TouchableOpacity
              onPress={() => setIsEndTimePickerVisible(true)}
            >
              <Text style={styles.label}>End Time</Text>
              <Text>{format(selectedEndTime, "HH:mm a")}</Text>
            </TouchableOpacity>

            {/* End Time Picker */}
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={(date) => handleTimePickerConfirm(date, false)}
              onCancel={() => setIsEndTimePickerVisible(false)}
            />

            <Text style={styles.label}>Color</Text>
            <ColorPicker
              value={selectedEventColor}
              sliderThickness={20}
              thumbSize={20}
              thumbShape="circle"
              onChange={(color) => setSelectedEventColor(color.hex)}
            >
              <Swatches
                style={styles.swatchesContainer}
                swatchStyle={styles.swatchStyle}
                colors={swatchColors}
              />
            </ColorPicker>

            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateEvent}
            >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  addButtonContainer: {
    marginHorizontal: 5,
    marginVertical: 8,
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#007BFF",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formGroup: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "black",
  },
  inputEvent: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  inputSummary: {
    borderWidth: 1,
    borderColor: "lightgray",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    height: 100,
  },
  createButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonAddEvent: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 4,
    fontSize: 16,
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 5,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

export default CalendarScreen;