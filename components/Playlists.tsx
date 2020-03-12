import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {TData} from '../engine/core/main/types';
import PlaylistHeader from './PlayListHeader';
import PlayListTrack from './PlayListTrack';

interface IPlaylistsProps{
  data: TData[] | []
}

const Playlists: React.FC<IPlaylistsProps> = function({data}) {

  return (
      <View style={styles.root}>
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => (
            <View style={{marginBottom: 20}}>
              <PlaylistHeader minCover={item.minCover} title={item.title}/>
              {
                item.tracks.map(track => (<PlayListTrack  {...track} id={track.key}/>))
              }
            </View>
          )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Playlists;
