import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';


interface AgendaEntry {  // this is needed for the agenda compenet to work but im still in the process of undertand all thiss shit im sorry
  name: string;
  height: number;
  day: string;
}

interface AgendaSchedule {
  [key: string]: AgendaEntry[];
}

const CalendarScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [taskName, setTaskName] = useState<string>('');
  const [tasks, setTasks] = useState<AgendaSchedule>({});

  const onDayPress = (day: { dateString: string }) => {
  setSelectedDate(day.dateString);
  setModalVisible(true);
  };

  const handleAddTask = () => {
  setTasks((prevTasks) => ({
  ...prevTasks,
  [selectedDate]: [...(prevTasks[selectedDate] || []), { name: taskName, height: 0, day: selectedDate }],
  }));
  setTaskName('');
  setModalVisible(false);
  };

  const renderItem = (item: { [key: string]: AgendaEntry[] }) => {
  const entries = item[selectedDate] || [];
  return (
  <View>
    {entries.map((entry, index) => (
    <TouchableOpacity key={index}>
     <Text>{entry.name}</Text>
    {/* you can add bullshit heer */}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderEmptyDate = () => (
  <View>
  <Text>No tasks for this day</Text>
  </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Agenda
    items={tasks}
    renderEmptyDate={renderEmptyDate}
    onDayPress={onDayPress}
      />
      <Modal visible={isModalVisible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
      <Text>{`Add Task on ${selectedDate}`}</Text>
      <TextInput
       placeholder="Task Name"
      value={taskName}
       onChangeText={(text) => setTaskName(text)}
       style={{ borderWidth: 1, width: 200, marginTop: 10, padding: 5 }}
       />
     <Button title="Add Event" onPress={handleAddTask} />
      <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default CalendarScreen;
