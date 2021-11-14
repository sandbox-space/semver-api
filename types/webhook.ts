export type DockerHubWebhook = {
  push_data: {
    tag: string,
  },
  repository: {
    name: string,
    namespace: string,
    repo_name: string,
  },
  callback_url: string,
};
