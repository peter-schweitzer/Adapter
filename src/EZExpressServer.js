import { App, buildRes } from '@peter-schweitzer/ezserver';
import { request, response } from 'express';

export class EZExpressServer extends App {
  /** @type {MiddleWareFunction[]} */
  #middle_wares = [];

  constructor() {
    super();

    /** @type {import('node:http').RequestListener} */
    const ezs_function = this.m_http_server['_events'].request;

    /**
     * @param {T1} req
     * @param {T2} res
     * @template {AdapterRequest} T1
     * @template {AdapterResponse} T2
     */
    const adapter = (req, res) => {
      Object.defineProperty(req, 'res', { value: res });
      Object.defineProperty(res, 'req', { value: req });

      Object.setPrototypeOf(req, request);
      Object.setPrototypeOf(res, response);

      if (!Object.hasOwn(res, 'locals')) Object.defineProperty(res, 'locals', { value: Object.create(null) });

      /** @type {number} */
      let i = 0;

      /** @type {boolean} */
      let has_errored = false;

      /** @type {(error: unknown) => number?} */
      const next = (error = null) => {
        if (error === null) return i++;
        has_errored = true;
        buildRes(res, error, { code: 500 });
      };

      while (!has_errored && i < this.#middle_wares.length) {
        this.#middle_wares[i](req, res, next);
      }

      if (!has_errored) ezs_function(req, res);
    };
    this.m_http_server['_events'].request = adapter;
  }

  /**
   * @param {MiddleWareFunction} middleware
   */
  use(middleware) {
    this.#middle_wares.push(middleware);
  }
}
