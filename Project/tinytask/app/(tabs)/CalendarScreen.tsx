import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';

import React, { Component } from 'react';
import { Alert, Button } from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';

interface State {
  currentDate: string;
  events: TimelineEventProps[];
  eventsByDate: { [key: string]: TimelineEventProps[] };
}

const EVENT_COLOR = '#e6add8';
const today = new Date();

export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

  export const timelineEvents: TimelineEventProps[] = [
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
    eventsByDate: groupBy(EVENTS, (e) => CalendarUtils.getCalendarDateString(e.start)) as {
      [key: string]: TimelineEventProps[];
    },
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
    const { eventsByDate, currentDate } = this.state;

    
    const newEvent: TimelineEventProps = {
      id: 'draft',
      start: `${currentDate} 12:00:00`, 
      end: `${currentDate} 13:00:00`,   
      title: 'New Event',
      color: 'white',
    };


    if (eventsByDate[currentDate]) {
      eventsByDate[currentDate] = [...eventsByDate[currentDate], newEvent];
      this.setState({ eventsByDate });
    } else {
      eventsByDate[currentDate] = [newEvent];
      this.setState({ eventsByDate: { ...eventsByDate } });
    }


    this.promptForEventTitle(newEvent);
  };

  promptForEventTitle = (draftEvent: TimelineEventProps) => {
    const { eventsByDate, currentDate } = this.state;
  
    Alert.prompt('New Event', 'Enter event title', [
      {
        text: 'Cancel',
        onPress: () => {
          
          eventsByDate[currentDate] = (eventsByDate[currentDate] || []).filter(
            (e) => e.id !== 'draft'
          );
  
          this.setState({
            eventsByDate,
          });
        },
      },
      {
        text: 'Next', 
        onPress: (eventTitle) => {
       
          this.promptForEventSummary(draftEvent, eventTitle);
        },
      },
    ]);
  };
  
  promptForEventSummary = (draftEvent: TimelineEventProps, eventTitle: string) => {
    const { eventsByDate, currentDate } = this.state;
  
    Alert.prompt('Event Summary', 'Enter event summary', [
      {
        text: 'Cancel',
        onPress: () => {
          // If the user cancels, remove the draft event
          eventsByDate[currentDate] = (eventsByDate[currentDate] || []).filter(
            (e) => e.id !== 'draft'
          );
  
          this.setState({
            eventsByDate,
          });
        },
      },
      {
        text: 'Create',
        onPress: (eventSummary) => {
          
          draftEvent.id = undefined;
          draftEvent.title = eventTitle || 'New Event'; 
          draftEvent.summary = eventSummary || ''; 
          draftEvent.color = 'lightgreen'; 
  
          eventsByDate[currentDate] = [...(eventsByDate[currentDate] || [])];
  
          this.setState({
            eventsByDate,
          });
        },
      },
    ]);
  };
  
  private timelineProps: Partial<TimelineProps> = {
    format24h: false,
    unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };

  render() {
    const { currentDate, eventsByDate } = this.state;

    return (
      <CalendarProvider
        date={currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <Button title="Add Event" onPress={this.handleAddEventButton} />
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
      </CalendarProvider>
    );
  }
}
