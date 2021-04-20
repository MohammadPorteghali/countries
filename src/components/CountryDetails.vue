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
  }),
  mounted() {
    Axios.get(`https://restcountries.eu/rest/v2/name/${this.$route.params.id}`)
    .then(({data}) => {
      this.country = data[0]
      console.log(this.country);
    })
  }
}
</script>

<style lang="scss" scoped>
.countries-list {
  display: flex;
  flex-wrap: wrap;
  padding: 8vh 5vw;

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
  }

  & .country {
    display: flex;
    width: 100vw;
    margin-top: 8vh;
    flex-wrap: wrap;

    & img {
      flex: 0.4;
      width: 40vw;
    }

    & .details {
      margin-left: 5vw;

      & h2 {
        font-size: 24px;
      }

      & .info {
        width: 45vw;
        display: flex;

        & ul {
          flex: .4;
        
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
      }
    }
  }

  // & .country {
  //   flex: 0 0 calc(25% - 5vw);
  //   margin: 2.5vw;
  //   background-color: var(--secondary);
  //   border-radius: 5px;
  //   box-shadow: 0 0 6px #00000038;
  //   max-height: 295px;

  //   @include respond(tab-port) {
  //     flex: 0 0 calc(33.3333333% - 5vw);
  //   }

  //   @include respond(big-phone) {
  //     flex: 0 0 calc(50% - 5vw);
  //   }

  //   @include respond(normal-phone) {
  //     flex: 0 0 calc(100% - 16vw);
  //     margin: 3vw 8vw;
  //   }

  //   & img {
  //     width: 100%;
  //     height: 130px;
  //     object-fit: cover;
  //     border-top-right-radius: 5px;
  //     border-top-left-radius: 5px;
  //   }

  //   & .details {
  //     padding: 0 1.4vw 1.4vw;

  //   @include respond(normal-phone) {
  //     padding: 0 4vw 4vw;
  //   }

  //     & li {
  //       font-size: 14px;
  //       margin: 3px 0;
  //       font-weight: 300;

  //       & span {
  //         font-size: 14px;
  //         font-weight: 300;
  //         color: var(--gray)
  //       }
  //     }
  //   }
  // }
}
</style>