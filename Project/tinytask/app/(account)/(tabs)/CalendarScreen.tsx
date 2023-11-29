import groupBy from 'lodash/groupBy';
import filter from 'lodash/filter';
import find from 'lodash/find';

import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from 'react-native-calendars';

import axios from 'axios';

const today = new Date();
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

export default class TimelineCalendarScreen extends Component {
  state = {
    currentDate: getDate(),
    eventsByDate: {} as { [key: string]: TimelineEventProps[] },
    marked: {} as { [key: string]: { marked: boolean } },
  };

  async componentDidMount() {
    try {
      const response = await axios.get('https://tinytask.loca.lt/events');
      const fetchedEvents = response.data;

      console.log('Fetched Events:', fetchedEvents);

      const eventsByDate = groupBy(fetchedEvents, (e) =>
        CalendarUtils.getCalendarDateString(e.start)
      );
      const marked = this.generateMarkedObject(eventsByDate);

      this.setState({
        eventsByDate,
        marked,
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    this.setState({ currentDate: date });
  };

  onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  createNewEvent: TimelineProps['onBackgroundLongPressOut'] = async (timeString, timeObject) => {
    console.log('Long Press Event:', timeString, timeObject);
    const { eventsByDate } = this.state;
    const hourString = `${timeObject.hour.toString().padStart(2, '0')}`;
    const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;
  


        // Get the event title from the user input or use a default
        const eventTitle = await new Promise((resolve) => {
          Alert.prompt('New Event', 'Enter event title', [
            {
              text: 'Cancel',
              onPress: () => resolve('New Event'),
            },
            {
              text: 'Create',
              onPress: (title) => resolve(title || 'New Event'),
            },
          ]);
        });
      
        const newEvent = {
          start: `${timeObject.date} ${hourString}:${minutesString}:00`,
          end: `${timeObject.date} ${hourString}:${minutesString}:00`,
          title: eventTitle,
          color: 'white',
        };
      
        try {
          // Send a POST request to create a new event
          await axios.post('https://tinytask.loca.lt/events', newEvent);
      
          // Fetch all events again, including the newly created one
          const response = await axios.get('https://tinytask.loca.lt/events');
          const updatedEvents = response.data;
      
          console.log('Updated Events:', updatedEvents);
      
          // Process the updated events and update the state
          const updatedEventsByDate = groupBy(updatedEvents, (e) => CalendarUtils.getCalendarDateString(e.start));
          const marked = this.generateMarkedObject(updatedEventsByDate);
      
          this.setState({
            eventsByDate: updatedEventsByDate,
            marked,
          });
        } catch (error) {
          console.error('Error creating new event:', error);
        }
  };
  


  private timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onBackgroundLongPressOut: this.createNewEvent,
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    scrollToFirst: true
  };

  
  generateMarkedObject(eventsByDate: { [key: string]: TimelineEventProps[] }): {
    [key: string]: { marked: boolean };
  } {
    const marked: { [key: string]: { marked: boolean } } = {};

    
    for (const date in eventsByDate) {
      marked[date] = { marked: true };
    }

    return marked;
  }

  render() {
    const { currentDate, eventsByDate, marked } = this.state;

    return (
      <CalendarProvider
        date={currentDate}
        onDateChanged={this.onDateChanged}
        onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          firstDay={1}
          hideArrows
          markedDates={marked} 
          initialPosition={getDate()}
        />

        <TimelineList
          events={eventsByDate}
          timelineProps={this.timelineProps}
          showNowIndicator
          scrollToFirst
        />
      </CalendarProvider>
    );
  }
}