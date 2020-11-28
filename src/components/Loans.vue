<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <ul class="list-reset mt-4">
      <li class="py-3" v-for="loan in loans" :key="loan.id" :loan="loan">
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex font-mono font-semibold items-center">
            {{ loan.borrower }} &mdash; {{ loan.coBorrower }}
          </p>
          <p class="block font-mono font-semibold">{{ loan.vehicleMake }}</p>
        </div>
      </li>
    </ul>
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
