<template>
    <header class="header">
        <h1 class="header__title">World Weather</h1>
    </header>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style lang="scss">
.header {
    display: flex;
    justify-content: center;
    padding: 24px 0;
    &__title {
        font-style: normal;
        font-weight: 300;
        font-size: 70px;
        line-height: 80px;
        color: #1B1B1B;
    }
}

@media screen and (max-width: 750px) {
    .header {
        padding: 20px 0;
        &__title {
            font-size: 56px;
            line-height: 60px;
        }
    }
}

@media screen and (max-width: 450px) {
    .header {
        padding: 16px 0;
        &__title {
            font-size: 44px;
            line-height: 48px;
        }
    }
}
</style>
