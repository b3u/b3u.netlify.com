const datacache = require("@binyamin/data-cache");

function ms2string(ms) {
    const totalSeconds = ms / 1000;
    let s = Math.round(totalSeconds % 60);
    return `${Math.floor(totalSeconds / 60)}:${s < 10 ? "0" + s : s}`;
}

module.exports = function() {
    const data = datacache.get("spotify.tracks");

    return data.items.map(entry => ({
        title: entry.name,
        link: entry.external_urls.spotify,
        type: entry.type, // always "track"
        artists: entry.artists.map(a => a.name),
        duration_ms: entry.duration_ms,
        duration: ms2string(entry.duration_ms),
        id: entry.id,
        album: {
            album_type: entry.album.album_type.toLowerCase(),
            title: entry.album.name,
            album_art: Object.fromEntries(entry.album.images.map(i => [i.height, i.url])),
        }
    })).slice(0, 10);
}
