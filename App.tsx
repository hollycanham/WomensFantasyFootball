import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Team" component={TeamScreen} />
        <Tab.Screen name="Leagues" component={LeaguesScreen} />
        <Tab.Screen name="Fixtures" component={FixturesScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
