<script>
  import { useNavigate } from "svelte-navigator";
  import { sendEmail } from "../../utils.js";
  import { logout } from "../../utils.js";
  import { user } from "../../stores/userStore.js";

  const navigate = useNavigate();

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
      statusMessage = "An error occurred sending email. Please try again later.";
    }
  }

  async function handleLogout(event) {
    event.preventDefault;
    try {
      const response = await logout();

      if (response.error) {
        statusMessage = response.error;
      }
      else {
        user.set(null);
        navigate("/login");
      }
    } catch (error) {
      statusMessage = "An error occurred logging out. Please try again later.";
    }
  }

</script>

{#if $user}
  <h1>Welcome to your profile page, {$user.email}</h1>

  <p>
    If you would like to send an email thanking the developer, press the relevant button
    below.
  </p>
  <button on:click={handleEmail} on:keydown={handleEmail}>Send email</button>
  <button on:click={handleLogout} on:keydown={handleLogout}>Logout</button>

  {#if statusMessage}
    <p>{statusMessage}</p>
  {/if}
{:else}
  <p>Loading...</p>
{/if}
