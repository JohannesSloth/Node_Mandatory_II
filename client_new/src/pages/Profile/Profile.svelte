<script>
  import { user } from "../../stores/userStore.js";
  import { sendEmail } from "../../utils.js";

  let statusMessage = "";

  async function handleEmail(event) {
    event.preventDefault();

    try {
      const response = await sendEmail($user.email);

      if (response.error) {
        statusMessage = response.error;
      } else {
        statusMessage = "Email sucessfully dispatched";
      }
    } catch (error) {
      statusMessage = "An error occurred. Please try again later.";
    }
  }
</script>

{#if $user}
  <h1>Welcome to your profile page, {$user.email}</h1>

  <p>
    If you would like to send an email thanking the developer, press the button
    below.
  </p>
  <button on:click={handleEmail} on:keydown={handleEmail}>Send email</button>

  {#if statusMessage}
    <p>{statusMessage}</p>
  {/if}
{:else}
  <p>Loading...</p>
{/if}
