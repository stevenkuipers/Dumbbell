<template>
  <div class="container-small">
    <h1>Change these settings</h1>
    <form>

      <fieldset>
        <legend>Font size</legend>
        <number-input
          v-for="size in fontSize"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-bind:step="0.1"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <fieldset>
        <legend>Container sizing and breakpoints</legend>
        <number-input
          v-for="size in containers"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-bind:step="1"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <fieldset>
        <legend>Paddings and Margins</legend>
        <number-input
          v-for="size in sizing"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-bind:step=".1"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <fieldset>
        <legend>Heading sizes</legend>
        <number-input
          v-for="size in headings"
          v-bind:sizing="{ 'property' : size, 'value' : getStyle(size)}"
          v-bind:step=".1"
          v-on:setStyle="setStyle"
          >
        </number-input>
      </fieldset>

      <fieldset>
        <legend>Font families</legend>
        <div class="">
          <label for="font-picker-primary">Primary Font</label>
          <font-picker
          :api-key="'AIzaSyBSX5fgOg6F8DYZ1AlVgn8S9eyEL1hKSEs'"
          :options="{name: 'primary',
                    variants: ['200', '300'],
                    sort: 'popularity'}"
          :activeFont="fontPrimary"
          @change="fontChanged($event, 'fontPrimary')"
          style="width: 100%; box-shadow: none;"
          :id="'font-picker-primary'"
          >
          </font-picker>

          <p class="apply-font-primary">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <label for="font-picker-secondary">Secondary Font</label>
          <font-picker
          :api-key="'AIzaSyBSX5fgOg6F8DYZ1AlVgn8S9eyEL1hKSEs'"
          :options="{name: 'secondary',
                    variants: ['200', '300'],
                    sort: 'popularity'}"
          :activeFont="fontSecondary"
          @change="fontChanged($event, 'fontSecondary')"
          style="width: 100%; box-shadow: none;"
          :id="'font-picker-secondary'"
          >
          </font-picker>
          <p class="apply-font-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </fieldset>
      <fieldset>
        <legend>Bicep color scheme</legend>
        <color-input
          v-for="color in colors"
          v-bind:colordef="{'color' : color, 'hex' : getStyle(color)}"
          v-on:setStyle="setStyle">
        </color-input>
      </fieldset>
    </form>
  </div>
</template>

<script>
import ColorInput from './components/ColorInput.vue';
import NumberInput from './components/NumberInput.vue';
import FontPicker from 'font-picker-vue';

export default {
  name: 'app',
  components: {
    ColorInput,
    NumberInput,
    FontPicker
  },
  data() {
    return {
      root_properties: [],
      fontSize: [],
      fontFamilies: [],
      fontPrimary: '',
      fontSecondary: '',
      colors: [],
      sizing: [],
      containers: [],
      headings: [],
    };
  },
  methods: {
    fontChanged(e, val){
      this[val] = e.family;
    },
    getStyle(val) {
      return getComputedStyle(document.documentElement).getPropertyValue(val).trim();
    },
    getFont(val) {
      const font =  getComputedStyle(document.documentElement).getPropertyValue(val).trim();
      console.log(font.substring(0, font.indexOf(',')));
      return font.substring(0, font.indexOf(','));
    },
    setStyle({ property, value }) {
      console.log(property, value);
      document.documentElement.style.setProperty(property, value);
    },
  },
  mounted() {
    const CSSROOT = Array.from(document.styleSheets)
      .filter(
        sheet => sheet.href === null || sheet.href.startsWith(window.location.origin),
      )
      .reduce(
        (acc, sheet) => (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule) => (def = rule.selectorText === ':root'
              ? [
                ...def,
                ...Array.from(rule.style).filter(name => name.startsWith('--')),
              ]
              : def),
            [],
          ),
        ]),
        [],
      );
    this.root_properties = CSSROOT;
    this.colors = CSSROOT.filter(val => val.match('--color'));
    this.fontSize = CSSROOT.filter(val => val.match('--font-size'));
    this.fontFamilies = CSSROOT.filter(val => val.match('--font-primary') || val.match('--font-secondary'));
    this.fontPrimary = this.getFont(this.fontFamilies[0])
    this.fontSecondary = this.getFont(this.fontFamilies[1])
    this.containers = CSSROOT.filter(val => val.match('--container'));
    this.sizing = CSSROOT.filter(val => val.match('--padding') || val.match('--margin'));
    this.headings = CSSROOT.filter(val => val.match('--h[1-9]'));
  },
};
</script>

<style lang="scss">

</style>
