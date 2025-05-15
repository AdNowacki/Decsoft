<template>
  <div class="template">
    <Header />
    <main class="template__body">
      <FormPage />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/common/Header/Header.vue';
import Footer from './components/common/Footer/Footer.vue';
import FormPage from './components/pages/FormPage/FormPage.vue';
</script>

<style lang="scss" scoped>
.template {
  --template-max-width: 1280px;
  --template-body-x-padding: 15px;
  --template-body-y-padding: 15px;

  display: flex;
  flex-direction: column;
  place-items: start center;
  min-height: 100vh;

  @supports (min-height: 100dvh) {
    min-height: 100dvh;
  }

  &__body {
    max-width: var(--template-max-width);
    padding: var(--template--body-y-padding) var(--template--body-x-padding);
    margin: 0 auto;
    flex: 1 1 auto;
  }

}
</style>
