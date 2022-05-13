<template>
    <main>
        <section class="weather">
            <div class="container weather__container">
                <h2 class="weather__title">Watch weather in your current location</h2>
                <div class="weather__wrap">
                    <Weather-card
                        v-for="(item, index) in this.GET_ADDED_CITIES"
                        :item = item
                        :key="index"
                    />
                </div>
            </div>
            <Add-button class="weather__button" @click="openPopup"/>
            <Popup-component
                v-if="isPopupOpen"
                @closePopup="closePopup"
                @addCard="addCard"
                :placeholder = "'Search city'"
            />
        </section>
    </main>
</template>

<script>
import WeatherCard from './WeatherCard.vue'
import AddButton from './AddButton.vue'
import PopupComponent from './Popup.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'MainComponent',
  components: {
    'Weather-card': WeatherCard,
    'Add-button': AddButton,
    'Popup-component': PopupComponent
  },
  data () {
    return {
      isPopupOpen: false,
      isCardOpen: false
    }
  },
  computed: {
    ...mapGetters(['GET_ADDED_CITIES'])
  },
  methods: {
    openPopup () {
      this.isPopupOpen = true
      document.body.classList.add('no-scroll')
      document.querySelector('.weather__button').classList.add('no-scroll')
    },
    closePopup () {
      this.isPopupOpen = false
      document.body.classList.remove('no-scroll')
      document.querySelector('.weather__button').classList.remove('no-scroll')
    },
    addCard () {
      this.isCardOpen = true
    }
  }
}
</script>

<style lang="scss">
.weather {
    padding-top: 8px;
    &__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &__title {
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        color: #767676;
    }
    &__wrap {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        grid-gap: 20px;
        width: 100%;
        padding: 40px 0;
    }
}
@media screen and (max-width: 750px) {
    .weather {
        padding-top: 0;
        &__title {
            font-size: 20px;
            line-height: 24px;
        }
    }
}
@media screen and (max-width: 450px) {
    .weather {
        padding-top: 0;
        &__title {
            font-size: 16px;
            line-height: 24px;
        }
    }
}
</style>
