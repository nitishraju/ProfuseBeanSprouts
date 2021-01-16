import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Card,
  CardItem,
} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';

import {onSignOut} from '../utils/user';
import Toast from '../utils/toast';
import appColors from '../utils/appColors';
import NavigationService from '../utils/navigationService';

class Settings extends PureComponent {
  state = {
    loading: true,
    user: this.props.user,
    settings: this.props.settings,
  };

  componentDidMount = () => {
    this.setState({loading: false});
  };

  comingSoon = () => {
    Toast('Feature Coming Soon!', appColors.yellow, 3000);
  };

  logout = () => {
    onSignOut();
    NavigationService.resetAndNavigate('Login');
  };

  render() {
    const {loading, user, settings} = this.state;
    return (
      <Container style={styles.root}>
        {loading ? (
          <View style={styles.loadingBackground}>
            <ActivityIndicator animating={loading} size={'large'} />
          </View>
        ) : (
          <View />
        )}
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={styles.header} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.header}>Settings</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.logout}>
              <Icon name="log-out" style={styles.header} />
            </Button>
          </Right>
        </Header>
        <Content>
          <ScrollView>
            <TouchableOpacity
              style={styles.cards}
              // onPress={() => NavigationService.navigate('User')}
              onPress={this.comingSoon}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={require('../assets/images/user.jpeg')}
                    style={styles.miniImage}
                  />
                </CardItem>
                <CardItem footer>
                  <Left>
                    <Body>
                      <Text style={{color: appColors.text}}>User</Text>
                      <Text style={{color: appColors.disabledText}} note>
                        {user.email}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cards}
              // onPress={() => NavigationService.navigate('Location')}
              onPress={this.comingSoon}>
              <Card>
                <CardItem cardBody>
                  <Image
                    source={require('../assets/images/location.jpeg')}
                    style={styles.miniImage}
                  />
                </CardItem>
                <CardItem footer>
                  <Left>
                    <Body>
                      <Text style={{color: appColors.text}}>Location</Text>
                      <Text style={{color: appColors.disabledText}} note>
                        {settings.address}
                      </Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </ScrollView>
        </Content>
        <Image
          source={require('../assets/images/green-tea.png')}
          style={styles.backgroundImage}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    plants: state.plants,
    settings: state.settings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch({type: 'UPDATE_USER', user});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  loadingBackground: {
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    color: appColors.accent,
  },
  image: {
    resizeMode: 'cover',
    width: null,
    height: 200,
    flex: 1,
  },
  miniImage: {
    resizeMode: 'cover',
    width: null,
    height: 150,
    flex: 1,
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
  wideCard: {
    margin: 15,
    marginBottom: 5,
  },
  miniCard: {
    margin: 15,
    marginBottom: 5,
    height: 100,
  },
  cards: {
    margin: 15,
    marginTop: 5,
    marginBottom: 0,
  },
});
