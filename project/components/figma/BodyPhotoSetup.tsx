// components/figma/BodyPhotoSetup.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Alert as RNAlert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Upload, CheckCircle } from 'lucide-react-native';

export default function BodyPhotoSetup({ onComplete }: { onComplete: () => void }) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  async function pickFromCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      RNAlert.alert('권한 필요', '카메라 권한을 허용해줘.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!res.canceled) {
      startAnalysis(res.assets[0].uri);
    }
  }

  async function pickFromLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      RNAlert.alert('권한 필요', '사진 라이브러리 권한을 허용해줘.');
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!res.canceled) {
      startAnalysis(res.assets[0].uri);
    }
  }

  function startAnalysis(uri: string) {
    setImageUri(uri);
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    // 분석 시뮬레이션
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>체형 분석</Text>
          <View style={styles.line} />
          <Text style={styles.sub}>정확한 코디 추천을 위해 체형 분석이 필요합니다</Text>
        </View>

        {/* 카드 */}
        <View style={styles.card}>
          {/* 가이드 */}
          <View style={styles.alert}>
            <View style={{ gap: 6 }}>
              <Text style={styles.alertTitle}>최적의 분석을 위한 촬영 가이드</Text>
              <View style={{ gap: 2 }}>
                {['정면을 바라보고 서서 촬영', '체형이 잘 드러나는 옷 착용', '밝은 곳에서 선명하게 촬영', '전신이 모두 나오도록 촬영'].map(
                  (t) => (
                    <Text key={t} style={styles.alertItem}>
                      • {t}
                    </Text>
                  )
                )}
              </View>
            </View>
          </View>

          {!imageUri ? (
            <View style={{ gap: 16 }}>
              <View style={styles.placeholder}>
                <View style={styles.placeholderIcon}>
                  <Camera size={32} color="#9CA3AF" />
                </View>
                <View style={{ alignItems: 'center', gap: 4 }}>
                  <Text style={styles.placeholderMain}>체형 분석을 위한 사진을 업로드해주세요</Text>
                  <Text style={styles.placeholderSub}>AI가 자동으로 체형을 분석합니다</Text>
                </View>
              </View>

              <View style={styles.row2}>
                <Pressable onPress={pickFromCamera} style={[styles.btn, styles.btnPrimary]}>
                  <Camera size={16} color="#FFF" />
                  <Text style={styles.btnPrimaryText}>카메라 촬영</Text>
                </Pressable>
                <Pressable onPress={pickFromLibrary} style={[styles.btn, styles.btnOutline]}>
                  <Upload size={16} color="#111" />
                  <Text style={styles.btnOutlineText}>사진 선택</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={{ gap: 16 }}>
              <View style={styles.previewBox}>
                <Image source={{ uri: imageUri }} style={styles.previewImg} />
              </View>

              {isAnalyzing && (
                <View style={{ alignItems: 'center', gap: 12 }}>
                  <ActivityIndicator />
                  <Text style={styles.placeholderMain}>AI가 체형을 분석하고 있습니다...</Text>
                </View>
              )}

              {analysisComplete && (
                <View style={{ gap: 16 }}>
                  <View style={styles.alert}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <CheckCircle size={16} color="#4B5563" />
                      <Text style={styles.alertDone}>
                        체형 분석이 완료되었습니다. 회원님은 <Text style={styles.alertDoneStrong}>애플형</Text> 체형으로 분석되었습니다.
                      </Text>
                    </View>
                  </View>

                  <View style={styles.row2}>
                    <Pressable onPress={pickFromLibrary} style={[styles.btn, styles.btnOutline, { flex: 1 }]}>
                      <Text style={styles.btnOutlineText}>다시 촬영</Text>
                    </Pressable>
                    <Pressable onPress={onComplete} style={[styles.btn, styles.btnPrimary, { flex: 1 }]}>
                      <Text style={styles.btnPrimaryText}>다음 단계</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { padding: 16, paddingTop: 24 },
  header: { alignItems: 'center', gap: 6, marginBottom: 16 },
  title: { fontSize: 20, color: '#111827', letterSpacing: 1, fontFamily: 'PlayfairDisplay-SemiBold' },
  line: { width: 32, height: 1, backgroundColor: '#D1D5DB' },
  sub: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    padding: 16,
  },

  alert: { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F9FAFB', padding: 12 },
  alertTitle: { fontSize: 13, color: '#111827', fontFamily: 'Inter' },
  alertItem: { fontSize: 12, color: '#6B7280', fontFamily: 'Inter' },

  placeholder: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    aspectRatio: 3 / 4,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  placeholderIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center' },
  placeholderMain: { fontSize: 13, color: '#4B5563', fontFamily: 'Inter' },
  placeholderSub: { fontSize: 11, color: '#6B7280', fontFamily: 'Inter' },

  row2: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  btnPrimary: { backgroundColor: '#111111' },
  btnPrimaryText: { color: '#FFFFFF', fontSize: 14, fontFamily: 'Inter' },
  btnOutline: { borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  btnOutlineText: { color: '#111111', fontSize: 14, fontFamily: 'Inter' },

  previewBox: { aspectRatio: 3 / 4, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#F3F4F6', overflow: 'hidden' },
  previewImg: { width: '100%', height: '100%', resizeMode: 'cover' },
});
