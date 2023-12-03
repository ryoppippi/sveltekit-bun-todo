<script>
	import { enhance } from '$app/forms';

	const { data } = $props();

	const { todos } = $derived(data);

	$effect(() => {
		console.log({ todos });
	});
</script>

<form method="post" action="?/add" use:enhance>
	<input type="text" name="title" />
	<button type="submit">Add</button>
</form>

<div>
	{#each todos as { completed, id, title }}
		<div>
			<form method="post" action="?/update" use:enhance>
				<input name="completed" type="checkbox" bind:checked={completed} />
				<input name="id" type="number" bind:value={id} hidden />
				<button type="submit">Update</button>
				{#if completed}
					<del>{title}</del>
				{:else}
					{title}
				{/if}
			</form>
		</div>
	{/each}
</div>
