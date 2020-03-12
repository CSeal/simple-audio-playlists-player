import React, {useMemo, useState, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {currentTrackIdSelector} from '../engine/core/trackManager/selectors';
import {TTrack} from '../engine/core/main/types';
import {actions} from '../engine/core/trackManager/actions';
import {Player} from '@react-native-community/audio-toolkit';

const PlayListTrack: React.FC<TTrack> = function({
  id,
  title,
  duration,
  media,
  isAvailable,
}) {
  const playingTrackId = useSelector(currentTrackIdSelector);
  const dispatch = useDispatch();
  const {mp3 = {}} = media;
  const [isPlay, setIsPlay] = useState(false);
  const player = useMemo(() => {
    const player: any = new Player(mp3.url, {autoDestroy: false});
    player.on('ended', () => {
      dispatch(actions.unsetCurrentTrack());
      setIsPlay(false);
    });
    return player;
  }, [mp3.url, dispatch]);
  useLayoutEffect(() => {
    if (id === playingTrackId && !isPlay) {
      player.play(() => {
        setIsPlay(true);
      });
      return;
    }

    if (id !== playingTrackId && isPlay) {
      player.stop(() => {
        setIsPlay(false);
      });
    }
  }, [playingTrackId, id, player, isPlay, setIsPlay]);

  const onPressHandler = () => {
    dispatch(actions.playCurrentTrack(id));
  };
  const renderTrackItem = (
    <View style={styles.root}>
      {isPlay && (
        <View style={styles.trackStatus}>
          <Icon name="ios-volume-high" size={24} color="green" />
        </View>
      )}
      <Text style={{fontSize: 16}}>{title}</Text>
    </View>
  );
  if (mp3.url) {
    return (
      <TouchableOpacity onPress={onPressHandler}>
        {renderTrackItem}
      </TouchableOpacity>
    );
  }
  return renderTrackItem;
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 15,
  },
  trackStatus: {
    marginRight: 10,
  },
});

export default PlayListTrack;
