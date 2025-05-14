import axios from 'axios'

const api = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const searchMusic = async (query, page = 0, limit = 20) => {
  try {
    const [artists, albums, tracks] = await Promise.all([
      api.get(`/search/artist?q=${query}&index=${page * limit}&limit=${limit}`),
      api.get(`/search/album?q=${query}&index=${page * limit}&limit=${limit}`),
      api.get(`/search/track?q=${query}&index=${page * limit}&limit=${limit}`)
    ])

    return {
      artists: {
        data: artists.data.data.map(artist => ({
          id: artist.id,
          name: artist.name,
          image: artist.picture_medium,
          type: 'artist'
        })),
        total: artists.data.total
      },
      albums: {
        data: albums.data.data.map(album => ({
          id: album.id,
          name: album.title,
          artist: album.artist.name,
          image: album.cover_medium,
          type: 'album'
        })),
        total: albums.data.total
      },
      songs: {
        data: tracks.data.data.map(track => ({
          id: track.id,
          name: track.title,
          artist: track.artist.name,
          image: track.album.cover_medium,
          duration: formatDuration(track.duration),
          preview: track.preview,
          type: 'track'
        })),
        total: tracks.data.total
      }
    }
  } catch (error) {
    console.error('Erro ao buscar músicas:', error)
    return {
      artists: { data: [], total: 0 },
      albums: { data: [], total: 0 },
      songs: { data: [], total: 0 }
    }
  }
}

export const getArtist = async id => {
  try {
    const [artist, topTracks, albums] = await Promise.all([
      api.get(`/artist/${id}`),
      api.get(`/artist/${id}/top`),
      api.get(`/artist/${id}/albums`)
    ])

    return {
      ...artist.data,
      topTracks: topTracks.data.data,
      albums: albums.data.data
    }
  } catch (error) {
    console.error('Erro ao buscar artista:', error)
    return null
  }
}

export const getAlbum = async id => {
  try {
    const response = await api.get(`/album/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar álbum:', error)
    return null
  }
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default api
