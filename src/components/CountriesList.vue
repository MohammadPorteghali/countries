<template>
  <div class="countries-list">
    <div class="filter">
      <input type="text" placeholder="Search for a country..." 
        :value="searchKey"
        @input="e => searchKey = e.target.value"
      >
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="search svg-inline--fa fa-search fa-w-16 nav__icon gray-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="13px"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
      <div @click="showFilters = !showFilters" class="filter-by-region">
        {{ selectKey ? selectKey : 'Filter by region' }}
        <svg v-show="!selectKey" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="arrow-down svg-inline--fa fa-chevron-down fa-w-14 dd__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10px"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
        <svg v-show="selectKey" @click.stop="selectKey = ''" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="arrow-down svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width="10px"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        <div v-show="showFilters" class="dialog">
          <ul v-for="(region, index) in regions" :key="index">
            <li
              @click="selectKey = region">
              {{ region }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-link 
      :to="{ name: 'country', params: { id: country.name }}"
      v-for="(country, index) in filteredCountriesList" :key="index" class="country"
    >
      <img :src="country.flag" :alt="country.name">
      <div class="details">
        <h3>{{ country.name }}</h3>
        <ul>
          <li>Population: <span>{{ country.population }}</span></li>
          <li>Region: <span>{{ country.region }}</span></li>
          <li>Capital: <span>{{ country.capital }}</span></li>
        </ul>
      </div>
    </router-link>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
    countries: [],
    searchKey: '',
    selectKey: '',
    showFilters: false,
    filterText: 'Filter by region',
    regions: [
      'Africa',
      'America',
      'Asia',
      'Europe',
      'Oceania',
    ]
  }),
  computed: {
    filteredCountriesList(field) {
      return this.countries.filter(
        e => {
          if (this.selectKey && e.region.toLowerCase().indexOf(this.selectKey.toLowerCase()) <= -1) return false
          if (this.searchKey && e.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) <= -1) return false
          return true
        }
      )
    }
  },
  mounted() {
    Axios.get('https://restcountries.eu/rest/v2/all')
    .then(({data}) => {
      this.countries = data
      console.log(data);
    })
  }
}
</script>

<style lang="scss" scoped>
.countries-list {
  display: flex;
  flex-wrap: wrap;
  padding: 2.5vh 2.5vw;

  & .filter {
    width: 100vw;
    margin: 1.5vw 2.5vw 0.5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    flex-wrap: wrap;


    & input {
      padding: 15px;
      border: none;
      box-shadow: 0 0 6px #0000001a;
      background-color: var(--secondary);
      font-size: 13px;
      font-weight: 300;
      border-radius: 5px;
      width: 250px;
      padding-left: 40px;
      position: relative;

      @include respond(big-phone) {
        width: 100%;
        margin-bottom: 20px;
      }

      &::placeholder {
        color: var(--gray);
      }
    }

    & .search {
      position: absolute;
      left: 15px;
      top: 18px;
    }

    & .filter-by-region {
      padding: 15px;
      border: none;
      box-shadow: 0 0 6px #0000001a;
      background-color: var(--secondary);
      font-size: 13px;
      font-weight: 300;
      border-radius: 5px;
      width: 110px;
      position: relative;
      color: var(--text);

      @include respond(big-phone) {
        width: 100%;
        margin-bottom: 20px;
      }

      &:hover {
        cursor: pointer;
      }

      & .arrow-down {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
      }

      & .dialog {
        position: absolute;
        padding: 8px 15px;
        border: none;
        box-shadow: 0 0 6px #0000001a;
        background-color: var(--secondary);
        border-radius: 5px;
        width: 110px;
        top: 52px;
        left: 0;

        @include respond(big-phone) {
          width: 100%;
        }

        & li {
          font-size: 13px;
          font-weight: 300;
          color: var(--text);
          margin: 8px 0;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  & .country {
    flex: 0 0 calc(25% - 5vw);
    margin: 2.5vw;
    background-color: var(--secondary);
    border-radius: 5px;
    box-shadow: 0 0 6px #00000038;
    max-height: 295px;

    @include respond(tab-port) {
      flex: 0 0 calc(33.3333333% - 5vw);
    }

    @include respond(big-phone) {
      flex: 0 0 calc(50% - 5vw);
    }

    @include respond(normal-phone) {
      flex: 0 0 calc(100% - 16vw);
      margin: 3vw 8vw;
    }

    & img {
      width: 100%;
      height: 130px;
      object-fit: cover;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }

    & .details {
      padding: 0 1.4vw 1.4vw;

    @include respond(normal-phone) {
      padding: 0 4vw 4vw;
    }

      & li {
        font-size: 14px;
        margin: 3px 0;
        font-weight: 300;

        & span {
          font-size: 14px;
          font-weight: 300;
          color: var(--gray)
        }
      }
    }
  }
}
</style>