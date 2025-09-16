// components/figma/homescreen.tsx
import {
  Ban,
  Bell,
  Clock,
  CreditCard,
  Heart,
  HelpCircle,
  Menu,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ← 이걸 따로 임포트



type NavigationStep =
  | 'today-curation'
  | 'daily-outfit'
  | 'wardrobe-management'
  | 'style-analysis'
  | 'shopping'
  | 'recent-styling'
  | 'blocked-outfits'
  | 'virtual-fitting';


export interface HomeScreenProps {
  onNavigate?: (step: NavigationStep) => void;
  userName?: string;
  lovedOutfitsCount?: number;
  blockedOutfitsCount?: number;
}

const Divider = () => <View style={styles.divider} />;

const Badge = ({ label }: { label: string }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

const GhostButton = ({ title, onPress }: { title: string; onPress?: () => void }) => (
  <Pressable onPress={onPress} style={styles.ghostBtn}>
    <Text style={styles.ghostBtnText}>{title}</Text>
  </Pressable>
);

const SolidButton = ({
  title,
  onPress,
  dark,
  compact,
}: {
  title: string;
  onPress?: () => void;
  dark?: boolean;
  compact?: boolean;
}) => (
  <Pressable
    onPress={onPress}
    style={[styles.solidBtn, dark && styles.solidBtnDark, compact && styles.solidBtnCompact]}
  >
    <Text style={[styles.solidBtnText, dark && styles.solidBtnTextDark]}>{title}</Text>
  </Pressable>
);

export default function HomeScreen({
  onNavigate = () => {},
  userName = '사용자',
  lovedOutfitsCount = 0,
  blockedOutfitsCount = 0,
}: HomeScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const todayWeather = useMemo(
    () => ({
      temp: '22°C',
      condition: '맑음',
      recommendation: '가벼운 레이어드 스타일링 추천',
    }),
    []
  );

  const recentOutfits = useMemo(
    () => [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1739415616419-247f50c8116e?auto=format&fit=crop&w=600&q=80',
        likes: 24,
        style: '엘레강스',
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/photo-1719956492682-9109878066c8?auto=format&fit=crop&w=600&q=80',
        likes: 18,
        style: '스트릿',
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=600&q=80',
        likes: 32,
        style: '미니멀',
      },
    ],
    []
  );

  const quickActions: Array<{
    title: string;
    subtitle: string;
    image: string;
    action: NavigationStep;
  }> = useMemo(
    () => [
      {
        title: '오늘 뭐 입지?',
        subtitle: '상황별 추천',
        image:
          'https://images.unsplash.com/photo-1608680480325-d3ec3cdf7e60?auto=format&fit=crop&w=800&q=80',
        action: 'daily-outfit',
      },
      {
        title: '내 옷장',
        subtitle: '관리 & 정리',
        image:
          'https://images.unsplash.com/photo-1603798125914-7b5d27789248?auto=format&fit=crop&w=800&q=80',
        action: 'wardrobe-management',
      },
      {
        title: '스타일 분석',
        subtitle: '취향 리포트',
        image:
          'https://images.unsplash.com/photo-1564518160120-94178fcdf5d4?auto=format&fit=crop&w=800&q=80',
        action: 'style-analysis',
      },
      {
        title: '쇼핑 추천',
        subtitle: '맞춤 제안',
        image:
          'https://images.unsplash.com/photo-1721152531086-70a0d0bb33f9?auto=format&fit=crop&w=800&q=80',
        action: 'shopping',
      },
    ],
    []
  );

  const menuItems: Array<{
    icon: React.ComponentType<any>;
    title: string;
    count?: number;
    action?: NavigationStep | null;
  }> = [
    { icon: Heart, title: '내가 찜한 코디', count: lovedOutfitsCount, action: null },
    { icon: Ban, title: '차단 코디', count: blockedOutfitsCount, action: 'blocked-outfits' },
    { icon: Clock, title: '최근 추천 코디', action: 'recent-styling' },
    { icon: Users, title: '다른 사용자들의 코디 모음', action: null },
    { icon: Bell, title: '알림 설정', action: null },
    { icon: CreditCard, title: '구독 관리', action: null },
    { icon: Shield, title: '개인정보 보호', action: null },
    { icon: HelpCircle, title: '고객 지원', action: null },
    { icon: Settings, title: '설정', action: null },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.container} stickyHeaderIndices={[0]} contentInsetAdjustmentBehavior="automatic">
        {/* 헤더 (sticky) */}
        <View style={styles.headerWrap}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.brandRow}>
                <Text style={styles.brand}>꼬까옷</Text>
                <View style={styles.vDivider} />
                <Text style={styles.greet}>안녕하세요, {userName}님</Text>
              </View>
              <Text style={styles.weatherSub}>
                {todayWeather.temp} · {todayWeather.condition}
              </Text>
            </View>

            <Pressable onPress={() => setMenuOpen(true)} style={styles.iconBtn}>
              <Menu size={20} color="#111" />
            </Pressable>
          </View>
        </View>

        <View style={styles.screenPad}>
          {/* 오늘의 큐레이션 */}
          <View style={[styles.card, styles.card16x9, { overflow: 'hidden' }]}>
            <ImageBackground
              source={{
                uri: 'https://images.unsplash.com/photo-1755514838747-adfd34197d39?auto=format&fit=crop&w=1200&q=80',
              }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.6)' }]} />

            <View style={[styles.cardPad, { flex: 1, justifyContent: 'center' }]}>
              <View style={{ gap: 12 }}>
                <View>
                  <Text style={styles.sectionTitleLight}>오늘의 큐레이션</Text>
                  <View style={[styles.hDivider, { backgroundColor: 'rgba(255,255,255,0.6)' }]} />
                </View>
                <Text style={styles.curationDesc}>{todayWeather.recommendation}</Text>
                <SolidButton title="큐레이션 보기" onPress={() => onNavigate('today-curation')} />
              </View>
            </View>
          </View>

          {/* 빠른 액션 */}
          <View style={{ gap: 12 }}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickGrid}>
              {quickActions.map((qa) => (
                <Pressable
                  key={qa.title}
                  onPress={() => onNavigate(qa.action)}
                  style={[styles.card, styles.quickCard]}
                >
                  <Image source={{ uri: qa.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                  <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.4)' }]} />
                  <View style={[styles.cardPad, { zIndex: 1 }]}>
                    <Text style={styles.quickTitle}>{qa.title}</Text>
                    <Text style={styles.quickSub}>{qa.subtitle}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* 최근 스타일링 */}
          <View style={{ gap: 12 }}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>최근 스타일링</Text>
              <GhostButton title="전체보기" onPress={() => onNavigate('recent-styling')} />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 12, paddingBottom: 8 }}>
                {recentOutfits.map((o) => (
                  <Pressable key={o.id} style={[styles.card, styles.recentCard]}>
                    <Image source={{ uri: o.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />

                    <View style={styles.recentLike}>
                      <View style={styles.badgePill}>
                        <Heart size={12} color="#111" />
                        <Text style={styles.badgePillText}>{o.likes}</Text>
                      </View>
                    </View>

                    <View style={styles.recentStyle}>
                      <Badge label={o.style} />
                    </View>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* 나만의 가상 피팅 */}
          <View style={[styles.card, { backgroundColor: '#F6F7F8' }]}>
            <View style={[styles.cardPad, { gap: 16 }]}>
              <View style={{ gap: 6 }}>
                <Text style={styles.sectionTitle}>나만의 가상 피팅</Text>
                <Divider />
              </View>

              <View style={styles.rowBetween}>
                <View style={{ gap: 4 }}>
                  <Text style={styles.bodyMuted}>체형 기반 아바타로 옷을 미리 입어보세요</Text>
                  <Text style={styles.captionMuted}>옷장의 모든 아이템으로 가상 피팅 가능</Text>
                </View>
                <View style={styles.avatarBox}>
                  <User size={28} color="#6B7280" />
                </View>
              </View>

              <SolidButton title="가상 피팅 시작하기" onPress={() => onNavigate('virtual-fitting')} dark />
            </View>
          </View>

          {/* 스타일 인사이트 */}
          <View style={[styles.card, { backgroundColor: '#F6F7F8' }]}>
            <View style={[styles.cardPad, { gap: 16 }]}>
              <View style={{ gap: 6 }}>
                <Text style={styles.sectionTitle}>Style Insights</Text>
                <Divider />
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.bodyMuted}>이번 주 가장 선호한 스타일</Text>
                <Text style={styles.bodyStrong}>미니멀</Text>
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.bodyMuted}>자주 입는 컬러</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <View style={[styles.colorDot, { backgroundColor: '#000' }]} />
                  <View style={[styles.colorDot, { backgroundColor: '#9CA3AF' }]} />
                  <View
                    style={[
                      styles.colorDot,
                      { backgroundColor: '#FFF', borderColor: '#D1D5DB', borderWidth: 1 },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.rowBetween}>
                <Text style={styles.bodyMuted}>코디 완성도</Text>
                <Text style={styles.bodyStrong}>89%</Text>
              </View>

              <GhostButton title="자세한 분석 보기" onPress={() => onNavigate('style-analysis')} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 메뉴 시트 */}
      <Modal visible={menuOpen} animationType="slide" transparent onRequestClose={() => setMenuOpen(false)}>
        <View style={styles.sheetOverlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.profileRow}>
                <View style={styles.profileAvatar}>
                  <User size={24} color="#6B7280" />
                </View>
                <View>
                  <Text style={styles.profileName}>{userName}</Text>
                  <Text style={styles.profileTier}>프리미엄 멤버</Text>
                </View>
              </View>
            </View>

            <ScrollView>
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Pressable
                    key={idx}
                    onPress={() => {
                      if (item.action) onNavigate(item.action);
                      setMenuOpen(false);
                    }}
                    style={styles.menuItem}
                  >
                    <Icon size={18} color="#4B5563" />
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    {typeof item.count === 'number' && item.count > 0 ? (
                      <View style={styles.menuCount}>
                        <Text style={styles.menuCountText}>{item.count}</Text>
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable onPress={() => setMenuOpen(false)} style={styles.sheetClose}>
              <Text style={styles.sheetCloseText}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  headerWrap: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brand: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#0B0B0B',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  vDivider: { width: 1, height: 24, backgroundColor: '#D1D5DB' },
  greet: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '300',
    letterSpacing: 0.3,
    fontFamily: 'Inter',
  },
  weatherSub: { marginTop: 2, fontSize: 12, color: '#6B7280', fontWeight: '300', fontFamily: 'Inter' },
  iconBtn: { padding: 8, borderRadius: 8 },

  screenPad: { paddingHorizontal: 24, paddingVertical: 24, gap: 28 },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardPad: { padding: 16 },
  card16x9: { aspectRatio: 16 / 9 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#0B0B0B',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  sectionTitleLight: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0.3,
    color: '#FFFFFF',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  hDivider: { width: 64, height: 1, marginTop: 6 },

  curationDesc: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 22,
    maxWidth: 320,
    fontFamily: 'Inter',
  },

  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  quickCard: {
    position: 'relative',
    width: '48%',
    aspectRatio: 4 / 3,
  },
  quickTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', fontFamily: 'Inter-SemiBold' },
  quickSub: { color: 'rgba(255,255,255,0.9)', fontSize: 12, marginTop: 2, fontWeight: '300', fontFamily: 'Inter' },

  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  recentCard: {
    position: 'relative',
    width: 128,
    height: 160,
  },
  recentLike: { position: 'absolute', top: 8, right: 8 },
  recentStyle: { position: 'absolute', bottom: 8, left: 8 },

  badge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '300', fontFamily: 'Inter' },

  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgePillText: { color: '#111', fontSize: 11, fontFamily: 'Inter' },

  bodyMuted: { color: '#4B5563', fontSize: 14, fontWeight: '300', fontFamily: 'Inter' },
  bodyStrong: { color: '#111827', fontSize: 14, fontWeight: '600', fontFamily: 'Inter-SemiBold' },
  captionMuted: { color: '#6B7280', fontSize: 12, fontWeight: '300', fontFamily: 'Inter' },

  solidBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  solidBtnDark: {
    backgroundColor: '#111111',
    alignSelf: 'stretch',
  },
  solidBtnCompact: { paddingHorizontal: 12, paddingVertical: 8 },
  solidBtnText: { color: '#111111', fontSize: 14, fontWeight: '500', fontFamily: 'Inter-Medium' },
  solidBtnTextDark: { color: '#FFFFFF', fontFamily: 'Inter-Medium' },

  ghostBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  ghostBtnText: { color: '#4B5563', fontSize: 14, fontWeight: '300', fontFamily: 'Inter' },

  colorDot: { width: 16, height: 16, borderRadius: 999 },

  avatarBox: {
    width: 64,
    height: 80,
    backgroundColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: { width: 64, height: 1, backgroundColor: '#9CA3AF' },

  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  sheetHeader: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: { fontSize: 16, fontWeight: '500', color: '#111827', fontFamily: 'Inter-SemiBold' },
  profileTier: { fontSize: 12, color: '#6B7280', marginTop: 2, fontFamily: 'Inter' },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuTitle: { flex: 1, color: '#111827', fontSize: 14, fontWeight: '300', fontFamily: 'Inter' },
  menuCount: {
    minWidth: 22,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  menuCountText: { color: '#FFFFFF', fontSize: 12, fontWeight: '500', fontFamily: 'Inter-SemiBold' },

  sheetClose: {
    padding: 14,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  sheetCloseText: { color: '#111827', fontSize: 14, fontWeight: '500', fontFamily: 'Inter-SemiBold' },
});
