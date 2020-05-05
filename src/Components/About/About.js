import React from "react";
import {Link} from 'react-router-dom'
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <h3 className="aboutTitle">About</h3>
      <section className="bio">
        <img
          alt="image"
          src="https://i.imgur.com/7o7PNwK.jpg"
          className="photo"
        />
        <p className="words">
          {" "}
          Photography piqued my interest when I was a child, as my father was a
          photographer and I would watch him process film and develop pictures.
          As my interest grew, I realized how important it is to capture
          memories that could be relished for a lifetime, being passed down from
          generation to generation.{" "}
        </p>
        <p className="words">
          My career as a photographer began to develop in High School, where I
          worked with the yearbook team and photographed school activities.
          After High School, I attended East Los Angeles College, honing my
          skills as a photographer while earning an Associates Degree.
        </p>
        <p className="words">
          I now live in Wichita, KS, with my love family of four. Being a
          freelance photographer, I offer many services that can be viewed <Link to='/serv' style={{textDecoration: 'underline',
        color: 'rgb(100, 156, 240)'}}>here.</Link>
        </p>
      </section>
    </div>
  );
};

export default About;
