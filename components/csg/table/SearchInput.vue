<script setup>
import VueFeather from 'vue-feather'

defineComponent({
	name: 'CsgTableSearchInput'
})

const props = defineProps({
	isLoading: {
		default: false,
		required: false,
		type: Boolean
	},
	placeholder: {
		default: '',
		required: false,
		type: [Number, String]
	},
	searchText: {
		default: '',
		required: false,
		type: [Number, String]
	}
})
const emits = defineEmits(['update:model-value'])

const localSearchText = ref(props.searchText)
const localPlaceholder = ref(props.placeholder)
watch(
	() => props.searchText,
	(searchText) => {
		localSearchText.value = searchText
	}
)

function updateValue(value) {
	emits('update:model-value', value)
}
</script>

<template>
  <CsgInput
    v-model="localSearchText"
    :is-loading="isLoading"
    :placeholder="localPlaceholder"
    bg-color="gray-50"
    size="xl"
    @update:model-value="updateValue"
  >
    <template #csg-input-prepend>
      <VueFeather
        size="1rem"
        type="search"
      />
    </template>
  </CsgInput>
</template>
