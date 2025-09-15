// app/(tabs)/capture.tsx
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<any>(null);              // 타입 충돌 피하려고 any 사용
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<'back' | 'front'>('back');

  // 권한 로딩 중
  if (!permission) {
    return (
      <View style={S.center}>
        <Text>권한 확인 중…</Text>
      </View>
    );
  }

  // 권한 미허용
  if (!permission.granted) {
    return (
      <View style={S.center}>
        <Feather name="camera-off" size={40} color="#334155" />
        <Text style={S.title}>카메라 권한이 필요해</Text>
        <Text style={S.sub}>설정에서 허용하거나 아래 버튼 눌러줘</Text>
        <TouchableOpacity style={S.btn} onPress={requestPermission}>
          <Text style={S.btnText}>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={S.wrap}>
      {photoUri ? (
        // 찍은/선택한 사진 미리보기
        <>
          <Image source={{ uri: photoUri }} style={S.preview} />
          <View style={S.bottomBar}>
            <TouchableOpacity style={S.btn} onPress={() => setPhotoUri(null)}>
              <Feather name="rotate-ccw" size={18} color="#111" />
              <Text style={S.btnText}>다시 찍기</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // 카메라 뷰
        <>
          <CameraView ref={camRef} style={S.camera} facing={facing} />

          <View style={S.bottomBar}>
            {/* 전/후면 전환 */}
            <TouchableOpacity
              style={S.round}
              onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
            >
              <Feather name="refresh-ccw" size={20} color="#111" />
            </TouchableOpacity>

            {/* 셔터 */}
            <TouchableOpacity
              style={S.shutter}
              onPress={async () => {
                try {
                  const res = await camRef.current?.takePictureAsync({
                    quality: 0.85,
                    skipProcessing: true,
                  });
                  if (res?.uri) setPhotoUri(res.uri);
                } catch (e) {
                  console.warn(e);
                }
              }}
            />

            {/* 갤러리에서 선택 */}
            <TouchableOpacity
              style={S.round}
              onPress={async () => {
                const { status } =
                  await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') return;
                const picked = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 0.9,
                });
                if (!picked.canceled) setPhotoUri(picked.assets[0].uri);
              }}
            >
              <Feather name="image" size={20} color="#111" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const S = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  preview: { flex: 1, resizeMode: 'cover' },

  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  round: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // 권한/로딩 화면
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  sub: { color: '#64748b' },

  // 공통 버튼
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  btnText: { color: '#111', fontWeight: '600' },
});
