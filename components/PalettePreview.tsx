import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { Palette } from '../App';

type PalettePreviewProps = {
  onPress: () => void;
  palette: Palette;
};

const PalettePreview = ({ palette, onPress }: PalettePreviewProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{palette.paletteName}</Text>
      <FlatList
        data={palette.colors.slice(0, 5)}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => (
          <View
            style={[
              styles.box,
              styles.color,
              { backgroundColor: item.hexCode },
            ]}
          />
        )}
        style={styles.list}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  box: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  color: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default PalettePreview;
