<script lang="ts">
	export let id = '';
	export let label = '';
	// TODO might need errors?
	// export let errors: string[] | undefined = undefined;
</script>

<label for={id}>
	{label}:
</label>

<style lang="scss" scoped>
	label {
		font-weight: 400;
		font-size: 1.7rem;
	}
</style>
