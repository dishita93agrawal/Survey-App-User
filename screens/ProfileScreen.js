import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import { Icon, Avatar } from 'react-native-elements';
import db from '../config';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: this.props.route.params.details.name,
      age: this.props.route.params.details.age,
      gender: this.props.route.params.details.gender,
      image: 'http://cdn.onlinewebfonts.com/svg/img_568656.png',
      docId: this.props.route.params.details.docId,
    };
  }
  logoutUser = () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.props.navigation.replace('Loginscreen');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
      Alert.alert('An error occured. Please try again later.');
    }
  };

  updateUser = async () => {
    db.collection('users').doc(this.state.docId).update({
      name: this.state.name,
      age: this.state.age,
      gender: this.state.gender,
    });
    alert('Profile Updated');
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#0059D4',
        }}>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              backgroundColor: '#0059D4',
              height: 200,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <View style={{ padding: 10, flexDirection: 'row', marginTop: 20 }}>
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>

              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginLeft: 50,
                }}>
                Profile
              </Text>
            </View>

            <Avatar
              rounded
              size={'large'}
              source={{ uri: this.state.image }}
              containerStyle={{ position: 'absolute', top: 150, left: '40%' }}
            />
          </View>
          <Text
            style={{ textAlign: 'center', color: '#0059D4', marginTop: 50 }}>
            {this.state.userId}
          </Text>
          <Text style={{ marginLeft: 10, color: '#0059D4', marginTop: 10 }}>
            Name:
          </Text>
          <TextInput
            style={{
              padding: 5,
              color: '#0059D4',
              borderBottomWidth: 1,
              marginHorizontal: 10,
            }}
            onChangeText={(name) => {
              this.setState({ name: name });
            }}
            value={this.state.name}
            placeholder={'Enter your name'}
          />
          <Text style={{ marginLeft: 10, color: '#0059D4', marginTop: 10 }}>
            Age:
          </Text>
          <TextInput
            style={{
              padding: 5,
              color: '#0059D4',
              borderBottomWidth: 1,
              marginHorizontal: 10,
            }}
            onChangeText={(age) => {
              this.setState({ age: age });
            }}
            value={this.state.age}
            placeholder={'Enter your age'}
          />
          <Text style={{ marginLeft: 10, color: '#0059D4', marginTop: 10 }}>
            Gender:
          </Text>
          <TextInput
            style={{
              padding: 5,
              color: '#0059D4',
              borderBottomWidth: 1,
              marginHorizontal: 10,
            }}
            onChangeText={(gender) => {
              this.setState({ gender: gender });
            }}
            value={this.state.gender}
            placeholder={'Enter your gender'}
          />

          <TouchableOpacity
            onPress={() => {
              this.updateUser();
            }}
            style={{
              flexDirection: 'row',
              padding: 5,
              alignSelf: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#0059D4',
              marginTop: 10,
            }}>
            <Ionicons
              name="checkmark-done"
              size={27}
              color="#0059D4"></Ionicons>
            <Text style={{ color: '#0059D4', fontSize: 16 }}>Update</Text>
          </TouchableOpacity>

          <View style={styles.ss3}>
            <Ionicons name="log-out" size={27} color="#0059D4"></Ionicons>
            <TouchableOpacity
              onPress={() => {
                this.logoutUser();
              }}
              style={styles.sss}>
              <Text style={{ color: '#0059D4', fontSize: 16 }}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ss3: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  sss: {
    height: 50,
    width: '100%',
    borderBottomWidth: 1.5,
    justifyContent: 'center',
    borderBottomColor: '#0059D4',
    marginHorizontal: 10,
  },
});
