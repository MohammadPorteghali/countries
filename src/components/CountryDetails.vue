<template>
  <div class="countries-list">
    <router-link to="/" class="back-button">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left" class="svg-inline--fa fa-arrow-left fa-w-14 nav__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10px"><path fill="currentColor" d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path></svg>
      Back
    </router-link >
    <div class="country">
      <img :src="country.flag" :alt="country.name">
      <div class="details">
        <h2>{{ country.name }}</h2>
        <div class="info">
          <ul>
            <li>Native name: <span>{{ country.nativeName }}</span></li>
            <li>Population: <span>{{ country.population }}</span></li>
            <li>Region: <span>{{ country.region }}</span></li>
            <li>Sub Region: <span>{{ country.subregion }}</span></li>
            <li>Capital: <span>{{ country.capital }}</span></li>
          </ul>
          <ul>
            <li>Top Level Domain:
              <span v-for="(item, index) in country.topLevelDomain" :key="index">
                {{ item }}{{ index < country.topLevelDomain.length - 1 ? ',' : ''}} 
              </span>
            </li>
            <li>Currencies: 
              <span v-for="(currency, index) in country.currencies" :key="index">
                {{ currency.name }}{{ index < country.currencies.length - 1 ? ',' : ''}} 
              </span>
            </li>
            <li>Languages: 
              <span v-for="(language, index) in country.languages" :key="index">
                {{ language.name }}{{ index < country.languages.length - 1 ? ',' : ''}} 
              </span>
            </li>
          </ul>
          <div class="borders">
            <div class="title">Border Countries: </div>
              <div class="items" v-for="(item, index) in bordersFullName" :key="index">
                {{ item }}
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'

export default {
  data: () => ({
    country: {},
    borders: [],
    bordersFullName: []
  }),
  methods: {
    getCountryDetails() {
      Axios.get(`https://restcountries.eu/rest/v2/name/${this.$route.params.id}`)
      .then(({data}) => {
        this.country = data[0]
        this.country.borders.forEach(element => {
          this.borders.push(element)
        });
        this.getCountryName();
      })
    },
    getCountryName() {
      this.borders.forEach(element => {
        Axios.get(`https://restcountries.eu/rest/v2/alpha/${element}`)
        .then(({data}) => {
          this.bordersFullName.push(data.name)
        })
      });
    }
  },
  mounted() {
    this.getCountryDetails()
  }
}
</script>

<style lang="scss" scoped>
.countries-list {
  display: flex;
  flex-wrap: wrap;
  padding: 5vh 5vw;

  & .back-button {
    padding: 10px 23px;
    border: none;
    box-shadow: 0 0 6px #0000001a;
    background-color: var(--secondary);
    font-size: 14px;
    font-weight: 600;
    border-radius: 5px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @include respond(tab-port) {
      margin: 0 2vw;
    }
  }

  & .country {
    display: flex;
    width: 100vw;
    margin-top: 5vh;
    flex-wrap: wrap;

    & img {
      flex: 0.4;
      width: 40%;

      @include respond(tab-port) {
        width: 85vw;
        margin: 0 2vw;
      }
    }

    & .details {
      margin-left: 5vw;

      @include respond(tab-port) {
        margin-left: 2vw;
      }

      & h2 {
        font-size: 24px;
        margin: 0;

        @include respond(tab-port) {
          width: 90vw;
          margin: 4vh 0 0;
        }
      }

      & .info {
        width: 49vw;
        display: flex;
        flex-wrap: wrap;

        @include respond(tab-port) {
          width: 85vw;
        }

        & ul {
          flex: .5;
          margin: 3vh 0 0;
        
          @include respond(tab-port) {
            flex: 0 0 100%;
          }

          & li {
            font-size: 15px;
            font-weight: 300;
            line-height: 30px;

            & span {
              font-size: 15px;
              font-weight: 300;
              color: var(--gray)
            }
          }
        }

        & .borders {
          width: 49vw;
          margin: 3vh 0 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          @include respond(tab-port) {
            width: 90vw;
            margin-left: -5px;
          }

            & .title {
              font-size: 15px;
              font-weight: 300;
              margin-right: 10px;

              @include respond(tab-port) {
                width: 90vw;
                margin: 0 0 15px 5px;
              }
            }

            & .items {
              font-size: 12px;
              font-weight: 300;
              color: var(--gray);
              margin: 5px;
              padding: 5px 7px;
              min-width: 60px;
              text-align: center;
              border: none;
              box-shadow: 0 0 6px #0000001a;
              background-color: var(--secondary);
              border-radius: 5px;

              @include respond(tab-port) {
                flex: 0 0 calc(33.3333333% - 7vw);
              }
            }
        }
      }
    }
  }
}
</style>