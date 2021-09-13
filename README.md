# Delta.Module.Admin
 The angular version of Delta admin SPA. The SPA is a complete modular application that houses the dashboard for Delta CMS.
 
The module is still in active development therefore changes might occur frequently. 
The module uses an abstracted version of the angular `HttpClient`. This is located at [`HttpContext`](./ClientApp/src/app/core/httpContext.ts)
The `HttpContext` serves the purpose of automatically handling and parsing errors returned from the server-side code.
The `HttpContext` also handles proper authentication before any request is made or `Forbiden` requests are redirected to the appropriate
endpoints.

To start the app, run `npm -i`  `npm start`
The app is set to host at `localhost:9700` this port is usually http. The server side code uses a proxy which tunnels
request from this host to serve as original request of the hosting server during development.

