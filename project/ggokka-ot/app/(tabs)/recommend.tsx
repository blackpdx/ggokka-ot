import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function RecommendScreen() {
  return (
    <View style={S.wrap}>
      <Feather name="zap" size={40} color="#334155" />
      <Text style={S.title}>추천</Text>
      <Text style={S.sub}>여기에 AI 추천 UI 붙이면 돼</Text>
    </View>
  );
}
const S = StyleSheet.create({
  wrap:{flex:1,alignItems:'center',justifyContent:'center',gap:8,backgroundColor:'#fff'},
  title:{fontSize:20,fontWeight:'700',color:'#0f172a'},
  sub:{color:'#64748b'},
});
