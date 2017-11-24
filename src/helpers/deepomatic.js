// @flow

import request from 'superagent';

export function submitFile(encodedFile: string) {
  return request
    .post('https://api.deepomatic.com/v0.6/detect/fashion')
    .set('X-APP-ID', 283723326633)
    .set('X-API-KEY', 'b01a86463f6e4d58978da77b912d7fa5')
    .set('Accept', 'application/json')
    .send({ base64: encodedFile });
}
