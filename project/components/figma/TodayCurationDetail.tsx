// components/figma/TodayCurationDetail.tsx
import { ArrowLeft, Bookmark, Heart, Share2 } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type TodayCurationDetailProps = {
  onBack: () => void;
};

type Outfit = {
  id: number;
  image: string;
  title: string;
  description: string;
  temperature: string;
  occasion: string;
  likes: number;
  liked?: boolean;
};

const Badge = ({
  label,
  light,
  outline,
}: {
  label: string;
  light?: boolean;
  outline?: boolean;
}) => (
  <View
    style={[
      styles.badge,
      light && styles.badgeLight,
      outline && styles.badgeOutline,
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        (light || outline) && styles.badgeTextLight,
      ]}
    >
      {label}
    </Text>
  </View>
);

export default function TodayCurationDetail({ onBack }: TodayCurationDetailProps) {
  const [bookmarked, setBookmarked] = useState(false);

  const initialOutfits = useMemo<Outfit[]>(
    () => [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
        title: '모던 레이어드 룩',
        description: '가벼운 니트와 트렌치코트의 완벽한 조합',
        temperature: '18-22°C',
        occasion: '데일리/오피스',
        likes: 127,
        liked: false,
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
        title: '캐주얼 시크',
        description: '편안하면서도 세련된 일상 스타일링',
        temperature: '20-25°C',
        occasion: '캐주얼/데이트',
        likes: 89,
        liked: false,
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        title: '미니멀 엘레강스',
        description: '절제된 아름다움의 정수',
        temperature: '15-20°C',
        occasion: '포멀/미팅',
        likes: 203,
        liked: false,
      },
    ],
    []
  );

  const [outfits, setOutfits] = useState<Outfit[]>(initialOutfits);

  const toggleLike = (id: number) => {
    setOutfits((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              liked: !o.liked,
              likes: o.liked ? o.likes - 1 : o.likes + 1,
            }
          : o
      )
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Pressable onPress={onBack} style={styles.iconBtn}>
              <ArrowLeft size={20} color="#111" />
            </Pressable>
            <View>
              <Text style={styles.title}>오늘의 큐레이션</Text>
              <Text style={styles.subtitle}>22°C · 맑음</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Pressable
              onPress={() => setBookmarked((b) => !b)}
              style={styles.iconBtn}
            >
              <Bookmark
                size={20}
                color={bookmarked ? '#111' : '#6B7280'}
                fill={bookmarked ? '#111' : 'none'}
              />
            </Pressable>
            <Pressable
              onPress={() => Alert.alert('공유', '공유 기능은 이후 연결됩니다.')}
              style={styles.iconBtn}
            >
              <Share2 size={20} color="#6B7280" />
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.screenPad}>
        {/* 메인 설명 카드 (그라데이션 느낌으로 짙은 배경) */}
        <View style={styles.heroCard}>
          <View style={{ gap: 12 }}>
            <Text style={styles.heroTitle}>가벼운 레이어드 스타일링</Text>
            <Text style={styles.heroDesc}>
              오늘 같은 날씨에는 얇은 니트나 블라우스 위에 가벼운 재킷이나 카디건을
              걸치는 레이어드 스타일이 완벽합니다. 아침저녁 쌀쌀할 때는 겉옷으로
              체온을 조절하고, 낮에는 벗어서 시원하게 입을 수 있어요.
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Badge label="레이어드" light />
              <Badge label="데일리" light />
              <Badge label="오피스룩" light />
            </View>
          </View>
        </View>

        {/* 추천 코디 리스트 */}
        <View style={{ gap: 12 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>추천 스타일링</Text>
            <Text style={styles.countText}>{outfits.length}개 추천</Text>
          </View>

          <View style={{ gap: 12 }}>
            {outfits.map((o) => (
              <View key={o.id} style={styles.cardRow}>
                <Image source={{ uri: o.image }} style={styles.thumb} />
                <View style={styles.cardContent}>
                  <View style={{ gap: 8, flex: 1 }}>
                    <View>
                      <Text style={styles.itemTitle}>{o.title}</Text>
                      <Text style={styles.itemDesc}>{o.description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
                      <Badge label={o.temperature} outline />
                      <Badge label={o.occasion} outline />
                    </View>
                  </View>

                  <View style={styles.rowBetween}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Pressable onPress={() => toggleLike(o.id)} hitSlop={8}>
                        <Heart
                          size={16}
                          color={o.liked ? '#EF4444' : '#6B7280'}
                          fill={o.liked ? '#EF4444' : 'none'}
                        />
                      </Pressable>
                      <Text style={styles.likesText}>{o.likes}</Text>
                    </View>
                    <Pressable
                      onPress={() => Alert.alert('상세', '상세보기는 이후 연결됩니다.')}
                      style={[styles.ghostBtn, { paddingHorizontal: 12, paddingVertical: 8 }]}
                    >
                      <Text style={styles.ghostText}>상세보기</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 스타일링 팁 */}
        <View style={styles.cardSoft}>
          <View style={{ gap: 12 }}>
            <Text style={styles.sectionTitle}>스타일링 팁</Text>

            <View style={styles.tipRow}>
              <View style={styles.bullet} />
              <Text style={styles.tipText}>
                얇은 소재부터 두꺼운 소재 순으로 레이어링하세요
              </Text>
            </View>
            <View style={styles.tipRow}>
              <View style={styles.bullet} />
              <Text style={styles.tipText}>
                색상은 2-3가지 이내로 제한하여 통일감을 주세요
              </Text>
            </View>
            <View style={styles.tipRow}>
              <View style={styles.bullet} />
              <Text style={styles.tipText}>
                벗었을 때도 완성된 스타일이 되도록 신경써주세요
              </Text>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: { padding: 8, borderRadius: 8 },

  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#0B0B0B',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  subtitle: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter', fontWeight: '300' },

  screenPad: { paddingHorizontal: 24, paddingVertical: 24, gap: 24 },

  heroCard: {
    backgroundColor: '#1F2937', // 짙은 회색(그라데이션 대체)
    borderRadius: 8,
    padding: 20,
  },
  heroTitle: { color: '#FFFFFF', fontSize: 22, fontFamily: 'PlayfairDisplay-SemiBold' },
  heroDesc: { color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 20, fontFamily: 'Inter', fontWeight: '300' },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#111827',
    borderWidth: 0,
  },
  badgeLight: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontFamily: 'Inter', fontWeight: '500' },
  badgeTextLight: { color: '#111827' },

  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0B0B0B', fontFamily: 'PlayfairDisplay-SemiBold' },
  countText: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter', fontWeight: '300' },
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
  thumb: { width: 128, height: 160, backgroundColor: '#F3F4F6' },
  cardContent: { flex: 1, padding: 16, gap: 10 },

  itemTitle: { fontSize: 16, color: '#111827', fontFamily: 'Inter', fontWeight: '600' },
  itemDesc: { fontSize: 13, color: '#4B5563', fontFamily: 'Inter', fontWeight: '300' },

  likesText: { fontSize: 13, color: '#6B7280', fontFamily: 'Inter', fontWeight: '300' },

  ghostBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
    borderRadius: 8,
  },
  ghostText: { color: '#111827', fontSize: 13, fontFamily: 'Inter', fontWeight: '300' },

  cardSoft: { backgroundColor: '#F6F7F8', padding: 16, borderRadius: 8 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  bullet: { width: 6, height: 6, borderRadius: 999, backgroundColor: '#111', marginTop: 6 },
  tipText: { color: '#4B5563', fontSize: 13, fontFamily: 'Inter', fontWeight: '300' },
});
