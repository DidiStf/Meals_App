import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButon from '../components/HeaderButton';

import { CATEGORIES } from '../data/dummy-data';

const CategoriesScreen = ({ navigation }) => {
  const renderGridTile = (itemData) => {
    const { id, color, title } = itemData.item;
    return (
      <CategoryGridTile
        color={color}
        onSelect={() => {
          navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: id,
            },
          });
        }}
        title={title}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={({ id }, index) => id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridTile}></FlatList>
  );
};

CategoriesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Meal Categories',
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

export default CategoriesScreen;
