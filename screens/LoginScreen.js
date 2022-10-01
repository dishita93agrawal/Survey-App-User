import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
//import db from '../config';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
    };
  }
  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorcode = error.code;
        var errorM = error.message;
        alert(errorM);
        console.log(errorM);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require('../assets/blueBackground.png')}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <ScrollView>
              <Image
                source={require('../assets/logo2.png')}
                style={styles.logoImage}
              />
              <Text style={styles.weltext}>Welcome Back!</Text>
              <Text style={styles.text}>We are glad to see you back!!</Text>
              <Text style={styles.text}>Sign In!!</Text>
              <View style={styles.textContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder=" abc@gmail.com"
                    placeholderTextColor="grey"
                    keyboardType="email-address"
                    onChangeText={(email) => {
                      this.setState({ email });
                    }}
                    value={this.state.email.trim()}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TextInput
                      style={styles.input}
                      placeholder=" abcd@0987"
                      placeholderTextColor="grey"
                      secureTextEntry={
                        this.state.showPassword === false ? true : false
                      }
                      onChangeText={(password) => {
                        this.setState({ password });
                      }}
                      value={this.state.password.trim()}
                    />
                    <Ionicons
                      name={
                        this.state.showPassword
                          ? 'ios-eye-sharp'
                          : 'ios-eye-off-sharp'
                      }
                      size={24}
                      color="black"
                      onPress={() => {
                        if (this.state.showPassword === false) {
                          this.setState({ showPassword: true });
                        } else if (this.state.showPassword === true) {
                          this.setState({ showPassword: false });
                        }
                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPasswordScreen')
                  }>
                  <Text style={styles.signUpTxt}>
                    Having Trouble Signing in? Reset Password
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signin}
                  onPress={() => {
                    this.login(this.state.email, this.state.password);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      padding: 8,
                      fontSize: 16,
                    }}>
                    Sign In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SignUpScreen')
                  }>
                  <Text style={styles.createAcc}>
                    Don't have an account yet? Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weltext: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    margin: 20,
    marginBottom: '30%',
  },
  signUpTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    color: 'gray',
  },
  signin: {
    backgroundColor: '#0059D4',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
  },
  createAcc: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: 'red',
  },
  inputContainer: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 15,
    alignSelf: 'center',
    width: '90%',
    height: 70,
  },

  input: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'left',
    borderBottomColor: 'black',
  },
  label: {
    padding: 5,
    fontSize: 18,
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
    color: 'white',
  },
  logoImage: {
    alignSelf: 'center',
    height: 120,
    width: 120,
    resizeMode: 'cover',
    marginTop: '20%',
    borderRadius: 100,
  },
});
