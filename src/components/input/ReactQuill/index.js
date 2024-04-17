/* eslint-disable react-hooks/exhaustive-deps */
"use client";
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
import { useSelector } from "react-redux";
// import ToolbarEmoji from "./ToolbarEmoji";
// const DynamicToolbarEmoji = dynamic(() => import("./ToolbarEmoji"), {ssr: false});
// const DynamicEmojiBlot = dynamic(() => import("./EmojiBlot"), {ssr: false});

// import EmojiBlot from "./EmojiBlot";
// import quillEmoji from "react-quill-emoji";

const characterLimit = 500;
let isTimer = false;
export const ReactQuillEditor = ({
  content,
  setContent,
  onPasteImage,
  showToolbar,
  onEnterPressed,
}) => {
  const [beforeChange, setBeforeChange] = React.useState("");
  const containerRef = React.useRef();
  const { allUsers } = useSelector((state) => state.app);

  const handleChange = (value) => {
    try {
      /// ------------------ Limit Check ---------------
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
    const items = (event.clipboardData || window.clipboardData).items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Check if the clipboard item is an image
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const file = item.getAsFile();

        // Process the image file (e.g., upload, display)
        onPasteImage(file);
        event.preventDefault();
      } else {
      }
    }
  };

  React.useEffect(() => {
    if(!containerRef || allUsers.length == 0){
      return;
    }
    if(isTimer){
      return;
    }
    
    setTimeout(async () => {
      isTimer = true;
      setInterval(() => {
        /// --------------- Tag username --------------------
        try {
          const container = containerRef.current;
          const qillEditor = container.getElementsByClassName("ql-editor")[0];
  
          if (qillEditor) {
            qillEditor.removeEventListener("paste", handlePaste);
            qillEditor.addEventListener("paste", handlePaste);
          }

          let value =
            containerRef.current.getElementsByClassName("ql-editor")[0]
              .innerHTML;
          const names = value.match(/@(\w+)\b/g);
          if (!names) {
            return;
          }
          let taggedUsernames = [];
          for (let i = 0; i < names.length; i++) {
            if (allUsers.findIndex((u) => names[i].slice(1) == u.username) != -1) {
              taggedUsernames.push(names[i]);
            }
          }
          if (taggedUsernames.length > 0) {
            for (let i = 0; i < taggedUsernames.length; i++) {
              const trim = taggedUsernames[i].replace(" ", "");
              const replaceString =
                "<span style='color: #8043FA;' contenteditable='false'><strong>@</strong>" +
                trim.slice(1) +
                "</span>";
              value = value.replaceAll(trim, replaceString);
            }
            // console.log(value);

            let startOffset = 0;
            let endOffset = 0;
            let range;
            if (window.getSelection) {
              startOffset = window
                .getSelection()
                .getRangeAt(0)
                .cloneRange().startOffset;
              endOffset = window
                .getSelection()
                .getRangeAt(0)
                .cloneRange().endOffset;
              range = window.getSelection().getRangeAt(0).cloneRange();
            }
            qillEditor.innerHTML = value;
            range.setStart(qillEditor, qillEditor.childNodes.length);
            range.setEnd(qillEditor, qillEditor.childNodes.length);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            // return;
          }
        } catch (e) {
          console.log(e);
        }
      }, 1000);
    }, 0);
  }, [containerRef, allUsers]);

  const onKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      onEnterPressed();
    }
  };

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
        onKeyDown={onKeyDown}
      />
      <EditorToolbar showToolbar={showToolbar} />
    </div>
  );
};

export default ReactQuillEditor;
