import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import firebase from 'firebase';
import db from '../config';

export default class CatogoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSurveys: [],
      userId: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      age: '',
      name: '',
      gender: '',
      docId: '',
    };
  }
  getUserDetails = () => {
    db.collection('users')
      .where('email', '==', this.state.email)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          this.setState({
            name: doc.data().name,
            gender: doc.data().gender,
            age: doc.data().age,
            docId: doc.id,
          });
        });
      });
  };

  getSurveys = () => {
    db.collection('surveys')
      .where('responsers', 'array-contains', this.state.email)
      .onSnapshot((snapshot) => {
        allS = [];
        snapshot.docs.map((doc) => {
          var survey = doc.data();
          allS.push(survey);
        });
        this.setState({ allSurveys: allS });
      });
  };
  componentDidMount() {
    this.getUserDetails();
    this.getSurveys();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flatlistContainer}
      >
      <Image
        style={{
          width: 35,
          height: 35,
          borderWidth: 1,
          borderColor: '#eee',
          alignSelf: 'center',
          marginLeft: 5,
        }}
        source={{ uri: item.brandImage }}
      />
      <View style={{ marginLeft: 10, padding: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5,
          }}>
          <Octicons name="feed-tag" size={14} color="#0059D4" />
          <Text style={[styles.titleText, { fontSize: 16, fontWeight: '700' }]}>
            {item.brandName.toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 5,
            }}>
            <MaterialIcons name="title" size={14} />
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 5,
              backgroundColor: '#0059D4aa',
              padding: 5,
              borderRadius: 5,
            }}>
            <MaterialIcons name="category" size={14} />
            <Text style={[styles.titleText, { color: 'white' }]}>
              {item.category}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'black',
          padding: 5,
          alignSelf: 'center',
        }}>
        <Text style={{ textAlign: 'center' }}>Coins</Text>
        <Text
          style={{ textAlign: 'center', fontWeight: '500', color: '#0059D4' }}>
          50
        </Text>
      </View>
    </TouchableOpacity>
  );
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        <LinearGradient
          colors={['#0059D4', '#2B96D3']}
          style={{
            width: '100%',
            paddingTop: 25,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              padding: 5,
              marginLeft: 10,
              fontSize: 18,
              fontWeight: '500',
              color: 'white',
            }}>
            Settings
          </Text>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 0.5,
              borderRadius: 5,
              margin: 10,
              padding: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                try {
                  var userInfo = {
                    name: this.state.name,
                    age: this.state.age,
                    gender: this.state.gender,
                    docId: this.state.docId,
                  };
                  this.props.navigation.navigate('ProfileScreen', {
                    details: userInfo,
                  });
                } catch (e) {
                  console.log(e);
                }
              }}
              style={{
                width: 50,
                height: 50,
                alignSelf: 'flex-end',
              }}>
              <FontAwesome5 color="#fff" size={16} name="user-edit" />
            </TouchableOpacity>

            <Text
              style={{
                padding: 5,
                marginLeft: 10,
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
              }}>
              Hello {this.state.name} !
            </Text>
            <Text
              style={{
                padding: 5,
                marginLeft: 10,
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
              }}>
              {this.state.email}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                margin: 10,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  padding: 5,
                  marginLeft: 10,
                  fontSize: 16,
                  color: 'white',
                }}>
                Age: {this.state.age}
              </Text>
              <Text
                style={{
                  padding: 5,
                  marginLeft: 10,
                  fontSize: 16,
                  color: 'white',
                }}>
                Gender: {this.state.gender}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                margin: 5,
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  padding: 5,
                  marginLeft: 10,
                  fontSize: 16,
                  color: 'white',
                }}>
                Total Coins earned: {this.state.allSurveys.length * 50}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0059D4',
                  padding: 5,
                  marginLeft: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  alert('Feature coming soon!!');
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  Redeem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              padding: 5,
              marginLeft: 10,
              fontSize: 16,
              color: '#0059D4',
            }}>
            Survey History
          </Text>
          {this.state.allSurveys.length !== 0 ? (
            <FlatList
              data={this.state.allSurveys}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          ) : (
            <Image
              source={require('../assets/nolist.png')}
              style={{ width: '50%', height: 200, alignSelf: 'center' }}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 15,
  },
  flatlistContainer: {
    //borderBottomWidth: 1,
    borderBottomWidth: 1,
    padding: 5,
    margin: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#0059D4AA',
  },
});
