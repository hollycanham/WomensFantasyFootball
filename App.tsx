import * as React from 'react';
import {Text, View} from 'react-native';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function TeamScreen() {
  return (
    <View>
      <Text>Team!</Text>
    </View>
  );
}

function LeaguesScreen() {
  return (
    <View>
      <Text>Leagues!</Text>
    </View>
  );
}

function FixturesScreen() {
  return (
    <View>
      <Text>Fixtures!</Text>
    </View>
  );
}

function StatsScreen() {
  return (
    <View>
      <Text>Stats!</Text>
    </View>
  );
}

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

// const HomeIcon = ({color, size}: {color: string; size: number}) => {
//   return <Icon name="sports-soccer" size={size} color={color} />;
// };

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={TabBar}>
        <Tab.Screen
          name="Team"
          component={TeamScreen}
          options={{
            tabBarLabel: 'Team',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="soccer-field" {...props} />,
          }}
        />
        <Tab.Screen
          name="Leagues"
          component={LeaguesScreen}
          options={{
            tabBarLabel: 'Leagues',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="trophy" {...props} />,
          }}
        />
        <Tab.Screen
          name="Fixtures"
          component={FixturesScreen}
          options={{
            tabBarLabel: 'Fixtures',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="calendar" {...props} />,
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarLabel: 'Stats',
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: props => <Icon name="graph" {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
