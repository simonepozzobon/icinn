<template>
<svg
    :width="width"
    :height="width"
    class="ui-icon"
    :class="[colorClass, hoverableClass]"
    viewBox="0 0 64 64"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
>
    <g
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
    >
        <path
            class="ui-icon__path"
            d="M23.2708333,26.9375 L23.2708333,47.5833333 L16.3958333,47.5833333 L16.3958333,26.9375 L23.2708333,26.9375 Z M23.7083333,20.5625 C23.7291667,22.5416667 22.2291667,24.125 19.8333333,24.125 L19.7916667,24.125 C17.4791667,24.125 16,22.5416667 16,20.5625 C16,18.5416667 17.5416667,17 19.875,17 C22.2291667,17 23.6875,18.5416667 23.7083333,20.5625 Z M33.9166667,29.8719827 C34.8210833,28.458158 36.4526125,26.4583333 40.1041667,26.4583333 C44.625,26.4583333 48,29.4166667 48,35.75 L48,47.5833333 L41.1458333,47.5833333 L41.1458333,36.5416667 C41.1458333,33.7708333 40.1458333,31.875 37.6666667,31.875 C35.7708333,31.875 34.6458333,33.1458333 34.1458333,34.375 C33.9791667,34.8333333 33.9166667,35.4375 33.9166667,36.0625 L33.9166667,47.5833333 L27.0625,47.5833333 C27.1458333,28.875 27.0625,26.9375 27.0625,26.9375 L33.9166667,26.9375 L33.9166667,29.8719827 Z"
            fill="#000000"
        ></path>
    </g>
</svg>
</template>

<script>
import Icon from './IconDefault'
export default {
    ...Icon
}
</script>

<style lang="scss" scoped>
@import '~styles/shared';
@import '~styles/ui-icons';
</style>
