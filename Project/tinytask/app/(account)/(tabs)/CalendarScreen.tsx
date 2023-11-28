//CalendarScreen.tsx
import React, { Component } from "react";
import groupBy from "lodash/groupBy";
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
import ColorPicker, { Swatches } from "reanimated-color-picker";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import axios from "axios";

interface State {
  currentDate: string;
  events: TimelineEventProps[];
  eventsByDate: { [key: string]: TimelineEventProps[] };
  newEventTitle: string;
  newEventSummary: string;
  isModalVisible: boolean;
  selectedEventColor: string;
  selectedStartTime: Date;
  selectedEndTime: Date;
  isStartTimePickerVisible: boolean;
  isEndTimePickerVisible: boolean;
  newEventStart: string;
  newEventEnd: string;
  marked: { [key: string]: { marked: boolean } };
}

const EVENT_COLOR = "#e6add8";
const today = new Date();

export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset)
  );

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS: TimelineEventProps[] = [];

export default class TimelineCalendarScreen extends Component<{}, State> {
  state: State = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: {},
    newEventTitle: "",
    newEventSummary: "",
    isModalVisible: false,
    selectedEventColor: EVENT_COLOR,
    selectedStartTime: new Date(),
    selectedEndTime: new Date(),
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
    newEventStart: "",
    newEventEnd: "",
    marked: {
      [`${getDate()}`]: { marked: true },
    },
  };

  onDateChanged = (date: string, source: string) => {
    console.log("TimelineCalendarScreen onDateChanged: ", date, source);
    this.setState({ currentDate: date });
  };

  onMonthChange = (month: any, updateSource: any) => {
    console.log("TimelineCalendarScreen onMonthChange: ", month, updateSource);
  };

  handleAddEventButton = () => {
    this.setState({ isModalVisible: true });
  };

  hideTimePicker() {
    this.setState({
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
    });
  }

  handleCreateEvent = async () => {
    const {
      newEventTitle,
      newEventSummary,
      newEventStart,
      newEventEnd,
      selectedEventColor,
    } = this.state;

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
        const response = await fetch("https://tinytaskapp.loca.lt/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newEventTitle || "New Event",
            summary: newEventSummary || "",
            start: newEventStart,
            end: newEventEnd,
            color: selectedEventColor,
          }),
        });

        if (response.ok) {
          const newEvent = await response.json();

          this.setState({
            events: [...this.state.events, newEvent],
            isModalVisible: false,
          });

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
  };

  handleTimePickerConfirm = (date: Date, isStartTime: boolean) => {
    const formattedTime = format(date, "HH:mm");
    if (isStartTime) {
      this.setState({
        selectedStartTime: date,
        newEventStart: `${this.state.currentDate} ${formattedTime}:00`,
      });
    } else {
      this.setState({
        selectedEndTime: date,
        newEventEnd: `${this.state.currentDate} ${formattedTime}:00`,
      });
    }
    this.hideTimePicker();
  };

  private timelineProps: Partial<TimelineProps> = {
    unavailableHours: [
      { start: 0, end: 6 },
      { start: 22, end: 24 },
    ],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  render() {
    const {
      currentDate,
      eventsByDate,
      newEventTitle,
      newEventSummary,
      isModalVisible,
      selectedStartTime,
      selectedEndTime,
      isStartTimePickerVisible,
      isEndTimePickerVisible,
    } = this.state;

    return (
      <CalendarProvider
        date={currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => this.setState({ isModalVisible: true })}
        >
          <Text style={styles.buttonAddEvent}>Add Event</Text>
        </TouchableOpacity>

        <ExpandableCalendar
          firstDay={1}
          hideArrows
          markedDates={this.state.marked}
        />

        <TimelineList
          events={eventsByDate}
          timelineProps={this.timelineProps}
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
                onChangeText={(text) => this.setState({ newEventTitle: text })}
                style={styles.inputEvent}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                value={newEventSummary}
                onChangeText={(text) =>
                  this.setState({ newEventSummary: text })
                }
                style={styles.inputSummary}
              />

              {/* Start Time */}
              <TouchableOpacity
                onPress={() =>
                  this.setState({ isStartTimePickerVisible: true })
                }
              >
                <Text style={styles.label}>Start Time</Text>
                <Text>{format(selectedStartTime, "HH:mm a")}</Text>
              </TouchableOpacity>

              {/* Start Time Picker */}
              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={(date) => this.handleTimePickerConfirm(date, true)}
                onCancel={() =>
                  this.setState({ isStartTimePickerVisible: false })
                }
              />

              {/* End Time */}
              <TouchableOpacity
                onPress={() => this.setState({ isEndTimePickerVisible: true })}
              >
                <Text style={styles.label}>End Time</Text>
                <Text>{format(selectedEndTime, "HH:mm a")}</Text>
              </TouchableOpacity>

              {/* End Time Picker */}
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={(date) => this.handleTimePickerConfirm(date, false)}
                onCancel={() =>
                  this.setState({ isEndTimePickerVisible: false })
                }
              />

              <Text style={styles.label}>Color</Text>
              <ColorPicker
                value={this.state.selectedEventColor}
                sliderThickness={20}
                thumbSize={20}
                thumbShape="circle"
                onChange={(color) =>
                  this.setState({ selectedEventColor: color.hex })
                }
              >
                <Swatches
                  style={styles.swatchesContainer}
                  swatchStyle={styles.swatchStyle}
                  colors={swatchColors}
                />
              </ColorPicker>

              <TouchableOpacity
                style={styles.createButton}
                onPress={this.handleCreateEvent}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isModalVisible: false })}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </CalendarProvider>
    );
  }
}
const swatchColors = [
  "#fd5959",
  "#ff9c6d",
  "#fcff82",
  "#AFE1AF",
  "#cadefc",
  "#c3bef0",
  "#cca8e9",
];
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
  sliderTitle: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
    paddingHorizontal: 4,
  },
  sliderStyle: {
    borderRadius: 20,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
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
