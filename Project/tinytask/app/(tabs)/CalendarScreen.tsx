import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { Agenda } from "react-native-calendars";

// this is needed for the agenda compenet to work but im still in the process of undertand all this - Alexis
interface AgendaEntry {
  name: string;
  height: number;
  day: string;
}

interface AgendaSchedule {
  [key: string]: AgendaEntry[];
}

const CalendarScreen: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<AgendaSchedule>({});

  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const handleAddTask = () => {
    if (!taskName.trim()) {
      // Perform validation for empty task name
      alert("Please enter a valid task name");
      return;
    }

    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedDate]: [
        ...(prevTasks[selectedDate] || []),
        { name: taskName, height: 0, day: selectedDate },
      ],
    }));
    setTaskName("");
    setModalVisible(false);
  };

  const renderItem = (
    item: { [key: string]: AgendaEntry[] },
    isFirst: boolean
  ) => {
    const entries = item[selectedDate] || [];
    return (
      <View style={styles.taskContainer}>
        {entries.map((entry, index) => (
          <TouchableOpacity key={index} style={styles.taskItem}>
            <Text>{entry.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderEmptyDate = () => (
    <View style={styles.emptyDateContainer}>
      <Text>No tasks for this day</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={tasks}
        renderEmptyDate={renderEmptyDate}
        onDayPress={onDayPress}
        renderItem={renderItem as any}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={styles.modalTitle}
            >{`Add Task on ${selectedDate}`}</Text>
            <TextInput
              placeholder="Task Name"
              value={taskName}
              onChangeText={(text) => setTaskName(text)}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Event" onPress={handleAddTask} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  taskContainer: {
    flex: 1,
    padding: 20,
    
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  emptyDateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    marginTop: 60,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
   
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CalendarScreen;
