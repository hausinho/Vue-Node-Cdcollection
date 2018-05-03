<template>
    <div class="modal edit" v-if="modal">
      <div class="modal-content">
        <div class="modal-header">
            <span class="closeBtn" id="closeBtn" @click="$emit('update:modal')">&times;</span>
            <h2>Edit CD</h2>
        </div>
        <div class="modal-confirmation" v-if="showUpdateConfirmation">
          <h2>{{cd.artist}} - {{cd.album}}</h2>
          <p>has been updated!</p>
          <button @click="$emit('update:modal')" class="btn">Close</button>
        </div>
        <div class="modal-body" v-else>
          <form v-on:submit.prevent="updateCd">
            <input type="hidden" name="id" v-model="albumObject.id">
            <div class="form-control">
              <h4>Band</h4>
              <input type="text" placeholder="Band" name="artist" v-model="albumObject.artist">
            </div>
            <div class="form-control">
              <h4>Album</h4>
              <input type="text" placeholder="Album" name="album" v-model="albumObject.album">
            </div>
            <div class="form-control modal-buttons">
              <button type="submit" class="btn">OK</button>
              <button class="btn" @click="$emit('update:modal')">Cancel</button>
            </div>
          </form>
        </div>

    </div>
  </div> 
</template>

<script>
import { eventBus } from '../main';
export default {
    props: {
        modal:{
            default:false
        },
        albumObject: {
            type: Object
        }
    },
  data() {
    return {
      cd : [{
        artist: '',
        album: ''
      }],
      showUpdateConfirmation: false
    }
  },
  methods: {
    updateCd(){
        if(!this.albumObject.artist || !this.albumObject.album) {
          alert('please fill out required fields')
        } else {
          let editCd = {
            artist: this.albumObject.artist,
            album: this.albumObject.album
          }
          this.$http.put('http://localhost/cdcollection/public/api/cds/update/'+ this.albumObject.id, editCd)
            .then(function(response){
              eventBus.$emit('cd updated', editCd)
              this.cd.artist = editCd.artist;
              this.cd.album = editCd.album;
            }).then(() => {
              this.showUpdateConfirmation = true
            }).catch(err => {
              console.log('Something went wrong!!!')
            });          
        } 
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

  .modal-buttons {
    margin-bottom: 20px;
  }

  .modal-confirmation {
    padding: 40px 5px;
    animation: modalopen;
    animation-duration: .4s;    
  }

  .modal-content {
    background-color: #f4f4f4;
    margin: 20% auto;
    width: 50%;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
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
