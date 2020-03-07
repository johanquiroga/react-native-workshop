import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { MainStackParamList } from '../App';

import ColorBox from '../components/ColorBox';

type ColorPaletteProps = {
  route: RouteProp<MainStackParamList, 'ColorPalette'>;
};

const ColorPalette = ({ route }: ColorPaletteProps) => {
  const { colors } = route.params;
  return (
    <FlatList
      data={colors}
      keyExtractor={item => item.colorName}
      renderItem={({ item }) => (
        <ColorBox hexCode={item.hexCode} colorName={item.colorName} />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ColorPalette;
