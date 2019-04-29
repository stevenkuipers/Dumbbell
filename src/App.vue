<template>
  <div class="container-small">
    <h1>Change these settings</h1>
    <form>


      <fieldset>
        <legend>Font size</legend>
        <number-input
          v-for="size in fontSize"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <!-- <fieldset>
        <legend>Container sizing and breakpoints</legend>
        <number-input
          v-for="size in containers"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset> -->

      <fieldset>
        <legend>Paddings and Margins</legend>
        <number-input
          v-for="size in sizing"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <fieldset>
        <legend>Heading sizes</legend>
        <number-input
          v-for="size in headings"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <fieldset>
        <legend>Bicep color scheme</legend>
        <color-input
          v-for="color in colors"
          v-bind:colordef="{ 'color' : color, 'hex' : getStyle(color)}"
          v-on:setStyle="setStyle">
        </color-input>
      </fieldset>
    </form>
  </div>
</template>

<script>
import ColorInput from './components/ColorInput.vue';
import NumberInput from './components/NumberInput.vue';

export default {
  name: 'app',
  components: {
    ColorInput,
    NumberInput,
  },
  data() {
    return {
      root_properties: [],
      fontSize: [],
      colors: [],
      sizing: [],
      containers: [],
      headings: [],
    }
  },
  computed : {

  },
  methods : {
    getStyle: function(val) {
      return getComputedStyle(document.documentElement).getPropertyValue(val).trim();
    },
    setStyle:  function({property, value}) {
      console.log(property, value);
      document.documentElement.style.setProperty(property, value);
    }
  },
  mounted () {
    const CSSROOT = Array.from(document.styleSheets)
    .filter(
    sheet =>
      sheet.href === null || sheet.href.startsWith(window.location.origin)
    )
    .reduce(
    (acc, sheet) =>
      (acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce(
          (def, rule) =>
            (def =
              rule.selectorText === ":root"
                ? [
                    ...def,
                    ...Array.from(rule.style).filter(name =>
                      name.startsWith("--")
                    )
                  ]
                : def),
          []
        )
      ]),
    []
    );
    this.root_properties = CSSROOT;
    this.colors = CSSROOT.filter(val => val.match('--color'));
    this.fontSize = CSSROOT.filter(val => val.match('--font-size'));
    this.containers = CSSROOT.filter(val => val.match('--container'));
    this.sizing = CSSROOT.filter(val => val.match('--padding') || val.match('--margin'));
    this.headings = CSSROOT.filter(val => val.match('--h[1-9]'));
  }
};
</script>

<style lang="scss">

</style>
