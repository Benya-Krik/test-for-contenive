import { createStore } from 'vuex'
import VueCookies from 'vue-cookies'

export default createStore({
  state: {
    city: String,
    weather: [],
    addedСities: JSON.parse(VueCookies.get('test')) || [],
    error: null,
    time: null
  },
  mutations: {
    UPDATE_CITY (state, value) {
      state.city = value
    },
    UPDATE_WEATHER: (state, weather) => {
      state.weather = weather
      state.error = weather.cod
      if (!state.addedСities.includes(weather) && state.error !== '404') {
        state.addedСities.push(weather)
        const cookie = JSON.stringify(state.addedСities)
        VueCookies.set('test', cookie)
      }
    },
    CHECK_ERROR (state, value) {
      state.error = value
    },
    DELETE_CITY: (state, value) => {
      state.addedСities = Object.values(state.addedСities).filter(item => item.name !== value)
      const cookie = JSON.stringify(state.addedСities)
      VueCookies.set('test', cookie)
      state.city = ''
    },
    UPDATE_TIME (state, value) {
      state.time = value
      console.log(state.time)
    }
  },
  actions: {
    async FETCH_WEATHER (ctx, value) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=en&APPID=e95074d4957ddac2ced0712780b581b8`)
      const weather = await response.json()
      ctx.commit('UPDATE_WEATHER', weather)
    }
  },
  getters: {
    GET_CITY (state) {
      return state.city
    },
    GET_WEATHER (state) {
      return state.weather
    },
    GET_ADDED_CITIES (state) {
      return state.addedСities
    },
    GET_ERROR (state) {
      return state.error
    },
    GET_TIME (state) {
      return state.time
    }
  }
})
