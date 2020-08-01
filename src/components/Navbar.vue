<template>
  <div id="navbar">
    <p>{{ $t('hello') }}</p>
    <ul>
        <li><router-link :to="`/${this.$i18n.locale}/page1`">{{ $t("page1") }}</router-link></li>
        <li><router-link :to="`/${this.$i18n.locale}/page2`">{{ $t("page2") }}</router-link></li>
        <li>
            <button @click="change('th')">
                <span>Thai</span>
            </button>
        </li>
        <li>
            <span @click="change('en')">
                <span>English</span>
            </span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
      change (lang) {
        const route = Object.assign({}, this.$route);
        route.params.lang = lang;
        this.$i18n.locale = lang;
        this.$router.push(route);
      },
  }
}
</script>
<style>

</style>
