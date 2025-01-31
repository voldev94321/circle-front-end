import React from "react";

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    // container: [
    //   ["bold", "italic", "underline"],
    //   [{"list" : "bullet"}],
    //   ["blockquote"],
    //   ["color", "background"],
    //   ["link", "image"],
    //   ["code-block"],
    //   // ['emoji'],
    // ],
    handlers: {
      undo: undoChange,
      redo: redoChange,
      // 'emoji': function() {}
    },
    // "emoji-toolbar": true,
    // "emoji-shortname": true
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  // "header",
  // "font",
  // "size",
  "bold",
  "italic",
  "underline",
  // "align",
  // "strike",
  "list",
  // "bullet",
  "blockquote",
  "color",
  // "background",
  "link",
  // "image",
  // "code-block",
  // "script",
  "indent",
];

// Quill Toolbar component
export const QuillToolbar = ( {showToolBar }) => {
  // const { Quill } = require("react-quill");
  // const Size = Quill.import("formats/size");
  // Size.whitelist = ["extra-small", "small", "medium", "large"];
  // Quill.register(Size, true);
  // // Add fonts to whitelist and register them
  // const Font = Quill.import("formats/font");
  // Font.whitelist = [
  //   "arial",
  //   "comic-sans",
  //   "courier-new",
  //   "georgia",
  //   "helvetica",
  //   "lucida",
  // ];
  // Quill.register(Font, true);

  return (
    <div id="toolbar" style={{ display: showToolBar ? "block" : "none"}}>
      {/* <span className="ql-formats">
        <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option>
          <option value="medium">Size 3</option>
          <option value="large">Size 4</option>
        </select>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span> */}
      <span className="ql-formats" style={{ display: "none" }}>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        {/* <button className="ql-strike" /> */}
      </span>
      <span className="ql-formats" style={{ display: "none" }}>
        {/* <button className="ql-list" value="ordered" /> */}
        <button className="ql-list" value="bullet" />
        {/* <button className="ql-indent" value="-1" /> */}
        {/* <button className="ql-indent" value="+1" /> */}
      </span>
      <span className="ql-formats" style={{ display: "none" }}>
        {/* <button className="ql-script" value="super" /> */}
        {/* <button className="ql-script" value="sub" /> */}
        <button className="ql-blockquote" />
        {/* <button className="ql-direction" /> */}
      </span>
      <span className="ql-formats">
        {/* <select className="ql-align" /> */}
        <select className="ql-color" />
        <button className="ql-link" />
        {/* <button className="ql-image" /> */}
      </span>
      <span className="ql-formats" style={{ display: "none" }}>
        {/* <button className="ql-formula" /> */}
        <button className="ql-code-block" />
        {/* <button className="ql-clean" /> */}
      </span>
    </div>
  );
};

export default QuillToolbar;