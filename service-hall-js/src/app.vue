<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive include="ShaoerSearch">
      <component :is="Component" :key="route.fullPath" />
    </keep-alive>
  </router-view>
</template>
