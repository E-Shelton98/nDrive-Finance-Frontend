<template>
  <header class="bg-gray-200 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="flex-1 flex items-center">
        <a href="/" class="text-sm font-mono pl-4 font-semibold no-underline text-indigo-600 hover:text-indigo-800">nDrive</a>
      </div>
      <div>
        <router-link to="/signin" class="link-gray-200 p-2 no-underline" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="link-gray-200 p-2 no-underline" v-if="!signedIn()">Sign Up</router-link>
        <a href="#" @click.prevent="signOut" class="link-gray-200 p-2 no-underline" v-else>Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/signin')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
