import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getGithubRepos } from "../../actions/profile";

//TODO Purpose:
//TODO    1) To display five Github repos that belong to the username the user entered on their profile.
//TODO    2) To display the name, description, the stargazer count, the repo watch count, and the fork count
//TODO for each of the five repos.

// How it works:
//   1) The ProfileGithub function takes in username prop, the getGithubRepos action, and the repos state
// as its parameters.
//?   2) The useEffect hook is called that executes the getGithubRepos action with username as its parameter,
//? using getGitHubRepos as its dependency.
//    3) The ProfileGithub function returns a div that contains h2 tag saying Github Repos and either an h4 tag
// saying No GitHub profile found or a div containing the five repos for that user's entered username.
//?    4) A map function is called on the repos array, and a single instance, repo, is passed in as a parameter.
//? A div is created with the property of key and given the value of repo._id, an a tag inside of a h4 tag
//? has a property of href with the value of repo.html_url and displays repo.name. A p tag displays repo.description.
//? Li tags are made for Stars, Watchers, and Forks, displaying the values of repo.stargazers_count,
//? repo.watchers_count, and repo.forks_count, respectively.
//    5) The getGithubRepos actions is defined as a required object in ProfileGithub.propTypes. The repos state
// is defined as a required array, and the username prop is defined as a required object.
//?    6) mapStateToProps defines repos using state.profile.repos

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        // <Spinner />
        <h4>No GitHub profile found</h4>
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href={repo.html_url} target="_blank" rel="noopener norefer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
