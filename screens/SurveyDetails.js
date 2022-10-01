import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';

import { Icon, Avatar } from 'react-native-elements';
export default class SurveyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.route.params.details.questions,
      questionNumber: 0,
      score: 0,
      selected: '',
      selections: [],
      userId: firebase.auth().currentUser.email,
      details: this.props.route.params.details,
      surveyId: this.props.route.params.details.surveyId,
      docId: this.props.route.params.details.docId,
      responsers: this.props.route.params.details.responsers,
    };
    console.log(this.props.route.params.details);
  }
  componentDidMount = () => {
    var questionNumber = this.props.route.params.questionNumber;
    var selections = this.props.route.params.selections;
    console.log(questionNumber);
    console.log(selections);
    if (questionNumber !== undefined && selections !== undefined) {
      this.setState({ questionNumber: questionNumber, selections: selections });
    }
  };

  submitResponse = () => {
    console.log(this.state.details);
    try {
      db.collection('responses').add({
        userId: this.state.userId,
        surveyId: this.state.surveyId,
        responses: this.state.selections,
        category: this.state.details.category,
        brandName: this.state.details.brandName,
        brandEmail: this.state.details.brandEmail,
        title: this.state.details.title,
        brandImage: this.state.details.brandImage,
        questions: this.state.details.questions,
      });
      var responsers = [...this.state.responsers, this.state.userId];
      db.collection('surveys')
        .doc(this.state.docId)
        .update({ responsers: responsers });

      this.props.navigation.push('Home');
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View
        style={{ flex:1, backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              paddingHorizontal:20,
              height: 80,
              backgroundColor: '#0059D4',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
             <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}></Icon>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft:20 }}>
              Survey
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginRight: 5,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            <Text
              style={{
                fontfamily: 'Times',
                fontSize: 18,
                color: '#0059D4',
                marginTop: 8
              }}>
              {this.state.questions[this.state.questionNumber].question} ?
            </Text>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  width: '70%',
                  height: 40,
                  alignSelf: 'center',
                  marginTop: 40,
                  borderRadius: 15,
                  padding: 10,
                  justifyContent: 'center',
                  backgroundColor:
                    this.state.selected ===
                    this.state.questions[this.state.questionNumber].option1
                      ? '#0059D4aa'
                      : 'rgba(255,255,255,0.5)',
                }}
                onPress={() => {
                  this.setState({
                    selected:
                      this.state.questions[this.state.questionNumber].option1,
                  });
                }}>
                <Text>
                  {this.state.questions[this.state.questionNumber].option1}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  width: '70%',
                  height: 40,
                  alignSelf: 'center',
                  marginTop: 40,
                  borderRadius: 15,
                  padding: 10,
                  backgroundColor:
                    this.state.selected ===
                    this.state.questions[this.state.questionNumber].option2
                      ? '#0059D4aa'
                      : 'rgba(255,255,255,0.5)',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.setState({
                    selected:
                      this.state.questions[this.state.questionNumber].option2,
                  });
                }}>
                <Text>
                  {this.state.questions[this.state.questionNumber].option2}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  width: '70%',
                  height: 40,
                  alignSelf: 'center',
                  marginTop: 30,
                  padding: 10,
                  borderRadius: 15,
                  backgroundColor:
                    this.state.selected ===
                    this.state.questions[this.state.questionNumber].option3
                      ? '#0059D4aa'
                      : 'rgba(658,255,255,0.5)',

                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.setState({
                    selected:
                      this.state.questions[this.state.questionNumber].option3,
                  });
                }}>
                <Text>
                  {this.state.questions[this.state.questionNumber].option3}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  width: '70%',
                  height: 40,
                  alignSelf: 'center',
                  marginTop: 40,
                  borderRadius: 15,
                  padding: 10,
                  backgroundColor:
                    this.state.selected ===
                    this.state.questions[this.state.questionNumber].option4
                      ? '#0059D4aa'
                      : 'rgba(255,255,255,0.5)',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  this.setState({
                    selected:
                      this.state.questions[this.state.questionNumber].option4,
                  });
                }}>
                <Text>
                  {this.state.questions[this.state.questionNumber].option4}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#0059D4',
                width: '40%',
                height: 45,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50,
                marginLeft: '60%',
                marginBottom: 20,
              }}
              onPress={() => {
                //calculate score
                if (this.state.selected !== '') {
                  console.log(this.state.questionNumber);
                  console.log(this.state.questions);
                  this.state.selections.push(this.state.selected);
                } else {
                  alert('Please select an option!');
                  return;
                }

                //navigate
                if (
                  this.state.questionNumber <
                  this.state.questions.length - 1
                ) {
                  this.props.navigation.push('SurveyDetails', {
                    questionNumber: this.state.questionNumber + 1,
                    details: this.state.details,
                    selections: this.state.selections,
                  });
                } else {
                  this.submitResponse();
                }
              }}>
              <Entypo name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  optionContainer: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
});