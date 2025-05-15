<template>
  <footer class="footer">
    <a href="https://www.decsoft.com.pl/" target="_blank">&copy; Decsoft</a>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  --footer-x-padding: 8px;
  --footer-y-padding: 20px;

  padding: var(--footer-y-padding) var(--footer-x-padding);

  a {
    color: var(--dark-page-text-color);
    transition: all 0.2s;

    &:hover {
      color: var(--dark-page-text-color);
      text-decoration: underline dashed;
    }
  }

  @media print {
    display: none;
  }
}
</style>