import Api from '@/services/Api'

export default {
  fetchAlbums () {
    return Api().get('albums')
  },

  addAlbum (params) {
    return Api().post('albums', params)
  }  
}