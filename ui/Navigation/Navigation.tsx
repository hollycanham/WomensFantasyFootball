import * as React from 'react';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import {Fixtures, Leagues, Stats, Team} from '../Screens';

const Tab = createBottomTabNavigator();

const TabBar = ({
  navigation,
  state,
  descriptors,
  insets,
}: BottomTabBarProps) => {
  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({route, preventDefault}) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({route, focused, color}) => {
        const {options} = descriptors[route.key];
        if (options.tabBarIcon) {
          console.log(options.tabBarIcon({focused, color, size: 24}));
          return options.tabBarIcon({focused, color, size: 24});
        }

        return null;
      }}
      getLabelText={({route}) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.title;

        return label;
      }}
    />
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={TabBar}>
        <Tab.Screen
          name="Team"
          component={Team}
          options={{
            tabBarLabel: 'Team',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="soccer-field" {...props} />,
          }}
        />
        <Tab.Screen
          name="Leagues"
          component={Leagues}
          options={{
            tabBarLabel: 'Leagues',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="trophy" {...props} />,
          }}
        />
        <Tab.Screen
          name="Fixtures"
          component={Fixtures}
          options={{
            tabBarLabel: 'Fixtures',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="calendar" {...props} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={Stats}
          options={{
            tabBarLabel: 'Stats',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="graph" {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
