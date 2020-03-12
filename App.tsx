import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import {store} from './engine/init/store'
import {Provider} from 'react-redux'
import MainScreen from './screens/MainScreen';
import {actions} from './engine/core/main/actions'

import {Player} from '@react-native-community/audio-toolkit';

import {PlaylistData} from './data/playlist';

const App: React.FC<{}> = () => {
  useEffect(() => {
    store.dispatch(actions.playlistsLoading());
  }, [store.dispatch])
  return (
    <Provider store={store}>
      <View style={{height: Dimensions.get('window').height}}>
        <MainScreen />
      </View>
    </Provider>
  );
};

export default App;

interface PlayListProps {
  title: string;
  minCover: PlaylistMinCover;
  tracks: Track[];
}

type PlaylistMinCover = {
  url: string;
  size: number;
};

type Track = {
  key: string;
  title: string;
  order: number;
  duration: number;
  media: {
    mp3: {
      url: string;
      headUrl: string;
    };
  };
  isAvailable: boolean;
};

const PlayList: React.FC<PlayListProps> = ({title, minCover, tracks}) => {
  const renderTask = ({item}) => (
    <MP3Track
      title={item.title}
      duration={item.duration}
      url={item.media.mp3.url}
      isAvailable={item.isAvailable}
    />
  );
  const data = useMemo(() => tracks.sort((a, b) => a.order - b.order), [tracks])
  return (
    <View>
      <Image source={{
        url: minCover.url
      }}
        style={{width: minCover.size, height: minCover.size}}
      />
      <Text style={{fontSize: 20, marginBottom: 20}}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderTask}
      />
    </View>
  );
};

interface MP3TrackProps {
  title: string;
  duration: number;
  url: string;
  isAvailable: boolean;
} ;

const MP3Track: React.FC<MP3TrackProps> = ({title, duration, url, isAvailable}) => {
  const player = useMemo(() => new Player(url), [url])
  const [isPlay, setIsPlay] = useState(false);
  const onPressHandler = () => {
    console.log(title, isPlay)
    if (!isPlay) {
      player.play(() => {
        setIsPlay(true);
      });
    } else {
      player.pause(() => {
        setIsPlay(false);
      })
    }
  }

  return (<TouchableOpacity onPress={onPressHandler}>
            <View>
              <Text style={{fontSize: 16, marginBottom: 10}}>{title}</Text>
            </View>
          </TouchableOpacity>)
}