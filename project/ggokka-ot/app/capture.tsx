// components/OutfitCapture.tsx  (또는 app/capture.tsx)
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image as RNImage } from 'react-native';
import { CameraView, useCameraPermissions, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function OutfitCapture() {
  const camRef = useRef<CameraView>(null);

  const [cameraPerm, requestCameraPerm] = useCameraPermissions();
  const [libPerm, requestLibPerm] = MediaLibrary.usePermissions();

  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [guidelineOn] = useState(true);

  if (!cameraPerm) return <View />;

  if (!cameraPerm.granted) {
    return (
      <View style={S.center}>
        <Text style={S.title}>카메라 권한이 필요해</Text>
        <TouchableOpacity style={[S.btn, S.btnPrimary]} onPress={requestCameraPerm}>
          <Text style={S.btnPrimaryText}>권한 허용</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    const res = await camRef.current?.takePictureAsync({
      quality: 0.9,
      base64: true,           // 나중에 서버로 분석 보낼 때 사용 가능
      skipProcessing: true,
    });
    if (res?.uri) setPhotoUri(res.uri);
  };

  const pickFromGallery = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });
    if (!r.canceled) setPhotoUri(r.assets[0].uri);
  };

  const saveToAlbum = async () => {
    if (!libPerm?.granted) await requestLibPerm();
    if (photoUri) await MediaLibrary.saveToLibraryAsync(photoUri);
  };

  // ── 찍은 사진 미리보기 화면 ─────────────────────
  if (photoUri) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <RNImage source={{ uri: photoUri }} style={{ flex: 1, resizeMode: 'contain' }} />
        <View style={S.previewBar}>
          <TouchableOpacity style={[S.btn, S.btnOutline]} onPress={() => setPhotoUri(null)}>
            <Text>다시 찍기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[S.btn, S.btnPrimary]} onPress={saveToAlbum}>
            <Text style={S.btnPrimaryText}>앨범에 저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.btn, S.btnPrimary]}
            onPress={() => {
              // TODO: 여기서 photoUri(또는 base64)를 서버/모델로 보낸 뒤 결과 화면으로 이동
              // ex) uploadAndAnalyze(photoUri)
            }}
          >
            <Text style={S.btnPrimaryText}>분석하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── 카메라 뷰 ─────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <CameraView
        ref={camRef}
        style={{ flex: 1 }}
        facing={facing}
        flash={flash}
      />

      {/* 가이드 프레임 */}
      {guidelineOn && (
        <View pointerEvents="none" style={S.overlay}>
          <View style={S.guideBox} />
          <Text style={S.guideText}>이 박스에 전신이 들어오게 맞춰줘</Text>
        </View>
      )}

      {/* 하단 컨트롤 바 */}
      <View style={S.bottomBar}>
        <TouchableOpacity style={[S.btn, S.btnOutline]} onPress={pickFromGallery}>
          <Text>갤러리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={S.shutter} onPress={takePicture} />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={[S.btn, S.btnOutline]}
            onPress={() => setFacing((p) => (p === 'back' ? 'front' : 'back'))}
          >
            <Text>{facing === 'back' ? '셀카' : '후면'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[S.btn, S.btnOutline]}
            onPress={() => setFlash((f) => (f === 'off' ? 'on' : 'off'))}
          >
            <Text>플래시 {flash === 'off' ? 'OFF' : 'ON'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const S = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12 },

  overlay: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  guideBox: {
    width: '70%', aspectRatio: 9 / 16,
    borderWidth: 3, borderColor: '#ffffffaa', borderRadius: 16,
  },
  guideText: {
    color: '#fff', marginTop: 12, textShadowColor: '#000', textShadowRadius: 6,
  },

  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    padding: 12, gap: 12,
    backgroundColor: '#00000080',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  btnOutline: { backgroundColor: '#ffffffcc' },
  btnPrimary: { backgroundColor: '#334155' },
  btnPrimaryText: { color: '#fff', fontWeight: '700' },

  shutter: {
    width: 68, height: 68, borderRadius: 999,
    borderWidth: 6, borderColor: '#fff', backgroundColor: '#ffffff30',
  },

  previewBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    padding: 12, gap: 8, backgroundColor: '#00000080',
    flexDirection: 'row', justifyContent: 'space-between',
  },
});
