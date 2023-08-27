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

// const Icon = (color: string, size: number) => {
//   return <Icon size={size} color={color} />;
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
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen name="Leagues" component={LeaguesScreen} />
        <Tab.Screen name="Fixtures" component={FixturesScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
