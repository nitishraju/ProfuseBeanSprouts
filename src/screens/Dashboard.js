import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Title,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {connect} from 'react-redux';

import appColors from '../utils/appColors';
import NavigationService from '../utils/navigationService';

class Dashboard extends PureComponent {
  state = {
    user: this.props.user,
    settings: this.props.settings,
  };

  componentDidMount = () => {
    this.setState({loading: false});
  };

  render() {
    const {loading} = this.state;
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
            <Button transparent />
          </Left>
          <Body>
            <Title style={styles.header}>Dashboard</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => NavigationService.navigate('Settings')}>
              <Icon name="leaf" style={styles.header} />
            </Button>
          </Right>
        </Header>
        <Content>
          <TouchableOpacity
            style={styles.wideCard}
            onPress={() => NavigationService.navigate('Garden')}>
            <Card>
              <CardItem cardBody>
                <Image
                  source={require('../assets/images/garden.jpeg')}
                  style={styles.image}
                />
              </CardItem>
              <CardItem footer>
                <Left>
                  <Body>
                    <Text style={{color: appColors.text}}>Garden</Text>
                    <Text style={{color: appColors.disabledText}} note>
                      {this.state.settings.address}
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
          <Grid>
            <Col>
              <TouchableOpacity
                style={styles.cards}
                onPress={() => NavigationService.navigate('Recipes')}>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={require('../assets/images/recipes.jpeg')}
                      style={styles.image}
                    />
                  </CardItem>
                  <CardItem footer>
                    <Left>
                      <Body>
                        <Text style={{color: appColors.text}}>Recipes</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                style={styles.cards}
                onPress={() => NavigationService.navigate('Plants')}>
                <Card>
                  <CardItem cardBody>
                    <Image
                      source={require('../assets/images/plants.jpeg')}
                      style={styles.image}
                    />
                  </CardItem>
                  <CardItem footer>
                    <Left>
                      <Body>
                        <Text style={{color: appColors.text}}>Plants</Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            </Col>
          </Grid>
          <TouchableOpacity
            style={styles.cards}
            onPress={() => NavigationService.navigate('Tips')}>
            <Card>
              <CardItem cardBody>
                <Image
                  source={require('../assets/images/tips.jpeg')}
                  style={styles.miniImage}
                />
              </CardItem>
              <CardItem footer>
                <Left>
                  <Body>
                    <Text style={{color: appColors.text}}>Tips</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
          </TouchableOpacity>
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
    settings: state.settings,
  };
};

export default connect(mapStateToProps)(Dashboard);

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
