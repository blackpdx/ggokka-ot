// components/figma/homescreen.tsx
import {
  Ban,
  BarChart3,
  Bell,
  Clock,
  CreditCard,
  Heart,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  Shield,
  Shirt as ShirtIcon,
  ShoppingBag,
  User as UserIcon,
  Users,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationStep =
  | 'today-curation'
  | 'daily-outfit'
  | 'wardrobe-management'
  | 'style-analysis'
  | 'shopping'
  | 'recent-styling'
  | 'blocked-outfits'
  | 'virtual-fitting';

type HomeScreenProps = {
  onNavigate: (step: NavigationStep) => void;
  userName?: string;
  lovedOutfitsCount?: number;
  blockedOutfitsCount?: number;
};

export default function HomeScreen({
  onNavigate,
  userName = '사용자',
  lovedOutfitsCount = 3,
  blockedOutfitsCount = 1,
}: HomeScreenProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const monthlyAnalysis = useMemo(
    () => ({
      dominantStyle: '미니멀',
      styleConfidence: 89,
      colorPalette: [
        { color: '#000000', name: '블랙' },
        { color: '#FFFFFF', name: '화이트' },
        { color: '#8B7355', name: '베이지' },
        { color: '#4A5568', name: '그레이' },
      ],
    }),
    []
  );

  const todayWeather = {
    temp: '22°C',
    condition: '맑음',
    recommendation: '가벼운 레이어드 스타일링 추천',
  };

  const recentOutfits = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1739415616419-247f50c8116e?auto=format&fit=crop&w=640&q=60',
      likes: 24,
      style: '엘레강스',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1719956492682-9109878066c8?auto=format&fit=crop&w=640&q=60',
      likes: 18,
      style: '스트릿',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=640&q=60',
      likes: 32,
      style: '미니멀',
    },
  ];

  const quickActions: Array<{
    title: string;
    subtitle: string;
    image: string;
    action: NavigationStep;
  }> = [
    {
      title: '오늘 뭐 입지?',
      subtitle: '상황별 추천',
      image:
        'https://images.unsplash.com/photo-1608680480325-d3ec3cdf7e60?auto=format&fit=crop&w=800&q=60',
      action: 'daily-outfit',
    },
    {
      title: '내 옷장',
      subtitle: '관리 & 정리',
      image:
        'https://images.unsplash.com/photo-1603798125914-7b5d27789248?auto=format&fit=crop&w=800&q=60',
      action: 'wardrobe-management',
    },
    {
      title: '스타일 분석',
      subtitle: '취향 리포트',
      image:
        'https://images.unsplash.com/photo-1651335794520-fb1066d93a84?auto=format&fit=crop&w=800&q=60',
      action: 'style-analysis',
    },
    {
      title: '쇼핑 추천',
      subtitle: '맞춤 제안',
      image:
        'https://images.unsplash.com/photo-1721152531086-70a0d0bb33f9?auto=format&fit=crop&w=800&q=60',
      action: 'shopping',
    },
  ];

  const bottomNavItems = [
    { icon: Home, title: '홈', action: undefined, isActive: true },
    { icon: ShirtIcon, title: '옷장', action: 'wardrobe-management' as NavigationStep },
    { icon: BarChart3, title: '분석', action: 'style-analysis' as NavigationStep },
    // ✅ 피팅 추가
    { icon: UserIcon, title: '피팅', action: 'virtual-fitting' as NavigationStep },
    { icon: ShoppingBag, title: '쇼핑', action: 'shopping' as NavigationStep },
  ];

  const menuItems: Array<{
    icon: any;
    title: string;
    action?: NavigationStep;
    count?: number;
  }> = [
    { icon: Heart, title: '내가 찜한 코디', count: lovedOutfitsCount },
    { icon: Ban, title: '차단 코디', action: 'blocked-outfits', count: blockedOutfitsCount },
    { icon: Clock, title: '최근 추천 코디', action: 'recent-styling' },
    { icon: Users, title: '다른 사용자들의 코디 모음' },
    { icon: Bell, title: '알림 설정' },
    { icon: CreditCard, title: '구독 관리' },
    { icon: Shield, title: '개인정보 보호' },
    { icon: HelpCircle, title: '고객 지원' },
    { icon: Settings, title: '설정' },
    { icon: LogOut, title: '로그아웃' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* 헤더 */}
      <View style={styles.headerWrap}>
        <View style={styles.headerInner}>
          <View>
            <View style={styles.rowStart}>
              <Text style={styles.brand}>꼬까옷</Text>
              <View style={styles.headerDivider} />
              <Text style={styles.hello}>안녕하세요, {userName}님</Text>
            </View>
            <Text style={styles.subMuted}>
              {todayWeather.temp} · {todayWeather.condition}
            </Text>
          </View>

          <Pressable style={styles.iconBtn} onPress={() => setMenuOpen(true)}>
            <Menu size={20} color="#111" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollPad}>
        {/* 오늘의 추천 */}
        <View style={styles.heroCard}>
          <ImageBackground
            source={{
              uri:
                'https://images.unsplash.com/photo-1551910021-c59ed3bf006b?auto=format&fit=crop&w=1200&q=60',
            }}
            style={styles.heroBg}
            imageStyle={styles.heroBgImg}
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroBody}>
              <View>
                <Text style={styles.heroTitle}>오늘의 추천</Text>
                <View style={styles.whiteLine} />
              </View>
              <Text style={styles.heroDesc}>{todayWeather.recommendation}</Text>
              <Pressable style={styles.whiteBtn} onPress={() => onNavigate('today-curation')}>
                <Text style={styles.whiteBtnText}>추천 보기</Text>
              </Pressable>
            </View>
          </ImageBackground>
        </View>

        {/* 빠른 바로가기 */}
        <View style={{ marginTop: 24 }}>
          <Text style={styles.sectionTitle}>빠른 바로가기</Text>
          <View style={styles.grid2}>
            {quickActions.map((qa) => (
              <Pressable key={qa.title} onPress={() => onNavigate(qa.action)} style={styles.card}>
                <ImageBackground source={{ uri: qa.image }} style={styles.cardBg}>
                  <View style={styles.cardDim} />
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{qa.title}</Text>
                    <Text style={styles.cardSub}>{qa.subtitle}</Text>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 최근 스타일링 */}
        <View style={{ marginTop: 24 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>최근 스타일링</Text>
            <Pressable onPress={() => onNavigate('recent-styling')}>
              <Text style={styles.ghostLink}>전체보기</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12, paddingVertical: 12 }}>
              {recentOutfits.map((o) => (
                <View key={o.id} style={styles.thumbCard}>
                  <Image source={{ uri: o.image }} style={styles.thumbImg} />
                  <View style={styles.thumbShade} />
                  <View style={styles.likeBadge}>
                    <Heart size={12} color="#000" />
                    <Text style={styles.likeBadgeText}>{o.likes}</Text>
                  </View>
                  <View style={styles.styleBadge}>
                    <Text style={styles.styleBadgeText}>{o.style}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* 나만의 가상 피팅 */}
        <View style={[styles.cardSoft, { marginTop: 8 }]}>
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.sectionTitle}>나만의 가상 피팅</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.rowBetween}>
            <View style={{ width: '70%' }}>
              <Text style={styles.muted}>체형 기반 아바타로 옷을 미리 입어보세요</Text>
              <Text style={[styles.muted, { marginTop: 4 }]}>옷장의 모든 아이템으로 가상 피팅 가능</Text>
            </View>
            <View style={styles.avatarRect}>
              <UserIcon size={28} color="#6B7280" />
            </View>
          </View>

          <Pressable style={styles.blackBtn} onPress={() => onNavigate('virtual-fitting')}>
            <Text style={styles.blackBtnText}>가상 피팅 시작하기</Text>
          </Pressable>
        </View>

        {/* 스타일 분석 요약 */}
        <View style={styles.cardSoft}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.sectionTitle}>스타일 분석</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.muted}>이번 달 가장 선호한 스타일</Text>
            <Text style={styles.bold}>{monthlyAnalysis.dominantStyle}</Text>
          </View>

          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text style={styles.muted}>자주 입는 컬러</Text>
            <View style={{ flexDirection: 'row' }}>
              {monthlyAnalysis.colorPalette.slice(0, 3).map((c, i) => (
                <View
                  key={`${c.name}-${i}`}
                  style={[styles.colorDot, { backgroundColor: c.color }, i ? { marginLeft: 6 } : null]}
                />
              ))}
            </View>
          </View>

          <View style={[styles.rowBetween, { marginTop: 8 }]}>
            <Text style={styles.muted}>코디 완성도</Text>
            <Text style={styles.bold}>{monthlyAnalysis.styleConfidence}%</Text>
          </View>

          <Pressable style={styles.ghostBtn} onPress={() => onNavigate('style-analysis')}>
            <Text style={styles.ghostBtnText}>자세한 분석 보기</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* 하단 탭 */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomInner}>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;
            return (
              <Pressable
                key={item.title}
                style={styles.bottomItem}
                onPress={() => item.action && onNavigate(item.action)}
              >
                <Icon size={20} color={active ? '#111' : '#9CA3AF'} />
                <Text style={[styles.bottomLabel, active ? { color: '#111' } : { color: '#9CA3AF' }]}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* 사이드 메뉴(모달) */}
      <Modal visible={menuOpen} transparent animationType="slide" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={styles.modalBack} onPress={() => setMenuOpen(false)} />
        <View style={styles.drawer}>
          <View style={styles.drawerHeader}>
            <View style={styles.avatarBig}>
              <UserIcon size={28} color="#6B7280" />
            </View>
            <View>
              <Text style={styles.bold}>{userName}</Text>
              <Text style={styles.subMuted}>프리미엄 멤버</Text>
            </View>
          </View>

          <ScrollView>
            {[
              { icon: Heart, title: '내가 찜한 코디', count: lovedOutfitsCount },
              { icon: Ban, title: '차단 코디', action: 'blocked-outfits', count: blockedOutfitsCount },
              { icon: Clock, title: '최근 추천 코디', action: 'recent-styling' },
              { icon: Users, title: '다른 사용자들의 코디 모음' },
              { icon: Bell, title: '알림 설정' },
              { icon: CreditCard, title: '구독 관리' },
              { icon: Shield, title: '개인정보 보호' },
              { icon: HelpCircle, title: '고객 지원' },
              { icon: Settings, title: '설정' },
              { icon: LogOut, title: '로그아웃' },
            ].map((m) => {
              const Icon = m.icon as any;
              return (
                <Pressable
                  key={m.title}
                  style={styles.drawerItem}
                  onPress={() => {
                    setMenuOpen(false);
                    m.action && onNavigate(m.action as NavigationStep);
                  }}
                >
                  <Icon size={18} color="#6B7280" />
                  <Text style={styles.drawerText}>{m.title}</Text>
                  {typeof m.count === 'number' && m.count > 0 ? (
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{m.count}</Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  headerWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFFE6',
  },
  headerInner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: { fontSize: 22, fontWeight: '600', letterSpacing: 0.5, color: '#000' },
  headerDivider: { width: 1, height: 20, backgroundColor: '#D1D5DB', marginHorizontal: 10 },
  hello: { fontSize: 16, color: '#111827' },
  subMuted: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  iconBtn: { padding: 8, borderRadius: 8 },
  rowStart: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  scrollPad: { paddingHorizontal: 16, paddingBottom: 96 },

  heroCard: {
    borderRadius: 0,
    overflow: 'hidden',
    height: 200,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  heroBg: { flex: 1 },
  heroBgImg: { resizeMode: 'cover' },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  heroBody: { flex: 1, padding: 16, justifyContent: 'center' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '600' },
  whiteLine: { width: 64, height: 1, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 6 },
  heroDesc: { color: 'rgba(255,255,255,0.9)', marginTop: 10, fontSize: 14, lineHeight: 20 },
  whiteBtn: {
    marginTop: 16,
    backgroundColor: '#fff',
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  whiteBtnText: { color: '#111', fontWeight: '600' },

  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111' },
  grid2: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '48%',
    height: 140,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardBg: { flex: 1 },
  cardDim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  cardBody: { padding: 10, justifyContent: 'flex-start' },
  cardTitle: { color: '#fff', fontWeight: '600' },
  cardSub: { color: 'rgba(255,255,255,0.85)', marginTop: 2, fontSize: 12 },

  thumbCard: {
    width: 128,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  thumbImg: { width: '100%', height: '100%' },
  thumbShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.2)' },
  likeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 6,
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeBadgeText: { fontSize: 11, color: '#000' },
  styleBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  styleBadgeText: { color: '#fff', fontSize: 11 },

  cardSoft: {
    backgroundColor: '#F9FAFB',
    borderWidth: 0,
    padding: 16,
    marginTop: 16,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#E5E7EB', marginTop: 8 },
  muted: { color: '#6B7280', fontSize: 13 },
  bold: { color: '#111827', fontWeight: '600' },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
  },

  avatarRect: {
    width: 56,
    height: 70,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blackBtn: {
    marginTop: 12,
    backgroundColor: '#111111',
    paddingVertical: 12,
    alignItems: 'center',
  },
  blackBtnText: { color: '#FFFFFF', fontSize: 14 },

  ghostBtn: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D1D5DB',
  },
  ghostBtnText: { color: '#111827', fontSize: 14 },
  ghostLink: { color: '#6B7280', fontSize: 14 },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  bottomInner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 6, gap: 2 },
  bottomLabel: { fontSize: 11 },

  modalBack: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: 300,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  avatarBig: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  drawerText: { flex: 1, color: '#111827', fontSize: 15 },
  countBadge: {
    minWidth: 22,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: { fontSize: 11, color: '#111827' },
});
