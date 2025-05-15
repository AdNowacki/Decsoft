<template>
  <header class="header">
    <nav class="header-nav">
      <picture>
        <source srcset="/decsoft-logo.jpg" type="image/jpeg" />
        <source srcset="/decsoft-logo.webp" type="image/webp" />
        <img src="/decsoft-logo.jpg" alt="Decsoft Logo" />
      </picture>
      <ul class="header-links">
        <a href="#">Dlaczego my?</a>
        <a href="#">Współpraca</a>
        <a href="#">Kontakt</a>
        <a href="#">Zaloguj</a>
      </ul>
    </nav>
    <section class="header-hero">
      <picture>
        <source srcset="/hero.webp" type="image/webp" />
        <source srcset="/hero@960.webp" type="image/webp" media="(min-width: 900px)" />
        <source srcset="/hero@960.jpg" type="image/jpeg"/>
        <source srcset="/hero.jpg" type="image/jpeg" media="(min-width: 900px)"  />
        <img src="/hero.jpg" alt="Decsoft Logo" />
      </picture>
    </section>
  </header>
</template>

<style lang="scss" scoped>
.header {
  --header-nav-x-padding: 8px;
  --header-nav-y-padding: 10px;
  --header-links-gap: 6px;

  &-nav {
    padding: var(--header-nav-y-padding) var(--header-nav-x-padding);
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 80px;

      @media screen and (min-width: 560px) {
        width: 180px;
      }

      @media print {
        width: 180px;
      }
    }
  }

  &-links {
    gap: var(--header-links-gap);
    display: flex;
    font-size: 0.9rem;

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

  &-hero {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media print {
      display: none;
    }
  }
}
</style>