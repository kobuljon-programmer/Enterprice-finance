import { d as defineEventHandler } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'node:url';

const ping_get = defineEventHandler(() => {
  return { ok: true, message: "Nitro backend is working" };
});

export { ping_get as default };
//# sourceMappingURL=ping.get.mjs.map
