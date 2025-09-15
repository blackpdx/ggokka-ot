import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={S.screen} showsVerticalScrollIndicator={false}>
      {/* HeaderBar 대체 (심플) */}
      <View style={S.header}>
        <View style={S.headerLeft}>
          <View style={S.logoBox}>
            <Feather name="zap" size={18} color="#fff" />
          </View>
          <Text style={S.brand}>꼬까옷</Text>
        </View>

        <TouchableOpacity style={S.avatarBtn}>
          <View style={S.avatarCircle}>
            <Feather name="user" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={{ borderRadius: 16, overflow: 'hidden' }}>
        <ImageBackground
          source={{
            uri:
              'https://images.unsplash.com/photo-1695634621121-691d54259d37?q=80&w=1080',
          }}
          style={S.hero}
        >
          <View style={S.overlay} />
          <View style={S.heroInner}>
            <Text style={S.heroTitle}>AI 패션 큐레이션</Text>
            <Text style={S.heroSub}>
              당신만의 스타일을 찾아드립니다.{'\n'}완벽한 매칭을 경험해보세요.
            </Text>
            <TouchableOpacity
              style={S.cta}
              onPress={() => router.push('/(tabs)/recommend')}
            >
              <Text style={S.ctaText}>시작하기</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Services Grid */}
      <View style={S.section}>
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Text style={S.sectionTitle}>서비스</Text>
          <Text style={S.sectionSub}>
            AI 기반의 패션 큐레이션으로{'\n'}당신의 스타일을 완성하세요
          </Text>
        </View>

        <View style={S.grid2}>
          <TouchableOpacity
            style={S.service}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/recommend')}
          >
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1637910116483-7efcc9480847?q=80&w=1080',
              }}
              style={S.serviceImg}
              resizeMode="cover"
            />
            <Text style={S.badge}>01</Text>
            <Text style={S.serviceTitle}>AI 스타일링</Text>
            <Text style={S.serviceSub}>
              사진 한 장으로 완벽한{'\n'}매칭 스타일을 제안받으세요
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.service}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/wardrobe')}
          >
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1609565911206-04527a94436e?q=80&w=1080',
              }}
              style={S.serviceImg}
              resizeMode="cover"
            />
            <Text style={S.badge}>02</Text>
            <Text style={S.serviceTitle}>가상 옷장</Text>
            <Text style={S.serviceSub}>
              내 옷들을 체계적으로{'\n'}관리하고 분석하세요
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.service}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/analysis')}
          >
            <View style={[S.serviceImg, S.iconBg]}>
              <Feather name="maximize-2" size={32} color="#64748b" />
            </View>
            <Text style={S.badge}>03</Text>
            <Text style={S.serviceTitle}>체형 분석</Text>
            <Text style={S.serviceSub}>
              체형에 맞는 맞춤형{'\n'}스타일 가이드 제공
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={S.service}
            activeOpacity={0.8}
            onPress={() => router.push('/(tabs)/capture')}
          >
            <View style={[S.serviceImg, S.iconBg]}>
              <Feather name="zap" size={32} color="#64748b" />
            </View>
            <Text style={S.badge}>04</Text>
            <Text style={S.serviceTitle}>실시간 분석</Text>
            <Text style={S.serviceSub}>
              현재 outfit의 스타일{'\n'}점수와 개선점 분석
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Process */}
      <View style={[S.section, { backgroundColor: '#f8fafc', borderRadius: 16 }]}>
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Text style={S.sectionTitle}>이용 방법</Text>
          <Text style={S.sectionSub}>간단한 3단계로 완벽한 스타일링을 완성하세요</Text>
        </View>

        <View style={{ gap: 16 }}>
          {[
            { n: '1', t: '사진 업로드', d: '전신 사진을 업로드하면 AI가 착용하신 옷들을 자동으로 분석합니다' },
            { n: '2', t: '기준 의류 선택', d: '감지된 의류 중 매칭의 기준이 될 아이템을 선택해주세요' },
            { n: '3', t: '맞춤 추천 받기', d: 'AI가 기준 의류와 완벽하게 매칭되는 스타일을 추천해드립니다' },
          ].map((s) => (
            <View key={s.n} style={{ flexDirection: 'row', gap: 12 }}>
              <View style={S.stepDot}><Text style={S.stepDotText}>{s.n}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={S.stepTitle}>{s.t}</Text>
                <Text style={S.stepDesc}>{s.d}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[S.cta, { marginTop: 16, backgroundColor: '#111827' }]}
          onPress={() => router.push('/(tabs)/recommend')}
        >
          <Text style={[S.ctaText, { color: '#fff' }]}>지금 시작하기</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={S.section}>
        <View style={S.statsGrid}>
          {[
            { n: '98%', d: '매칭 정확도' },
            { n: '10K+', d: '스타일링 완성' },
            { n: '50M+', d: '의류 데이터' },
            { n: '4.9', d: '사용자 만족도' },
          ].map((x) => (
            <View key={x.d} style={{ alignItems: 'center' }}>
              <Text style={S.statNum}>{x.n}</Text>
              <Text style={S.statDesc}>{x.d}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const S = StyleSheet.create({
  screen: { padding: 16, gap: 16, backgroundColor: '#fff' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 18, color: '#0f172a', letterSpacing: 0.3 },
  avatarBtn: { padding: 4 },
  avatarCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#334155', alignItems: 'center', justifyContent: 'center' },

  hero: { height: 260, alignItems: 'center', justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  heroInner: { alignItems: 'center', gap: 10, paddingHorizontal: 16 },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '700' },
  heroSub: { color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
  cta: { marginTop: 6, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  ctaText: { color: '#111', fontWeight: '600' },

  section: { padding: 16, gap: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  sectionSub: { color: '#64748b', textAlign: 'center' },

  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  service: { width: '48%', backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', padding: 10 },
  serviceImg: { width: '100%', aspectRatio: 1, borderRadius: 10, backgroundColor: '#eef2ff' },
  iconBg: { alignItems: 'center', justifyContent: 'center' },
  badge: { marginTop: 8, alignSelf: 'flex-start', fontSize: 12, color: '#3730a3', backgroundColor: '#eef2ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  serviceTitle: { marginTop: 4, fontWeight: '600', color: '#0f172a' },
  serviceSub: { color: '#64748b', marginTop: 2 },

  stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  stepDotText: { color: '#fff', fontWeight: '700' },
  stepTitle: { fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  stepDesc: { color: '#64748b' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  statNum: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
  statDesc: { color: '#64748b' },
});
