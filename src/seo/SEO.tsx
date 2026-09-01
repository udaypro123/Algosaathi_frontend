import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
}

const DEFAULT_DESCRIPTION =
  "AlgoSaathi helps learners master coding, DSA, system design, AI tools, interview preparation and career-ready software engineering skills.";

const DEFAULT_IMAGE =
  "https://algosaathi.com/og-image.svg";

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    const finalTitle = title
      ? `${title} | AlgoSaathi`
      : "AlgoSaathi | DSA, Coding & Software Engineering";

    const currentUrl =
      canonical ||
      `https://algosaathi.com${window.location.pathname}`;

    document.title = finalTitle;

    const setMeta = (
      selector: string,
      attribute: string,
      value: string
    ) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      element.setAttribute("content", value);
    };

    setMeta(
      "meta[name='description']",
      "name",
      description
    );

    setMeta(
      "meta[property='og:title']",
      "property",
      finalTitle
    );

    setMeta(
      "meta[property='og:description']",
      "property",
      description
    );

    setMeta(
      "meta[property='og:type']",
      "property",
      type
    );

    setMeta(
      "meta[property='og:url']",
      "property",
      currentUrl
    );

    setMeta(
      "meta[property='og:image']",
      "property",
      image
    );

    setMeta(
      "meta[name='twitter:card']",
      "name",
      "summary_large_image"
    );

    setMeta(
      "meta[name='twitter:title']",
      "name",
      finalTitle
    );

    setMeta(
      "meta[name='twitter:description']",
      "name",
      description
    );

    setMeta(
      "meta[name='twitter:image']",
      "name",
      image
    );

    let canonicalLink =
      document.head.querySelector(
        "link[rel='canonical']"
      ) as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = currentUrl;
  }, [title, description, canonical, image, type]);

  return null;
};

export default SEO;