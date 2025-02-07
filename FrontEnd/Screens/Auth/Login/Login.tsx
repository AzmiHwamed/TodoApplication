import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, ListIconProps } from 'react-native-paper'
import { FAB, TextInput } from 'react-native-paper'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
  const [unvisible, setUnvisible] = React.useState(true);
  const navigation = useNavigation();
  return (

    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <Image source={require('../../../assets/login.png')} style={styles.image} />
      <Text style={styles.title}>Welcome Back ! Please fill out the form to Log In</Text>
      <TextInput
        style={styles.input}
        label="Username"
        mode="outlined"
        right={<TextInput.Icon icon="account"
        />}
      />
      <TextInput
        style={styles.input}
        label="Password"
        mode='outlined'
        secureTextEntry={unvisible}
        right={<TextInput.Icon icon="eye"
          onPress={() => { setUnvisible(!unvisible) }} />}
      />
      <Button
        style={styles.button}
        mode="contained" onPress={() => console.log('Pressed')}>
        Login
      </Button>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text>
                You dont have an account?{' '}</Text>
              <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                <Text style={{ color: '#6200EE', fontWeight: 'bold' }}>SignUp now !</Text>
              </TouchableOpacity>
            </View>
    </View>
  )
}

export default Login