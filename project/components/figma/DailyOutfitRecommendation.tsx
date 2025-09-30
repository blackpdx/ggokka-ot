// project/components/figma/DailyOutfitRecommendation.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Cloud,
  Thermometer,
  Calendar,
  MapPin,
  RefreshCw,
} from 'lucide-react-native';
import AppHeader from '../common/AppHeader';
import BottomNavBar from '../common/BottomNavBar';

// 네비게이션 타입을 정의합니다.
type NavigationStep =
  | 'today-curation'
  | 'daily-outfit'
  | 'wardrobe-management'
  | 'style-analysis'
  | 'shopping'
  | 'virtual-fitting';

type Rec = {
  id: number;
  image: string;
  title: string;
  items: string[];
  score: number;
  reason: string;
};

// onNavigate 프롭을 추가합니다.
export default function DailyOutfitRecommendation({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (step: NavigationStep) => void;
}) {
  const [selectedOccasion, setSelectedOccasion] = useState<
    'daily' | 'work' | 'date' | 'party' | 'casual' | 'formal'
  >('daily');
  const [loading, setLoading] = useState(false);

  const occasions = [
    { id: 'daily', name: '데일리', icon: '☀️' },
    { id: 'work', name: '업무', icon: '💼' },
    { id: 'date', name: '데이트', icon: '💕' },
    { id: 'party', name: '파티', icon: '🎉' },
    { id: 'casual', name: '캐주얼', icon: '👕' },
    { id: 'formal', name: '포멀', icon: '👔' },
  ] as const;

  const data = useMemo<Record<typeof occasions[number]['id'], Rec[]>>(
    () => ({
      daily: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80',
          title: '스프링 캐주얼',
          items: ['화이트 블라우스', '데님 재킷', '베이지 팬츠', '화이트 스니커즈'],
          score: 94,
          reason: '날씨와 스타일 선호도에 완벽 매치',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=800&q=80',
          title: '미니멀 시크',
          items: ['블랙 니트', '그레이 슬랙스', '블랙 로퍼', '심플 백'],
          score: 89,
          reason: '깔끔하고 세련된 일상 스타일',
        },
      ],
      work: [], date: [], party: [], casual: [], formal: []
    }),
    []
  );

  const recommendations = data[selectedOccasion];

  const avgScore =
    recommendations.length > 0
      ? Math.round(
          (recommendations.reduce((acc, r) => acc + r.score, 0) / recommendations.length) * 1
        )
      : 0;

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  }, []);

  async function onRefresh() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  }

  // BottomNavBar의 screen 이름을 NavigationStep으로 매핑하는 함수를 추가합니다.
  const handleNavigation = (screen: string) => {
    const map: Record<string, NavigationStep> = {
      Home: 'today-curation',
      Wardrobe: 'wardrobe-management',
      Analysis: 'style-analysis',
      Fitting: 'virtual-fitting',
      Shopping: 'shopping',
    };
    if (map[screen]) {
      onNavigate(map[screen]);
    }
  };

  const HeaderRightAction = (
    <Pressable onPress={onRefresh} style={styles.refreshBtn} disabled={loading}>
      {loading ? <ActivityIndicator color="#FFF" size="small" /> : <RefreshCw size={16} color="#FFF" />}
      <Text style={styles.refreshText}>{loading ? '생성중...' : '새로 추천'}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader
        title="오늘 뭐 입지?"
        subtitle="AI 맞춤 코디 추천"
        onBack={onBack}
        rightAction={HeaderRightAction}
      />

      <ScrollView contentContainerStyle={styles.screenPad}>
        {/* ... (이하 코드는 변경 없음) ... */}
      </ScrollView>

      {/* BottomNavBar에 onNavigate 함수를 전달합니다. */}
      <BottomNavBar onNavigate={handleNavigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  refreshBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#111111',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refreshText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  screenPad: { padding: 16, gap: 24, paddingBottom: 32 },
  weatherCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  weatherIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  weatherRow: { flexDirection: 'row', gap: 10, marginTop: 4, flexWrap: 'wrap' },
  inlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  weatherMeta: { fontSize: 12, color: '#374151' },
  weatherMain: { fontSize: 16, fontWeight: '600', color: '#111827', textAlign: 'right' },
  weatherSub: { fontSize: 12, color: '#6B7280' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#0B0B0B' },
  occGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  occBtn: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  occIdle: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  occActive: { backgroundColor: '#111111', borderColor: '#111111' },
  occEmoji: { fontSize: 20 },
  occText: { fontSize: 13, color: '#111' },
  occTextActive: { color: '#FFF', fontWeight: '600' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badgeSoftGreen: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeSoftGreenText: { color: '#166534', fontSize: 12, fontWeight: '600' },
  cardRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1.5,
    borderColor: '#F3F4F6'
  },
  thumbBig: { width: 96, height: 'auto', backgroundColor: '#EEE' },
  thumbImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  bestBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#111',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bestBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  scoreText: { fontSize: 12, color: '#111827', fontWeight: '600' },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: { fontSize: 11, color: '#4B5563' },
  reason: { fontSize: 12, color: '#6B7280' },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  btnPrimary: { backgroundColor: '#111' },
  btnPrimaryText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  btnOutline: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB' },
  btnOutlineText: { color: '#111', fontSize: 13, fontWeight: '600' },
});