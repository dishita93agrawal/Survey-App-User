import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaProvider,
  FlatList,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

const category = [
  {
    id: '01',
    name: 'Electronics',
    image: <MaterialIcons name="tv" size={27} color="black" margin={30} />,
  },
  {
    id: '02',
    name: 'Footwear',
    image: <MaterialCommunityIcons name="cricket" size={28} color="black" />,
  },
  {
    id: '03',
    name: 'Fashion',
    image: <MaterialCommunityIcons name="gold" size={28} color="black" />,
  },
  {
    id: '04',
    name: 'Toys',
    image: <AntDesign name="car" size={25} color="black" />,
  },
  {
    id: '09',
    name: 'Tools',
    image: <Octicons name="tools" size={26} color="black" />,
  },
];
const category2 = [
  {
    id: '01',
    name: 'Electronics',
    backgroundColor: '#ff0000aa',
    image: <MaterialIcons name="tv" size={27} color="white" />,
  },
  {
    id: '02',
    name: 'Footwear',
    backgroundColor: '#00ff00aa',
    image: <MaterialCommunityIcons name="cricket" size={28} color="white" />,
  },
  {
    id: '03',
    name: 'Fashion',
    backgroundColor: '#0000ffaa',
    image: <MaterialCommunityIcons name="gold" size={28} color="white" />,
  },
  {
    id: '04',
    name: 'Toys',
    backgroundColor: '#ffaa00aa',
    image: <AntDesign name="car" size={25} color="white" />,
  },
  {
    id: '09',
    name: 'Tools',
    backgroundColor: '#ff00aaaa',
    image: <Octicons name="tools" size={26} color="white" />,
  },
];

export default class CatogoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allSurveys: [],
      userId: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      filteredSurveys: [],
      rawSurveys: [],
    };
  }

  filterSurvey = (selectedCategory) => {
    console.log(selectedCategory);
    console.log(this.state.rawSurveys);
    if (selectedCategory.length !== 0) {
      var filteredDoubts = [];
      this.state.rawSurveys.map((doubt) => {
        console.log(doubt);
        if (doubt.category == selectedCategory) {
          filteredDoubts.push(doubt);
        }
      });
      this.setState({ allSurveys: filteredDoubts });
    } else {
      this.setState({ allSurveys: this.state.rawSurveys });
    }
  };

  componentDidMount = () => {
    db.collection('surveys').onSnapshot((snapshot) => {
      var allS = [];
      snapshot.docs.map((doc) => {
        var survey = doc.data();
        survey['docId'] = doc.id;

        if (doc.data().responsers.includes(this.state.email)) {
          survey['allow'] = false;
        } else {
          survey['allow'] = true;
        }
        allS.push(survey);
      });
      this.setState({ allSurveys: allS, rawSurveys: allS });
    });
  };
  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.flatlistContainer}
      onPress={() => {
        if (item.allow) {
          this.props.navigation.navigate('SurveyDetails', { details: item });
        } else {
          alert(
            'You have already answered this survey. Please answer other surveys :)'
          );
        }
      }}>
      <Image
        style={{
          width: 45,
          height: 45,
          borderWidth: 1,
          borderColor: '#eee',
          alignSelf: 'center',
          marginLeft: 10,
        }}
        source={{ uri: item.brandImage }}
      />
      <View style={{ marginLeft: 20, padding: 5 }}>
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
              padding: 10,
              borderRadius: 5,
            }}>
            <MaterialIcons name="category" size={14} />
            <Text style={[styles.titleText, { color: 'white' }]}>
              {item.category}
            </Text>
          </View>
        </View>
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
            Welcome back!
          </Text>
          <Text
            style={{
              padding: 5,
              marginLeft: 10,
              fontSize: 16,
              color: 'white',
            }}>
            Select a category
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              width: '100%',
              paddingTop: 25,
              paddingBottom: 10,
            }}>
            {category.map((item) => {
              return (
                <View
                  style={{
                    marginHorizontal: 8,
                    padding: 5,
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.filterSurvey(item.name);
                    }}
                    style={{
                      width: 45,
                      height: 45,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ddd',
                    }}>
                    {item.image}
                  </TouchableOpacity>
                  <Text style={{ alignSelf: 'center', color: 'white' }}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </LinearGradient>
        <View style={{ flex: 1 }}>
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
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    borderColor: '#0059D4AA',
  },
});
