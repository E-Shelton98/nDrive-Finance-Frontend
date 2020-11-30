<template>
  <div>
    <div>
      Sign In
    </div>
    <h3 class="text-lg m-6">Sign in using the account you created at the dealership to be able to view your loan information.</h3>
    <form @submit.prevent="signin" class="flex flex-col border-solid border-4 rounded-2xl m-4 p-4">
      <div class="text-red" v-if="error">{{ error }}</div>

      <div class="mb-6">
          <label for="email" class="label">E-mail Address</label>
          <input type="email" v-model="email" class="input" id="email" placeholder="email@example.com">
      </div>
      <div class="mb-6">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="input" id="password" placeholder="Password">
      </div>
      <button class="font-sans font-bold p-3 rounded-lg cursor-pointer no-underline bg-gray-400 hover:bg-gray-500 block w-4/5 text-white self-center">Login</button>

    </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('loans')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('loans')
      }
    }
  }
}
</script>
