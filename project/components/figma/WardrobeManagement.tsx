// components/figma/WardrobeManagement.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Pressable, Alert as RNAlert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Grid3X3, List, Search, Filter, Heart, MoreVertical } from 'lucide-react-native';
import AppHeader from '../common/AppHeader';
import BottomNavBar from '../common/BottomNavBar';
import { MainScreen } from '../../App';

type ViewMode = 'grid' | 'list';
type Item = { id: number; name: string; brand: string; image: string; category: string; loved: boolean };

export default function WardrobeManagement({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (step: MainScreen) => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const items = useMemo<Item[]>(() => [
      { id: 1, name: '화이트 셔츠', brand: 'Uniqlo', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca2a?q=80&w=600', category: '상의', loved: true },
      { id: 2, name: '블랙 슬랙스', brand: 'K-Fit', image: 'https://images.unsplash.com/photo-1556306535-ab8f5f1d0454?q=80&w=600', category: '하의', loved: false },
      { id: 3, name: '라이트 자켓', brand: 'Muji', image: 'https://images.unsplash.com/photo-1582582621958-c1de9b095df2?q=80&w=600', category: '아우터', loved: false },
    ], []
  );

  const total = items.length;

  const HeaderRightAction = (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Pressable onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} style={styles.iconBtn}>
        {viewMode === 'grid' ? <List size={20} color="#111" /> : <Grid3X3 size={20} color="#111" />}
      </Pressable>
      <Pressable onPress={() => RNAlert.alert('추가', '새 아이템 추가 화면으로 이동합니다.')} style={styles.addBtn}>
        <Camera size={16} color="#FFF" />
        <Text style={styles.addBtnText}>추가</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="내 옷장" subtitle={`${total}개 아이템`} onBack={onBack} rightAction={HeaderRightAction} />

      <ScrollView contentContainerStyle={styles.screenPad}>
        <View style={{ position: 'relative', marginBottom: 16 }}>
          <View style={{position: 'absolute', left: 12, top: 14, zIndex: 1}}>
            <Search size={16} color="#9CA3AF" />
          </View>
          <TextInput placeholder="아이템 검색..." style={styles.searchInput} />
          <Pressable style={styles.filterBtn}><Filter size={16} color="#111" /></Pressable>
        </View>

        {viewMode === 'grid' ? (
          <View style={styles.gridWrap}>
            {items.map((item) => (
              <Pressable key={item.id} style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.cardImg} />
                <View style={styles.cardTopRight}>
                  {item.loved && <View style={styles.roundBtnWhite}><Heart size={14} color="#EF4444" fill="#EF4444" /></View>}
                  <Pressable style={styles.roundBtnWhite}><MoreVertical size={14} color="#111" /></Pressable>
                </View>
                <View style={styles.cardBottomOverlay}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <Text style={styles.cardBrand}>{item.brand}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={{ gap: 8 }}>
            <Text style={{textAlign: 'center', paddingVertical: 40, color: '#6B7280'}}>리스트 뷰가 여기에 표시됩니다.</Text>
          </View>
        )}
      </ScrollView>
      <BottomNavBar activeScreen="wardrobe-management" onNavigate={onNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  iconBtn: { padding: 8 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#111', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  screenPad: { padding: 16, paddingBottom: 24 },
  searchInput: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, paddingLeft: 40, paddingRight: 50, paddingVertical: 10, fontSize: 14 },
  filterBtn: { position: 'absolute', right: 6, top: 6, padding: 8, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 6 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  card: { width: '48.5%', aspectRatio: 3 / 4, borderRadius: 8, overflow: 'hidden', backgroundColor: '#EEE', elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5},
  cardImg: { width: '100%', height: '100%' },
  cardTopRight: { position: 'absolute', top: 8, right: 8, flexDirection: 'row', gap: 6 },
  roundBtnWhite: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center' },
  cardBottomOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, backgroundColor: 'rgba(0,0,0,0.45)' },
  cardName: { color: '#FFF', fontWeight: '600' },
  cardBrand: { color: '#FFF', fontSize: 11, opacity: 0.9 },
});