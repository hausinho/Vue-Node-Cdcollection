<template>
  <div class="cds container">
    <div class="header">
      <div class="title">
        <h1>CDs</h1>
      </div>
      <div class="counter">
        <div class="actions">
          <div>
            <span>Total: {{cdCount}}</span>
          </div>
          <div>
            <a href="#" @click="showAdd = true">Add CD to list</a>
          </div>
          <!-- <div v-if="isLoggedIn">
            <a href="#" @click.prevent="logOut">Logout</a>
          </div>
          <div v-else>
            <a href="#" @click="showLogin = true">Login</a>
          </div> -->
        </div> 
      </div>
    </div>
    <div class="content">
      <paginate name="cds" 
        :list="cds" 
        :per="20">
        <li v-for="(cd, index) in paginated('cds')" :key="index">
          <div class="cd-item-container" :data-id="cd._id">
            <span>{{cd.artist}} - {{cd.album}}</span>
            <div class="cd-item-actions">
              <a href="#" @click.prevent="showDeleteModal({id: cd._id, artist: cd.artist, album: cd.album})" :id="cd._id" class="delete">Delete</a>
              <a href="#" @click.prevent="showUpdateModal({id: cd._id, artist: cd.artist, album: cd.album})" :id="cd._id" class="edit">Update</a>
            </div>
          </div>
        </li>
        <delete-modal v-if="showDelete" :modal.sync="showDelete" :albumObject="albumToPass"></delete-modal>
        <update-modal v-if="showEdit" :modal.sync="showEdit" :albumObject="albumToPass"></update-modal>
      </paginate> 
    </div>
    <div class="list-nav">
      <paginate-links for="cds" :show-step-links="true" :hide-single-page="true" :async="true"></paginate-links>
    </div>
    <add-form v-if="showAdd" @close="showAdd = false"></add-form>
    <!-- <login-modal v-if="showLogin" @close="showLogin = false"></login-modal> -->
  </div>
  
</template>

<script>
import Add from './Add'
import Delete from './Delete'
import Edit from './Edit'

import _ from 'lodash'

import { eventBus } from '../main';
import AlbumService from '@/services/AlbumService'
export default { 
  name: 'albums',
  data () {
    return {
      cds: [],
      albumToPass: null,
      paginate: ['cds'],
      isLoggedIn: false,
      cdCount: '',
      showAdd: false,
      showDelete: false,
      showEdit: false,
      showLogin: false  
    }
  },
  components: {
    addForm: Add,
    deleteModal: Delete,
    updateModal: Edit
  },
  methods: { 
    async getAlbums () {
      const response = await AlbumService.fetchAlbums()
      this.cds = response.data.albums
      this.cdCount = response.data.count
    },    
    // get all cds
    // fetchAll: _.debounce(function() {
    //   let self = this;
    //   self.$http.get('http://localhost:3000/albums')
    //   .then(response => {
    //     console.log('CDS: ', response)
    //     // self.cds = response.body
    //     // self.cdCount = response.body.length
    //   }).catch(err => {
    //     console.log('error')
    //   })
    // }),

    // show the add cd form
    showAddForm() {
      this.showAdd = !this.showAdd
    },

    // show delete modal and pass album as object
    showDeleteModal(item) {
      this.albumToPass = item
      this.showDelete = true
    },

    // show delete modal and pass album as object
    showUpdateModal(item) {
      this.albumToPass = item
      this.showEdit = true
    }    
  },  
  created() {
    //this.fetchAll();
    this.getAlbums()
  },
  updated() {
    // when cd is added
    eventBus.$on('cd added', (cd) => {
      this.getAlbums()
    })
    // when cd is removed
    eventBus.$on('cd removed', (cd) => {
      this.getAlbums()
    })

    // when cd is updated
    eventBus.$on('cd updated', (cd) => {
      this.getAlbums()
    })     

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 30px;
    max-width: 980px;
  }
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #2c3e50;
  }

  .content {
    min-height: 675px;
    width: 100%;
  }

  .content ul {
    /* margin: 0; */
  }
  .content ul li {
    /* border-top: 1px solid #dfdfdf; */
  }

  .content ul li:first-child {
    /* border-top: 0; */
  }

  .header h1 {
    font-family: "Passion One";
    font-size: 36px;
    margin: 0;
    letter-spacing: 1px;
  }

  .title {
    flex: auto;
    text-align: left;    
  }

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .actions div {
    margin: 0 5px;
  }

  .counter {
    flex: auto;
    text-align: right;
    font-size: 14px;
    font-weight: 700;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  ul.paginate-list {
    width: 159px;
    margin: 0 auto;
    text-align: left;
  }
  .paginate-list li {
    display: inline-block;
  }

  .paginate-list li:before {
      content: '⚬ ';
      font-weight: bold;
      color: slategray;
  }

  .paginate-links.cd {
    user-select: none;

  } 
  .paginate-links a {
    cursor: pointer;
  }
  .paginate-links li {
    display: inline-block;
    margin: 0 10px;
  }
  .paginate-links li.active a {
    font-weight: bold;
  }
  .paginate-links li.next:before {
    content: ' | ';
    margin-right: 13px;
    color: #ddd;
  }
  .paginate-links li.disabled a {
    color: #ccc;
    cursor: no-drop;
  }

  .list-nav {
    display: flex;
    width: 100%;
    justify-content: flex-start;  
  }

  .cd-item-container {
    padding: 5px 0;
    text-align: left;
  }

  .cd-item-actions {
    display: inline-block;
    margin-left: 10px;
  }

  .cd-item-actions a {
    color: #2c3e50;
  }

  .cd-item-actions a:hover {
    text-decoration: none;
  }

  .cd-item-container span {
    font-family: "Passion One";
    text-transform: uppercase;
    font-size: 20px;
  }

  /* MEDIA QUERIES*/
    @media screen and (min-width: 1024px) {
        .list-nav {
          /* justify-content: flex-start */
        }
     }

    @media screen and (min-width: 768px) and (orientation: landscape) {
        .list-nav {
          /* justify-content: flex-start */
        }
     }      

</style>
