import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0f172a',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommend"
        options={{
          title: '추천',
          tabBarIcon: ({ color, size }) => (
            <Feather name="zap" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="capture"
        options={{
          title: '캡처',
          tabBarIcon: ({ color, size }) => (
            <Feather name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="wardrobe"
        options={{
          title: '옷장',
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="analysis"
        options={{
          title: '분석',
          tabBarIcon: ({ color, size }) => (
            <Feather name="maximize-2" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
