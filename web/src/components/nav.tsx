import React from "react"
import styled from "styled-components"
import { graphql, Link, useStaticQuery } from "gatsby"

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
`
const NavHeader = styled(Link)`
  text-align: center;
`
const Title = styled.p`
  font-size: 28px;
  font-weight: 500;
`
const Subheading = styled.p`
  margin-top: 8px;
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
`
const NavOptions = styled.div`
  position: relative;
  top: -13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  @media (min-width: 950px) {
    right: -40px;
  }
  @media (min-width: 1150px) {
    right: 0;
  }
`
const InternalLinks = styled.ul`
  display: flex;
  width: 100%;
  max-width: 500px;
  justify-content: space-between;
  li {
    :not(:first-of-type) {
      margin-left: 15px;
    }
    a {
      text-align: center;
      text-transform: capitalize;
      padding: 5px;
    }
  }
`
const Instagram = styled.a`
  padding: 20px 0 20px 20px;
  transition: transform 0.3s;
  :hover {
    transform: scale(1.2);
  }
`
const VerticalLine = styled.hr`
  width: 2px;
  height: 35px;
  margin: 0 0 0 20px;
`
const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 30px max(30px, 5%);

  @media (min-width: 750px) {
    flex-direction: initial;
    justify-content: space-between;

    ${NavOptions} {
      justify-content: initial;
      margin-top: 0;
    }

    ${NavHeader} {
      text-align: initial;
    }
  }

  @media (min-width: 1150px) {
    max-width: 90%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`
const InstaExtension = styled.div`
  display: none;
  @media (min-width: 750px) {
    display: flex;
    align-items: center;
  }
`

const navOptions = ["portfolio", "about", "news", "contact"]

const instaLogo = (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.50201 4.38503C6.94808 4.38503 4.88806 6.4455 4.88806 9C4.88806 11.5545 6.94808 13.615 9.50201 13.615C12.0559 13.615 14.116 11.5545 14.116 9C14.116 6.4455 12.0559 4.38503 9.50201 4.38503ZM9.50201 12.0003C7.85159 12.0003 6.50234 10.6548 6.50234 9C6.50234 7.3452 7.84757 5.99967 9.50201 5.99967C11.1564 5.99967 12.5017 7.3452 12.5017 9C12.5017 10.6548 11.1524 12.0003 9.50201 12.0003ZM15.3809 4.19625C15.3809 4.79471 14.899 5.27268 14.3047 5.27268C13.7064 5.27268 13.2285 4.79069 13.2285 4.19625C13.2285 3.60181 13.7104 3.11983 14.3047 3.11983C14.899 3.11983 15.3809 3.60181 15.3809 4.19625ZM18.4368 5.28874C18.3685 3.84681 18.0392 2.56956 16.9831 1.51724C15.931 0.464911 14.654 0.135557 13.2124 0.0632601C11.7267 -0.0210867 7.27334 -0.0210867 5.78756 0.0632601C4.34997 0.131541 3.07301 0.460895 2.0169 1.51322C0.960792 2.56555 0.635527 3.8428 0.563246 5.28473C0.478918 6.77084 0.478918 11.2251 0.563246 12.7113C0.631511 14.1532 0.960792 15.4304 2.0169 16.4828C3.07301 17.5351 4.34596 17.8644 5.78756 17.9367C7.27334 18.0211 11.7267 18.0211 13.2124 17.9367C14.654 17.8685 15.931 17.5391 16.9831 16.4828C18.0352 15.4304 18.3645 14.1532 18.4368 12.7113C18.5211 11.2251 18.5211 6.77485 18.4368 5.28874ZM16.5173 14.3058C16.2041 15.093 15.5977 15.6995 14.8066 16.0168C13.622 16.4868 10.8111 16.3783 9.50201 16.3783C8.19292 16.3783 5.37797 16.4828 4.19738 16.0168C3.41032 15.7036 2.80396 15.0971 2.48673 14.3058C2.0169 13.1209 2.12532 10.3094 2.12532 9C2.12532 7.69062 2.02091 4.87504 2.48673 3.69419C2.79994 2.90695 3.4063 2.30046 4.19738 1.98315C5.38199 1.51322 8.19292 1.62167 9.50201 1.62167C10.8111 1.62167 13.626 1.51724 14.8066 1.98315C15.5937 2.29644 16.2001 2.90293 16.5173 3.69419C16.9871 4.87906 16.8787 7.69062 16.8787 9C16.8787 10.3094 16.9871 13.125 16.5173 14.3058Z"
      fill="#132B58"
    />
  </svg>
)

interface Site {
  title: string
  subtitle: string
  instagramLink: string
}

export const Nav = () => {
  const site: Site = useStaticQuery(graphql`
    query SiteSettingsQuery {
      site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
        title
        subtitle
        instagramLink
      }
    }
  `).site

  return (
    <NavContainer>
      <NavWrapper>
        <NavHeader to="/">
          <Title>{site.title}</Title>
          <Subheading>{site.subtitle}</Subheading>
        </NavHeader>

        <NavOptions>
          <InternalLinks>
            {navOptions.map((option) => (
              <li key={option}>
                <Link
                  to={`/${option}`}
                  activeStyle={{
                    paddingBottom: "5px",
                    borderBottom: "2px solid #959fb1",
                    fontStyle: "italic",
                    fontWeight: "500",
                  }}
                  partiallyActive={true}
                >
                  {option}
                </Link>
              </li>
            ))}
          </InternalLinks>
          <InstaExtension>
            <VerticalLine />
            <Instagram
              title="Visit Christine's Instagram account"
              href={site.instagramLink}
              target="_blank"
              rel="noopener"
            >
              {instaLogo}
            </Instagram>
          </InstaExtension>
        </NavOptions>
      </NavWrapper>
    </NavContainer>
  )
}
