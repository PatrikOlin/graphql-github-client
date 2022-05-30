import React from "react";
import styles from "../../../styles.module.css";
import { Repo } from "../../../common/interfaces/Repo";

interface Props {
  repo: Repo;
  toggled: boolean;
  onToggled: () => void;
}

const Repository = ({ repo, toggled, onToggled }: Props) => {
  if (repo) {
    const {
      node: {
        name,
        owner: { login },
        stargazers: { totalCount },
      },
    } = repo;
    const toggledClass = toggled ? styles.toggled : "";

    return (
      <div className={`${styles.repo} ${toggledClass}`} onClick={onToggled}>
        <span className={`${styles.repoHeader}`}>
          <p>{name}</p>
          <p>⭐ {totalCount}</p>
        </span>
        <p>{login}</p>
      </div>
    );
  }
  return <div>inget repo</div>;
};

export default Repository;
