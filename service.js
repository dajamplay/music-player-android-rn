import TrackPlayer, {Event} from 'react-native-track-player';


module.exports = async function() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });

    // TrackPlayer.addEventListener(Event.RemoteStop, () => {
    //     TrackPlayer.stop();
    // });

    // TrackPlayer.addEventListener(Event.RemoteNext, () => {
    //     TrackPlayer.skipToNext();
    // });
    //
    // TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    //     TrackPlayer.skipToPrevious();
    // });

    TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
        TrackPlayer.seekTo(event.position);
    });
};
