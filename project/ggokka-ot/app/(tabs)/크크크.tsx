import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Test() {
  const [n, setN] = useState(0);
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text style={{ fontSize: 24 }}>{n}</Text>
      <TouchableOpacity onPress={() => setN(n + 1)}>
        <Text>+1</Text>
      </TouchableOpacity>
    </View>
  );
}
