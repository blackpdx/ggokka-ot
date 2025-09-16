// components/figma/SplashScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SplashScreenProps = {
  onGetStarted: () => void;
};

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* 배경 이미지 + 오버레이 */}
      <View style={StyleSheet.absoluteFill}>
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1742281913003-5ed06b3cd6e8?auto=format&fit=crop&w=1200&q=80',
          }}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.overlay} />
      </View>

      {/* 콘텐츠 */}
      <View style={styles.center}>
        <View style={styles.card}>
          <View style={{ gap: 16 }}>
            <View style={{ gap: 12 }}>
              <Text style={styles.brand}>꼬까옷</Text>
              <View style={styles.whiteLine} />
              <Text style={styles.catch}>AI와 함께 키우는 패션 감각</Text>
            </View>

            <View style={styles.bullets}>
              <View style={styles.bulletRow}>
                <View style={styles.dot} />
                <Text style={styles.bulletText}>개인 맞춤 스타일 큐레이션</Text>
              </View>
              <View style={styles.bulletRow}>
                <View style={styles.dot} />
                <Text style={styles.bulletText}>지능형 가상 옷장 시스템</Text>
              </View>
              <View style={styles.bulletRow}>
                <View style={styles.dot} />
                <Text style={styles.bulletText}>체형별 전문 스타일링</Text>
              </View>
            </View>
          </View>

          <Pressable onPress={onGetStarted} style={styles.cta}>
            <Text style={styles.ctaText}>시작하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 360,
    gap: 24,
    alignItems: 'center',
  },

  brand: {
    textAlign: 'center',
    fontSize: 32,
    letterSpacing: 2, // tracking-[0.2em] 근사치
    color: '#FFFFFF',
    fontWeight: '300',
    fontFamily: 'PlayfairDisplay-SemiBold', // 폰트 로딩했으면 적용됨
  },
  whiteLine: {
    width: 64,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
  },
  catch: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    fontWeight: '300',
    lineHeight: 24,
    fontFamily: 'Inter',
  },

  bullets: { gap: 8, alignItems: 'center' },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 4, height: 4, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.6)' },
  bulletText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '300',
    fontFamily: 'Inter',
  },

  cta: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 0.5,
    fontWeight: '300',
    fontFamily: 'Inter',
  },
});
