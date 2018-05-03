<template>
    <div class="modal add">
      <div class="modal-content">
        <div class="modal-header">
            <span class="closeBtn" id="closeBtn" @click="$emit('close')">&times;</span>
            <h2>Add CD to List</h2>
        </div>
        <div class="modal-confirmation" v-if="showConfirmation">
          <h2>{{cd.artist}} - {{cd.album}}</h2>
          <p>has been added!</p>
          <button @click="hideAndReset" class="btn">Add more</button>
          <button @click="$emit('close')" class="btn">Close</button>
        </div>
        <div class="modal-body" v-else>
          <form v-on:submit.prevent="addCd">
            <div class="form-control">
              <h4>Band</h4>
              <input type="text" placeholder="Band" name="artist" v-model="cd.artist">
            </div>
            <div class="form-control">
              <h4>Album</h4>
              <input type="text" placeholder="Album" name="album" v-model="cd.album">
            </div>
            <div class="form-control">
              <button type="submit" class="btn">Add this CD</button>
            </div>
          </form>
        </div>

    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
import AlbumService from '@/services/AlbumService'
export default {
  name: 'AddAlbum',
  data () {
    return {
      cd : [{
        artist: '',
        album: ''
      }],
      showConfirmation: false
    }
  },
  methods: {
    async addCd() {
      if(!this.cd.artist || !this.cd.album) {
        alert('please fill out required fields')
      } else {
        // let newCd = {
        //   artist: this.cd.artist,
        //   album: this.cd.album
        // }

        // this.$http.post('http://localhost/cdcollection/public/api/cds/add', newCd)
        //   .then(response => {
        //     eventBus.$emit('cd added', newCd)
        //     this.cd.artist = newCd.artist;
        //     this.cd.album = newCd.album;
              
        //   }).then(() => {
        //     this.showConfirmation = true;
        //   }).catch(err => {
        //     console.log('Something went wrong!!!')
        //   })

        await AlbumService.addAlbum({
            artist: this.cd.artist,
            album: this.cd.album
        }).then(response => {
            
            let newAlbum = {
              artist: response.data.createdAlbum.artist,
              album: response.data.createdAlbum.album,
            };
            
            eventBus.$emit('cd added', newAlbum);

            // self.cd.artist = newAlbum.artist;
            // self.cd.album = newAlbum.album;
            this.cd.push(newAlbum)
            
          }).then(() => {
            this.showConfirmation = true;
          }).catch(err => {
            console.log('Something went wrong!!!')
          })    
        
        if(this.showConfirmation = true) {
          //this.resetForm()
        }
        
      }
    },
    resetForm() {
      var self = this; //you need this because *this* will refer to Object.keys below`

      //Iterate through each object field, key is name of the object field`
      Object.keys(this.cd).forEach(function(key,index) {
        self.cd[key] = '';
      });
    },
    
    hideAndReset(){
      this.showConfirmation = false
      this.resetForm()
    }
  }
}
</script>

<style scoped>
  .modal {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.5)
  }

  .modal-header {
    background:#2c3e50;;
    padding: 15px;
    color: #fff;
  }

  .modal-header h2 {
    margin: 0;
    text-transform: uppercase;
  }

  .modal-body {
    padding: 10px 70px;
  }

  .modal-confirmation {
    padding: 40px 5px;
    animation: modalopen;
    animation-duration: .4s;    
  }

  .form-control {
    text-align: left;
    margin: 20px 0;
  }

  .form-control h4 {
    margin: 0;
  }

  .form-control input {
    padding: 10px;
    width: 100%;
    -webkit-appearance: none;
    border: 1px solid #dfdfdf;
    outline: 0;
  }

  .form-control .btn {
    padding: 10px 20px;
    color: #fff;
    background: #2c3e50;
    border: 1px solid #2c3e50;
    outline: 0;
    -webkit-appearance: none;
    text-transform: uppercase;
  }

  .form-control .btn:hover {
    cursor: pointer
  }

  .modal-content {
    background-color: #f4f4f4;
    margin: 20% auto;
    width: 50%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    animation: modalopen;
    animation-duration: .4s;
  }

  .closeBtn {
    float: right;
    color: #fff;
    font-size: 30px;
  }

  .closeBtn:hover, .closeBtn:focus {
    color: #000;
    cursor: pointer;
    text-decoration: none;
  }

  /* keyframes */
  @keyframes modalopen {
    from{ opacity: 0}
    to { opacity: 1}
  }  
</style>

