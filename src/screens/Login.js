import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Icon, Container, Content} from 'native-base';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

import {displayName} from '../../app.json';
import appColors from '../utils/appColors';
import rootStore from '../utils/rootStore';
import Toast from '../utils/toast';
import {onSignIn} from '../utils/user';
import NavigationService from '../utils/navigationService';

export default class Login extends Component {
  state = {
    loading: true,
    email: 'adh346@drexel.edu',
    password: 'password',
  };

  onAuthStateChanged = user => {
    rootStore.dispatch({type: 'UPDATE_USER', user});
  };

  componentDidMount = () => {
    auth().onAuthStateChanged(this.onAuthStateChanged);
    this.setState({loading: false});
  };

  signup = () => {
    this.login(true);
  };

  login = async (signUp = false) => {
    this.setState({loading: true});
    let {email, password} = this.state;
    if (!(email && password)) {
      Toast('Please enter a valid email and password.', appColors.failure);
    } else {
      try {
        if (signUp === true) {
          await auth().createUserWithEmailAndPassword(email, password);
        } else {
          await auth().signInWithEmailAndPassword(email, password);
        }
        await onSignIn();
        analytics().logLogin({
          method: 'email',
        });
        NavigationService.resetAndNavigate('Dashboard');
      } catch (e) {
        crashlytics().recordError(e);
        console.log(e.message);
        switch (e.code) {
          case 'auth/email-already-in-use':
            Toast('The email address is already in use.', appColors.failure);
            break;
          case 'auth/weak-password':
            Toast('Please use a better password.', appColors.failure);
            break;
          case 'auth/wrong-password':
            Toast('Incorrect email/password.', appColors.failure);
            break;
          case 'auth/too-many-requests':
            Toast(
              'Too many unsuccessful login attempts. Please try again later.',
              appColors.failure,
            );
            break;
          case 'auth/operation-not-allowed':
            Toast(
              'Enable anonymous in your firebase console.',
              appColors.failure,
            );
            break;
          default:
            Toast(e.message, appColors.failure);
            break;
        }
      }
    }
    this.setState({loading: false});
  };

  render() {
    const {loading} = this.state;
    return (
      <Container style={styles.root}>
        <Content>
          <View style={styles.scrollViewContent}>
            {loading ? (
              <View style={styles.loadingBackground}>
                <ActivityIndicator
                  animating={loading}
                  size={'large'}
                  color={appColors.accent}
                />
              </View>
            ) : (
              <View />
            )}
            <Icon name="leaf" style={styles.icon} />
            <Text style={styles.header}>{displayName}</Text>
            <TouchableWithoutFeedback
              onPress={() => this.usernameInput.focus()}>
              <View style={styles.textInputBackground}>
                <TextInput
                  style={styles.textInput}
                  selectionColor={appColors.accent}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder="Email..."
                  placeholderTextColor={appColors.disabledText}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  onChangeText={text => this.setState({email: text})}
                  value={this.state.email}
                  ref={input => (this.usernameInput = input)}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  blurOnSubmit={false}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => this.passwordInput.focus()}>
              <View style={styles.textInputBackground}>
                <TextInput
                  style={styles.textInput}
                  selectionColor={appColors.accent}
                  placeholderTextColor={appColors.disabledText}
                  placeholder="Password..."
                  textContentType="password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={text => this.setState({password: text})}
                  value={this.state.password}
                  ref={input => (this.passwordInput = input)}
                  enablesReturnKeyAutomatically={true}
                  returnKeyType={'go'}
                  onSubmitEditing={this.login}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              style={styles.loginButtonBackground}
              onPress={this.login}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButtonBackground}
              onPress={this.signup}>
              <Text style={styles.singupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Content>
        <Image
          source={require('../assets/images/green-tea.png')}
          style={styles.backgroundImage}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContent: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '33%',
  },
  root: {
    backgroundColor: 'white',
  },
  loadingBackground: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    // backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  backgroundImage: {
    flex: 1,
    aspectRatio: 0.75,
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.3,
  },
  header: {
    color: appColors.accent,
    fontSize: 25,
    textAlign: 'center',
    marginTop: 15,
  },
  icon: {
    color: appColors.accent,
    fontSize: 75,
  },
  textInput: {
    flex: 1,
    color: appColors.text,
  },
  textInputBackground: {
    width: '75%',
    height: 50,
    backgroundColor: appColors.textInputBackground,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingLeft: 25,
  },
  loginButtonText: {
    color: appColors.textInputBackground,
  },
  loginButtonBackground: {
    width: '75%',
    height: 50,
    backgroundColor: appColors.accent,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  singupButtonText: {
    color: appColors.accent,
  },
  signupButtonBackground: {
    width: '75%',
    height: 50,
    backgroundColor: appColors.textInputBackground,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});
