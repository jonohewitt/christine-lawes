import React from "react"
import PortableText from "./portableText"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

const Header = styled.h1`
  text-transform: uppercase;
  font-size: 24px;
  margin: 40px 0 10px 0;
`

const Title = styled.span`
  margin-top: 40px;
  font-weight: 500;
`

const Metadata = styled.div`
  line-height: 1.3;
`

const Dimensions = styled.h2`
  font-size: 14px;
  font-weight: 500;
`

const Materials = styled.h2`
  font-size: 14px;
`

const Divider = styled.hr`
  margin: 20px 0 30px 0;
`

const Description = styled.div`
  margin-bottom: 50px;
`

const DescriptionBody = styled.div`
  line-height: 1.3;
`
const Exhibitions = styled.div`
  margin: 30px 0;
  h3 {
    text-transform: uppercase;
    font-weight: 500;
    margin-bottom: 10px;
  }
  ul {
    list-style-type: disc;
    li {
      font-family: DM Sans, sans-serif;
      margin-left: 30px;
      line-height: 1.6;
      a {
        font-weight: 500;
        text-decoration: none;
        color: inherit;
        :hover {
          svg {
            transform: rotate(180deg) translateX(-5px);
          }
        }
        svg {
          transform: rotate(180deg);
          transition: transform 0.2s;
          margin-left: 10px;
          position: relative;
          top: -2px;
          left: -2px;
        }
      }
    }
  }
`
const Features = styled(Exhibitions)``

const dateToString = (date: string) => {
  const year = date.slice(2, 4)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const month = months[Number(date.slice(6, 7)) - 1]
  return `${month} '${year}`
}

const arrow = (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.32482 7.174V4.654H13.3408V2.94599H4.32482V0.425995L0.71282 3.8L4.32482 7.174Z"
      fill="currentColor"
    />
  </svg>
)

const ArtworkNavigators = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const Prev = styled(Link)`
  display: flex;
  align-items: center;
  column-gap: 15px;
  font-size: 14px;
  text-decoration: none;
  color: inherit;
  padding: 20px 20px 20px 0;
`

const Next = styled(Prev)`
  padding: 20px 0 20px 20px;
  svg {
    transform: rotate(180deg);
  }
`

export const PortfolioArtwork = ({
  title,
  _rawDescription,
  dateComplete,
  artworkDimensions,
  artworkImage,
  materialsUsed,
  features,
  exhibitions,
  nextSlug,
  prevSlug,
}) => {
  return (
    <main>
      <ArtworkNavigators>
        <Prev
          aria-label="Previous artwork"
          title="Previous artwork"
          to={`/portfolio/${prevSlug}/`}
        >
          {arrow} Previous
        </Prev>
        <Next
          aria-label="Next artwork"
          title="Next artwork"
          to={`/portfolio/${nextSlug}/`}
        >
          Next {arrow}
        </Next>
      </ArtworkNavigators>
      <GatsbyImage
        image={getImage(artworkImage.asset)}
        alt={artworkImage.alt}
        objectFit="contain"
        style={{
          maxHeight: "max(55vh, 350px)",
        }}
        aria-describedby="title screen-reader-description dimensions materials description"
      />

      <Header id="title">
        <Title>{title || "Untitled"}</Title>
        {dateComplete ? `, ${dateComplete.slice(0, 4)}` : null}
      </Header>

      {(artworkDimensions || materialsUsed) && (
        <Metadata>
          {artworkImage.description && (
            <p id="screen-reader-description" className="screen-reader-only">
              {artworkImage.description}
            </p>
          )}
          {artworkDimensions && (
            <Dimensions id="dimensions">{artworkDimensions}</Dimensions>
          )}
          {materialsUsed && (
            <Materials id="materials">{materialsUsed}</Materials>
          )}
          {_rawDescription && <Divider />}
        </Metadata>
      )}

      {(_rawDescription || exhibitions || features) && (
        <Description id="description">
          {_rawDescription && (
            <DescriptionBody>
              <PortableText blocks={_rawDescription} />
            </DescriptionBody>
          )}
          {exhibitions.length ? (
            <Exhibitions>
              <h3>Exhibited At</h3>
              <ul>
                {exhibitions.map(({ name, date, link, _key }) => {
                  const nameAndDate = `${name}${
                    date ? `, ${dateToString(date)}` : null
                  }`
                  return (
                    <li key={_key}>
                      {link ? (
                        <a href={link} target="_blank" rel="nooperner">
                          {nameAndDate}
                          {arrow}
                        </a>
                      ) : (
                        nameAndDate
                      )}
                    </li>
                  )
                })}
              </ul>
            </Exhibitions>
          ) : null}
          {features.length ? (
            <Features>
              <h3>Featured In</h3>
              <ul>
                {features.map(({ name, date, link, _key }) => {
                  const nameAndDate = `${name}${
                    date ? `, ${dateToString(date)}` : null
                  }`
                  return (
                    <li key={_key}>
                      {link ? (
                        <a href={link} target="_blank" rel="nooperner">
                          {nameAndDate}
                          {arrow}
                        </a>
                      ) : (
                        nameAndDate
                      )}
                    </li>
                  )
                })}
              </ul>
            </Features>
          ) : null}
        </Description>
      )}
    </main>
  )
}
