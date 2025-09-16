// components/figma/StyleAnalysisDetail.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, Palette, Calendar, Target } from 'lucide-react-native';

type Period = 'week' | 'month' | 'season' | 'year';

export default function StyleAnalysisDetail({ onBack }: { onBack: () => void }) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');

  const periods: { id: Period; name: string }[] = useMemo(
    () => [
      { id: 'week', name: '이번 주' },
      { id: 'month', name: '이번 달' },
      { id: 'season', name: '이번 시즌' },
      { id: 'year', name: '올해' },
    ],
    []
  );

  const styleAnalysis = useMemo(
    () => ({
      dominantStyle: '미니멀',
      styleConfidence: 89,
      colorPalette: [
        { color: '#000000', name: '블랙', percentage: 35 },
        { color: '#FFFFFF', name: '화이트', percentage: 28 },
        { color: '#8B7355', name: '베이지', percentage: 20 },
        { color: '#4A5568', name: '그레이', percentage: 17 },
      ],
      styleBreakdown: [
        { style: '미니멀', percentage: 45, description: '깔끔하고 절제된 스타일' },
        { style: '캐주얼', percentage: 25, description: '편안하고 자연스러운 룩' },
        { style: '클래식', percentage: 20, description: '시간을 초월한 우아함' },
        { style: '모던', percentage: 10, description: '현대적이고 트렌디한 감각' },
      ],
      weeklyTrends: [
        { day: '월', outfits: 2, style: '오피스 캐주얼' },
        { day: '화', outfits: 1, style: '미니멀' },
        { day: '수', outfits: 2, style: '캐주얼' },
        { day: '목', outfits: 1, style: '클래식' },
        { day: '금', outfits: 2, style: '세미 포멀' },
        { day: '토', outfits: 3, style: '캐주얼' },
        { day: '일', outfits: 1, style: '편안함' },
      ],
    }),
    []
  );

  const recommendations = useMemo(
    () => [
      {
        title: '컬러 다양성 확대',
        description:
          '현재 중성 색상 위주의 코디가 많아. 포인트 컬러나 파스텔 톤을 추가해보자.',
        priority: 'high' as const,
        action: '새로운 컬러 아이템 추천받기',
      },
      {
        title: '스타일 밸런스',
        description:
          '미니멀 비중이 높아. 가끔은 볼드한 패턴이나 텍스처도 시도해보자.',
        priority: 'medium' as const,
        action: '패턴 아이템 찾아보기',
      },
      {
        title: '액세서리 활용',
        description:
          '기본 스타일에 액세서리로 포인트 주면 더 다채로워져.',
        priority: 'low' as const,
        action: '액세서리 추천받기',
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <Pressable onPress={onBack} style={styles.iconBtn}>
            <ArrowLeft size={20} color="#111" />
          </Pressable>
          <View>
            <Text style={styles.headerTitle}>스타일 분석</Text>
            <Text style={styles.headerSub}>AI 기반 개인 스타일 리포트</Text>
          </View>
          <View style={{ width: 36 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.screenPad}>
        {/* 기간 선택 */}
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {periods.map((p) => {
            const active = p.id === selectedPeriod;
            return (
              <Pressable
                key={p.id}
                style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
                onPress={() => setSelectedPeriod(p.id)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{p.name}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* 주요 스타일 카드 */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>당신의 주요 스타일</Text>
              <Text style={styles.heroMain}>{styleAnalysis.dominantStyle}</Text>
              <Text style={styles.heroDesc}>{styleAnalysis.styleBreakdown[0].description}</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.heroScore}>{styleAnalysis.styleConfidence}%</Text>
              <Text style={styles.heroScoreSub}>스타일 일관성</Text>
            </View>
          </View>
        </View>

        {/* 스타일 구성 */}
        <View style={{ gap: 12 }}>
          <View style={styles.sectionTitleRow}>
            <TrendingUp size={18} color="#111827" />
            <Text style={styles.sectionTitle}>스타일 구성</Text>
          </View>
          <View style={{ gap: 12 }}>
            {styleAnalysis.styleBreakdown.map((s) => (
              <View key={s.style} style={{ gap: 6 }}>
                <View style={styles.rowBetween}>
                  <Text style={styles.labelStrong}>{s.style}</Text>
                  <Text style={styles.labelMuted}>{s.percentage}%</Text>
                </View>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFg, { width: `${s.percentage}%` }]} />
                </View>
                <Text style={styles.descMuted}>{s.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 컬러 팔레트 */}
        <View style={{ gap: 12 }}>
          <View style={styles.sectionTitleRow}>
            <Palette size={18} color="#111827" />
            <Text style={styles.sectionTitle}>선호 컬러 팔레트</Text>
          </View>
          <View style={styles.paletteGrid}>
            {styleAnalysis.colorPalette.map((c) => (
              <View key={c.name} style={styles.cardSoft}>
                <View style={styles.cardPad}>
                  <View style={styles.paletteRow}>
                    <View style={[styles.colorDot, { backgroundColor: c.color }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.labelStrong}>{c.name}</Text>
                      <Text style={styles.labelMutedSmall}>{c.percentage}%</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 주간 트렌드 */}
        <View style={{ gap: 12 }}>
          <View style={styles.sectionTitleRow}>
            <Calendar size={18} color="#111827" />
            <Text style={styles.sectionTitle}>주간 스타일 트렌드</Text>
          </View>
          <View style={styles.cardSoft}>
            <View style={[styles.cardPad, { gap: 12 }]}>
              {styleAnalysis.weeklyTrends.map((d) => (
                <View key={d.day} style={styles.rowBetween}>
                  <View style={styles.rowCenter}>
                    <View style={styles.dayBadge}>
                      <Text style={styles.dayBadgeText}>{d.day}</Text>
                    </View>
                    <Text style={styles.bodyText}>{d.style}</Text>
                  </View>
                  <View style={styles.rowCenter}>
                    <Text style={styles.labelMutedSmall}>{d.outfits}벌</Text>
                    <View style={styles.dotRow}>
                      {Array.from({ length: d.outfits }).map((_, i) => (
                        <View key={i} style={styles.dot} />
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* 개선 제안 */}
        <View style={{ gap: 12 }}>
          <View style={styles.sectionTitleRow}>
            <Target size={18} color="#111827" />
            <Text style={styles.sectionTitle}>스타일 개선 제안</Text>
          </View>

          <View style={{ gap: 10 }}>
            {recommendations.map((rec) => (
              <View key={rec.title} style={styles.cardSoft}>
                <View style={[styles.cardPad, { gap: 10 }]}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>{rec.title}</Text>
                    <View
                      style={[
                        styles.badge,
                        rec.priority === 'high'
                          ? styles.badgeRed
                          : rec.priority === 'medium'
                          ? styles.badgeYellow
                          : styles.badgeGreen,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          rec.priority === 'high'
                            ? styles.badgeTextRed
                            : rec.priority === 'medium'
                            ? styles.badgeTextYellow
                            : styles.badgeTextGreen,
                        ]}
                      >
                        {rec.priority === 'high'
                          ? '높음'
                          : rec.priority === 'medium'
                          ? '보통'
                          : '낮음'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.descMuted}>{rec.description}</Text>
                  <Pressable style={[styles.btn, styles.btnOutline]}>
                    <Text style={styles.btnOutlineText}>{rec.action}</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 액션 버튼 */}
        <View style={styles.actionRow}>
          <Pressable style={[styles.btn, styles.btnPrimary]}>
            <Text style={styles.btnPrimaryText}>맞춤 스타일링 받기</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnOutline]}>
            <Text style={styles.btnOutlineText}>리포트 공유하기</Text>
          </Pressable>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'space-between' },
  iconBtn: { padding: 8, borderRadius: 8 },

  headerTitle: { fontSize: 18, fontWeight: '600', color: '#0B0B0B' },
  headerSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  screenPad: { padding: 16, gap: 16 },

  // chips
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderRadius: 8 },
  chipIdle: { backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' },
  chipActive: { backgroundColor: '#111111', borderColor: '#111111' },
  chipText: { fontSize: 13, color: '#111' },
  chipTextActive: { color: '#FFF', fontWeight: '600' },

  // hero
  heroCard: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 16,
  },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  heroTitle: { color: '#E5E7EB', fontSize: 16, marginBottom: 6 },
  heroMain: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  heroDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 6 },
  heroScore: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  heroScoreSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 },

  // section
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0B0B0B' },

  // labels
  labelStrong: { fontSize: 14, fontWeight: '600', color: '#111827' },
  labelMuted: { fontSize: 12, color: '#6B7280' },
  labelMutedSmall: { fontSize: 11, color: '#6B7280' },
  bodyText: { fontSize: 14, color: '#111827' },
  descMuted: { fontSize: 12, color: '#6B7280' },

  // progress
  progressBg: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFg: {
    height: '100%',
    backgroundColor: '#111111',
    borderRadius: 999,
  },

  // cards
  cardSoft: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  cardPad: { padding: 12 },

  // palette
  paletteGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  paletteRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  // weekly
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dayBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeText: { fontSize: 12, fontWeight: '700', color: '#111827' },
  dotRow: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#111111' },

  // badges
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, borderWidth: 1 },
  badgeRed: { backgroundColor: '#FEE2E2', borderColor: '#FECACA' },
  badgeYellow: { backgroundColor: '#FEF9C3', borderColor: '#FEF08A' },
  badgeGreen: { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' },
  badgeText: { fontSize: 12, fontWeight: '700' },
  badgeTextRed: { color: '#991B1B' },
  badgeTextYellow: { color: '#92400E' },
  badgeTextGreen: { color: '#166534' },

  // buttons
  actionRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnPrimary: { backgroundColor: '#111111' },
  btnPrimaryText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  btnOutline: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB' },
  btnOutlineText: { color: '#111111', fontSize: 14, fontWeight: '700' },
});
