export interface Repo {
  node: {
    name: string;
    owner: {
      login: string;
    };
    stargazers: {
      totalCount: number;
    };
  };
}
