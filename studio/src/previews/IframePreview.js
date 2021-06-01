/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import React from "react"
import PropTypes from "prop-types"
import { format } from "date-fns"
import styles from "./IframePreview.module.css"

/**
 * Explore more examples of previews:
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */

const assemblePostUrl = ({ displayed, options, schemaType }) => {
  const { slug, publishedAt } = displayed
  const { previewURL } = options
  if (!slug || !previewURL) {
    console.warn("Missing slug or previewURL", { slug, previewURL })
    return ""
  }

  if (schemaType.name === "post") {
    const dateSegment = format(new Date(publishedAt), "yyyy/MM")
    const path = `${dateSegment}/${slug.current}`
    return `${previewURL}/blog/${path}`
  } else if (schemaType.name === "artwork") {
    return `${previewURL}/portfolio/${slug.current}`
  } else if (schemaType.name === "about") {
    return `${previewURL}/about`
  } else if (schemaType.name === "portfolio") {
    return `${previewURL}/portfolio`
  } else return `${previewURL}/${slug.current}`
}

const IframePreview = (props) => {
  const { schemaType, options } = props
  const { displayed } = props.document

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const url = assemblePostUrl({ displayed, options, schemaType })

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} frameBorder={"0"} />
      </div>
    </div>
  )
}

IframePreview.propTypes = {
  document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

IframePreview.defaultProps = {
  document: null,
}

export default IframePreview
