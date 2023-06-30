<script lang="ts">
	import { callApi } from './use_hello_api';
	import { ClientJS } from 'clientjs';
	import Nested from './get_address.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {

		console.log('Hello World');



	const client = new ClientJS();

	// Get the client's fingerprint id
	const fingerprintHash = client.getFingerprint();
	console.log('fingerprintHash');
	console.log(fingerprintHash);

	const fingerprintData = client.getBrowserData();
	console.log('fingerprintData');
	console.log(fingerprintData);

	const res = await fetch('https://orb9e3jc05.execute-api.us-east-1.amazonaws.com/dev/test2',);
	const data = await res.json();
	console.log(data);

	});

	export let name: string;
	  let count = 0;

  function handleClick() {
    count += 1;
  }
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<h3>Hello Svelte!</h3>
	<Nested/><Nested/>
<button on:click={handleClick}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<button on:click={callApi}>
	Test api
  </button>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>


