import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function AnalysisScreen() {
  return (
    <View style={S.wrap}>
      <Feather name="maximize-2" size={40} color="#334155" />
      <Text style={S.title}>체형 분석</Text>
      <Text style={S.sub}>전신사진 기반 체형 인사이트</Text>
    </View>
  );
}
const S = StyleSheet.create({
  wrap:{flex:1,alignItems:'center',justifyContent:'center',gap:8,backgroundColor:'#fff'},
  title:{fontSize:20,fontWeight:'700',color:'#0f172a'},
  sub:{color:'#64748b'},
});
