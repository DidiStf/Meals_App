import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from '../components/MealItem';

const MealList = ({ listData, navigation }) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);

  const renderMealItem = (itemData) => {
    const {
      affordability,
      complexity,
      duration,
      id,
      image,
      title,
    } = itemData.item;
    const isFavourite = favouriteMeals.some((meal) => meal.id === id);

    return (
      <MealItem
        affordability={affordability}
        complexity={complexity}
        duration={duration}
        image={image}
        title={title}
        onSelectMeal={() => {
          navigation.navigate({
            routeName: 'MealDetail',
            params: {
              mealId: id,
              mealTitle: title,
              isFavourite,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={listData}
        keyExtractor={({ id }, index) => id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default MealList;
