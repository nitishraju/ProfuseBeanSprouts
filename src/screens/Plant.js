import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, Linking} from 'react-native';
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
  Fab,
} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';

import appColors from '../utils/appColors';

export default class Plant extends PureComponent {
  state = {
    loading: true,
    plant: this.props.navigation.getParam('plant', {}).item,
  };

  componentDidMount = () => {
    const {plant} = this.state;
    analytics().logViewItem({
      item_id: plant.scientificName,
      item_name: plant.name,
      item_category: 'plant',
    });
    this.setState({loading: false});
  };

  render() {
    const {loading, plant} = this.state;
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
            <Title style={styles.header}>{plant.name}</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name="more" style={styles.header} /> */}
            </Button>
          </Right>
        </Header>
        <Content>
          <Image source={{uri: plant.imageUrl}} style={styles.image} />
          <View style={styles.content}>
            <Title style={styles.plantName}>{plant.scientificName}</Title>
            <Title style={styles.plantSubtitle}>Description</Title>
            <Text style={styles.plantSteps}>{plant.description}</Text>
          </View>
        </Content>
        <Fab
          active={false}
          style={{backgroundColor: appColors.accent}}
          position="bottomRight"
          onPress={() => Linking.openURL(plant.growingTipsUrl)}>
          <Icon name="leaf" />
        </Fab>
        <Image
          source={require('../assets/images/green-tea.png')}
          style={styles.backgroundImage}
        />
      </Container>
    );
  }
}

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
  },
  title: {
    color: appColors.disabledText,
  },
  plantName: {
    color: appColors.accent,
    fontSize: 20,
    marginVertical: 20,
  },
  plantSubtitle: {
    color: appColors.disabledText,
    margin: 0,
  },
  plantSteps: {
    color: appColors.disabledText,
    margin: 15,
  },
  ingredients: {
    color: appColors.disabledText,
    margin: 0,
    marginHorizontal: 15,
  },
  content: {
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  button: {
    backgroundColor: appColors.accent,
    alignItems: 'center',
  },
  buttonIcon: {
    color: appColors.white,
    marginHorizontal: 10,
  },
});
