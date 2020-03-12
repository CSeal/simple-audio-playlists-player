import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TPlaylistMinCover} from '../engine/core/main/types';

interface IPlayListHeader {
  minCover: TPlaylistMinCover;
  title: string;
}

const PlayListHeader: React.FC<IPlayListHeader> = function({minCover, title}) {
  console.log(minCover)
  return (
      <View style={styles.root}>
        <View style={{marginRight: 15}}>
          <Image source={{uri: minCover.url}} style={{width: minCover.size, height: minCover.size}}/>
        </View>
        <Text style={{fontSize: 20}}>{title}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default PlayListHeader;
