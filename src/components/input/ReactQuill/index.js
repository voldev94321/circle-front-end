import React from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import dynamic from "next/dynamic";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import "./style.css";

export const ReactQuillEditor = () => {
    const [state, setState] = React.useState({ value: null });
    const handleChange = value => {
      setState({ value });
    };
    return (
      <div className="text-editor">
        <EditorToolbar />
        <QuillEditor
          theme="snow"
          value={state.value}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </div>
    );
  };
  
  export default ReactQuillEditor;