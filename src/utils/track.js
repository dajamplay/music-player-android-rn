export const prepareTrackToAddQueue = (track) => ({
    ...track,
    id: Date.now(),
});
