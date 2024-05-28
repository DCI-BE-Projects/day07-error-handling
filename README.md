**yesterday**
  - we learnt about router

**today**
  - we will talk about error handling and cors

## HTTP Status Codes

- What makes up an HTTP request?
  - method, url, headers, body

- What makes up an HTTP response?
  - status, headers, body

- The headers and body are basically the same as with requests.
- The status contains the HTTP Status code.
- The status code indicates the status of the response.
  - You already know a few status codes.
  - You don't need to learn all of them.

- A few are important enough that it's a good idea to memorize.

  - **200 OK**: 
    - The request was received, understood, and accepted. 

  - **201 Created**: 
    - The request was successful and a resource was created.

  - **400 Bad Request**: 
    - The server could not understand the request due to invalid syntax.

  - **401 Unauthorized**: 
    - Authentication is required and has failed or has not yet been provided.

  - **403 Forbidden**: 
    - The client does not have access rights to the content.

  - **404 Not Found**: 
    - The server can not find the requested resource.

  - **418 I'm a teapot** 
    - The server refuses to brew coffee because it is, permanently, a teapot.

  - **500 Internal Server Error**: 
    - The server has encountered a situation it doesn't know how to handle.

## Setting Response Status

- Use `res.status(<statusCode>)` to set the HTTP status code of the response.
- Example:
    ```javascript
    res.status(404).send('Not Found');
    ```

## Error Handling Middleware

- Special middleware functions that have four arguments: `(err, req, res, next)`.
- They are placed at the end of your middleware/route chain.
- Express triggers these when errors occur in previous middleware or routes.

- Example:
    ```javascript
    const errorHandler = (err, req, res, next) => {
        console.error(err.message);
        res.status(500).send('Something broke!');
    };
    ```

## Using the Error Handler

- **Call Next with an Error**:
  - Use `next(err)` to pass control to the next error handling middleware.

- Example:
    ```javascript
    app.get('/some-route', (req, res, next) => {
        const err = new Error('Something went wrong');
        next(err);
    });
    ```

## Catching 404s with a Default Route

- Use app.use() without a path to create a "catch-all" middleware function.
- Used as the very last route to handle unmatched requests and send a 404 response.

- Example:
    ```javascript
    app.use((req, res, next) => {
        res.status(404).send('Sorry, we could not find that');
    });
    ```
