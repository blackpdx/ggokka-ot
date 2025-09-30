// components/common/BottomNavBar.tsx
import {
  BarChart3,
  Home,
  ShoppingBag,
  Shirt as ShirtIcon,
  User as UserIcon,
} from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert as RNAlert } from 'react-native';
import { MainScreen } from '../../App';

type BottomNavBarProps = {
  activeScreen?: MainScreen;
  onNavigate?: (screen: MainScreen) => void; // '?' 추가하여 선택 속성으로 변경
  disabled?: boolean;
};

const navItems: { icon: any, title: string, screen: MainScreen }[] = [
  { icon: Home, title: '홈', screen: 'home' },
  { icon: ShirtIcon, title: '옷장', screen: 'wardrobe-management' },
  { icon: BarChart3, title: '분석', screen: 'style-analysis' },
  { icon: UserIcon, title: '피팅', screen: 'virtual-fitting' },
  { icon: ShoppingBag, title: '쇼핑', screen: 'shopping' },
];

export default function BottomNavBar({ activeScreen, onNavigate, disabled = false }: BottomNavBarProps) {
  const handlePress = (screen: MainScreen) => {
    if (disabled) {
      RNAlert.alert('안내', '프로필 설정을 먼저 완료해주세요.');
      return;
    }
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomInner}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !disabled && activeScreen === item.screen;
          const color = isActive ? '#111' : '#9CA3AF';

          return (
            <Pressable key={item.title} style={styles.bottomItem} onPress={() => handlePress(item.screen)}>
              <Icon size={20} color={color} />
              <Text style={[styles.bottomLabel, { color }]}>{item.title}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  bottomInner: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 24, // 아이폰 하단 바 등을 고려한 여백
  },
  bottomItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 6, gap: 2, flex: 1 },
  bottomLabel: { fontSize: 11 },
});