/**
 * @typedef {import('http').IncomingMessage & import('express').Request} AdapterRequest
 * @typedef {import('http').ServerResponse & import('express').Response} AdapterResponse
 * @typedef {(req: AdapterRequest, res: AdapterResponse, next: (err?: unknown)=>void) => void} MiddleWareFunction
 */
