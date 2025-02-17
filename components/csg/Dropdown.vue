<script setup>
import { dropdownColorPairs } from '@/constants/colorpairs-and-variants'
import VueFeather from 'vue-feather'

defineComponent({
	name: 'CsgDropdown'
})

const props = defineProps({
	options: {
		default: () => [
			{
				action: '',
				params: [],
				icon: '',
				iconClass: '',
				text: '',
				textClass: '',
				link: '',
				linkClass: '',
				variant: ''
			}
		],
		required: true,
		type: Array
	},
	row: {
		default: () => {},
		required: false,
		type: Object
	}
})

const emits = defineEmits(['action'])

function getComputedClasses(option) {
	let classes = ''

	if (option?.variant && dropdownColorPairs[option.variant]) {
		classes += ` ${dropdownColorPairs[option.variant].bgColorClass}`
		classes += ` ${dropdownColorPairs[option.variant].textColorClass}`
	} else {
		classes += ` ${dropdownColorPairs.white.bgColorClass}`
		classes += ` ${dropdownColorPairs.white.textColorClass}`
	}

	return classes
}

function onClick(action, params, index) {
	emits('action', { action, index, params, row: props.row })
}
</script>

<template>
  <div class="csg-dropdown dropdown">
    <button
      aria-expanded="false"
      aria-label="Dropdown trigger"
      class="csg-dropdown__trigger-button"
      data-bs-toggle="dropdown"
      type="button"
    >
      <VueFeather
        type="chevron-down"
        class="trigger-button__icon"
      />
    </button>
    <ul class="csg-dropdown__menus dropdown-menu">
      <li
        v-for="(option, index) in options"
        :key="index"
        :class="getComputedClasses(option)"
      >
        <span
          v-if="option.action"
          :class="option.linkClass"
          class="menus__menu"
          @click="onClick(option.action, option.params)"
        >
          <VueFeather
            v-if="option.icon"
            size="1rem"
            :type="option.icon"
            :class="option.iconClass"
          />
          <p
            :class="option.textClass"
            class="menu__text"
          >
            {{ option.text }}
          </p>
        </span>
        <a
          v-else
          class="menus__menu"
          :href="option.link"
          :class="option.linkClass"
        >
          <VueFeather
            v-if="option.icon"
            size="1rem"
            :type="option.icon"
            :class="option.iconClass"
          />
          <p
            :class="option.textClass"
            class="menu__text"
          >
            {{ option.text }}
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
  .csg-dropdown {
    @apply relative;

    &__menus {
      @apply absolute;
      @apply bg-clip-padding;
      @apply bg-white;
      @apply border-0;
      @apply hidden;
      @apply list-none;
      @apply m-0;
      @apply min-w-lg;
      @apply overflow-hidden;
      @apply p-0;
      @apply rounded-lg;
      @apply shadow-lg;
      @apply text-base;
      @apply text-gray-600;
      @apply text-left;
      @apply z-20;

      &.show {
        @apply block;
        @apply transform;
        @apply translate-x-7;
        @apply translate-y-6;

        inset: 0 auto auto 0;
      }
      .menus__menu {
        @apply bg-transparent;
        @apply border-0;
        @apply cursor-pointer;
        @apply flex;
        @apply font-normal;
        @apply gap-x-3;
        @apply items-center;
        @apply no-underline;
        @apply p-3;
        @apply w-full;
        @apply whitespace-nowrap;

        .menu__text {
          @apply font-medium;
          @apply text-sm;
          @apply leading-reset;
        }
      }
    }
    &__trigger-button {
      @apply align-middle;
      @apply bg-gray-50;
      @apply cursor-pointer;
      @apply flex;
      @apply h-5;
      @apply items-center;
      @apply justify-center;
      @apply mx-auto;
      @apply no-underline;
      @apply p-0;
      @apply rounded-md;
      @apply select-none;
      @apply text-gray-600;
      @apply text-center;
      @apply text-sm;
      @apply leading-reset;
      @apply w-5;
      @apply transition-colors;
      @apply duration-150;
      @apply ease-in-out;

      &:hover {
        @apply bg-white;
        @apply text-gray-800;

        .trigger-button__icon {
          @apply text-gray-800;
        }
      }
      .trigger-button__icon {
        @apply w-3;
        @apply text-gray-600;
      }
    }
  }
</style>
