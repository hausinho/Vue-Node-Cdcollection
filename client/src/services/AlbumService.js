import Api from '@/services/Api'

export default {
  fetchAlbums () {
    return Api().get('albums')
  },

  addAlbum (params) {
    return Api().post('albums', params)
  },
  
  updateAlbum (params) {
    return Api().put('albums/' + params._id, params)
  },
  
  getAlbum (params) {
    return Api().get('albums/' + params.id)
  },

  deleteAlbum (id) {
    return Api().delete('albums/' + id)
  },

  login (params) {
    return Api().get('user/login', params)
  }  
}