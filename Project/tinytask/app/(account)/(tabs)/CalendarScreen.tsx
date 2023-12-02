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

 
const INITIAL_TIME = { hour: 9, minutes: 0 };
 const today = new Date();
 export const getDate = (offset = 0) =>
   CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

 
   export default class TimelineCalendarScreen extends Component {
    state = {
      currentDate: getDate(),
      eventsByDate: {} as { [key: string]: TimelineEventProps[] }, 
    };
  
  marked = {
    [`${getDate(-1)}`]: { marked: true },
    [`${getDate()}`]: { marked: true },
    [`${getDate(1)}`]: { marked: true },
    [`${getDate(2)}`]: { marked: true },
    [`${getDate(4)}`]: { marked: true },
    [`${getDate(3)}`]: { marked: true },
  };

  async componentDidMount() {
    try {
      const response = await axios.get('https://grumpy-goose-96.loca.lt/events');
      const fetchedEvents = response.data;

      
      console.log('Fetched Events:', fetchedEvents);

      this.setState({
        eventsByDate: groupBy(fetchedEvents, (e) => CalendarUtils.getCalendarDateString(e.start)),
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
 
   createNewEvent: TimelineProps['onBackgroundLongPress'] = (timeString, timeObject) => {
     console.log('Long Press Event:', timeString, timeObject);
     const { eventsByDate } = this.state;
     const hourString = `${timeObject.hour.toString().padStart(2, '0')}`;
     const minutesString = `${timeObject.minutes.toString().padStart(2, '0')}`;
   
     const newEvent = {
       id: 'draft',
       start: `${timeObject.date} ${hourString}:${minutesString}:00`,
       end: `${timeObject.date} ${hourString}:${minutesString}:00`,
       title: 'New Event',
       color: 'white', 
     };
   
     if (timeObject.date) {
       if (eventsByDate[timeObject.date]) {
         eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date], newEvent];
         this.setState({ eventsByDate });
       } else {
         eventsByDate[timeObject.date] = [newEvent];
         this.setState({ eventsByDate: { ...eventsByDate } });
       }
     }
   };
 
   approveNewEvent: TimelineProps['onBackgroundLongPressOut'] = (_timeString, timeObject) => {
     console.log('Long Press Out:', timeObject);
     const { eventsByDate } = this.state;
   
     Alert.prompt('New Event', 'Enter event title', [
       {
         text: 'Cancel',
         onPress: () => {
           if (timeObject.date) {
             eventsByDate[timeObject.date] = filter(
               eventsByDate[timeObject.date],
               (e) => e.id !== 'draft'
             );
   
             this.setState({
               eventsByDate,
             });
           }
         },
       },
       {
         text: 'Create',
         onPress: (eventTitle) => {
           if (timeObject.date) {
             const draftEvent = find(eventsByDate[timeObject.date], { id: 'draft' });
             if (draftEvent) {
               draftEvent.id = undefined;
               draftEvent.title = eventTitle || 'New Event'; // Use the provided title or a default
               draftEvent.color = 'lightgreen'; // Customize the color
               eventsByDate[timeObject.date] = [...eventsByDate[timeObject.date]];
   
               this.setState({
                 eventsByDate,
               });
             }
           }
         },
       },
     ]);
   };
 
   private timelineProps: Partial<TimelineProps> = {
     format24h: false,
     unavailableHours: [{ start: 0, end: 6 }, { start: 22, end: 24 }],
     onBackgroundLongPress: this.createNewEvent,
     onBackgroundLongPressOut: this.approveNewEvent,
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