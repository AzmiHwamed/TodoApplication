import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const ListItem = ({ priority , title , description ,id }: { priority: string,title: string,description: string ,id:Number }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Card style={{ margin: 10 , height:100 , justifyContent:"center" }} onPress={() => navigation.navigate('View', { id: id })}>
      <Card.Title
        title={title}
        subtitle={description}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="alert-decagram"
            color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}
            style={{ backgroundColor: 'white' }}
          />
        )}
      />
    </Card>
  );
};

export default ListItem;
