import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {playlistsSelector} from '../engine/core/main/selectors'
import Playlists from '../components/Playlists'

interface IMainScreenProps {}

const MainScreen: React.FC<IMainScreenProps> = function(props) {
  const {data, loading, errors} = useSelector(playlistsSelector);
  const renderData = loading
    ? <Text style={{fontSize: 18}}>Playlists Loading...</Text>
    : errors
      ? <Text style={{fontSize: 16}}>You have got some errors</Text>
      :<Playlists data={data}/>
  return (
    <View style={styles.root}>
      <Text style={{fontSize: 28}}>PlayLists</Text>
      {renderData}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 25,
  },
});

export default MainScreen;
