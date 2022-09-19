const typeTransform = (type: string) => {
  switch (type) {
    case "heading_1":
      return "h1";

    case "heading_2":
      return "h2";

    case "heading_3":
      return "h3";

    case "blank":
      return "div";

    case "paragraph":
      return "p";

    case "image":
      return "img";

    case "divider":
      return "hr";

    case "code":
      return "code";

    case "callout":
      return "section";

    case "bulleted_list_item":
      return "li";

    default:
      return "div";
  }
};
export default typeTransform;
