// components/figma/SplashScreen.tsx
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type SplashScreenProps = { onGetStarted: () => void };

// 프로젝트 루트(HJ_KKO) 바로 아래에 있는 "시작화면.png"
const splashImage = require('../../시작화면.png');

const { height: H } = Dimensions.get('window');

// 이미지를 "살짝 아래로" 내리고 + 위/아래 흰줄 방지를 위해 약간 더 확대
const SHIFT_Y = Math.round(H * 0.02); // 화면 높이의 2% 만큼 아래로
const SCALE   = 1.12;                  // 12% 확대(상하단 여백 방지)

export default function SplashScreen({ onGetStarted }: SplashScreenProps) {
  return (
    <View style={styles.root}>
      {/* 상단 흰색 줄 숨기기 위해 이미지가 상태바 밑으로 깔리게 설정 */}
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ImageBackground
        source={splashImage}
        resizeMode="cover"
        style={styles.bgAbs}
        imageStyle={{ transform: [{ translateY: SHIFT_Y }, { scale: SCALE }] }}
      />

      {/* 버튼/카드는 안전영역의 '하단'만 고려해서 올림 */}
      <SafeAreaView edges={['bottom']} style={styles.overlay}>
        {/* 하단 카드 */}
        <View style={styles.bottomWrap}>
          <View style={styles.card}>
            {/* 내부에 또 보이는 네모 래퍼 제거, 요소만 배치 */}
            <Text style={styles.title}>
              꼬까옷에 오신 것을{'\n'}환영합니다
            </Text>

            <Text style={styles.sub}>
              AI가 당신의 체형과 취향을{'\n'}
              분석하여 완벽한 스타일링을{'\n'}
              제안해드립니다
            </Text>

            <View style={styles.bullets}>
              <View style={styles.dot} />
              <Text style={styles.bullet}>실시간 옷장 분류</Text>
              <View style={styles.dot} />
              <Text style={styles.bullet}>맞춤 코디 추천</Text>
            </View>

            <Pressable
              onPress={onGetStarted}
              // 내부 사각형 느낌을 줄 수 있는 ripple도 최소화하거나 필요 없으면 제거해도 됨
              android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
              style={styles.cta}
            >
              <Text style={styles.ctaText}>시작하기</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'transparent' },

  // 배경 이미지를 화면 전체(상단 상태바 영역 포함)로 깔기
  bgAbs: { ...StyleSheet.absoluteFillObject },

  overlay: { flex: 1 },

  bottomWrap: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flex: 1,
    justifyContent: 'flex-end',
  },

  // 반투명 카드(하나만)
  card: {
    backgroundColor: 'rgba(255,255,255,0.68)',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 14,
    // 부드러운 그림자
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    overflow: 'hidden', // 내부 또 다른 네모/리플 겹침 느낌 차단
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#111827',
    letterSpacing: 0.3,
    fontFamily: 'PlayfairDisplay-SemiBold',
    marginBottom: 10,
  },
  sub: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    color: '#374151',
    fontFamily: 'Inter',
    fontWeight: '300',
    marginTop: 2,
    marginBottom: 6,
  },

  bullets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
  },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#111' },
  bullet: { fontSize: 13, color: '#374151', fontFamily: 'Inter', fontWeight: '300' },

  cta: {
    marginTop: 6,
    backgroundColor: '#111111',
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 0.3,
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
  },
});
