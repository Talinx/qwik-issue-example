import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import peggy from "peggy";
import pythonGrammar from "../grammar/python.peggy?raw";

export default component$(() => {
  const textValue = useSignal('');
  const astValue = useSignal('');
  const parser = useSignal<any>(null);
  
  // Initialize parser on component mount
  useVisibleTask$(() => {
    parser.value = peggy.generate(pythonGrammar);
  });

  const handleConvert$ = $(() => {
    if (!parser.value) return;
    
    try {
      const ast = parser.value.parse(textValue.value);
      astValue.value = JSON.stringify(ast, null, 2);
    } catch (error: any) {
      console.error('Error parsing code:', error);
      astValue.value = `Error: ${error.message}`;
    }
  });

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
        placeholder="Enter your code here..."
        bind:value={textValue}
        style={{ 
          margin: '1rem 0',
          padding: '0.5rem'
        }}
      />
      
      <button onClick$={handleConvert$}>
        Parse Code
      </button>

      <pre style={{ marginTop: '1rem' }}>
        {astValue.value}
      </pre>
    </>
  );
});
