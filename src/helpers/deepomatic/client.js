// @flow

import request from 'superagent';

export const APP_ID = 283723326633;
export const API_KEY = 'b01a86463f6e4d58978da77b912d7fa5';
export const BASE_URL = 'https://api.deepomatic.com/v0.6';

export type Task = {
  id: number,
  status: 'pending' | 'success',
  error: string,
  date_created: string,
  date_updated: string,
  data: Object,
};

function submitFile(encodedFile: string): Promise<string> {
  return request
    .post(`${BASE_URL}/detect/fashion`)
    .set('X-APP-ID', APP_ID)
    .set('X-API-KEY', API_KEY)
    .set('Accept', 'application/json')
    .send({ base64: encodedFile })
    .then(
      (response: { body: { task_id: string } }) => {
        return response.body.task_id;
      },
      (error: { response: { body: { error: string } } }) => {
        const errorMessage = error.response.body.error;
        console.warn(
          `Something went wrong when calling the API: ${errorMessage}`
        );
        return errorMessage;
      }
    );
}

function getTask(taskId: string): Promise<Task> {
  return request
    .get(`${BASE_URL}/tasks/${taskId}`)
    .set('X-APP-ID', APP_ID)
    .set('X-API-KEY', API_KEY)
    .set('Accept', 'application/json')
    .then(
      (response: { body: { task: Task } }) => {
        return response.body.task;
      },
      (error: { response: { body: { error: string } } }) => {
        const errorMessage = error.response.body.error;
        console.warn(
          `Something went wrong when calling the API: ${errorMessage}`
        );
        return errorMessage;
      }
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
    return getTask(taskId).then(task => {
      return pollTaskUntilSuccess(taskId, task);
    });
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
