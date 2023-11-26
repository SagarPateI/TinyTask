import React, { Component } from 'react';
import groupBy from 'lodash/groupBy';
import {Button,TextInput,View,TouchableOpacity,Text,StyleSheet,} from 'react-native';
import Modal from 'react-native-modal';
import {ExpandableCalendar,TimelineEventProps,TimelineList,CalendarProvider,TimelineProps,CalendarUtils,} from 'react-native-calendars';
import ColorPicker, { Swatches, } from 'reanimated-color-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';


interface State {
  currentDate: string;
  events: TimelineEventProps[];
  eventsByDate: { [key: string]: TimelineEventProps[] };
  newEventTitle: string;
  newEventSummary: string;
  isModalVisible: boolean;
  selectedEventColor: string;
  isStartTimePickerVisible: boolean;
  isEndTimePickerVisible: boolean;
  startTime: Date;
  endTime: Date;
}

const EVENT_COLOR = '#e6add8';
const today = new Date();

export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

  
  const timelineEvents: TimelineEventProps[] = [
    {
      start: `${getDate(-1)} 09:20:00`,
      end: `${getDate(-1)} 12:00:00`,
      title: 'Merge Request to React Native Calendars',
      summary: 'Merge Timeline Calendar to React Native Calendars',
    },
    {
      start: `${getDate()} 01:15:00`,
      end: `${getDate()} 02:30:00`,
      title: 'Meeting A',
      summary: 'Summary for meeting A',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate()} 01:30:00`,
      end: `${getDate()} 02:30:00`,
      title: 'Meeting B',
      summary: 'Summary for meeting B',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate()} 01:45:00`,
      end: `${getDate()} 02:45:00`,
      title: 'Meeting C',
      summary: 'Summary for meeting C',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate()} 02:40:00`,
      end: `${getDate()} 03:10:00`,
      title: 'Meeting D',
      summary: 'Summary for meeting D',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate()} 02:50:00`,
      end: `${getDate()} 03:20:00`,
      title: 'Meeting E',
      summary: 'Summary for meeting E',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate()} 04:30:00`,
      end: `${getDate()} 05:30:00`,
      title: 'Meeting F',
      summary: 'Summary for meeting F',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate(1)} 00:30:00`,
      end: `${getDate(1)} 01:30:00`,
      title: 'Visit Grand Mother',
      summary: 'Visit Grand Mother and bring some fruits.',
      color: 'lightblue',
    },
    {
      start: `${getDate(1)} 02:30:00`,
      end: `${getDate(1)} 03:20:00`,
      title: 'Meeting with Prof. Behjet Zuhaira',
      summary: 'Meeting with Prof. Behjet at 130 in her office.',
      color: EVENT_COLOR,
    },
    {
      start: `${getDate(1)} 04:10:00`,
      end: `${getDate(1)} 04:40:00`,
      title: 'Tea Time with Dr. Hasan',
      summary: 'Tea Time with Dr. Hasan, Talk about Project',
    },
    {
      start: `${getDate(1)} 01:05:00`,
      end: `${getDate(1)} 01:35:00`,
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: `${getDate(1)} 14:30:00`,
      end: `${getDate(1)} 16:30:00`,
      title: 'Meeting Some Friends in ARMED',
      summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
      color: 'pink',
    },
    {
      start: `${getDate(2)} 01:40:00`,
      end: `${getDate(2)} 02:25:00`,
      title: 'Meet Sir Khurram Iqbal',
      summary: 'Computer Science Dept. Comsats Islamabad',
      color: 'orange',
    },
    {
      start: `${getDate(2)} 04:10:00`,
      end: `${getDate(2)} 04:40:00`,
      title: 'Tea Time with Colleagues',
      summary: 'WeRplay',
    },
    {
      start: `${getDate(2)} 00:45:00`,
      end: `${getDate(2)} 01:45:00`,
      title: 'Lets Play Apex Legends',
      summary: 'with Boys at Work',
    },
    {
      start: `${getDate(2)} 11:30:00`,
      end: `${getDate(2)} 12:30:00`,
      title: 'Dr. Mariana Joseph',
      summary: '3412 Piedmont Rd NE, GA 3032',
    },
    {
      start: `${getDate(4)} 12:10:00`,
      end: `${getDate(4)} 13:45:00`,
      title: 'Merge Request to React Native Calendars',
      summary: 'Merge Timeline Calendar to React Native Calendars',
    },
  ];   

const INITIAL_TIME = { hour: 9, minutes: 0 };
const EVENTS: TimelineEventProps[] = timelineEvents;

