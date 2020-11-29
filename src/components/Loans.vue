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
    <div class="grid grid-rows-10 grid-cols-3 grid-flow-col mt-4 border-solid border-2 border-gray-400 rounded-2xl" v-for="loan in loans" :key="loan.id" :loan="loan">
      <div class="bg-purple-500 bg-opacity-50 row-start-1 col-start-1 h-24">
      </div>
      <div class="bg-purple-500 bg-opacity-50 row-start-2 col-start-1 h-20">
        <section>Co-Borrower</section>
        <section>Co-Borrower-Email</section>
      </div>
      <div class="bg-purple-500 bg-opacity-50 row-start-3 col-start-1 h-10">Loan Amount</div>
      <div class="bg-purple-500 bg-opacity-50 row-start-4 col-start-1 h-10">Loan Term</div>
      <div class="bg-purple-500 bg-opacity-50 row-start-5 col-start-1 h-10">Vehicle Mileage</div>
      <div class="bg-purple-500 bg-opacity-50 row-start-6 col-start-1 h-10">Vehicle Make</div>
      <div class="bg-purple-500 bg-opacity-50 row-start-7 col-start-1 h-10">Vehicle Model</div>
      <div class="bg-purple-500 bg-opacity-50 row-start-8 col-start-1 h-10">Vehicle Year</div>
      <div class="bg-purple-500 bg-opacity-50 row-start-9 col-start-1 h-10">Vehicle VIN</div>
      <div class="bg-purple-400 col-span-2 h-24 h-10">10</div>
      <div class="bg-gray-200 col-span-2 h-20">
        <section v-if="loan.coBorrower">{{loan.coBorrower}}</section>
        <section v-else>N/A</section>
        <section v-if="loan.coBorrowerEmail">{{loan.coBorrowerEmail}}</section>
        <section v-else>N/A</section>
      </div>
      <div class="bg-gray-200 col-span-2 h-10">${{loan.loanAmount}}</div>
      <div class="bg-gray-200 col-span-2 h-10">{{loan.loanTerm}} months</div>
      <div class="bg-gray-200 col-span-2 h-10">{{loan.vehicleMileage}}</div>
      <div class="bg-gray-200 col-span-2 h-10">{{loan.vehicleMake}}</div>
      <div class="bg-gray-200 col-span-2 h-10">{{loan.vehicleModel}}</div>
      <div class="bg-gray-200 col-span-2 h-10">{{loan.vehicleYear}}</div>
      <div class="bg-gray-200 col-span-2 h-10">{{loan.vehicleVin}}</div>
      <div class="bg-purple-800 row-start-10 col-start-1 col-span-3 h-24">19</div>
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
