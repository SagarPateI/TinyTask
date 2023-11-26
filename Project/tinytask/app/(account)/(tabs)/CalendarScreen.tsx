import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TableView, Section, Cell } from 'react-native-tableview-simple';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<{
    startTime: string;
    endTime: string;
    eventName: string;
  }>({
    startTime: '',
    endTime: '',
    eventName: '',
  });
  const [timeBlocks, setTimeBlocks] = useState<Array<{ startTime: string; endTime: string; eventName: string }>>([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState<boolean>(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState<boolean>(false);

  const toggleTimePicker = (isStartTime: boolean = true) => {
    if (isStartTime) {
      setStartTimePickerVisible(!isStartTimePickerVisible);
    } else {
      setEndTimePickerVisible(!isEndTimePickerVisible);
    }
  };

  const handleTimeConfirm = (date: Date, isStartTime: boolean) => {
    const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
    if (isStartTime) {
      setEventDetails((prevDetails) => ({ ...prevDetails, startTime: formattedTime }));
    } else {
      setEventDetails((prevDetails) => ({ ...prevDetails, endTime: formattedTime }));
    }
    toggleTimePicker();
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    toggleModal();
  };

  const addEvent = () => {
    if (eventDetails.startTime && eventDetails.endTime && eventDetails.eventName) {
      setTimeBlocks([
        ...timeBlocks,
        {
          startTime: eventDetails.startTime,
          endTime: eventDetails.endTime,
          eventName: eventDetails.eventName,
        },
      ]);
      setEventDetails({ startTime: '', endTime: '', eventName: '' });
      toggleModal();
    }
  };

  const removeEvent = (index: number) => {
    const updatedTimeBlocks = [...timeBlocks];
    updatedTimeBlocks.splice(index, 1);
    setTimeBlocks(updatedTimeBlocks);
  };

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDayPress} />

      {selectedDate && (
        <View style={styles.scheduleContainer}>
          <Text style={styles.selectedDate}>{selectedDate}</Text>

          <TableView>
            <Section>
              {timeBlocks.map((block, index) => (
                <Cell
                  key={index}
                  cellStyle="Subtitle"
                  title={`${block.startTime} - ${block.endTime}`}
                  detail={block.eventName}
                  accessory="DisclosureIndicator"
                  onPress={() => removeEvent(index)}
                />
              ))}
            </Section>
          </TableView>
        </View>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text>Add Event</Text>

          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleTimePicker(true)}>
            <Text>{eventDetails.startTime || 'Select Start Time'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleTimePicker(false)}>
            <Text>{eventDetails.endTime || 'Select End Time'}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="time"
            onConfirm={(date: Date) => handleTimeConfirm(date, true)}
            onCancel={() => toggleTimePicker(true)}
          />
          <DateTimePickerModal
            isVisible={isEndTimePickerVisible}
            mode="time"
            onConfirm={(date: Date) => handleTimeConfirm(date, false)}
            onCancel={() => toggleTimePicker(false)}
          />

          <TextInput
            placeholder="Event Name"
            value={eventDetails.eventName}
            onChangeText={(text) => setEventDetails((prevDetails) => ({ ...prevDetails, eventName: text }))}
          />

          <TouchableOpacity onPress={addEvent}>
            <Text>Add Event</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  scheduleContainer: {
    marginTop: 16,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default App;
