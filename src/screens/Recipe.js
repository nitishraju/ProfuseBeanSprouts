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
  Right,
  Fab,
} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';
import analytics from '@react-native-firebase/analytics';

import appColors from '../utils/appColors';

import PlantCard from '../components/PlantCard';

import plants from '../assets/data/plants.json';

export default class Recipe extends PureComponent {
  state = {
    loading: true,
    recipe: this.props.navigation.getParam('recipe', {}).item,
    plants: plants,
    ingredients: [],
  };

  componentDidMount = () => {
    const {recipe} = this.state;
    analytics().logViewItem({
      item_id: recipe.name,
      item_name: recipe.name,
      item_category: 'recipe',
    });
    this.setState({loading: false});
    this.findIngredients();
  };

  findIngredients = () => {
    let ingredients = [];
    this.state.recipe.ingredients.map(ingredient => {
      let plant = this.state.plants.find(element => {
        return element.name.toLowerCase() === ingredient.ingredient;
      });
      if (plant) {
        ingredients.push(plant);
      }
      return plant;
    });
    this.setState({
      ingredients,
    });
  };

  render() {
    const {loading, recipe, ingredients} = this.state;
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
          <Right>
            <Button transparent>
              {/* <Icon name="more" style={styles.header} /> */}
            </Button>
          </Right>
        </Header>
        <Content ref={c => (this._content = c)}>
          <Image source={{uri: recipe.imageUrl}} style={styles.image} />
          <View style={styles.content}>
            <Title style={styles.recipeName}>{recipe.name}</Title>
            <Title style={styles.recipeSubtitle}>Ingredients</Title>
            {recipe.ingredients.map(function(ingredient) {
              return (
                <Text style={styles.ingredients}>
                  {ingredient.amount + ' ' + ingredient.ingredient}
                </Text>
              );
            })}
            <Title style={styles.recipeSubtitle}>Steps</Title>
            <Text style={styles.recipeSteps}>{recipe.steps}</Text>
            <Title style={styles.recipeSubtitle}>Plants</Title>
            {ingredients.length > 0 ? (
              <FlatList
                data={ingredients}
                renderItem={plant => (
                  <PlantCard
                    plant={plant}
                    mini={true}
                    onPress={() => this.props.navigation.push('Plant', {plant})}
                  />
                )}
                keyExtractor={plant => plant.name}
              />
            ) : (
              <Text>No Plants Available</Text>
            )}
          </View>
        </Content>
        <Fab
          active={false}
          style={{backgroundColor: appColors.accent}}
          position="bottomRight"
          onPress={() => this._content._root.scrollToPosition(0, 0)}>
          <Icon name="arrow-up" />
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
  recipeName: {
    color: appColors.accent,
    fontSize: 20,
    marginVertical: 20,
  },
  recipeSubtitle: {
    color: appColors.disabledText,
    margin: 0,
  },
  recipeSteps: {
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
});
