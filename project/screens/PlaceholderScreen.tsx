// screens/PlaceholderScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlaceholderScreen({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← 뒤로</Text>
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.body}>
        <Text style={styles.info}>여기는 "{title}" 화면 자리야.</Text>
        <Text style={styles.sub}>나중에 실제 기능/디자인으로 교체하면 됨.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backBtn: { paddingVertical: 6, paddingHorizontal: 8 },
  backText: { fontSize: 16, color: '#111827' },
  title: { fontSize: 16, fontWeight: '600', color: '#111827' },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 8 },
  info: { fontSize: 16, color: '#111827' },
  sub: { fontSize: 13, color: '#6B7280' },
});
