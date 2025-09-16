// components/figma/WardrobeManagement.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Alert as RNAlert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Camera,
  Grid3X3,
  List,
  Search,
  Filter,
  Heart,
  MoreVertical,
  Shirt,
  Package,
} from 'lucide-react-native';

type ViewMode = 'grid' | 'list';

type Item = {
  id: number;
  name: string;
  brand: string;
  color: string;
  size: string;
  image: string;
  category: '상의' | '하의' | '아우터' | '신발' | '악세서리';
  loved: boolean;
  wornCount: number;
  lastWorn: string;
  price: string;
  tags: string[];
};

export default function WardrobeManagement({ onBack }: { onBack: () => void }) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selected, setSelected] = useState<'all' | 'tops' | 'bottoms' | 'outerwear' | 'shoes' | 'accessories'>('all');
  const [query, setQuery] = useState('');

  // 샘플 데이터 (원하면 서버/컨텍스트로 교체 가능)
  const items = useMemo<Item[]>(
    () => [
      {
        id: 1,
        name: '화이트 셔츠',
        brand: 'Uniqlo',
        color: '화이트',
        size: 'M',
        image: 'https://images.unsplash.com/photo-1548883354-7622d03aca2a?q=80&w=1200&auto=format&fit=crop',
        category: '상의',
        loved: true,
        wornCount: 12,
        lastWorn: '3일 전',
        price: '₩29,000',
        tags: ['미니멀', '오피스'],
      },
      {
        id: 2,
        name: '블랙 슬랙스',
        brand: 'K-Fit',
        color: '블랙',
        size: '30',
        image: 'https://images.unsplash.com/photo-1556306535-ab8f5f1d0454?q=80&w=1200&auto=format&fit=crop',
        category: '하의',
        loved: false,
        wornCount: 20,
        lastWorn: '어제',
        price: '₩49,000',
        tags: ['미니멀'],
      },
      {
        id: 3,
        name: '라이트 자켓',
        brand: 'Muji',
        color: '그레이',
        size: 'L',
        image: 'https://images.unsplash.com/photo-1582582621958-c1de9b095df2?q=80&w=1200&auto=format&fit=crop',
        category: '아우터',
        loved: false,
        wornCount: 7,
        lastWorn: '5일 전',
        price: '₩69,000',
        tags: ['캐주얼'],
      },
      {
        id: 4,
        name: '러닝 스니커즈',
        brand: 'Nike',
        color: '화이트',
        size: '270',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
        category: '신발',
        loved: true,
        wornCount: 35,
        lastWorn: '오늘',
        price: '₩119,000',
        tags: ['스포티'],
      },
      {
        id: 5,
        name: '실버 링',
        brand: 'Local',
        color: '실버',
        size: 'Free',
        image: 'https://images.unsplash.com/photo-1603565816278-c05e6aab64fb?q=80&w=1200&auto=format&fit=crop',
        category: '악세서리',
        loved: false,
        wornCount: 14,
        lastWorn: '2주 전',
        price: '₩19,000',
        tags: ['미니멀'],
      },
    ],
    []
  );

  // 카테고리 맵
  const catMap: Record<string, Item['category']> = {
    tops: '상의',
    bottoms: '하의',
    outerwear: '아우터',
    shoes: '신발',
    accessories: '악세서리',
  };

  // 통계용 합계
  const total = items.length;
  const lovedCount = items.filter((i) => i.loved).length;
  const avgWorn =
    total > 0 ? Math.round((items.reduce((acc, i) => acc + i.wornCount, 0) / total) * 10) / 10 : 0;

  // 필터링
  const filtered = items.filter((i) => {
    const byCat = selected === 'all' ? true : i.category === catMap[selected];
    const q = query.trim().toLowerCase();
    const byText =
      q.length === 0 ||
      i.name.toLowerCase().includes(q) ||
      i.brand.toLowerCase().includes(q) ||
      i.tags.some((t) => t.toLowerCase().includes(q));
    return byCat && byText;
  });

  function toggleLove(id: number) {
    RNAlert.alert('데모', '즐겨찾기 토글은 이후 상태관리에 연결할게!');
    // 실제 앱이면 setState/context로 loved 변경
  }

  function addItem() {
    RNAlert.alert('추가', '카메라/앨범 연동은 WardrobeSetup처럼 붙일 수 있어.');
  }

  const categories = [
    { id: 'all', name: '전체', count: total, icon: Package },
    { id: 'tops', name: '상의', count: items.filter((i) => i.category === '상의').length, icon: Shirt },
    { id: 'bottoms', name: '하의', count: items.filter((i) => i.category === '하의').length, icon: Package },
    { id: 'outerwear', name: '아우터', count: items.filter((i) => i.category === '아우터').length, icon: Package },
    { id: 'shoes', name: '신발', count: items.filter((i) => i.category === '신발').length, icon: Package },
    { id: 'accessories', name: '악세서리', count: items.filter((i) => i.category === '악세서리').length, icon: Package },
  ] as const;

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <Pressable onPress={onBack} style={styles.iconBtn}>
            <ArrowLeft size={20} color="#111" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>내 옷장</Text>
            <Text style={styles.subtitle}>{total}개 아이템</Text>
          </View>
          <Pressable
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            style={styles.iconBtn}
          >
            {viewMode === 'grid' ? <List size={20} color="#111" /> : <Grid3X3 size={20} color="#111" />}
          </Pressable>
          <Pressable onPress={addItem} style={[styles.addBtn]}>
            <Camera size={16} color="#FFF" />
            <Text style={styles.addBtnText}>추가</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.screenPad}>
        {/* 검색/필터 */}
        <View style={{ gap: 8 }}>
          <View style={styles.searchRow}>
            <View style={{ position: 'absolute', left: 12, top: 12 }}>
              <Search size={16} color="#9CA3AF" />
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="아이템 검색..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
            <Pressable style={styles.filterBtn} onPress={() => RNAlert.alert('필터', '필터 UI는 추후 연결!')}>
              <Filter size={16} color="#111" />
            </Pressable>
          </View>

          {/* 카테고리 탭 */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
            {categories.map((c) => {
              const Icon = c.icon;
              const active = selected === c.id;
              return (
                <Pressable
                  key={c.id}
                  onPress={() => setSelected(c.id as typeof selected)}
                  style={[styles.catBtn, active ? styles.catBtnActive : styles.catBtnIdle]}
                >
                  <Icon size={16} color={active ? '#FFF' : '#111'} />
                  <Text style={[styles.catText, active && styles.catTextActive]}>{c.name}</Text>
                  <View style={[styles.badge, active ? styles.badgeActive : styles.badgeIdle]}>
                    <Text style={[styles.badgeText, active && styles.badgeTextActive]}>{c.count}</Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 목록 */}
        <View style={{ gap: 12 }}>
          {viewMode === 'grid' ? (
            <View style={styles.gridWrap}>
              {filtered.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardImgBox}>
                    <Image source={{ uri: item.image }} style={styles.cardImg} />
                    <View style={styles.cardTopRight}>
                      {item.loved ? (
                        <View style={styles.roundBtnWhite}>
                          <Heart size={14} color="#EF4444" />
                        </View>
                      ) : null}
                      <Pressable style={styles.roundBtnWhite} onPress={() => RNAlert.alert('메뉴', '옵션 메뉴')}>
                        <MoreVertical size={14} color="#111" />
                      </Pressable>
                    </View>
                    <View style={styles.cardBottomOverlay}>
                      <Text style={styles.cardName}>{item.name}</Text>
                      <Text style={styles.cardBrand}>{item.brand}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              {filtered.map((item) => (
                <View key={item.id} style={styles.listCard}>
                  <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                    <View style={styles.thumbBox}>
                      <Image source={{ uri: item.image }} style={styles.thumbImg} />
                    </View>
                    <View style={{ flex: 1, gap: 6 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                          <Text style={styles.listName}>{item.name}</Text>
                          <Text style={styles.listMeta}>
                            {item.brand} • {item.color} • {item.size}
                          </Text>
                        </View>
                        {item.loved ? <Heart size={14} color="#EF4444" /> : null}
                      </View>
                      <View style={styles.listRowBetween}>
                        <Text style={styles.listSub}>
                          착용 {item.wornCount}회 · 최근 {item.lastWorn}
                        </Text>
                        <Text style={styles.listPrice}>{item.price}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                        {item.tags.map((t) => (
                          <View key={t} style={styles.tag}>
                            <Text style={styles.tagText}>{t}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 통계 */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>옷장 통계</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsBox}>
              <Text style={styles.statsBig}>{total}</Text>
              <Text style={styles.statsLabel}>총 아이템</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsBig}>{avgWorn}</Text>
              <Text style={styles.statsLabel}>평균 착용횟수</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsBig}>{lovedCount}</Text>
              <Text style={styles.statsLabel}>즐겨찾기</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={styles.statsBig}>89%</Text>
              <Text style={styles.statsLabel}>활용도</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },

  headerWrap: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 8, borderRadius: 8 },

  title: { fontSize: 18, fontWeight: '600', letterSpacing: 0.3, color: '#0B0B0B' },
  subtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  addBtn: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#111',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addBtnText: { color: '#FFF', fontSize: 13 },

  screenPad: { padding: 16, gap: 16 },

  searchRow: {
    position: 'relative',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingLeft: 36,
    paddingRight: 44,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  filterBtn: {
    position: 'absolute',
    right: 6,
    top: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  catRow: { gap: 8, paddingRight: 8 },
  catBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  catBtnIdle: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  catBtnActive: { backgroundColor: '#111111', borderColor: '#111111' },
  catText: { fontSize: 13, color: '#111' },
  catTextActive: { color: '#FFF', fontWeight: '600' },

  badge: {
    marginLeft: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeIdle: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  badgeActive: { backgroundColor: '#FFFFFF20', borderColor: '#FFFFFF40' },
  badgeText: { fontSize: 11, color: '#111' },
  badgeTextActive: { color: '#FFF' },

  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImgBox: { width: '100%', aspectRatio: 3 / 4, position: 'relative' },
  cardImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardTopRight: { position: 'absolute', top: 8, right: 8, flexDirection: 'row', gap: 6 },
  roundBtnWhite: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  cardName: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  cardBrand: { color: '#FFF', fontSize: 11, opacity: 0.9 },

  listCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  thumbBox: { width: 64, height: 84, backgroundColor: '#EEE', borderRadius: 6, overflow: 'hidden' },
  thumbImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  listName: { fontSize: 13, fontWeight: '600', color: '#111827' },
  listMeta: { fontSize: 11, color: '#6B7280', marginTop: 2 },
  listRowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  listSub: { fontSize: 11, color: '#6B7280' },
  listPrice: { fontSize: 12, fontWeight: '600', color: '#111827' },
  tag: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  tagText: { fontSize: 11, color: '#111827' },

  statsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
  },
  statsTitle: { fontSize: 16, fontWeight: '600', color: '#0B0B0B', marginBottom: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statsBox: { width: '48%', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  statsBig: { fontSize: 20, fontWeight: '700', color: '#111827' },
  statsLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});
