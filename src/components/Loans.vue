<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <div class="h-20 border-solid border-2 border-gray-400 bg-gray-200 rounded-2xl p-4 flex justify-around">
      <button class="p-2 no-underline border-solid border-2 border-gray-400 rounded-2xl w-36 bg-purple-500 bg-opacity-50 hover:bg-gray-200" @click.prevent="editEmail()">
            Update Email
        </button>
      <button class="p-2 no-underline border-solid border-2 border-gray-400 rounded-2xl w-36 bg-purple-500 bg-opacity-50 hover:bg-gray-200" @click.prevent="editAddress()">
            Update Address
        </button>
    </div>
    <div v-if="this.loans == this.editLoansEmail">
      <form action="" @submit.prevent="updateLoansEmail(borrower)">
        <div class="mb-6 p-4 rounded border-4 border-gray-300 mt-4">
          <div class="mb-6">
            <label class="label">New Email</label>
            <input class="input" v-model="borrower.newEmail">
          </div>
          <div class="mb-6">
            <label class="label">Confirm Email</label>
            <input class="input" v-model="borrower.confirmedEmail">
          </div>
          <input type="submit" value="Update" class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded">
        </div>
      </form>
    </div>
    <div v-if="this.loans == this.editLoansAddress">
      <form action="" @submit.prevent="updateLoansAddress(borrower)">
        <div class="mb-6 p-4 rounded border-4 border-gray-300 mt-4">
          <div class="mb-6">
            <label class="label">New Address</label>
            <input class="input" v-model="borrower.newAddress">
          </div>
          <div class="mb-6">
            <label class="label">Confirm Address</label>
            <input class="input" v-model="borrower.confirmedAddress">
          </div>
          <input type="submit" value="Update" class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded">
        </div>
      </form>
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
      error: '',
      editLoansEmail: [],
      editLoansAddress: [],
      borrower: {}
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
    },
    editEmail () {
      this.editLoansEmail = this.loans
    },
    editAddress () {
      this.editLoansAddress = this.loans
    },
    updateLoansEmail (borrower) {
      if (this.borrower.newEmail === this.borrower.confirmedEmail) {
        this.editLoansEmail = []
        for (let loan of this.loans) {
          this.$http.secured.patch(`/api/v1/loans/${loan.id}`, { borrowerEmail: borrower.newEmail })
            .catch(error => this.setError(error, 'Cannot update email'))
        }
        window.location.reload()
      }
    },
    updateLoansAddress (borrower) {
      if (this.borrower.newAddress === this.borrower.confirmedAddress) {
        this.editLoansAddress = []
        for (let loan of this.loans) {
          this.$http.secured.patch(`/api/v1/loans/${loan.id}`, { borrowerAddress: borrower.newAddress })
            .catch(error => this.setError(error, 'Cannot update email'))
        }
        window.location.reload()
      }
    }
  }
}
</script>
