// components/figma/AuthScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type AuthScreenProps = {
  onAuth: () => void;
};

type Mode = 'login' | 'signup';

export default function AuthScreen({ onAuth }: AuthScreenProps) {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const title = useMemo(
    () => (mode === 'login' ? '계정에 로그인하세요' : '새 계정을 만들어 보세요'),
    [mode]
  );

  // ✅ 검증 완화: 이메일은 '@'만 확인, 비번은 1자 이상이면 OK (임시)
  const canSubmit = useMemo(() => {
    if (loading) return false;
    if (mode === 'signup' && name.trim().length === 0) return false;
    const okEmail = /@/.test(email.trim());
    return okEmail && pw.length >= 1;
  }, [mode, name, email, pw, loading]);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setErr(null);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      onAuth();
    } catch (e) {
      setErr('요청 처리 중 오류가 발생했어. 잠시 후 다시 시도해줘.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* 카드 */}
          <View style={styles.card}>
            {/* 헤더 */}
            <View style={styles.cardHeader}>
              <View style={{ gap: 12, alignItems: 'center' }}>
                <Text style={styles.brand}>꼬까옷</Text>
                <View style={styles.grayLine} />
              </View>
              <Text style={styles.cardTitle}>{title}</Text>
            </View>

            {/* 탭 */}
            <View style={styles.tabs}>
              <View style={styles.tabsList}>
                <Pressable
                  onPress={() => setMode('login')}
                  style={[styles.tabBtn, mode === 'login' && styles.tabBtnActive]}
                >
                  <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                    로그인
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setMode('signup')}
                  style={[styles.tabBtn, mode === 'signup' && styles.tabBtnActive]}
                >
                  <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                    회원가입
                  </Text>
                </Pressable>
              </View>

              {/* 내용 */}
              <View style={{ marginTop: 16 }}>
                {mode === 'login' ? (
                  <View style={{ gap: 12 }}>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="이메일을 입력하세요"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}      // ✅ 오타 자동수정 끔
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TextInput
                      value={pw}
                      onChangeText={setPw}
                      placeholder="비밀번호를 입력하세요"
                      secureTextEntry
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                    {!!err && <Text style={styles.error}>{err}</Text>}
                    <Pressable
                      onPress={handleSubmit}
                      disabled={!canSubmit}
                      style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
                    >
                      {loading ? (
                        <ActivityIndicator color="#FFF" />
                      ) : (
                        <Text style={styles.primaryBtnText}>로그인</Text>
                      )}
                    </Pressable>
                  </View>
                ) : (
                  <View style={{ gap: 12 }}>
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder="이름을 입력하세요"
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="이메일을 입력하세요"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}      // ✅ 오타 자동수정 끔
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                    <TextInput
                      value={pw}
                      onChangeText={setPw}
                      placeholder="비밀번호를 입력하세요"
                      secureTextEntry
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                    {!!err && <Text style={styles.error}>{err}</Text>}
                    <Pressable
                      onPress={handleSubmit}
                      disabled={!canSubmit}
                      style={[styles.primaryBtn, !canSubmit && styles.primaryBtnDisabled]}
                    >
                      {loading ? (
                        <ActivityIndicator color="#FFF" />
                      ) : (
                        <Text style={styles.primaryBtnText}>회원가입</Text>
                      )}
                    </Pressable>
                  </View>
                )}
              </View>
            </View>

            {/* 푸터 안내 */}
            <View style={styles.footerNote}>
              <Text style={styles.footerText}>
                계속 진행하시면 이용약관 및 개인정보처리방침에{'\n'}동의하는 것으로 간주됩니다.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' }, // bg-gray-50
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    overflow: 'hidden',
  },

  cardHeader: { alignItems: 'center', paddingTop: 24, paddingBottom: 20, gap: 12 },
  brand: {
    fontSize: 22,
    color: '#111827',
    letterSpacing: 1, // tracking-[0.1em] 근사
    fontWeight: '300',
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  grayLine: { width: 48, height: 1, backgroundColor: '#D1D5DB', alignSelf: 'center' },
  cardTitle: { fontSize: 16, color: '#374151', fontWeight: '300', fontFamily: 'Inter' },

  tabs: { paddingHorizontal: 20, paddingBottom: 20 },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 0,
    overflow: 'hidden',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: '#E5E7EB' },
  tabText: { color: '#111827', fontSize: 14, fontFamily: 'Inter' },
  tabTextActive: { fontWeight: '600', fontFamily: 'Inter-SemiBold' },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 0,
    borderRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter',
  },

  error: {
    marginTop: 4,
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'Inter',
  },

  primaryBtn: {
    marginTop: 4,
    backgroundColor: '#111111',
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryBtnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontFamily: 'Inter', letterSpacing: 0.3 },

  footerNote: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8, alignItems: 'center' },
  footerText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#6B7280',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
});
