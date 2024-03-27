import React from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "./style.css";
import {
  addImgWHAttribute,
  extractImgInfo,
  removeHtmlTags,
} from "@/utils/html";
// import ToolbarEmoji from "./ToolbarEmoji";
// const DynamicToolbarEmoji = dynamic(() => import("./ToolbarEmoji"), {ssr: false});
// const DynamicEmojiBlot = dynamic(() => import("./EmojiBlot"), {ssr: false});

// import EmojiBlot from "./EmojiBlot";
// import quillEmoji from "react-quill-emoji";

const characterLimit = 500;
export const ReactQuillEditor = ({ content, setContent }) => {
  const [beforeChange, setBeforeChange] = React.useState("");
  const containerRef = React.useRef();

  const handleChange = (value) => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = value;
      const htmlContent = tempElement.firstChild;
      const imgTags = htmlContent.getElementsByTagName("img");

      for (let i = 0; i < imgTags.length; i++) {
        const prevTag = imgTags[i].previousSibling;
        if (!prevTag) {
          htmlContent.innerHTML = "<p><br/></p>" + htmlContent.innerHTML;
        }
      }

      const textValue = removeHtmlTags(value);

      if (textValue.length > characterLimit) {
        tempElement.innerHTML = beforeChange;
        const qlEditor =
          containerRef.current.getElementsByClassName("ql-editor")[0];
        qlEditor.innerHTML = beforeChange;
        return;
      }

      setBeforeChange(value);
      setContent(tempElement.innerHTML);
    } catch (e) {
      console.log(e);
    }
  };

  // React.useEffect(() => {
  //   const  { Quill } = require("react-quill");
  //   const quillEmoji = require("react-quill-emoji");
  //   let Parchment = Quill.import('parchment');
  //   try{

  //     Quill.register(
  //       {
  //         "formats/emoji": DynamicEmojiBlot,
  //         "modules/emoji-toolbar": DynamicToolbarEmoji,
  //         "modules/emoji-shortname": quillEmoji.ShortNameEmoji
  //       },
  //       true
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <div className="text-editor w-full flex" ref={containerRef}>
      <QuillEditor
        className="flex-grow mt-1 overflow-hidden"
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
      <EditorToolbar />
    </div>
  );
};

export default ReactQuillEditor;
