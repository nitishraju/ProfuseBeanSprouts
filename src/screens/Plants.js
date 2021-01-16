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
  Item,
  Input,
} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';
import {connect} from 'react-redux';
import analytics from '@react-native-firebase/analytics';

import appColors from '../utils/appColors';
import {hideToast} from '../utils/toast';

import plantsJson from '../assets/data/plants.json';

import PlantCard from '../components/PlantCard';

class Plants extends PureComponent {
  state = {
    loading: true,
    user: this.props.user,
    plants: plantsJson,
    searchText: '',
  };

  componentDidMount = () => {
    analytics().logViewItemList({
      item_category: 'plants',
    });
    this.setState({loading: false});
  };

  render() {
    const {loading, plants, searchText} = this.state;
    let plantList =
      searchText === ''
        ? plants
        : plants.filter(plant =>
            plant.name.toLowerCase().includes(searchText.toLowerCase()),
          );
    return (
      <Container style={styles.root}>
        {loading ? (
          <View style={styles.loadingBackground}>
            <ActivityIndicator animating={loading} size={'large'} />
          </View>
        ) : (
          <View />
        )}
        <Header searchBar rounded>
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
            <Title style={styles.header}>Plants</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name="more" style={styles.header} /> */}
            </Button>
          </Right>
        </Header>
        <Content>
          {/* <Image
            source={require('../assets/images/flowers.jpg')}
            style={styles.image}
          /> */}
          <View style={styles.content}>
            <Item>
              <Icon name="ios-search" style={styles.header} />
              <Input
                placeholder="Search Plants"
                placeholderTextColor={appColors.accent}
                onChangeText={text => this.setState({searchText: text})}
                value={searchText}
              />
              <Icon name="leaf" style={styles.header} />
            </Item>
            {plantList.length > 0 ? (
              <FlatList
                data={plantList}
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
              <Text style={styles.centered}>No Results</Text>
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

export default connect(mapStateToProps)(Plants);

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
  content: {
    margin: 10,
  },
  header: {
    color: appColors.accent,
  },
  title: {
    color: appColors.disabledText,
  },
  centered: {
    color: appColors.accent,
    fontSize: 20,
    marginVertical: 20,
  },
  scrollView: {},
  image: {
    width: '100%',
    height: 200,
  },
});
