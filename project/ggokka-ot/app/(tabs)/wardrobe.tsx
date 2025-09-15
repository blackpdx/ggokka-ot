import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function WardrobeScreen() {
  return (
    <View style={S.wrap}>
      <Feather name="shopping-bag" size={40} color="#334155" />
      <Text style={S.title}>가상 옷장</Text>
      <Text style={S.sub}>내 옷장 아이템 관리 화면</Text>
    </View>
  );
}
const S = StyleSheet.create({
  wrap:{flex:1,alignItems:'center',justifyContent:'center',gap:8,backgroundColor:'#fff'},
  title:{fontSize:20,fontWeight:'700',color:'#0f172a'},
  sub:{color:'#64748b'},
});
