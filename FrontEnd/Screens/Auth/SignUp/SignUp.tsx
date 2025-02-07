import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, TextInput } from 'react-native-paper';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [pass, setPass] = React.useState(true);
  const [confirmpass, setConfirmpass] = React.useState(true);
  const navigation = useNavigation(); // Fixed variable name from 'navigator' to 'navigation'

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Image source={require('../../../assets/signup.png')} style={styles.image} />
      <Text style={styles.title}>Hey there, ready to manage your tasks? Sign up now</Text>

      <TextInput
        style={styles.input}
        label="Username"
        mode="outlined"
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        secureTextEntry={pass}
        right={<TextInput.Icon icon="eye" onPress={() => setPass(!pass)} />}
      />
      <TextInput
        style={styles.input}
        label="Confirm Password"
        mode="outlined"
        secureTextEntry={confirmpass}
        right={<TextInput.Icon icon="eye" onPress={() => setConfirmpass(!confirmpass)} />}
      />

      <Button style={styles.button} mode="contained" onPress={() => console.log('Pressed')}>
        Sign Up
      </Button>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>
          Already have an account?{' '}</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{ color: '#6200EE', fontWeight: 'bold' }}>Login now !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
