import React, {PureComponent} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card, CardItem, Left, Body, Right} from 'native-base';

import appColors from '../utils/appColors';

export default class RecipeCard extends PureComponent {
  state = {
    recipe: this.props.recipe.item,
  };

  render() {
    let {recipe} = this.state;
    return (
      <View style={styles.wideCard}>
        <Card>
          <CardItem cardBody button onPress={this.props.onPress}>
            <Image
              source={{uri: recipe.imageUrl}}
              style={this.props.mini ? styles.miniImage : styles.image}
            />
          </CardItem>
          <CardItem footer>
            <Left>
              <Body>
                <Text style={styles.text}>{recipe.name}</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text style={styles.text} note>
                  {recipe.time}
                </Text>
              </Body>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}

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
    height: 150,
    flex: 1,
  },
  text: {
    color: appColors.text,
  },
});
