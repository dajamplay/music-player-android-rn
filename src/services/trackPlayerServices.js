import TrackPlayer, {AppKilledPlaybackBehavior, Capability, RepeatMode} from 'react-native-track-player';


export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior:
                AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
            },
            capabilities: [
                Capability.Play,
                Capability.Pause,
                // Capability.Stop,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.SeekTo,
            ],
            compactCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ],
            progressUpdateEventInterval: 2,
        });
        await TrackPlayer.reset();
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        console.log('Player is ready.');
        isSetup = true;
    }
    catch {
        isSetup = false;
    }
    finally {
        return isSetup;
    }
}
