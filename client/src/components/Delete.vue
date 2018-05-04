<template>
    <div class="modal delete" v-if="modal">
      <div class="modal-content">
        <div class="modal-header">
            <span class="closeBtn" id="closeBtn" @click="$emit('update:modal')">&times;</span>
            <h2>Delete CD from list</h2>
        </div>
        <div class="modal-confirmation" v-if="showDeleteConfirmation">
          <h3>{{albumObject.artist}} - {{albumObject.album}} was deleted</h3>
          <button @click="$emit('update:modal')" class="btn">Close</button>
        </div>        
        <div class="modal-body" v-else>
          <div>
            <h5>Do you want to delete:</h5>
            <h3>{{albumObject.artist}} - {{albumObject.album}} ?</h3>
          </div>
          <div class="modal-buttons">
            <button class="btn" @click="deleteAlbum(albumObject.id)">Delete</button>
            <button class="btn" @click="$emit('update:modal')">Cancel</button>
          </div>
        </div>
    </div>
  </div>  
</template>

<script>
import { eventBus } from '../main';
import AlbumService from '@/services/AlbumService'
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
      showDeleteConfirmation: false
    }
  },
  methods: {
    async deleteAlbum (id) {
      await AlbumService.deleteAlbum(id)
        .then(function(response){
          eventBus.$emit('cd removed', response)
        })
        .then(() => {
          this.showDeleteConfirmation = true
        })
        .catch(err => {
          console.log('Something wen wrong!!!')
        });
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
