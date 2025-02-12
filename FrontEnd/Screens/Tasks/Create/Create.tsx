import { View, Text, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { TextInput, Button, RadioButton, Snackbar, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store';
import { createTask } from '../../../Redux/slices/TaskSlice';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Create = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errorMsg, setErrorMsg] = useState('');
  const [visible, setVisible] = useState(false);

  const { loading, error } = useSelector((state: RootState) => state.tasks);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      setErrorMsg('Please enter a task title.');
      setVisible(true);
      return;
    }

    try {
      const c = await dispatch(createTask({ title, description, priority })).unwrap();
      console.log(c);
      navigation.goBack(); 
    } catch (err) {
      
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Text style={styles.title}>Create a New Task</Text>

      {/* Task Title Input */}
      <TextInput
        style={styles.input}
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        label="Description"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Select Priority:</Text>
      <RadioButton.Group onValueChange={setPriority} value={priority}>
        <View style={styles.radioGroup}>
          <View style={styles.radioItem}>
            <RadioButton value="high" />
            <Text>High</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="medium" />
            <Text>Medium</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton value="low" />
            <Text>Low</Text>
          </View>
        </View>
      </RadioButton.Group>

      {loading ? (
        <ActivityIndicator animating={true} size="large" style={{ marginVertical: 10 }} />
      ) : (
        <Button mode="contained" style={styles.button} onPress={handleCreateTask}>
          Create Task
        </Button>
      )}

      <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={3000}>
      <Text>Error: {typeof error === 'object' ? JSON.stringify(error) : error}</Text>
            </Snackbar>
    </View>
  );
};

export default Create;
