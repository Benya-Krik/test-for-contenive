<template>
    <div class="backdrop" @click="closePopup()">
        <div class="popup" @click.stop>
            <div class="popup__header">
                <h3 class="popup__title">Choose a City</h3>
                <p class="popup__discription">To find city start typing and pick one from the suggestions</p>
            </div>
            <form @submit.prevent @keydown.enter="addCity()">
                <div class="popup__main">
                    <input class="popup__search"
                        type="text"
                        v-model="city"
                        :class="{error: !v.city.checkError.$response}"
                        :placeholder="placeholder">
                    <p v-if="!v.city.checkError.$response" class="popup__error">{{ v.city.checkError.$message }}</p>
                </div>
                <div class="popup__footer">
                    <div class="popup__footer--left">
                        <button class="popup__button"
                            :class="{disabled: !city}"
                            :disabled="!city"
                            @click="clearInput()">CLEAR
                        </button>
                    </div>
                    <div class="popup__footer--right">
                        <button class="popup__button" @click="closePopup()">CANCEL</button>
                        <button class="popup__button"
                            :class="{disabled: v.city.required.$invalid}"
                            :disabled="v.city.required.$invalid"
                            @click="addCity()">ADD
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required, alpha, helpers } from '@vuelidate/validators'
import moment from 'moment'

export default {
  name: 'PopupComponent',
  props: {
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      city: ''
    }
  },
  setup () {
    return { v: useVuelidate() }
  },
  validations () {
    return {
      city: {
        required,
        alpha,
        checkError: helpers.withMessage('Choose a city', this.checkError)
      }
    }
  },
  computed: {
    ...mapGetters(['GET_CITY', 'GET_ERROR'])
  },
  watch: {
    GET_CITY: function () {
      if (this.city !== '') {
        this.FETCH_WEATHER(this.city)
      }
    },
    GET_ERROR: function () {
      this.checkError()
    }
  },
  methods: {
    ...mapActions(['FETCH_WEATHER']),
    ...mapMutations(['UPDATE_CITY', 'CHECK_ERROR', 'UPDATE_TIME']),
    addCity () {
      this.UPDATE_CITY(this.city)
      this.addCard()
    },
    addCard () {
      this.$emit('addCard')
      const time = moment().format('mm')
      this.UPDATE_TIME(time)
    },
    checkError () {
      if (this.GET_ERROR === '404') {
        return false
      } else if (this.GET_ERROR === null) {
        return true
      } else {
        this.closePopup()
        return true
      }
    },
    clearInput () {
      this.city = ''
      this.UPDATE_CITY(this.city)
      this.CHECK_ERROR(null)
    },
    closePopup () {
      this.$emit('closePopup')
      this.clearInput()
    }
  }
}
</script>

<style lang="scss">
.backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(11, 11, 11, 0.5);
    z-index: 990;
}

.popup {
    width: 700px;
    padding: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2);
    border-radius: 4px;

    &__header {
        width: 100%;
    }

    &__main {
        padding: 52px 0px 140px 0px;
        width: 100%;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        width: 100%;

        &--right {
            display: flex;
            & button {
                &:not(:last-child) {
                    margin-right: 32px;
                }
            }
        }
    }

    &__title {
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
    }

    &__discription {
        padding-top: 16px;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
        color: #767676;
    }

    &__search {
        width: 100%;
        border-bottom: 1px solid #000;
        padding: 16px 16px 16px 0;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 24px;
        transition: all .3s;

        &.error {
            border-color: #FF0101;
        }

        &:hover {
            opacity: .6;
        }

        &::placeholder {
            color: #C1C1C1;
        }
    }

    &__error {
        color: #FF0101;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        padding-top: 12px;
    }

    &__button {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        background: none;
        color: #9B51E0;

        &:hover {
            cursor: pointer;
            opacity: .8;
        }
    }
}
.disabled {
    color: #C1C1C1;
}
@media screen and (max-width: 750px) {
    .popup {
        width: 80%;
        &__title {
            font-size: 28px;
        }

        &__discription {
            font-size: 20px;
        }

        &__search {
            font-size: 20px;
        }
    }
}
@media screen and (max-width: 450px) {
    .popup {
        width: 80%;
        &__title {
            font-size: 24px;
        }

        &__discription {
            font-size: 16px;
        }

        &__search {
            font-size: 16px;
        }
    }
}
</style>
