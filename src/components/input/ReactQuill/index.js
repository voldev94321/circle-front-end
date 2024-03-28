/* eslint-disable react-hooks/exhaustive-deps */
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
export const ReactQuillEditor = ({ content, setContent, onPasteImage }) => {
  const [beforeChange, setBeforeChange] = React.useState("");
  const containerRef = React.useRef();

  const handleChange = (value) => {
    try {
      const tempElement = document.createElement("div");
      tempElement.innerHTML = value;

      const textValue = removeHtmlTags(value);

      const qlEditor =
        containerRef.current.getElementsByClassName("ql-editor")[0];
      if (textValue.length > characterLimit) {
        tempElement.innerHTML = beforeChange;
        qlEditor.innerHTML = beforeChange;
        return;
      }

      setBeforeChange(value);
      setContent(tempElement.innerHTML);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const items = (event.clipboardData || window.clipboardData).items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the clipboard item is an image
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();

        // Process the image file (e.g., upload, display)
        onPasteImage(file);
      }
    }
  };

  React.useEffect(() => {
    const container = containerRef.current;
    const qillEditor = container.getElementsByClassName("ql-editor")[0];
    qillEditor.addEventListener("paste", handlePaste);
  }, []);

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
