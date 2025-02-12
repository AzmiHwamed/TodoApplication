import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/store';
import { deleteTask } from '../../../Redux/slices/TaskSlice';
import { Card, Button, Text, ActivityIndicator } from 'react-native-paper';
import styles from './styles';

const TaskView = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { id } = route.params as { id: number };

  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === id);
    setTask(foundTask);
  }, [tasks, id]);

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await dispatch(deleteTask(id));
          navigation.goBack(); 
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="Task Details" />
        <Card.Content>
          {loading ? (
            <ActivityIndicator animating size="large" color="blue" />
          ) : error ? (
            <Text style={{ color: 'red' }}>Error: {error}</Text>
          ) : task ? (
            <>
              <Text variant="titleMedium" style={styles.label}>Title:</Text>
              <Text variant="bodyLarge" style={styles.value}>{task.title}</Text>

              <Text variant="titleMedium" style={styles.label}>Description:</Text>
              <Text variant="bodyLarge" style={styles.value}>{task.description}</Text>

              <Text variant="titleMedium" style={styles.label}>Priority:</Text>
              <Text variant="bodyLarge" style={styles.value}>{task.priority}</Text>
            </>
          ) : (
            <Text>No task found.</Text>
          )}
        </Card.Content>

        {/* Buttons */}
        <Card.Actions style={styles.actions}>
          <Button mode="contained" icon="pencil" onPress={() => navigation.navigate('Modify', { id })}>
            Modify
          </Button>
          <Button mode="contained" icon="delete" buttonColor="red" textColor="white" onPress={handleDelete}>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default TaskView;
