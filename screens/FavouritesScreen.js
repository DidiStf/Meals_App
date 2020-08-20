import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButon from '../components/HeaderButton';
import DefaltText from '../components/DefaultText';
import MealList from '../components/MealList';

const FavouritesScreen = ({ navigation }) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);

  return favouriteMeals && favouriteMeals.length ? (
    <MealList listData={favouriteMeals} navigation={navigation} />
  ) : (
    <View style={styles.content}>
      <DefaltText>No favourite meals found. Start adding some!</DefaltText>
    </View>
  );
};

FavouritesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your favourites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButon}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navigation.toggleDrawer();
          }}></Item>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavouritesScreen;
