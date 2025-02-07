import { View, Text, StatusBar, FlatList } from 'react-native';
import React from 'react';
import { Chip, FAB } from 'react-native-paper';
import styles from './styles';
import ListItem from '../../../Components/Tasks/ListItem';

const Feed = () => {
  return (
    <View>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Text style={styles.banner}>Welcome back mohsen</Text>
      <View style={styles.chips}>
        <Chip style={styles.chip} onPress={() => console.log('High Priority Selected')}>
          High
        </Chip>
        <Chip style={styles.chip} onPress={() => console.log('Medium Priority Selected')}>
          Medium
        </Chip>
        <Chip style={styles.chip} onPress={() => console.log('Low Priority Selected')}>
          Low
        </Chip>
      </View>
      <FlatList
        style={styles.list}
        data={[
          { key: 'high' },
          { key: 'medium' },
          { key: 'low' },
          { key: 'high' },
          { key: 'medium' },
          { key: 'low' },
          { key: 'high' },
          { key: 'medium' },
          { key: 'low' },
        ]}
        renderItem={({ item }) => <ListItem priority={item.key} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={() => console.log('Create Task')}></FAB>
    </View>
  );
};

export default Feed;
