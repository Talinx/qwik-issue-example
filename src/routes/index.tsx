import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const textValue = useSignal('');

  return (
    <>
      <h1>Dremio to Databricks converter</h1>
      <div>
        Convert your Dremio SQL to Databricks SQL
        <br />
      </div>
      <textarea 
        rows={4} 
        cols={50} 
        placeholder="Enter your text here..."
        bind:value={textValue}
        style={{ 
          margin: '1rem 0',
          padding: '0.5rem'
        }}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
