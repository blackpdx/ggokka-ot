// components/figma/DailyOutfitRecommendation.tsx
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
  ArrowLeft,
  Cloud,
  Thermometer,
  Calendar,
  MapPin,
  RefreshCw,
} from 'lucide-react-native';

type Rec = {
  id: number;
  image: string;
  title: string;
  items: string[];
  score: number;
  reason: string;
};

export default function DailyOutfitRecommendation({ onBack }: { onBack: () => void }) {
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
      work: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
          title: '프로페셔널 시크',
          items: ['네이비 블레이저', '화이트 셔츠', '그레이 팬츠', '블랙 펌프스'],
          score: 96,
          reason: '비즈니스 환경에 완벽한 전문적 룩',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
          title: '모던 오피스 룩',
          items: ['베이지 재킷', '스트라이프 셔츠', '블랙 스커트', '누드 힐'],
          score: 91,
          reason: '세련되고 편안한 업무용 스타일',
        },
      ],
      date: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80',
          title: '로맨틱 페미닌',
          items: ['플라워 원피스', '카디건', '발레 플랫', '크로스백'],
          score: 93,
          reason: '데이트에 완벽한 로맨틱한 무드',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
          title: '엘레강트 시크',
          items: ['실크 블라우스', '하이웨이스트 스커트', '하이힐', '클러치백'],
          score: 88,
          reason: '우아하고 세련된 데이트 룩',
        },
      ],
      party: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
          title: '글래머러스 파티',
          items: ['시퀸 드레스', '스트래피 힐', '클러치백', '골드 액세서리'],
          score: 95,
          reason: '파티에서 시선을 사로잡는 화려한 룩',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
          title: '세련된 칵테일',
          items: ['리틀 블랙 드레스', '블레이저', '하이힐', '스테이트먼트 귀걸이'],
          score: 90,
          reason: '우아하면서도 적당히 화려한 파티 룩',
        },
      ],
      casual: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
          title: '편안한 캐주얼',
          items: ['오버사이즈 티셔츠', '데님 팬츠', '컨버스 스니커즈', '백팩'],
          score: 92,
          reason: '편안하고 자연스러운 캐주얼 룩',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
          title: '스트릿 캐주얼',
          items: ['후드티', '조거 팬츠', '스니커즈', '크로스백'],
          score: 87,
          reason: '트렌디한 스트릿 스타일',
        },
      ],
      formal: [
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
          title: '클래식 포멀',
          items: ['블랙 수트', '화이트 셔츠', '블랙 타이', '드레스 슈즈'],
          score: 97,
          reason: '격식있는 자리에 완벽한 포멀 룩',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80',
          title: '엘레강트 포멀',
          items: ['미디 드레스', '재킷', '하이힐', '클러치백'],
          score: 94,
          reason: '우아하고 품격있는 포멀 스타일',
        },
      ],
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
    // 실제로는 API 호출; 여기선 1초 대기 후 끝
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <Pressable onPress={onBack} style={styles.iconBtn}>
            <ArrowLeft size={20} color="#111" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>오늘 뭐 입지?</Text>
            <Text style={styles.headerSub}>AI 맞춤 코디 추천</Text>
          </View>
          <Pressable onPress={onRefresh} style={styles.refreshBtn} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <RefreshCw size={16} color="#FFF" />}
            <Text style={styles.refreshText}>{loading ? '생성중...' : '새로 추천'}</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.screenPad}>
        {/* 날씨 카드 */}
        <View style={styles.weatherCard}>
          <View style={styles.weatherLeft}>
            <View style={styles.weatherIcon}>
              <Cloud size={24} color="#FFF" />
            </View>
            <View>
              <Text style={styles.weatherTitle}>오늘의 날씨</Text>
              <View style={styles.weatherRow}>
                <View style={styles.inlineRow}>
                  <Thermometer size={14} color="#374151" />
                  <Text style={styles.weatherMeta}>22°C</Text>
                </View>
                <View style={styles.inlineRow}>
                  <MapPin size={14} color="#374151" />
                  <Text style={styles.weatherMeta}>서울시 강남구</Text>
                </View>
                <View style={styles.inlineRow}>
                  <Calendar size={14} color="#374151" />
                  <Text style={styles.weatherMeta}>{todayStr}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.weatherMain}>맑음</Text>
            <Text style={styles.weatherSub}>습도 45%</Text>
          </View>
        </View>

        {/* 상황 선택 */}
        <View style={{ gap: 12 }}>
          <Text style={styles.sectionTitle}>어떤 상황인가요?</Text>
          <View style={styles.occGrid}>
            {occasions.map((o) => {
              const active = selectedOccasion === o.id;
              return (
                <Pressable
                  key={o.id}
                  onPress={() => setSelectedOccasion(o.id)}
                  style={[styles.occBtn, active ? styles.occActive : styles.occIdle]}
                >
                  <Text style={styles.occEmoji}>{o.icon}</Text>
                  <Text style={[styles.occText, active && styles.occTextActive]}>{o.name}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* AI 추천 */}
        <View style={{ gap: 12 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>AI 추천 코디</Text>
            <View style={styles.badgeSoftGreen}>
              <Text style={styles.badgeSoftGreenText}>맞춤도 {avgScore}%</Text>
            </View>
          </View>

          <View style={{ gap: 10 }}>
            {recommendations.map((rec, idx) => (
              <View
                key={rec.id}
                style={[
                  styles.cardRow,
                  idx === 0 && { borderColor: '#111', borderWidth: 1.5 },
                ]}
              >
                <View style={styles.thumbBig}>
                  <Image source={{ uri: rec.image }} style={styles.thumbImg} />
                  {idx === 0 ? (
                    <View style={styles.bestBadge}>
                      <Text style={styles.bestBadgeText}>BEST</Text>
                    </View>
                  ) : null}
                </View>

                <View style={{ flex: 1, padding: 12, gap: 8 }}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>{rec.title}</Text>
                    <View style={styles.rowCenter}>
                      <View
                        style={[
                          styles.dot,
                          { backgroundColor: rec.score >= 90 ? '#22C55E' : rec.score >= 80 ? '#EAB308' : '#9CA3AF' },
                        ]}
                      />
                      <Text style={styles.scoreText}>{rec.score}%</Text>
                    </View>
                  </View>

                  <View style={styles.tagWrap}>
                    {rec.items.map((it) => (
                      <View key={it} style={styles.tag}>
                        <Text style={styles.tagText}>{it}</Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.reason}>{rec.reason}</Text>

                  <View style={{ flexDirection: 'row', gap: 8, paddingTop: 2 }}>
                    <Pressable style={[styles.btn, styles.btnPrimary]}>
                      <Text style={styles.btnPrimaryText}>이 코디 선택</Text>
                    </Pressable>
                    <Pressable style={[styles.btn, styles.btnOutline]}>
                      <Text style={styles.btnOutlineText}>상세보기</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 추가 옵션 */}
        <View style={styles.extraCard}>
          <Text style={styles.sectionTitle}>더 정확한 추천을 위해</Text>
          <View style={{ gap: 8, marginTop: 8 }}>
            <Pressable style={[styles.btn, styles.btnOutline, { justifyContent: 'flex-start' }]}>
              <Text style={styles.btnOutlineText}>📸 오늘 기분이나 선호 스타일 알려주기</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.btnOutline, { justifyContent: 'flex-start' }]}>
              <Text style={styles.btnOutlineText}>🎯 특별한 이벤트나 만날 사람 설정</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.btnOutline, { justifyContent: 'flex-start' }]}>
              <Text style={styles.btnOutlineText}>🏃‍♀️ 오늘 활동 계획 입력하기</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 8, borderRadius: 8 },

  headerTitle: { fontSize: 18, fontWeight: '600', letterSpacing: 0.3, color: '#0B0B0B' },
  headerSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  refreshBtn: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#111111',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refreshText: { color: '#FFFFFF', fontSize: 12 },

  screenPad: { padding: 16, gap: 16 },

  weatherCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 0,
    elevation: 1,
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
    justifyContent: 'space-between',
  },
  occBtn: {
    width: '32%',
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
    borderColor: '#BBF7D0',
    borderWidth: 1,
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
  },
  thumbBig: { width: 96, height: 128, backgroundColor: '#EEE' },
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
  scoreText: { fontSize: 12, color: '#111827' },

  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: { fontSize: 11, color: '#111827' },

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

  extraCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 16,
  },
});
