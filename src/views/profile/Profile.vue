<template>
  <profile-nav-bar/>
  <profile-content/>
</template>

<script>
  import ProfileNavBar from "./childeComps/ProfileNavBar";
  import ProfileContent from "./childeComps/ProfileContent";
  export default {
    name: "Profile",
    components: {
      ProfileNavBar,
      ProfileContent
    }
  }
</script>

<style scoped>

</style>