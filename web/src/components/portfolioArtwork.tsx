import React, { KeyboardEventHandler, useEffect } from "react"
import PortableText from "./portableText"
import { Link, navigate } from "gatsby"
import styled from "styled-components"
import SanityImage from "gatsby-plugin-sanity-image"

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
  const month = months[Number(date.slice(5, 7)) - 1]
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

const Image = styled(SanityImage)<{ $aspectRatio: number }>`
  display: block;
  margin: auto;
  width: calc(
    min(
      max(60vh, 350px) * ${(props) => props.$aspectRatio},
      800px,
      90vw - var(--scrollbar-width)
    )
  );
  height: calc(
    min(
        max(60vh, 350px) * ${(props) => props.$aspectRatio},
        800px,
        90vw - var(--scrollbar-width)
      ) / ${(props) => props.$aspectRatio}
  );
`

interface DescriptionObject {
  name: string
  _key: string
  date: string
  link: string
}

export interface PortfolioArtwork {
  title: string
  _rawDescription: string
  dateComplete: string
  artworkDimensions: string
  artworkImage: any
  materialsUsed: string
  features: DescriptionObject[]
  exhibitions: DescriptionObject[]
  nextSlug: string
  prevSlug: string
}

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
}: PortfolioArtwork) => {
  const aspectRatio: number = artworkImage.asset.metadata.dimensions.aspectRatio

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") navigate(`/portfolio/${prevSlug}/`)
    else if (e.key === "ArrowRight") navigate(`/portfolio/${nextSlug}/`)
  }
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
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

      <Image
        {...artworkImage}
        $aspectRatio={aspectRatio}
        width={800}
        aria-describedby="title screen-reader-description dimensions materials description"
      />

      <Header id="title">
        <Title>{title || "Untitled"}</Title>
        {!!dateComplete && `, ${dateComplete.slice(0, 4)}`}
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
          {exhibitions.length > 0 && (
            <Exhibitions>
              <h3>Exhibited At</h3>
              <ul>
                {exhibitions.map(({ name, date, link, _key }) => {
                  const nameAndDate = date
                    ? `${name}, ${dateToString(date)}`
                    : name
                  return (
                    <li key={_key}>
                      {link ? (
                        <a href={link} target="_blank" rel="noopener">
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
          )}
          {features.length > 0 && (
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
                        <a href={link} target="_blank" rel="noopener">
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
          )}
        </Description>
      )}
    </main>
  )
}
