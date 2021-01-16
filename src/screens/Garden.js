import React, {PureComponent} from 'react';
import {FlatList, View, Text, Image, StyleSheet} from 'react-native';
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
} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';

import appColors from '../utils/appColors';
import Toast, {hideToast} from '../utils/toast';

import PlantCard from '../components/PlantCard';

class Garden extends PureComponent {
  state = {
    loading: true,
    user: this.props.user,
    plants: this.props.plants,
  };

  componentDidMount = () => {
    this.setState({loading: false});
  };

  render() {
    const {loading, plants} = this.state;
    if (plants.length === 0) {
      Toast('Add Plants?', appColors.success, 0, 'Plants');
    }
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
            <Button
              transparent
              onPress={() => {
                hideToast();
                this.props.navigation.goBack();
              }}>
              <Icon name="arrow-back" style={styles.header} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.header}>Garden</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name="more" style={styles.header} /> */}
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.content}>
            {/* <Image
            source={require('../assets/images/flowers.jpg')}
            style={styles.image}
          /> */}
            {plants.length > 0 ? (
              <FlatList
                data={this.state.plants}
                renderItem={plant => (
                  <PlantCard
                    plant={plant}
                    mini={true}
                    onPress={() => this.props.navigation.push('Plant', {plant})}
                  />
                )}
                keyExtractor={plant => plant.scientificName}
              />
            ) : (
              <Text style={styles.centered}>No Plants Yet</Text>
            )}
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

const mapStateToProps = state => {
  return {
    user: state.user,
    plants: state.plants,
  };
};

export default connect(mapStateToProps)(Garden);

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
  content: {
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  centered: {
    color: appColors.accent,
    fontSize: 20,
    marginVertical: 20,
  },
});
