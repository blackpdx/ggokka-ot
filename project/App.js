// App.js
import { useMemo, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppFonts } from './lib/useAppFonts';

// 피그마 화면들 (모두 RN용, default export)
import AuthScreen from './components/figma/AuthScreen';
import BodyPhotoSetup from './components/figma/BodyPhotoSetup';
import DailyOutfitRecommendation from './components/figma/DailyOutfitRecommendation';
import HomeScreen from './components/figma/homescreen';
import ShoppingRecommendations from './components/figma/ShoppingRecommendations';
import SplashScreen from './components/figma/SplashScreen';
import StyleAnalysisDetail from './components/figma/StyleAnalysisDetail';
import TodayCurationDetail from './components/figma/TodayCurationDetail'; // ← 오늘의 큐레이션 상세
import UserProfileSetup from './components/figma/UserProfileSetup';
import WardrobeManagement from './components/figma/WardrobeManagement';
import WardrobeSetup from './components/figma/WardrobeSetup';

// 임시 화면(아직 없는 단계용)
import PlaceholderScreen from './screens/PlaceholderScreen';

export default function App() {
  const fontsLoaded = useAppFonts();
  const [step, setStep] = useState('splash'); // 스플래시부터 시작

  const titles = useMemo(
    () => ({
      // 메인
      home: '홈',
      'today-curation': '오늘의 큐레이션',
      'daily-outfit': '오늘 뭐 입지?',
      'wardrobe-management': '내 옷장',
      'style-analysis': '스타일 분석',
      shopping: '쇼핑 추천',
      'recent-styling': '최근 스타일링',
      'blocked-outfits': '차단 코디',
      'virtual-fitting': '나만의 가상 피팅',
      // 온보딩
      auth: '로그인/회원가입',
      'user-profile-setup': '사용자 정보 설정',
      'body-photo-setup': '체형 사진 업로드',
      'wardrobe-setup': '가상 옷장 설정',
    }),
    []
  );

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      {step === 'splash' ? (
        <SplashScreen onGetStarted={() => setStep('auth')} />
      ) : step === 'auth' ? (
        <AuthScreen onAuth={() => setStep('user-profile-setup')} />
      ) : step === 'user-profile-setup' ? (
        <UserProfileSetup onComplete={() => setStep('body-photo-setup')} />
      ) : step === 'body-photo-setup' ? (
        <BodyPhotoSetup onComplete={() => setStep('wardrobe-setup')} />
      ) : step === 'wardrobe-setup' ? (
        <WardrobeSetup onComplete={() => setStep('home')} onSkip={() => setStep('home')} />
      ) : step === 'wardrobe-management' ? (
        <WardrobeManagement onBack={() => setStep('home')} />
      ) : step === 'daily-outfit' ? (
        <DailyOutfitRecommendation onBack={() => setStep('home')} />
      ) : step === 'style-analysis' ? (
        <StyleAnalysisDetail onBack={() => setStep('home')} />
      ) : step === 'shopping' ? (
        <ShoppingRecommendations onBack={() => setStep('home')} />
      ) : step === 'today-curation' ? (
        <TodayCurationDetail onBack={() => setStep('home')} />
      ) : step === 'home' ? (
        <HomeScreen
          onNavigate={(s) => setStep(s)}
          userName="야"
          lovedOutfitsCount={3}
          blockedOutfitsCount={1}
        />
      ) : (
        // 아직 구현 안 된 단계들: 임시 화면으로 표시
        <PlaceholderScreen
          title={titles[step] || String(step)}
          onBack={() => {
            // 온보딩 흐름 자연스럽게 뒤로
            if (step === 'wardrobe-setup') setStep('body-photo-setup');
            else if (step === 'user-profile-setup' || step === 'body-photo-setup') setStep('auth');
            else setStep('home');
          }}
        />
      )}
    </SafeAreaProvider>
  );
}
