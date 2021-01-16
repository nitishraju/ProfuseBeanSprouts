import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, CardItem, Left, Body, Right, Icon} from 'native-base';
import {connect} from 'react-redux';

import rootStore from '../utils/rootStore';
import appColors from '../utils/appColors';

class PlantCard extends PureComponent {
  state = {
    plant: this.props.plant.item,
    inGarden: false,
  };

  render() {
    let {plant} = this.state;
    this.setState({
      inGarden: this.props.plants.find(element => {
        return element === this.state.plant;
      }),
    });
    return (
      <View style={styles.wideCard}>
        <Card>
          <CardItem cardBody button onPress={this.props.onPress}>
            <Image
              source={{uri: plant.imageUrl}}
              style={this.props.mini ? styles.miniImage : styles.image}
            />
          </CardItem>
          <CardItem footer>
            <Left>
              <Body>
                <Text style={styles.text}>{plant.name}</Text>
                <Text style={styles.text} note>
                  {plant.scientificName}
                </Text>
              </Body>
            </Left>
            {!this.state.inGarden ? (
              <TouchableOpacity
                onPress={() => {
                  rootStore.dispatch({type: 'ADD_PLANT', plant});
                  this.setState({inGarden: true});
                }}>
                <Right>
                  {/* <Text>Add to Garden</Text> */}
                  <Icon name="add-circle" style={styles.add} />
                </Right>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  rootStore.dispatch({type: 'REMOVE_PLANT', plant});
                  this.setState({inGarden: false});
                }}>
                <Right>
                  {/* <Text>Remove from Garden</Text> */}
                  <Icon name="remove-circle" style={styles.remove} />
                </Right>
              </TouchableOpacity>
            )}
          </CardItem>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    plants: state.plants,
  };
};

export default connect(mapStateToProps)(PlantCard);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
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
  wideCard: {
    margin: 15,
    marginBottom: 5,
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
    height: 100,
    flex: 1,
  },
  text: {
    color: appColors.text,
  },
  add: {
    color: appColors.accent,
  },
  remove: {
    color: appColors.failure,
  },
});
