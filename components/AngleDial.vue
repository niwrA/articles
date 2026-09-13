<script setup lang="ts">
const props=defineProps<{modelValue:number;label:string}>()
const emit=defineEmits<{ 'update:modelValue':[value:number] }>()
const dial=ref<HTMLElement>()
const normal=(value:number)=>Math.round(((value+180)%360+360)%360-180)
const setFromPointer=(event:PointerEvent)=>{const box=dial.value!.getBoundingClientRect(),x=event.clientX-(box.left+box.width/2),y=event.clientY-(box.top+box.height/2);emit('update:modelValue',normal(Math.atan2(y,x)*180/Math.PI))}
const start=(event:PointerEvent)=>{(event.currentTarget as Element).setPointerCapture(event.pointerId);setFromPointer(event)}
const nudge=(delta:number)=>emit('update:modelValue',normal(props.modelValue+delta))
</script>

<template>
 <div class="angle-dial">
  <span>{{label}}</span>
  <div ref="dial" class="dial" role="slider" tabindex="0" :aria-label="label" aria-valuemin="-180" aria-valuemax="180" :aria-valuenow="modelValue" @pointerdown="start" @pointermove="($event.buttons&&setFromPointer($event))" @keydown.left.prevent="nudge(-5)" @keydown.right.prevent="nudge(5)" @keydown.down.prevent="nudge(-5)" @keydown.up.prevent="nudge(5)">
   <i v-for="tick in 8" :key="tick" :style="{transform:`rotate(${tick*45}deg)`}"/>
   <b :style="{transform:`rotate(${modelValue}deg)`}"/><em>{{Math.round(modelValue)}}°</em>
  </div>
  <div class="nudges"><button type="button" @click="nudge(-15)">−15°</button><button type="button" @click="nudge(15)">+15°</button></div>
 </div>
</template>

<style scoped>
.angle-dial{display:grid;justify-items:center;gap:.25rem;font-size:.7rem}.dial{position:relative;width:78px;height:78px;border:1px solid #bec9c4;border-radius:50%;background:radial-gradient(circle at center,#fff 0 12%,transparent 13%),#f5f7f5;cursor:crosshair;touch-action:none;box-shadow:inset 0 0 0 5px #fff}.dial:focus{outline:2px solid #315f58;outline-offset:2px}.dial i{position:absolute;left:38px;top:4px;width:1px;height:6px;background:#9aa7a2;transform-origin:1px 35px}.dial b{position:absolute;left:38px;top:37px;width:31px;height:3px;border-radius:2px;background:#b95538;transform-origin:1px 1px}.dial b::after{content:'';position:absolute;right:-2px;top:-3px;border-left:7px solid #b95538;border-top:4px solid transparent;border-bottom:4px solid transparent}.dial em{position:absolute;inset:0;display:grid;place-items:end center;padding-bottom:10px;font-style:normal;font-size:.65rem;color:#52605b}.nudges{display:flex;gap:.2rem}.nudges button{padding:.18rem .3rem;border-radius:5px;font-size:.62rem}
</style>
