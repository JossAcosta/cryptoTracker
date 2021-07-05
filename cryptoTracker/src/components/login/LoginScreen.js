import React, { Component } from 'react';
// import { StackActions, CommonActions } from '@react-navigation/native';
import { View, Text, StyleSheet, Alert, TextInput, Button, TouchableOpacity } from 'react-native';
import Colors from '../../res/colors';


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          username: '',
          password: '',
        };
      }
      
      onLogin() {
        const { username, password } = this.state;
        this.props.navigation.navigate('MyTabs', { screen: 'Coins' });
      }
    
      render() {
        return (
          <View style={styles.container}>
            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              placeholder={'Username'}
              placeholderTextColor={Colors.white}
              style={styles.input}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Password'}
              placeholderTextColor={Colors.white}
              secureTextEntry={true}
              style={styles.input}
            />
            
            <TouchableOpacity
                style={styles.button}
                onPress={this.onLogin.bind(this)}
                >
                <Text style={styles.btnText}>Sign In
                    </Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blackPearl,
      },
      input: {
        width: 300,
        height: 54,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius:50,
        marginBottom: 20,
        fontSize: 20,
        color: Colors.white,
      },
      button: {
        width: 300,
        marginTop: 5,
        backgroundColor: Colors.white,
        padding: 15,
        borderRadius: 50,
      },
      btnText: {
        color: Colors.charade,
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center",
      },
    });
    
export default LoginScreen;