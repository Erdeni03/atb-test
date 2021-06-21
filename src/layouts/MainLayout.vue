<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container >
   <transition
    appear
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutLeft"
    >
       <router-view/>
  </transition>
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',
}
</script>
