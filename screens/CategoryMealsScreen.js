import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import DefaultText from '../components/DefaultText';
import MealList from '../components/MealList';

import { CATEGORIES } from '../data/dummy-data';

const CategoryMealScreen = ({ navigation }) => {
  const catId = navigation.getParam('categoryId');
  const meals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = meals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  return displayedMeals.length ? (
    <MealList listData={displayedMeals} navigation={navigation} />
  ) : (
    <View style={styles.content}>
      <DefaultText>No meals found. Check your filters.</DefaultText>
    </View>
  );
};

CategoryMealScreen.navigationOptions = ({ navigation }) => {
  const catId = navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => catId === cat.id);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealScreen;
