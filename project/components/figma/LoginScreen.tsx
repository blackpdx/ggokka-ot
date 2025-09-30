import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, TextInput as RNTextInput } from 'react-native';

export type LoginScreenProps = {
  onLoginSuccess: (name: string) => void;
  onLoginFail: () => void;
  onNavigateToSignup: () => void;
};

// 정규식 정의 (이전 요청에서 유지)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,20}$/;


export default function LoginScreen({
  onLoginSuccess,
  onLoginFail,
  onNavigateToSignup,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordInputRef = useRef<RNTextInput>(null);

  // 이메일(아이디) 입력 처리 핸들러 - 한글 입력 방지 로직 유지
  const handleEmailChange = (text: string) => {
    // 입력된 값에서 한글 (ㄱ-ㅎ, ㅏ-ㅣ, 가-힣)을 찾아서 공백으로 대체합니다.
    const cleanedValue = text.replace(/[ㄱ-ㅎ|가-힣]/g, '');
    setEmail(cleanedValue);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    // [유효성 검사] 이메일 정규식 검증 (실패 시 Alert)
    if (!EMAIL_REGEX.test(email)) {
        Alert.alert("유효성 오류", "유효한 이메일 형식으로 입력해주세요. (예: user@example.com)");
        return;
    }

    // [유효성 검사] 비밀번호 정규식 검증 (실패 시 Alert)
    if (!PASSWORD_REGEX.test(password)) {
        Alert.alert("유효성 오류", "비밀번호는 8~20자 이내이며, 영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
        return;
    }
    
    // 유효성 검사 통과! Alert 없이 바로 로그인 시도
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (response.ok) {
        // [수정/확인] 로그인 성공 시 Alert 없이 onLoginSuccess 호출 -> 화면 전환/리프레시 효과 발생
        onLoginSuccess(result.user.name); 
      } else {
        // [Alert] 로그인 실패 시 Alert 표시
        Alert.alert("로그인 실패", result.message || "로그인에 실패했습니다.");
        onLoginFail();
      }
    } catch (error) {
      console.error('Login API call error:', error);
      // [Alert] API 통신 오류 시 Alert 표시
      Alert.alert("오류", "로그인 중 문제가 발생했습니다. 서버 상태를 확인해주세요.");
      onLoginFail();
    } finally {
      setLoading(false);
    }
  };

  return (
    // 💡 참고: 전체 배경이 검은색인 경우, View의 배경색을 명시적으로 검은색으로 설정할 수 있습니다.
    <View style={[styles.container, {backgroundColor: '#000'}]}> 
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="#6B7280" // 🔍 수정: Placeholder 색상 추가
        value={email}
        onChangeText={handleEmailChange} // 한글 입력 방지 로직 유지
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#6B7280" // 🔍 수정: Placeholder 색상 추가
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleLogin}
      />
      <Pressable style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? '로그인 중...' : '로그인'}</Text>
      </Pressable>
      <Pressable style={styles.linkButton} onPress={onNavigateToSignup}>
        <Text style={styles.linkButtonText}>계정이 없으신가요? 회원가입</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // 💡 참고: 배경이 검은색일 때를 대비해, container에 배경색을 설정하지 않고도
  // 나머지 텍스트 색상을 대비되게 수정했습니다.
  container: { flex: 1, justifyContent: 'center', padding: 20 }, 
  // 🔍 수정: 어두운 배경에서 보이도록 텍스트 색상을 흰색으로 설정
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#FFF' }, 
  // 🔍 수정: 입력 텍스트가 흰색 박스에서 잘 보이도록 color를 검은색으로 설정
  input: { 
    backgroundColor: '#F3F4F6', 
    padding: 12, 
    borderRadius: 8, 
    fontSize: 16, 
    marginBottom: 16,
    color: '#111' // 입력 텍스트 색상
  },
  button: { backgroundColor: '#111', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  linkButton: { marginTop: 20, alignItems: 'center' },
  // 🔍 수정: 어두운 배경에서 잘 보이도록 텍스트 색상을 밝은 회색으로 변경
  linkButtonText: { color: '#D1D5DB', fontSize: 14 },
});
