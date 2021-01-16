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

import RecipeCard from '../components/RecipeCard';

class Recipes extends PureComponent {
  state = {
    loading: true,
    user: this.props.user,
    recipes: this.props.recipes,
    searchText: '',
  };

  componentDidMount = () => {
    analytics().logViewItemList({
      item_category: 'recipes',
    });
    this.setState({loading: false});
  };

  render() {
    const {loading, recipes, searchText} = this.state;
    let recipeList =
      searchText === ''
        ? recipes
        : recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchText.toLowerCase()),
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
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={styles.header} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.header}>Recipes</Title>
          </Body>
          <Right>
            <Button transparent>
              {/* <Icon name="more" style={styles.header} /> */}
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.content}>
            <Item>
              <Icon name="ios-search" style={styles.header} />
              <Input
                placeholder="Search Recipes"
                placeholderTextColor={appColors.accent}
                onChangeText={text => this.setState({searchText: text})}
                value={searchText}
              />
              <Icon name="pizza" style={styles.header} />
            </Item>
            {recipeList.length > 0 ? (
              <FlatList
                data={recipeList}
                renderItem={recipe => (
                  <RecipeCard
                    recipe={recipe}
                    mini={true}
                    onPress={() =>
                      this.props.navigation.push('Recipe', {recipe})
                    }
                  />
                )}
                keyExtractor={recipe => recipe.name}
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
    recipes: state.recipes,
  };
};

export default connect(mapStateToProps)(Recipes);

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
