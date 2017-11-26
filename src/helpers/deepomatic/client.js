// @flow

import superagent from 'superagent';

export const APP_ID = 283723326633;
export const API_KEY = 'b01a86463f6e4d58978da77b912d7fa5';
export const BASE_URL = 'https://api.deepomatic.com/v0.6';

export type Task = {
  id: number,
  status: 'pending' | 'success',
  error: string,
  date_created: string,
  date_updated: string,
  data: { boxes: Object, height: number, width: number },
};

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH';

function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

function handleAPIError(error: {
  response: { body: { error: string } },
}): string {
  const errorMessage = error.response.body.error;
  console.warn(`Something went wrong when calling the API: ${errorMessage}`);
  return errorMessage;
}

function buildUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

function buildRequest(
  client,
  method: HttpMethod,
  path: string,
  payload: ?Object
) {
  const request = client(method, buildUrl(path))
    .set('X-APP-ID', APP_ID)
    .set('X-API-KEY', API_KEY)
    .set('Accept', 'application/json');
  return payload ? request.send(payload) : request;
}

function submitFile(encodedFile: string): Promise<string> {
  return buildRequest(superagent, 'POST', '/detect/fashion', {
    base64: encodedFile,
  }).then((response: { body: { task_id: string } }) => {
    return response.body.task_id;
  }, handleAPIError);
}

function getTask(taskId: string): Promise<Task> {
  return buildRequest(superagent, 'GET', `/tasks/${taskId}`).then(
    (response: { body: { task: Task } }) => {
      return response.body.task;
    },
    handleAPIError
  );
}

function retrieveTaskResults(taskId: string): Promise<Task> {
  return getTask(taskId).then(task => {
    return pollTaskUntilSuccess(taskId, task);
  });
}

function pollTaskUntilSuccess(taskId: string, task: Task): Promise<Task> {
  const hasSucceeded = task.status === 'success';
  if (!hasSucceeded) {
    return delay(1000).then(() =>
      getTask(taskId).then(task => {
        return pollTaskUntilSuccess(taskId, task);
      })
    );
  } else {
    return Promise.resolve(task);
  }
}

const Deepomatic = {
  submitFile,
  getTask,
  retrieveTaskResults,
};

export default Deepomatic;
