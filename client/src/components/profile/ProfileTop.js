import React from "react";
import PropTypes from "prop-types";

// Purpose:
//    1) To display the top part of a user's profile page that contains information such as status, company,
// location, website, social media links, and their profile avatar image.

// How it works:
//    1) The ProfileTop function takes in status, company, location, website, social, and user that is
// deconstructed off of the profile prop. The user prop is further deconstructed with name and avatar.
//    2) The ProfileTop function returns a div containing an image with the attribute src assigned to
// the value of avatar, a h1 tag with the value of name inside, a p tag with the value of status and a JSX
// expression that checks for a truth value of company; if true, then displays the value of company
// in a span tag. A p tag using a JSX expression that checks for a truth value of location, if true, then
// displays the value of location in a span tag.
//    3) A div tag with a JSX expression will return an a tag if a truth value exists for websites. The a tag
// contains a href attribute that is assigned to a function called UrlToRender that passes in the website prop.
//    4) The urlToRender function takes in a parameter called link and uses regex to see if the link
// does NOT match the expected input returning the formatted link.
//    5) The five following a tags have a href value assigned social.twitter, social.facebook, social.linkedin,
// social.youtube, social.instagram, respectively. All these a tags have a JSX conditional that check to see
// if there is a truth value in the social prop object and the corresponding attached object.
//    6) The profile prop is defined as a required object in ProfileTop.propTypes.

// A function to return the proper formatted link if the user did not
// add the necessary https:// in order for the href property to work.
const urlToRender = (link) => {
  if (!link.match(/^[a-zA-Z]+:\/\//)) {
    return "//" + link;
  }
  return link;
};

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    // <!-- Top -->
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a
            href={urlToRender(website)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
