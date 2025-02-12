import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store';
import { signup } from '../../../Redux/slices/AuthSlice';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pass, setPass] = useState(true);
  const [confirmpass, setConfirmpass] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSignUp = () => {
    if (!username || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    dispatch(signup({ email:username, password }))
      .unwrap()
      .then(() => {
        alert('Signup successful! Redirecting to login...');
        navigation.replace('Login');
      })
      .catch((err) => alert(err));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Image source={require('../../../assets/signup.png')} style={styles.image} />
      <Text style={styles.title}>Hey there, ready to manage your tasks? Sign up now</Text>

      <TextInput
        style={styles.input}
        label="Username"
        mode="outlined"
        value={username}
        onChangeText={setUsername}
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        secureTextEntry={pass}
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon icon={pass ? "eye-off" : "eye"} onPress={() => setPass(!pass)} />}
      />
      <TextInput
        style={styles.input}
        label="Confirm Password"
        mode="outlined"
        secureTextEntry={confirmpass}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        right={<TextInput.Icon icon={confirmpass ? "eye-off" : "eye"} onPress={() => setConfirmpass(!confirmpass)} />}
      />

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator animating={true} color="#6200EE" />
      ) : (
        <Button style={styles.button} mode="contained" onPress={handleSignUp}>
          Sign Up
        </Button>
      )}

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>Already have an account?{' '}</Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{ color: '#6200EE', fontWeight: 'bold' }}>Login now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
