import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, MainStackParamList, Palette } from '../App';

import PalettePreview from '../components/PalettePreview';

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

type HomeProps = {
  route: RouteProp<MainStackParamList, 'Home'>;
  navigation: HomeScreenNavigationProp;
};

const Home = ({ route, navigation }: HomeProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [colorPalettes, setColorPalettes] = useState<Palette[]>([]);

  useEffect(() => {
    if (route.params?.newPalette) {
      setColorPalettes(prevPalettes => [
        route.params.newPalette,
        ...prevPalettes,
      ]);
    }
  }, [route.params?.newPalette]);

  const fetchColorPalettes = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        'https://color-palette-api.kadikraman.now.sh/palettes',
      );

      if (response.ok) {
        const palettes = await response.json();

        setColorPalettes(palettes);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  const handleRefresh = useCallback(async () => {
    await fetchColorPalettes();
  }, []);

  return (
    <FlatList
      data={colorPalettes}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <PalettePreview
          palette={item}
          onPress={() => navigation.navigate('ColorPalette', item)}
        />
      )}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorPaletteModal')}
        >
          <Text style={styles.buttonText}>Add a color scheme</Text>
        </TouchableOpacity>
      }
      refreshing={refreshing}
      onRefresh={handleRefresh}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 10,
  },
});

export default Home;
