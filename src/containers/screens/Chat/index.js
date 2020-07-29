import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {baseColor} from '../../../styles/baseColor';
import {baseFont} from '../../../styles/baseFont';
import {SearchBar, Image} from 'react-native-elements';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {API_URL} from '@env';

import {connect} from 'react-redux';
import {getChats} from '../../../config/redux/actions/chat';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      chats: [],
    };
  }

  getChats = async () => {
    const token = this.props.auth.data.token;

    await this.props
      .getChats(token)
      .then((response) => {
        console.log(response);
        this.setState({
          chats: this.props.chat.data,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    this.getChats();
  }

  handleSearch = (search) => {
    this.setState({search});
  };

  render() {
    console.log(this.props.chat);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContent}>
          <SearchBar
            placeholder="Search here..."
            onChangeText={this.handleSearch}
            value={this.state.search}
            containerStyle={{
              backgroundColor: baseColor.dark,
              borderBottomColor: baseColor.dark,
              borderTopColor: baseColor.dark,
            }}
            inputContainerStyle={{
              backgroundColor: baseColor.darkGrey,
              borderRadius: 50,
            }}
            placeholderTextColor={baseColor.grey}
            inputStyle={{color: baseColor.grey}}
          />
          <Text style={styles.heading}>Messages</Text>
          <Text style={styles.notifHeading}>You have 2 new messages</Text>
        </View>
        <ScrollView style={styles.middleContent}>
          {this.state.chats.map((chat) => {
            return (
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate('PersonalChat', {id: chat.id})
                }
                key={chat.id}
                style={styles.friendsChat}>
                <Image
                  source={{uri: `${API_URL}/images/${chat.sender_image}`}}
                  style={styles.friendPics}
                />
                <View style={styles.friendsMessage}>
                  <Text style={styles.friendsName}>{chat.sender_name}</Text>
                  <Text style={styles.chatContent}>
                    {chat.content.length < 31
                      ? chat.content
                      : `${chat.content.substr(0, 31)}...`}
                  </Text>
                </View>
                <Text style={styles.chatDate}>{chat.date}</Text>
              </TouchableNativeFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: baseColor.dark,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  heading: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: baseFont.roboto.black,
    color: baseColor.white,
  },
  notifHeading: {
    fontSize: 14,
    color: baseColor.grey,
    fontFamily: baseFont.roboto.regular,
    marginBottom: 20,
  },
  friendsChat: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: baseColor.grey,
    borderBottomWidth: 0.5,
    borderBottomColor: baseColor.grey,
  },
  friendPics: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  friendsMessage: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  friendsName: {
    color: baseColor.white,
    fontFamily: baseFont.roboto.bold,
    fontSize: 16,
    marginBottom: 2,
  },
  chatContent: {
    width: 238,
    fontSize: 14,
    color: baseColor.grey,
    fontFamily: baseFont.roboto.regular,
  },
  chatDate: {
    color: baseColor.grey,
    fontFamily: baseFont.roboto.bold,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

const mapDispatchToProps = {getChats};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
