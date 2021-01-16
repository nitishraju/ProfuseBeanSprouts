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
  Card,
  CardItem,
  Fab,
} from 'native-base';
import {ActivityIndicator} from 'react-native-paper';

import appColors from '../utils/appColors';
import {hideToast} from '../utils/toast';

import tips from '../assets/data/tips.json';

export default class Tips extends PureComponent {
  state = {
    loading: true,
    user: this.props.user,
    tips: tips,
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
            <Title style={styles.header}>Tips</Title>
          </Body>
          <Right>
            <Button transparent />
          </Right>
        </Header>
        <Content ref={c => (this._content = c)}>
          <Image
            source={require('../assets/images/tips.jpeg')}
            style={styles.image}
          />
          <View style={styles.content}>
            {this.state.tips.length > 0 ? (
              <FlatList
                data={this.state.tips}
                renderItem={tip => (
                  <Card>
                    <CardItem>
                      <Body>
                        <Text>
                          {tip.index + 1}. {tip.item}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                )}
                keyExtractor={(tip, index) => index.toString()}
              />
            ) : (
              <Text style={styles.centered}>No Tips</Text>
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
