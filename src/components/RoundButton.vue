<script setup>
import { ref, onMounted  } from "vue";
const props = defineProps({
    text:{
        type:String,
        default:"0.0"
    },
    width:{
        type:Number,
        default:100
    },
    backgroundColor:{
        type:String,
        default:"white"
    },
    color:{
        type:String,
        default:"rgba(126, 185, 207, 1)"
    },
    fontWeight:{
        type:Number,
        default: 500
    },
    border:{
        default: true
    },
})
const css = ref({
    width:props.width + 'px',
    backgroundColor: props.backgroundColor,
    color: props.color,
    fontWeight: props.fontWeight,
    border: props.border ? '1px solid rgb(208, 208, 208)' : 'none'
})

</script>

<template>
    <div class="button" :style="css" >
        {{ text }}
    </div>
</template>

<style scoped>
.button{
    height: 48px;
    border-radius: 30px;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
}
</style>
