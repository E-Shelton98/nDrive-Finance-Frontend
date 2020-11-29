<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <div class="grid grid-rows-3 grid-cols-3 h-20 border-solid border-2 border-gray-400 rounded-2xl p-4" v-for="loan in loans" :key="loan.id" :loan="loan">
      <div class="row-start-1 column-start-1 text-left">Welcome:</div>
      <div class="row-start-2 column-start-1 text-left">Address:</div>
      <div class="row-start-3 column-start-1 text-left">Email:</div>
      <div class="row-start-1 row-end-2 col-start-2 col-end-4 text-left">{{loan.borrower}}</div>
      <div class="row-start-2 col-start-2 col-end-4 text-left">{{loan.borrowerAddress}}</div>
      <div class="row-start-3 col-start-2 col-end-4 text-left uppercase">{{loan.borrowerEmail}}</div>
    </div>
    <div class="grid">
      <p>placeholder</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loans',
  data () {
    return {
      loans: [],
      error: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/loans')
        .then(response => { this.loans = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text
    }
  }
}
</script>
