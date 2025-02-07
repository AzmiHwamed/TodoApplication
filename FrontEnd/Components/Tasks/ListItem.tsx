import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, Card } from 'react-native-paper';

const ListItem = ({ priority }: { priority: string }) => {
  return (
    <Card style={{ margin: 10 , height:100 , justifyContent:"center" }}>
      <Card.Title
        title="New Task"
        subtitle={`${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority`}
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
