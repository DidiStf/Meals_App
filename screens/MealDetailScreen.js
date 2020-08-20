import React, { useCallback, useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';

import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavouriteMealAction } from '../store/actions/meals';

const ListItem = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = ({ navigation }) => {
  const mealId = navigation.getParam('mealId');
  const isMealFavourite = useSelector(
    (state) => state.meals.favouriteMeals
  ).some((meal) => meal.id === mealId);
  const meals = useSelector((state) => state.meals.meals);
  const selectedMeal = meals.find(({ id }) => id === mealId);
  const {
    affordability,
    complexity,
    duration,
    id,
    imageUrl,
    ingredients,
    steps,
  } = selectedMeal;

  const dispatch = useDispatch();

  const handleToggleFavouriteMeal = useCallback(() => {
    dispatch(toggleFavouriteMealAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    navigation.setParams({ toggleFavouriteMeal: handleToggleFavouriteMeal });
  }, [handleToggleFavouriteMeal]);

  useEffect(() => {
    navigation.setParams({ isFavourite: isMealFavourite });
  }, [isMealFavourite]);

  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{duration}m</DefaultText>
        <DefaultText>{complexity.toUpperCase()}</DefaultText>
        <DefaultText>{affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = ({ navigation }) => {
  const mealTitle = navigation.getParam('mealTitle');
  const toggleFavouriteMeal = navigation.getParam('toggleFavouriteMeal');
  const isFavourite = navigation.getParam('isFavourite');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Favourite'
          iconName={isFavourite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavouriteMeal}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  image: {
    width: '100%',
    height: 200,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default MealDetailScreen;
