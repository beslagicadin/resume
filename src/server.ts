import { renderApplication } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { config } from './app/app.config.server';
import bootstrap from './main.server';

export const netlifyAppEngineHandler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const documentPath = './index.html';
  
  try {
    const html = await renderApplication(bootstrap, {
      document: documentPath,
      url: url.pathname + url.search,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Server Error', { status: 500 });
  }
};

export const reqHandler = () => {};
