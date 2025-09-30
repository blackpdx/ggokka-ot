import React, { useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

export type SignupScreenProps = {
  onSignupSuccess: (data: { name: string }) => void;
  onBackToLogin: () => void;
};

const STYLE_PREFERENCES = [
  { name: '캐주얼', image: 'https://images.unsplash.com/photo-1599016461690-8a24d561319e?w=500' },
  { name: '미니멀', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500' },
  { name: '클래식', image: 'https://images.unsplash.com/photo-1636281774812-48e8ef62f768?w=500' },
  { name: '스트릿', image: 'https://images.unsplash.com/photo-1624914990379-f2082e413b4c?w=500' },
  { name: '스포티', image: 'https://images.unsplash.com/photo-1628271491650-c2346e8aa7c5?w=500' },
  { name: '비즈니스', image: 'https://images.unsplash.com/photo-1593032470861-4509830938cb?w=500' },
];

// 🚨 주인님의 실제 터널링 주소를 사용하여 Network failed/timed out 오류를 해결합니다.
// Expo 터널 주소에서 포트 정보를 제거하고, http://로 변환하여 사용합니다.
const TUNNEL_URL_BASE = 'http://r6oi77g-wenchesterdean-8081.exp.direct'; 

// 💡 수정: 터널 주소 자체에 포트 번호를 명시하지 않고, 바로 API 경로를 붙입니다.
// Expo가 알아서 백엔드 서버의 4000 포트로 라우팅할 것입니다.
const API_URL = Platform.select({
  ios: 'http://192.168.0.15:4000/api/signup', 
  // 안드로이드 에뮬레이터에서 테스트할 경우 이 주소를 'http://10.0.2.2:4000/api/signup'로 바꿔야 합니다.
  android: 'http://192.168.0.15:4000/api/signup', 
  default: 'http://localhost:4000/api/signup', 
});

// 🚨 주의: 네트워크 환경이 변경되면 192.168.0.15 IP 주소도 변경해야 합니다.
// (현재 터널링 모드에서는 IP 대신 위의 터널 주소를 사용해야 합니다!)

export default function SignupScreen({ onSignupSuccess, onBackToLogin }: SignupScreenProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [form, setForm] = useState({ name: '', email: '', pw: '', ageGroup: null as number | null, stylePreferences: [] as string[] });
  const [loading, setLoading] = useState(false);

  const progress = useMemo(() => (step / totalSteps) * 100, [step]);

  // ✅ 띄어쓰기 수정 완료: 가독성이 좋습니다.
  const next = () => (step < totalSteps) ? setStep(s => s + 1) : handleSubmit();
  const back = () => step > 1 && setStep(s => s - 1);

  const toggleStyle = (name: string) => setForm(p => ({ ...p, stylePreferences: p.stylePreferences.includes(name) ? p.stylePreferences.filter(v => v !== name) : [...p.stylePreferences, name] }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 💡 API_URL을 사용하여 fetch 요청
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.pw,
          ageGroup: form.ageGroup,
          stylePreferences: form.stylePreferences,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        onSignupSuccess({ name: result.user.name });
      } else {
        Alert.alert("회원가입 실패", result.message);
      }
    } catch (error) {
      console.error('API call error:', error);
      // 💡 Alert 메시지 개선: 터널링 주소 사용 중이므로 서버 상태와 주소 확인을 다시 안내합니다.
      Alert.alert("네트워크 연결 실패 (터널링 문제)", `회원가입 중 문제가 발생했습니다.\n\n[확인 사항]\n1. 백엔드 서버(4000 포트)가 켜져 있습니까?\n2. 현재 터널링 주소(${API_URL})가 유효한지 확인해주세요.`);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = useMemo(() => {
    if (step === 1) return form.name.trim().length > 0 && /@/.test(form.email) && form.pw.length > 0;
    if (step === 2) return form.ageGroup !== null;
    if (step === 3) return form.stylePreferences.length > 0;
    return false;
  }, [step, form]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center' }}>
            <Pressable onPress={onBackToLogin} style={styles.backBtn}><ArrowLeft size={20} color="#111" /></Pressable>
            <Text style={styles.title}>회원가입</Text>
          </View>

          <View style={styles.progressBar}><View style={[styles.progressFill, { width: `${progress}%` }]} /></View>
          <Text style={styles.progressText}>{step} / {totalSteps}</Text>

          <View style={styles.card}>
            {step === 1 && (
              <View style={{ gap: 12 }}>
                <Text style={styles.sectionTitle}>기본 정보를 입력해주세요</Text>
                <TextInput value={form.name} onChangeText={t => setForm(p => ({ ...p, name: t}))} placeholder="이름 (닉네임)" placeholderTextColor="#6B7280" style={styles.input} />
                <TextInput value={form.email} onChangeText={t => setForm(p => ({ ...p, email: t}))} placeholder="이메일" placeholderTextColor="#6B7280" style={styles.input} keyboardType="email-address" autoCapitalize="none" />
                <TextInput value={form.pw} onChangeText={t => setForm(p => ({ ...p, pw: t}))} placeholder="비밀번호" placeholderTextColor="#6B7280" style={styles.input} secureTextEntry />
              </View>
            )}

            {step === 2 && (
              <View style={{ gap: 12 }}>
                <Text style={styles.sectionTitle}>나이대를 선택해주세요</Text>
                {['10대', '20대', '30대', '40대', '50대 이상'].map(age => (
                  <Pressable
                    key={age}
                    onPress={() => setForm(p => ({ ...p, ageGroup: parseInt(age) }))}
                    style={[styles.selectRow, form.ageGroup === parseInt(age) && styles.selectRowActive]}
                  >
                    <Text style={styles.selectLabel}>{age}</Text>
                    <View style={[styles.circle, form.ageGroup === parseInt(age) ? styles.circleOn : styles.circleOff]} />
                  </Pressable>
                ))}
              </View>
            )}

            {step === 3 && (
              <View style={{ gap: 16 }}>
                <Text style={styles.sectionTitle}>선호하는 스타일을 선택해주세요</Text>
                <Text style={styles.sectionSub}>여러 개 선택할 수 있습니다. ({form.stylePreferences.length}개 선택)</Text>
                <View style={styles.grid2}>
                  {STYLE_PREFERENCES.map(s => (
                    <Pressable key={s.name} onPress={() => toggleStyle(s.name)} style={[styles.styleCard, form.stylePreferences.includes(s.name) && styles.styleCardActive]}>
                      <Image source={{ uri: s.image }} style={styles.styleThumb} />
                      <View style={styles.styleOverlay} />
                      <Text style={styles.styleName}>{s.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
              {step > 1 && <Pressable onPress={back} style={styles.secondaryBtn}><Text style={styles.secondaryBtnText}>이전</Text></Pressable>}
              <Pressable onPress={next} disabled={!canProceed || loading} style={[styles.primaryBtn, (!canProceed || loading) && { opacity: 0.5 }]}>
                {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.primaryBtnText}>{step === totalSteps ? '완료' : '다음'}</Text>}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#F9FAFB' },
    container: { padding: 16, paddingBottom: 32, flexGrow: 1, justifyContent: 'center' },
    backBtn: { position: 'absolute', left: 0, top: 0, padding: 8 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    progressBar: { height: 4, borderRadius: 2, backgroundColor: '#E5E7EB', overflow: 'hidden', marginVertical: 8 },
    progressFill: { height: '100%', backgroundColor: '#111111' },
    progressText: { textAlign: 'center', fontSize: 11, color: '#6B7280', marginBottom: 16 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, elevation: 3 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
    sectionSub: { fontSize: 13, color: '#6B7280', marginBottom: 12 },
    // 🔍 입력 텍스트 색상은 검은색으로 유지하여 입력 시 잘 보이게 함
    input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, padding: 12, fontSize: 14, color: '#111' }, 
    selectRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8 },
    selectRowActive: { backgroundColor: '#F3F4F6', borderColor: '#111' },
    // 🔍 선택 라벨 텍스트 색상은 검은색으로 유지
    selectLabel: { fontSize: 14, color: '#111' }, 
    circle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#D1D5DB' },
    circleOn: { backgroundColor: '#111', borderColor: '#111' },
    circleOff: {},
    grid2: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
    styleCard: { width: '48.5%', aspectRatio: 3 / 4, borderRadius: 8, overflow: 'hidden', justifyContent: 'flex-end', padding: 8 },
    styleCardActive: { borderWidth: 2, borderColor: '#111' },
    styleThumb: { ...StyleSheet.absoluteFillObject },
    styleOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
    styleName: { color: '#FFF', fontWeight: 'bold', fontSize: 14, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: {width: 0, height: 1}, textShadowRadius: 2 },
    primaryBtn: { flex: 1, backgroundColor: '#111', padding: 12, borderRadius: 8, alignItems: 'center' },
    primaryBtnText: { color: '#FFF', fontWeight: '600' },
    secondaryBtn: { flex: 1, backgroundColor: '#F3F4F6', padding: 12, borderRadius: 8, alignItems: 'center' },
    secondaryBtnText: { color: '#111', fontWeight: '600' },
});
