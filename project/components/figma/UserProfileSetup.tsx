// components/figma/UserProfileSetup.tsx
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FormData = {
  name: string;
  gender: '' | 'female' | 'male' | 'other';
  ageGroup: '' | '10s' | '20s' | '30s' | '40s' | '50s';
  skinTone: string;
  stylePreferences: string[];
  measurements: {
    height: string;
    weight: string;
    chest: string;
    waist: string;
    hip: string;
  };
};

export default function UserProfileSetup({
  onComplete,
}: {
  onComplete: (data: FormData) => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    ageGroup: '',
    skinTone: '',
    stylePreferences: [],
    measurements: { height: '', weight: '', chest: '', waist: '', hip: '' },
  });

  const progress = useMemo(() => (currentStep / totalSteps) * 100, [currentStep]);

  const SKIN_TONES = useMemo(
    () => [
      { id: 'cool-fair', name: '쿨 페어', color: '#F7E7CE' },
      { id: 'warm-fair', name: '웜 페어', color: '#F2D7A7' },
      { id: 'cool-medium', name: '쿨 미디움', color: '#E8B887' },
      { id: 'warm-medium', name: '웜 미디움', color: '#D4A574' },
      { id: 'cool-tan', name: '쿨 탄', color: '#C08B5C' },
      { id: 'warm-tan', name: '웜 탄', color: '#A67449' },
    ],
    []
  );

  const STYLE_PREFERENCES = useMemo(
    () => [
      '미니멀', '클래식', '모던', '캐주얼', '스트릿', '빈티지',
      '보헤미안', '로맨틱', '펑키', '스포티', '글램', '시크',
      '프레피', '힙스터', '고스', '펑크', '레트로', '아방가르드',
      '에스닉', '컨템포러리', '하이패션', '언더그라운드', 'K-패션', '요가',
    ],
    []
  );

  function handleNext() {
    if (currentStep < totalSteps) setCurrentStep((s) => s + 1);
    else onComplete(formData);
  }
  function handleBack() {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  }
  function toggleStyle(style: string) {
    setFormData((prev) => ({
      ...prev,
      stylePreferences: prev.stylePreferences.includes(style)
        ? prev.stylePreferences.filter((s) => s !== style)
        : [...prev.stylePreferences, style],
    }));
  }
  function canProceed() {
    if (currentStep === 1) return formData.name.trim() !== '';
    if (currentStep === 2) return formData.gender !== '';
    if (currentStep === 3) return formData.ageGroup !== '';
    if (currentStep === 4) return formData.skinTone !== '';
    if (currentStep === 5) return formData.stylePreferences.length > 0;
    return true;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.wrap}>
          {/* 헤더 + 진행도 */}
          <View style={styles.header}>
            <View style={{ alignItems: 'center', gap: 6 }}>
              <Text style={styles.title}>프로필 설정</Text>
              <View style={styles.grayLine} />
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFg, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {currentStep} / {totalSteps}
            </Text>
          </View>

          {/* 카드 */}
          <View style={styles.card}>
            <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
              {currentStep === 1 && (
                <View style={{ gap: 16 }}>
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={styles.stepTitle}>사용하실 이름을 알려주세요</Text>
                    <Text style={styles.stepSub}>개인화된 서비스를 위해 필요합니다</Text>
                  </View>
                  <TextInput
                    placeholder="닉네임을 입력하세요"
                    value={formData.name}
                    onChangeText={(t) => setFormData((p) => ({ ...p, name: t }))}
                    style={[styles.input, { textAlign: 'center' }]}
                    placeholderTextColor="#9CA3AF"
                    returnKeyType="next"
                  />
                </View>
              )}

              {currentStep === 2 && (
                <View style={{ gap: 16 }}>
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={styles.stepTitle}>성별을 선택해주세요</Text>
                    <Text style={styles.stepSub}>맞춤 추천을 위해 필요합니다</Text>
                  </View>

                  {[
                    { key: 'female', label: '여성' },
                    { key: 'male', label: '남성' },
                    { key: 'other', label: '기타' },
                  ].map((g) => {
                    const active = formData.gender === (g.key as FormData['gender']);
                    return (
                      <Pressable
                        key={g.key}
                        onPress={() =>
                          setFormData((p) => ({ ...p, gender: g.key as FormData['gender'] }))
                        }
                        style={[styles.selectRow, active && styles.selectRowActive]}
                      >
                        <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                          {active ? <View style={styles.radioInner} /> : null}
                        </View>
                        <Text style={styles.selectLabel}>{g.label}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}

              {currentStep === 3 && (
                <View style={{ gap: 16 }}>
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={styles.stepTitle}>나이대를 선택해주세요</Text>
                    <Text style={styles.stepSub}>연령에 맞는 스타일을 제안해드립니다</Text>
                  </View>

                  {[
                    { key: '10s', label: '10대' },
                    { key: '20s', label: '20대' },
                    { key: '30s', label: '30대' },
                    { key: '40s', label: '40대' },
                    { key: '50s', label: '50대 이상' },
                  ].map((a) => {
                    const active = formData.ageGroup === (a.key as FormData['ageGroup']);
                    return (
                      <Pressable
                        key={a.key}
                        onPress={() =>
                          setFormData((p) => ({ ...p, ageGroup: a.key as FormData['ageGroup'] }))
                        }
                        style={[styles.selectRow, active && styles.selectRowActive]}
                      >
                        <Text style={styles.selectLabel}>{a.label}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}

              {currentStep === 4 && (
                <View style={{ gap: 16 }}>
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={styles.stepTitle}>본인의 정확한 피부톤을 선택해주세요</Text>
                    <Text style={styles.stepSub}>정확한 분석을 위해 필요합니다</Text>
                  </View>

                  <View style={styles.toneGrid}>
                    {SKIN_TONES.map((tone) => {
                      const active = formData.skinTone === tone.id;
                      return (
                        <Pressable
                          key={tone.id}
                          onPress={() => setFormData((p) => ({ ...p, skinTone: tone.id }))}
                          style={[styles.toneItem, active ? styles.toneItemActive : styles.toneItemIdle]}
                        >
                          <View style={[styles.toneDot, { backgroundColor: tone.color }]} />
                          <Text style={styles.toneLabel}>{tone.name}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              )}

              {currentStep === 5 && (
                <View style={{ gap: 16 }}>
                  <View style={{ alignItems: 'center', gap: 6 }}>
                    <Text style={styles.stepTitle}>선호하는 스타일을 선택해주세요</Text>
                    <Text style={styles.stepSub}>
                      여러 개 선택 가능합니다 ({formData.stylePreferences.length}개 선택됨)
                    </Text>
                  </View>

                  <View style={styles.styleGrid}>
                    {STYLE_PREFERENCES.map((s) => {
                      const active = formData.stylePreferences.includes(s);
                      return (
                        <Pressable
                          key={s}
                          onPress={() => toggleStyle(s)}
                          style={[styles.styleBtn, active ? styles.styleBtnActive : styles.styleBtnIdle]}
                        >
                          <Text style={[styles.styleBtnText, active && styles.styleBtnTextActive]}>{s}</Text>
                        </Pressable>
                      );
                    })}
                  </View>

                  <View style={styles.measureBox}>
                    <Text style={styles.measureTitle}>신체 정보 (선택사항)</Text>
                    <Text style={styles.measureSub}>작성하시면 더 정확한 분석이 가능합니다</Text>

                    <View style={styles.grid2}>
                      <TextInput
                        placeholder="키 (cm)"
                        keyboardType="numeric"
                        value={formData.measurements.height}
                        onChangeText={(t) =>
                          setFormData((p) => ({ ...p, measurements: { ...p.measurements, height: t } }))
                        }
                        style={styles.input}
                        placeholderTextColor="#9CA3AF"
                      />
                      <TextInput
                        placeholder="몸무게 (kg)"
                        keyboardType="numeric"
                        value={formData.measurements.weight}
                        onChangeText={(t) =>
                          setFormData((p) => ({ ...p, measurements: { ...p.measurements, weight: t } }))
                        }
                        style={styles.input}
                        placeholderTextColor="#9CA3AF"
                      />
                      <TextInput
                        placeholder="가슴둘레 (cm)"
                        keyboardType="numeric"
                        value={formData.measurements.chest}
                        onChangeText={(t) =>
                          setFormData((p) => ({ ...p, measurements: { ...p.measurements, chest: t } }))
                        }
                        style={styles.input}
                        placeholderTextColor="#9CA3AF"
                      />
                      <TextInput
                        placeholder="허리둘레 (cm)"
                        keyboardType="numeric"
                        value={formData.measurements.waist}
                        onChangeText={(t) =>
                          setFormData((p) => ({ ...p, measurements: { ...p.measurements, waist: t } }))
                        }
                        style={styles.input}
                        placeholderTextColor="#9CA3AF"
                      />
                    </View>

                    <TextInput
                      placeholder="엉덩이둘레 (cm)"
                      keyboardType="numeric"
                      value={formData.measurements.hip}
                      onChangeText={(t) =>
                        setFormData((p) => ({ ...p, measurements: { ...p.measurements, hip: t } }))
                      }
                      style={styles.input}
                      placeholderTextColor="#9CA3AF"
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* 하단 버튼 */}
            <View style={styles.footerBtns}>
              {currentStep > 1 && (
                <Pressable onPress={handleBack} style={[styles.btn, styles.btnOutline]}>
                  <Text style={[styles.btnText, styles.btnTextOutline]}>이전</Text>
                </Pressable>
              )}
              <Pressable
                onPress={handleNext}
                disabled={!canProceed()}
                style={[styles.btn, styles.btnPrimary, !canProceed() && styles.btnDisabled]}
              >
                <Text style={styles.btnText}>{currentStep === totalSteps ? '완료' : '다음'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  wrap: { flex: 1, paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 },
  header: { marginBottom: 16, alignItems: 'center' },
  title: { fontSize: 20, color: '#111827', fontFamily: 'PlayfairDisplay-SemiBold', letterSpacing: 1 },
  grayLine: { width: 32, height: 1, backgroundColor: '#D1D5DB', marginTop: 6 },
  progressBarBg: { width: '100%', height: 4, backgroundColor: '#E5E7EB', marginTop: 12 },
  progressBarFg: { height: 4, backgroundColor: '#111111' },
  progressText: { marginTop: 6, fontSize: 12, color: '#6B7280', fontFamily: 'Inter' },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    overflow: 'hidden',
  },

  stepTitle: { fontSize: 16, color: '#111827', fontFamily: 'Inter', fontWeight: '300' },
  stepSub: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter' },

  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter',
  },

  selectRow: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectRowActive: { backgroundColor: '#F3F4F6', borderColor: '#111111' },
  selectLabel: { fontSize: 14, color: '#111827', fontFamily: 'Inter' },

  radioOuter: {
    width: 18, height: 18, borderRadius: 18, borderWidth: 1.5, borderColor: '#9CA3AF',
    alignItems: 'center', justifyContent: 'center',
  },
  radioOuterActive: { borderColor: '#111111' },
  radioInner: { width: 10, height: 10, borderRadius: 10, backgroundColor: '#111111' },

  toneGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  toneItem: { width: '48%', padding: 12, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  toneItemIdle: { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  toneItemActive: { borderColor: '#111111', backgroundColor: '#F9FAFB' },
  toneDot: { width: 22, height: 22, borderRadius: 22, borderWidth: 1, borderColor: '#D1D5DB' },
  toneLabel: { fontSize: 13, color: '#111827', fontFamily: 'Inter' },

  styleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, maxHeight: 260 },
  styleBtn: { paddingVertical: 10, paddingHorizontal: 10, borderWidth: 1, borderRadius: 4 },
  styleBtnIdle: { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  styleBtnActive: { borderColor: '#111111', backgroundColor: '#111111' },
  styleBtnText: { fontSize: 12, color: '#111827', fontFamily: 'Inter' },
  styleBtnTextActive: { color: '#FFFFFF' },

  measureBox: { gap: 8, padding: 12, backgroundColor: '#F3F4F6', borderLeftWidth: 2, borderLeftColor: '#9CA3AF' },
  measureTitle: { fontSize: 13, color: '#111827', fontFamily: 'Inter' },
  measureSub: { fontSize: 11, color: '#6B7280', fontFamily: 'Inter' },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  footerBtns: { flexDirection: 'row', gap: 10, padding: 16, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E5E7EB' },
  btn: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 8 },
  btnOutline: { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  btnTextOutline: { color: '#111827' },
  btnPrimary: { backgroundColor: '#111111' },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#FFFFFF', fontSize: 14, fontFamily: 'Inter', letterSpacing: 0.3 },
});
