import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useDebounce } from "use-debounce";
import { REPO_SEARCH } from "../../../common/services/github-service/queries";
import Repository from "./Repository";
import styles from "../../../styles.module.css";
import { Repo } from "../../../common/interfaces/Repo";

interface Props {
  searchQuery?: string;
  toggledRepos: Repo[];
  toggleRepo: (arg: Repo) => void;
}

const RepositoryList = ({ searchQuery, toggledRepos, toggleRepo }: Props) => {
  const debounceMs = 250;
  const [debouncedSearchQuery] = useDebounce(searchQuery, debounceMs);
  const { data, loading, error } = useQuery(REPO_SEARCH, {
    variables: { search_query: debouncedSearchQuery },
  });

  const isEqual = (r1: any, r2: any) =>
    r1.name === r2.name && r1.owner.login === r2.owner.login;

  if (loading) {
    return (
      <div className={`${styles.repoList}`}>
        <p> Laddar... </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.repoList}`}>
        <p> Något gick galet </p>
      </div>
    );
  }

  if (debouncedSearchQuery && !data.search.repositoryCount) {
    return (
      <div className={`${styles.repoList}`}>
        <p> Hittade inga repon! </p>
      </div>
    );
  }

  return (
    <div className={`${styles.repoList}`}>
      {data.search.edges.map((repo: any, i: any) => {
        return (
          <Repository
            repo={repo}
            toggled={!!toggledRepos.some((r: Repo) => isEqual(r, repo.node))}
            onToggled={() => toggleRepo(repo.node)}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default RepositoryList;
