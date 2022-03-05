export type DockerHubWebhook = {
  push_data: {
    tag: string,
  },
  repository: {
    repo_name: string,
  },
  callback_url: string,
};