export default class TimelineCalendarScreen extends Component<{}, State> {
  state: State = {
    currentDate: getDate(),
    events: EVENTS,
    eventsByDate: groupBy(EVENTS, (e) =>
      CalendarUtils.getCalendarDateString(e.start)
    ) as { [key: string]: TimelineEventProps[] },
    newEventTitle: '',
    newEventSummary: '',
    isModalVisible: false,
    selectedEventColor: EVENT_COLOR,
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
    startTime: new Date(),
    endTime: new Date(),
  };

  marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
  };

  onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    this.setState({ currentDate: date });
  };

  onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  handleAddEventButton = () => {
    this.setState({ isModalVisible: true });
  };

  handleCreateEvent = () => {
    const { eventsByDate, currentDate, newEventTitle, newEventSummary } = this.state;
    const newEvent: TimelineEventProps = {
      id: 'draft',
      start: `${currentDate} 12:00:00`,
      end: `${currentDate} 13:00:00`,
      title: newEventTitle || 'New Event',
      summary: newEventSummary || '',
      color: this.state.selectedEventColor,
    };

    if (eventsByDate[currentDate]) {
      eventsByDate[currentDate] = [...eventsByDate[currentDate], newEvent];
      this.setState({ eventsByDate });
    } else {
      eventsByDate[currentDate] = [newEvent];
      this.setState({ eventsByDate: { ...eventsByDate } });
    }

    this.setState({
      isModalVisible: false,
      newEventTitle: '',
      newEventSummary: '',
    });
  };

  handleToggleStartTimePicker = () => {
    this.setState((prevState) => ({
      isStartTimePickerVisible: !prevState.isStartTimePickerVisible,
    }));
  };

  handleToggleEndTimePicker = () => {
    this.setState((prevState) => ({
      isEndTimePickerVisible: !prevState.isEndTimePickerVisible,
    }));
  };

  handleStartTimeConfirm = (selectedTime: Date) => {
    this.setState({ startTime: selectedTime, isStartTimePickerVisible: false });
  };

  handleEndTimeConfirm = (selectedTime: Date) => {
    this.setState({ endTime: selectedTime, isEndTimePickerVisible: false });
  };



  private timelineProps: Partial<TimelineProps> = {
    unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }],
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
    } = this.state;

    return (
      <CalendarProvider
        date={currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}>
        <View style={styles.addButtonContainer}>
          <Button
            title="Add Event"
            color="white"
            onPress={() => this.setState({ isModalVisible: true })}
          />
        </View>
        <ExpandableCalendar
          firstDay={1}
          hideArrows
          markedDates={this.marked}
        />
        <TimelineList
          events={eventsByDate}
          timelineProps={this.timelineProps}
          showNowIndicator
          scrollToFirst
          initialTime={INITIAL_TIME}
        />
        <Modal
          testID={'modal'}
          isVisible={isModalVisible}
          backdropColor="#B4B3DB"
          backdropOpacity={0.8}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={styles.modal}>
          
          <View style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                value={newEventTitle}
                onChangeText={(text) => this.setState({ newEventTitle: text })}
                style={styles.inputEvent}
              />
              <Text style={styles.label}>Summary</Text>
              <TextInput
                value={newEventSummary}
                onChangeText={(text) => this.setState({ newEventSummary: text })}
                style={styles.inputSummary}
              />
            
              <Text style={styles.label}>Color</Text>
<ColorPicker
  value={this.state.selectedEventColor}
  sliderThickness={20}
  thumbSize={20}
  thumbShape='circle'
  onChange={(color) => this.setState({ selectedEventColor: color.hex })}
>
  <Swatches style={styles.swatchesContainer} swatchStyle={styles.swatchStyle} />

  
</ColorPicker>
            <TouchableOpacity
              style={styles.createButton}
              onPress={this.handleCreateEvent}>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => this.setState({ isModalVisible: false })}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>
      </CalendarProvider>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  addButtonContainer: {
    marginVertical: 8,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  modalContent: {
    flex: 1, justifyContent: 'center', alignItems: 'center' 
  },
  formGroup: {
    width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  inputEvent: {
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  inputSummary: {
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    height: 100
  },
  createButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  sliderTitle: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 4,
  },
  
  sliderStyle: {
    borderRadius: 20,
    marginBottom: 20,

    shadowColor: '#000',
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
    borderColor: '#bebdbe',
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#bebdbe',
    alignItems: 'center',
    flexWrap: 'nowrap',
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