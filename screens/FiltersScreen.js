import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Switch, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import CustomHeaderButon from '../components/HeaderButton';
import { setFiltersAction } from '../store/actions/meals';

import Colors from '../constants/Colors';

const FilterSwitch = ({ label, onChange, value }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{label}</Text>
      <Switch
        onValueChange={(newValue) => onChange(newValue)}
        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
        trackColor={{ true: Colors.primaryColor }}
        value={value}
      />
    </View>
  );
};

const FiltersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian,
    };

    dispatch(setFiltersAction(appliedFilters));
  }, [dispatch, isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label='Gluten-free'
        onChange={(newValue) => setIsGlutenFree(newValue)}
        value={isGlutenFree}
      />
      <FilterSwitch
        label='Lactose-free'
        onChange={(newValue) => setIsLactoseFree(newValue)}
        value={isLactoseFree}
      />
      <FilterSwitch
        label='Vegan'
        onChange={(newValue) => setIsVegan(newValue)}
        value={isVegan}
      />
      <FilterSwitch
        label='Vegetarian'
        onChange={(newValue) => setIsVegetarian(newValue)}
        value={isVegetarian}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});

FiltersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Filter Meals',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButon}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navigation.getParam('save')}></Item>
      </HeaderButtons>
    ),
  };
};

export default FiltersScreen;
