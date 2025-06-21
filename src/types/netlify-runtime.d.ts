declare module '@netlify/angular-runtime' {
  /**
   * Context for the document builder in Netlify Angular runtime
   */
  export interface BuilderContext {
    /**
     * Document object with toString method
     */
    document: {
      toString(): string;
    };
    /**
     * Path to the document
     */
    documentPath: string;
  }

  /**
   * Function signature for rendering Angular applications
   */
  export interface RenderFunction {
    (url: string, builder: BuilderContext): Promise<string>;
  }

  /**
   * Options for the Angular adapter
   */
  export interface AdapterOptions {
    /**
     * Render function to process requests
     */
    render: RenderFunction;
  }

  /**
   * Creates an adapter for Angular applications on Netlify
   * @param options - Configuration options for the adapter
   * @returns A function handler for Netlify
   */
  export function angularAdapter(options: AdapterOptions): (event: any) => Promise<any>;
}
