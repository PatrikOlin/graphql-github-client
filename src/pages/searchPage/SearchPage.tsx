import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import RepositoryList from "./components/RepositoryList";
import ResetButton from "./components/ResetButton";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "../../common/services/github-service/GithubService";
import styles from "../../styles.module.css";
import { Repo } from "../../common/interfaces/Repo"

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [toggledRepos, setToggledRepos] = useState<any[]>([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("search");
    setSearchQuery(query ?? "");
  }, []);

  const updateSearchQuery = (query: string) => {
    let uriQuery = encodeURIComponent(query);
    window.history.replaceState(null, "", `?search=${uriQuery}`);
    setSearchQuery(query ?? "");
  };

  const clearSearchParams = () => {
    let url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState(null, "", url);
    updateSearchQuery("");
  };

  const resetState = () => {
    clearSearchParams();
    setToggledRepos([]);
  };

  const toggleRepo = (repo: Repo) => {
    if (toggledRepos.some((r: any) => isEqual(r, repo))) {
      setToggledRepos(toggledRepos.filter((r: any) => !isEqual(r, repo)));
    }
    setToggledRepos([...toggledRepos, repo]);
  };

  const isEqual = (r1: any, r2: any) =>
    r1.name === r2.name && r1.owner.login === r2.owner.login;

  return (
    <ApolloProvider client={client}>
      <main className={`${styles.searchPageContainer}`}>
        <div className={`${styles.searchHeader}`}>
          <SearchBar value={searchQuery} onChange={updateSearchQuery} />
          <ResetButton onReset={resetState} />
        </div>
        <RepositoryList
          searchQuery={searchQuery}
          toggledRepos={toggledRepos}
          toggleRepo={toggleRepo}
        />
      </main>
    </ApolloProvider>
  );
}

export default SearchPage;
