import React from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "./style.css";
import { addImgWHAttribute, extractImgInfo } from "@/utils/html";
// import ToolbarEmoji from "./ToolbarEmoji";
// const DynamicToolbarEmoji = dynamic(() => import("./ToolbarEmoji"), {ssr: false});
// const DynamicEmojiBlot = dynamic(() => import("./EmojiBlot"), {ssr: false});

// import EmojiBlot from "./EmojiBlot";
// import quillEmoji from "react-quill-emoji";

export const ReactQuillEditor = ({ content, setContent }) => {

  const handleChange = (value) => {
    setContent(value);
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
    <div className="text-editor w-full">
      <EditorToolbar/>
      <QuillEditor
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default ReactQuillEditor;
