import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/slices/AuthSlice';
import { AppDispatch, RootState } from '../../../Redux/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation'; 
import authReducer from '../../../Redux/slices/AuthSlice';
import { fetchTasks } from '../../../Redux/slices/TaskSlice';




const Login = () => {
  const [unvisible, setUnvisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>(); 
  const { loading, error } = useSelector((state: RootState) => state.auth || {});

  const handleLogin = async () => {
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.access_tocken) {
        navigation.navigate("Feed"); 
      }

    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Image source={require('../../../assets/login.png')} style={styles.image} />
      <Text style={styles.title}>Welcome Back! Please fill out the form to Log In</Text>

      <TextInput
        style={styles.input}
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        right={<TextInput.Icon icon="account" />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        mode="outlined"
        secureTextEntry={unvisible}
        value={password}
        onChangeText={setPassword}
        right={<TextInput.Icon icon={unvisible ? 'eye-off' : 'eye'} onPress={() => setUnvisible(!unvisible)} />}
      />

      {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

      <Button
        style={styles.button}
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleLogin}
      >
        Login
      </Button>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>You don't have an account?{' '}</Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={{ color: '#6200EE', fontWeight: 'bold' }}>Sign up now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
