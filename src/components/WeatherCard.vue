<template>
    <div class="card">
        <h3 class="card__city">{{ item.name }}</h3>
        <p class="card__country">Country:
            <span>{{ item.sys.country }}</span>
        </p>
        <div class="card__main">
            <p class="card__item">Weather
                <span>{{ item?.weather[0].main }}</span>
            </p>
            <p class="card__item">Temperature
                <span>{{ temperatureConverter(item) }} °C</span>
            </p>
            <p class="card__item">Humidity
                <span>{{ item.main.humidity }} %</span>
            </p>
            <p class="card__timer">{{ this.timer }}</p>
        </div>
        <div class="card__footer">
            <button class="card__button" @click="removeCard(item.name)">REMOVE</button>
            <button class="card__button" @click="reloadCard(item)">RELOAD</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'WeatherCard',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      weather: '',
      timer: '',
      time: ''
    }
  },
  mounted () {
    this.time = moment().format('mm')
    this.getTime()
    setInterval(() => {
      this.getTime()
    }, 60000)
  },
  computed: {
    ...mapGetters(['GET_ADDED_CITIES', 'GET_TIME'])
  },
  methods: {
    ...mapMutations(['DELETE_CITY', 'UPDATE_WEATHER', 'UPDATE_TIME']),
    temperatureConverter (el) {
      const kelvins = el.main.temp
      const celsus = Math.floor(kelvins - 273.15)
      return celsus
    },
    removeCard (value) {
      this.DELETE_CITY(value)
    },
    reloadCard (value) {
      this.UPDATE_WEATHER(value)
      this.time = moment().format('mm')
      this.getTime()
    },
    getTime () {
      this.timer = moment().minutes(this.time).fromNow()
    }
  }
}
</script>

<style lang="scss">
.card {
    border: 1px solid gray;
    padding: 20px;
    background: #FFFFFF;
    box-shadow: 0px 2px 10px rgba(10, 10, 10, 0.25);
    border-radius: 6px;
    min-width: 320px;
    transition: all 0.4s;

    &:hover {
        transform: scale(1.01);
    }

    &__city {
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #1B1B1B;
    }

    &__country {
        padding-top: 16px;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
        color: #1B1B1B;
    }

    &__main {
        padding: 40px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
    }

    &__item {
        display: flex;
        width: 100%;
        justify-content: space-between;
        border-bottom: 1px solid #C4C4C4;
        margin-bottom: 4px;
        padding: 12px 0;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;
    }

    &__button {
        color: #9B51E0;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        background: none;
        &:hover {
            cursor: pointer;
            opacity: .8;
        }
    }

    &__timer {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        color: #A8A8A8;
    }
}
@media screen and (max-width: 450px) {
    .card {

        &__city {
            font-size: 28px;
            line-height: 32px;
        }

        &__country {
            padding-top: 16px;
            font-size: 16px;
            line-height: 20px;
        }

        &__item {
            margin-bottom: 4px;
            padding: 12px 0;
            font-size: 16px;
            line-height: 20px;
        }

        &__button {
            font-size: 16px;
            line-height: 24px;
        }

        &__timer {
            font-size: 16px;
            line-height: 24px;
        }
    }
}
</style>
