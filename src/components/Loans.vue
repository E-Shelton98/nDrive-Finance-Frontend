<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <div class="h-20 border-solid border-2 border-gray-400 bg-gray-200 rounded-2xl p-4 flex justify-around">
      <router-link to="/email" class="p-2 no-underline border-solid border-2 border-gray-400 rounded-2xl w-36 bg-purple-500 bg-opacity-50 hover:bg-gray-200">
            Update Email
        </router-link>
      <router-link to="/address" class="p-2 no-underline border-solid border-2 border-gray-400 rounded-2xl w-36 bg-purple-500 bg-opacity-50 hover:bg-gray-200">
            Update Address
        </router-link>
    </div>
    <div class="grid grid-rows-10 grid-cols-3 grid-flow-col mt-4 border-solid border-2 border-gray-400 rounded-2xl p-2 bg-gray-300" v-for="loan in loans" :key="loan.id" :loan="loan">
      <div class="bg-purple-500 bg-opacity-50 row-start-1 col-start-1 h-24 rounded-tl-2xl">
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
      <div class="bg-gray-200 col-span-2 h-24 h-10 text-right px-3 border-t-2 border-r-2 rounded-tr-2xl">
        <section>{{loan.borrower}}</section>
        <section>{{loan.borrowerAddress}}</section>
        <section>{{loan.borrowerEmail}}</section>
      </div>
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
      <div class="bg-purple-400 row-start-10 col-start-1 col-span-3 h-24 rounded-b-2xl p-8">Payment Section Coming Soon!</div>
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
