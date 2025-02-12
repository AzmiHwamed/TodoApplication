import { View, Text, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store';
import { updateTask } from '../../../Redux/slices/TaskSlice';
import styles from './styles';

const Modify = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = route.params as { id: number };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
    }
  }, [tasks, id]);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim() || !priority.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedTask = { id, updates: { title, description, priority } };

    try {
      await dispatch(updateTask(updatedTask)).unwrap();
      alert('Task updated successfully!');
      navigation.navigate('Feed');
    } catch (error) {
      alert('Failed to update task: ');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Text style={styles.title}>Modify Task</Text>

      {loading ? (
        <ActivityIndicator animating={true} size="large" color="blue" />
  ) : error ? (
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      ) : (
        <>
          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <TextInput
            label="Description"
            mode="outlined"
            multiline
            value={description}
            onChangeText={setDescription}
            style={styles.input}
          />
          <TextInput
            label="Priority"
            mode="outlined"
            value={priority}
            onChangeText={setPriority}
            style={styles.input}
          />
          <Button mode="contained" onPress={handleUpdate} style={styles.button}>
            Update Task
          </Button>
        </>
      )}
    </View>
  );
};

export default Modify;
