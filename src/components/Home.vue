<template>
    <div>
        <div>
            <img src='../assets/purple_car_small.jpg'/>
        </div>
        <div class="bg-purple-400 h-16 p-1 flex justify-around">
        <router-link to="/signin" class="text-white p-4 no-underline border-solid border-2 border-gray-400 rounded-2xl w-36 hover:bg-gray-400">
            Sign in
        </router-link>
        <router-link to="/financing" class="text-white p-4 no-underline border-solid border-2 border-gray-400 rounded-2xl w-36 hover:bg-gray-400">
            Get Financed
        </router-link>
        </div>
        <div class="bg-gray-100">
            <section class="text-left p-6" >nDrive has worked with dealerships to help over 1 million people get the financing they needed for the car they wanted.
            <br>
            We offer private, secure payment processing services with flexible payment schedules and many different ways to pay. With nDrive, you could get easy financing for a great car.
            <br>
            Get the financing you need today!</section>
        </div>
        <div class="p-3">
            <h3 class="font-bold text-2xl p-6">
                Let nDrive show you how you could qualify for the financing you need!
            </h3>
            <p class="text-purple-500">
                Collection Calls: nDrive collection calls may be placed Monday-Sunday between 8:00 a.m. and 9:00 p.m. local time as recommended by the Fair Debt Collection Practices Act.
            </p>
        </div>
    </div>
</template>
