export function send(res, payload) {
  if (!res) {
    throw new Error('res is required by base->send()');
  }

  res.send(payload);
  res.end();
}
