<template>
    <div class="button" @click="$emit('click')"></div>
</template>

<script>
export default {
  name: 'AddButton'
}
</script>

<style lang="scss" scoped>
.button {
    position: fixed;
    bottom: 34px;
    right: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #9B51E0;
    transition: all .3s;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
        cursor: pointer;
        opacity: .8;
    }
    &::before {
        content: '';
        position: absolute;
        display: block;
        width: 14px;
        height: 2px;
        background-color: white;
    }

    &::after {
        content: '';
        position: absolute;
        display: block;
        width: 14px;
        height: 2px;
        background-color: white;
        transform: rotate(90deg);
    }
}
</style>
