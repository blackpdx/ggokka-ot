// App.tsx
import React, { useState } from 'react';
import { Alert, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BodyPhotoSetup from './components/figma/BodyPhotoSetup';
import DailyOutfitRecommendation from './components/figma/DailyOutfitRecommendation';
import HomeScreen from './components/figma/homescreen';
import ShoppingRecommendations from './components/figma/ShoppingRecommendations';
import SplashScreen from './components/figma/SplashScreen';
import StyleAnalysisDetail from './components/figma/StyleAnalysisDetail';
import TodayCurationDetail from './components/figma/TodayCurationDetail';
import WardrobeManagement from './components/figma/WardrobeManagement';
import SignupScreen from './components/figma/SignupScreen';
import LoginScreen from './components/figma/LoginScreen';

export type MainScreen =
  | 'home'
  | 'wardrobe-management'
  | 'style-analysis'
  | 'virtual-fitting'
  | 'shopping'
  | 'today-curation'
  | 'daily-outfit'
  | 'recent-styling'
  | 'blocked-outfits';

type Screen =
  | 'splash'
  | 'login'
  | 'signup'
  | 'body-photo-setup'
  | 'main';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [mainScreen, setMainScreen] = useState<MainScreen>('home');
  const [userName, setUserName] = useState('');

  const navigate = (target: MainScreen) => {
    if (Platform.OS === 'web' && (target === 'virtual-fitting' || target === 'recent-styling' || target === 'blocked-outfits')) {
        Alert.alert("준비중", "해당 기능은 현재 준비중입니다.");
        return;
    }
    setMainScreen(target);
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setScreen('main');
    setMainScreen('home');
  };

  const handleLoginFail = () => {
    Alert.alert(
      "로그인 실패",
      "회원가입 하시겠어요?",
      [
        { text: "나중에", style: "cancel" },
        { text: "회원가입", onPress: () => setScreen('signup') }
      ]
    );
  };

  const handleSignupSuccess = (data: { name: string }) => {
    setUserName(data.name);
    setScreen('main');
  };
  
  const handleLogout = () => {
    setUserName('');
    setScreen('login');
    setMainScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen onGetStarted={() => setScreen('login')} />;
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onLoginFail={handleLoginFail}
            onNavigateToSignup={() => setScreen('signup')}
          />
        );
      case 'signup':
        return (
          <SignupScreen
            onSignupSuccess={handleSignupSuccess}
            onBackToLogin={() => setScreen('login')}
          />
        );
      case 'body-photo-setup':
        return (
          <BodyPhotoSetup
            onBack={() => setScreen('signup')}
            onComplete={() => setScreen('main')}
          />
        );
      case 'main':
        switch (mainScreen) {
          case 'home':
            return <HomeScreen userName={userName} onNavigate={navigate} onLogout={handleLogout} />;
          case 'wardrobe-management':
            return <WardrobeManagement onBack={() => navigate('home')} onNavigate={navigate} />;
          case 'style-analysis':
            return <StyleAnalysisDetail onBack={() => navigate('home')} onNavigate={navigate} />;
          case 'shopping':
            return <ShoppingRecommendations onBack={() => navigate('home')} onNavigate={navigate} />;
          case 'today-curation':
            return <TodayCurationDetail onBack={() => navigate('home')} onNavigate={navigate} />;
          case 'daily-outfit':
            return <DailyOutfitRecommendation onBack={() => navigate('home')} onNavigate={navigate} />;
          default:
            return <HomeScreen userName={userName} onNavigate={navigate} onLogout={handleLogout} />;
        }
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {renderScreen()}
    </SafeAreaProvider>
  );
}