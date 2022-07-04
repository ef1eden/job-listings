<template>
  <div class="container">
    <div class="header">
      <img alt="" src="@/assets/img/bg-header.svg">
    </div>
    <div class="app-content">
      <router-view/>
    </div>
  </div>
  
</template>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

html, body {
	position: relative;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-family-main;
  margin: 0;
  padding: 0;
  background: #f0fafb;
}

#app {
  font-family: $font-family-main;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  position: relative;
	overflow-x: hidden;
  background: #f0fafb;
  min-height: 100vh;
}

.container {
  .header {
    background: $main-color;

    img {
      display: block;
      min-width: 100%;
      max-width: 100%;
    }
  }
  .app-content {
    max-width: 1110px;
    margin: 0 auto;
  }
}
</style>
