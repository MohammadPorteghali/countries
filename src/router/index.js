import Vue from 'vue'
import VueRouter from 'vue-router'
import CountriesList from '../components/CountriesList'
import Country from '../components/CountryDetails'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: CountriesList,
  },
  {
    path: '/:id',
    name: 'country',
    component: Country,
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
