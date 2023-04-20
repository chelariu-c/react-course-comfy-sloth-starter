import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="nice pic" />
        <article>
          <div className="title">
            <h2>out story</h2>
            <div className="underline"></div>
          </div>
          <p>
            Amet sunt proident reprehenderit nisi veniam dolore labore
            exercitation cupidatat. Et laboris qui non veniam elit do occaecat
            labore velit. Et non minim culpa ad esse aute ad ipsum aliqua irure
            laboris occaecat laboris. Ea cupidatat velit enim ea ullamco
            consequat qui ullamco officia dolor Lorem ad.Elit fugiat enim labore
            sint voluptate aliqua aliqua. Ullamco duis commodo et amet officia
            cillum sint velit ipsum enim voluptate duis. Dolor duis non et
            dolore do exercitation. Id pariatur nisi nostrud do deserunt
            deserunt culpa id laborum sunt veniam ipsum. Nisi ad sit ex et
            excepteur nisi. Elit non ex aliquip non non quis reprehenderit
            culpa.Ad nisi exercitation ad commodo elit dolor ullamco
            exercitation aliqua officia. In eiusmod aliquip enim sit ut Lorem
            est velit. Ex do amet laboris pariatur amet cillum minim cupidatat
            nostrud. Velit laborum elit Lorem fugiat deserunt adipisicing
            eiusmod sint pariatur. Cillum cupidatat laboris sit aute officia
            pariatur in sunt. Anim ea esse esse id commodo labore deserunt nisi.
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
