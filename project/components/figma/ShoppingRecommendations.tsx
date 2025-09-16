// components/figma/ShoppingRecommendations.tsx
import {
    ArrowLeft,
    ExternalLink,
    Filter,
    Heart,
    Search,
    ShoppingBag,
    Star,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ShoppingRecommendationsProps = {
  onBack: () => void;
};

export default function ShoppingRecommendations({ onBack }: ShoppingRecommendationsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'recommended' | 'trending' | 'missing' | 'seasonal'>('recommended');
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50to100' | '100to200' | 'over200'>('all');

  const categories = useMemo(
    () => [
      { id: 'recommended', name: 'AI 추천', icon: '🎯' },
      { id: 'trending', name: '트렌드', icon: '🔥' },
      { id: 'missing', name: '부족한 아이템', icon: '📝' },
      { id: 'seasonal', name: '시즌 필수', icon: '🌸' },
    ],
    []
  );

  const priceRanges = useMemo(
    () => [
      { id: 'all', name: '전체' },
      { id: 'under50', name: '5만원 이하' },
      { id: '50to100', name: '5-10만원' },
      { id: '100to200', name: '10-20만원' },
      { id: 'over200', name: '20만원 이상' },
    ],
    []
  );

  const recommendedItems = useMemo(
    () => [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        name: '클래식 트렌치 코트',
        brand: 'Burberry',
        price: '2,890,000원',
        originalPrice: '3,200,000원',
        discount: 10,
        rating: 4.8,
        reviews: 127,
        matchScore: 95,
        reason: '당신의 미니멀 스타일과 완벽 매치',
        tags: ['베스트셀러', '리뷰 좋음'],
        inStock: true,
        fastShipping: true,
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
        name: '코튼 화이트 셔츠',
        brand: 'COS',
        price: '129,000원',
        originalPrice: null,
        discount: 0,
        rating: 4.6,
        reviews: 89,
        matchScore: 92,
        reason: '옷장의 블랙 팬츠와 완벽한 조합',
        tags: ['신상품'],
        inStock: true,
        fastShipping: false,
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&w=800&q=80',
        name: '미니멀 레더 백',
        brand: 'Mansur Gavriel',
        price: '450,000원',
        originalPrice: '520,000원',
        discount: 15,
        rating: 4.9,
        reviews: 203,
        matchScore: 88,
        reason: '심플한 디자인으로 데일리 매치 완벽',
        tags: ['한정 세일', '리뷰 좋음'],
        inStock: false,
        fastShipping: false,
      },
      {
        id: 4,
        image:
          'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
        name: '화이트 레더 스니커즈',
        brand: 'Common Projects',
        price: '389,000원',
        originalPrice: null,
        discount: 0,
        rating: 4.7,
        reviews: 156,
        matchScore: 90,
        reason: '캐주얼한 룩에 모던함을 더해줌',
        tags: ['스테디셀러'],
        inStock: true,
        fastShipping: true,
      },
    ],
    []
  );

  const filteredItems = recommendedItems;

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
            <Pressable onPress={onBack} style={styles.iconBtn}>
              <ArrowLeft size={20} color="#111" />
            </Pressable>
            <View>
              <Text style={styles.title}>쇼핑 추천</Text>
              <Text style={styles.subtitle}>AI 맞춤 상품 추천</Text>
            </View>
          </View>
          <Pressable
            style={[
              styles.primaryBtn,
              { paddingHorizontal: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
            ]}
          >
            <ShoppingBag size={16} color="#FFF" />
            <Text style={styles.primaryBtnText}>장바구니</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.screenPad}>
        {/* 검색 */}
        <View style={{ position: 'relative' }}>
          <Search size={16} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            placeholder="원하는 아이템을 검색해보세요..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <Pressable style={styles.filterBtn}>
            <Filter size={16} color="#4B5563" />
          </Pressable>
        </View>

        {/* 카테고리 */}
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionLabel}>카테고리</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 4 }}>
              {categories.map((c) => (
                <Pressable
                  key={c.id}
                  onPress={() => setSelectedCategory(c.id as any)}
                  style={[
                    styles.chip,
                    selectedCategory === c.id ? styles.chipActive : styles.chipIdle,
                  ]}
                >
                  <Text style={[styles.chipText, selectedCategory === c.id && styles.chipTextActive]}>
                    {c.icon} {c.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 가격대 */}
        <View style={{ gap: 8 }}>
          <Text style={styles.sectionLabel}>가격대</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 8, paddingBottom: 4 }}>
              {priceRanges.map((r) => (
                <Pressable
                  key={r.id}
                  onPress={() => setPriceRange(r.id as any)}
                  style={[
                    styles.chipSm,
                    priceRange === r.id ? styles.chipActive : styles.chipIdle,
                  ]}
                >
                  <Text style={[styles.chipSmText, priceRange === r.id && styles.chipTextActive]}>
                    {r.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 추천 상품 */}
        <View style={{ gap: 12 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'recommended' && 'AI 맞춤 추천'}
              {selectedCategory === 'trending' && '지금 트렌드'}
              {selectedCategory === 'missing' && '부족한 아이템'}
              {selectedCategory === 'seasonal' && '시즌 필수템'}
            </Text>
            <Text style={styles.countText}>{filteredItems.length}개 상품</Text>
          </View>

          <View style={{ gap: 12 }}>
            {filteredItems.map((item) => (
              <View key={item.id} style={styles.cardRow}>
                <View style={styles.thumbWrap}>
                  <Image source={{ uri: item.image }} style={styles.thumb} />
                  {item.discount > 0 && (
                    <View style={[styles.badge, { position: 'absolute', top: 8, left: 8, backgroundColor: '#EF4444' }]}>
                      <Text style={[styles.badgeText, { color: '#FFF' }]}>-{item.discount}%</Text>
                    </View>
                  )}
                  {!item.inStock && (
                    <View style={styles.soldoutOverlay}>
                      <Text style={{ color: '#FFF', fontSize: 12, fontFamily: 'Inter', fontWeight: '600' }}>품절</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardContent}>
                  <View style={{ gap: 6 }}>
                    <View style={styles.rowBetween}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemBrand}>{item.brand}</Text>
                      </View>
                      <Pressable hitSlop={8}>
                        <Heart size={16} color="#9CA3AF" />
                      </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Star size={14} color="#F59E0B" />
                        <Text style={styles.metaText}>{item.rating}</Text>
                        <Text style={styles.metaSub}>({item.reviews})</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <View
                          style={[
                            styles.dot,
                            { backgroundColor: item.matchScore >= 90 ? '#22C55E' : '#EAB308' },
                          ]}
                        />
                        <Text style={styles.metaText}>매치 {item.matchScore}%</Text>
                      </View>
                    </View>

                    <Text style={styles.reasonText}>{item.reason}</Text>

                    <View style={styles.rowBetween}>
                      <View style={{ gap: 4 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Text style={styles.price}>{item.price}</Text>
                          {item.originalPrice ? (
                            <Text style={styles.priceStrike}>{item.originalPrice}</Text>
                          ) : null}
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                          {item.tags.map((t, i) => (
                            <View key={i} style={[styles.badge, styles.badgeOutline]}>
                              <Text style={styles.badgeOutlineText}>{t}</Text>
                            </View>
                          ))}
                          {item.fastShipping && (
                            <View style={[styles.badge, { backgroundColor: '#DBEAFE' }]}>
                              <Text style={[styles.badgeText, { color: '#1D4ED8' }]}>빠른배송</Text>
                            </View>
                          )}
                        </View>
                      </View>

                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Pressable style={[styles.ghostBtn, { paddingHorizontal: 10, paddingVertical: 8 }]}>
                          <ExternalLink size={12} color="#111" />
                        </Pressable>
                        <Pressable
                          disabled={!item.inStock}
                          style={[
                            styles.primaryBtn,
                            { paddingHorizontal: 12, paddingVertical: 8, opacity: item.inStock ? 1 : 0.5 },
                          ]}
                        >
                          <Text style={styles.primaryBtnText}>{item.inStock ? '장바구니' : '품절'}</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 스타일링 제안 */}
        <View style={styles.cardSoft}>
          <View style={{ gap: 12 }}>
            <Text style={styles.sectionTitle}>💡 스타일링 제안</Text>
            <View style={{ gap: 6 }}>
              <Text style={styles.tipText}>• 트렌치 코트 + 화이트 셔츠 + 블랙 팬츠로 클래식한 오피스룩 완성</Text>
              <Text style={styles.tipText}>• 미니멀 백과 화이트 스니커즈로 캐주얼 다운 스타일링</Text>
              <Text style={styles.tipText}>• 봄 시즌 레이어드 룩으로 다양한 상황에 대응 가능</Text>
            </View>
            <Pressable
              style={[
                styles.ghostBtn,
                { borderWidth: StyleSheet.hairlineWidth, borderColor: '#D1D5DB', alignItems: 'center', paddingVertical: 10 },
              ]}
            >
              <Text style={styles.ghostText}>전체 코디 세트로 구매하기</Text>
            </Pressable>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: { padding: 8, borderRadius: 8 },

  title: { fontSize: 20, fontWeight: '600', letterSpacing: 0.3, color: '#0B0B0B', fontFamily: 'PlayfairDisplay-SemiBold' },
  subtitle: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter', fontWeight: '300' },

  screenPad: { paddingHorizontal: 24, paddingVertical: 24, gap: 24 },

  searchIcon: { position: 'absolute', left: 12, top: 14 },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 10,
    paddingLeft: 36,
    paddingRight: 44,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter',
  },
  filterBtn: {
    position: 'absolute',
    right: 8,
    top: 6,
    padding: 8,
    borderRadius: 8,
  },

  sectionLabel: { fontFamily: 'Inter', color: '#111827', fontWeight: '600' },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipSm: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  chipIdle: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  chipActive: { backgroundColor: '#111111', borderColor: '#111111' },
  chipText: { color: '#111827', fontFamily: 'Inter', fontSize: 13, fontWeight: '300' },
  chipSmText: { color: '#111827', fontFamily: 'Inter', fontSize: 12, fontWeight: '300' },
  chipTextActive: { color: '#FFFFFF', fontWeight: '500' },

  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0B0B0B', fontFamily: 'PlayfairDisplay-SemiBold' },
  countText: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter', fontWeight: '300' },

  // ✅ 누락되어 오류났던 스타일
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  cardRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    flexDirection: 'row',
  },
  thumbWrap: { width: 96, height: 128, position: 'relative', backgroundColor: '#F3F4F6' },
  thumb: { width: '100%', height: '100%' },
  soldoutOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: { flex: 1, padding: 12 },
  itemName: { fontSize: 14, color: '#111827', fontFamily: 'Inter', fontWeight: '600' },
  itemBrand: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter', fontWeight: '300' },

  metaText: { fontSize: 12, color: '#111827', fontFamily: 'Inter', fontWeight: '300' },
  metaSub: { fontSize: 12, color: '#9CA3AF', fontFamily: 'Inter', fontWeight: '300' },
  reasonText: { fontSize: 12, color: '#4B5563', fontFamily: 'Inter', fontWeight: '300' },

  price: { fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#111827' },
  priceStrike: {
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter',
    fontWeight: '300',
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  badgeText: { fontSize: 11, fontFamily: 'Inter', fontWeight: '500', color: '#111827' },
  badgeOutline: { backgroundColor: '#FFFFFF', borderWidth: StyleSheet.hairlineWidth, borderColor: '#E5E7EB' },
  badgeOutlineText: { fontSize: 11, fontFamily: 'Inter', fontWeight: '300', color: '#111827' },

  dot: { width: 8, height: 8, borderRadius: 999 },

  primaryBtn: { backgroundColor: '#111111', borderRadius: 8 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontFamily: 'Inter', fontWeight: '500' },
  ghostBtn: { backgroundColor: '#FFFFFF', borderRadius: 8 },
  ghostText: { color: '#111827', fontSize: 13, fontFamily: 'Inter', fontWeight: '300' },

  cardSoft: {
    backgroundColor: '#F6F7F8',
    padding: 16,
    borderRadius: 8,
  },

  tipText: { color: '#4B5563', fontSize: 13, fontFamily: 'Inter' },
});
