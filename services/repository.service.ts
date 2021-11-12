import {
  RegistryTagListResponse,
  RepositoryName,
  RepositoryTags,
  RegistryToken,
  TagList
} from "../types.ts"

export async function getTags(registryToken: RegistryToken, repositoryName: RepositoryName, filter: string | undefined): Promise<RepositoryTags> {
  const registryUrl = `https://registry-1.docker.io/v2/${repositoryName}/tags/list`;
  console.log(registryUrl);
  const registryResponse = await fetch(registryUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${registryToken.access_token}`,
      "content-type": "application/json",
    },
  });

  const registryTagListResponse: RegistryTagListResponse = await registryResponse.json();
  let filtered = registryTagListResponse.tags;
  if (filter !== undefined) {
    const regexp = new RegExp(filter);
    filtered = registryTagListResponse.tags.filter(tag => regexp.test(tag));
  }

  const sorted = filtered.sort(function(a, b) {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  });

  return {
    'repository': repositoryName,
    'tags': sorted,
  } 
}

export function tagDistinction(tagsBase: RepositoryTags, tagsAgains: RepositoryTags): TagList {
  const distinction = tagsAgains.tags.filter(value => !tagsBase.tags.includes(value));
  return distinction;
}
