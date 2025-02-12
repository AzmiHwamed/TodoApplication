import { View, Text, StatusBar, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FAB } from 'react-native-paper';
import styles from './styles';
import ListItem from '../../../Components/Tasks/ListItem';
import { fetchTasks } from '../../../Redux/slices/TaskSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store';

const Feed = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks());
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      {loading && !refreshing ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={tasks}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('View', { id: item.id })}>
              <ListItem priority={item.priority} title={item.title} description={item.description} id={item.id} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
};

export default Feed;
