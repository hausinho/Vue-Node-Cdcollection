<template>
    <div class="modal login">
      <div class="modal-content">
        <div class="modal-header">
            <span class="closeBtn" id="closeBtn" @click="$emit('close')">&times;</span>
            <h2>Login</h2>
        </div>
        <!-- <div class="modal-confirmation" v-if="showConfirmation">
          <h2>{{cd.artist}} - {{cd.album}}</h2>
          <p>has been added!</p>
          <button @click="hideAndReset" class="btn">Add more</button>
          <button @click="$emit('close')" class="btn">Close</button>
        </div> -->
        <div class="modal-body">
          <form v-on:submit.prevent="login">
            <div class="form-control">
              <h4>E-mail:</h4>
              <input type="text" placeholder="Email" name="email" v-model="email">
            </div>
            <div class="form-control">
              <h4>Password</h4>
              <input type="password" placeholder="Password" name="album" v-model="password">
            </div>
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            <div class="form-control">
              <button type="submit" class="btn">Login</button>
            </div>
          </form>
        </div>

    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
import AlbumService from '@/services/AlbumService'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'currentUser' })
  },  
  methods: {
    async login() {
      if(!this.email || !this.password) {
        alert('please fill out required fields')
      } else {

        this.$http.post('http://localhost:3000/user/login', {email: this.email, password: this.password})
        .then(request => {
          this.loginSuccessful(request)
          eventBus.$emit('user logged in', request);
        })
        .catch(() => this.loginFailed())      
      }
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }

      localStorage.token = req.data.token
      this.$store.dispatch('login') 
      this.error = false

      // this.$router.replace(this.$route.query.redirect || '/')
    },

    loginFailed () {
      this.error = 'Login failed!'
      this.$store.dispatch('logout')
      delete localStorage.token
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

