import "./style.scss";

import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { FloatingMenu as FM } from "@tiptap/extension-floating-menu";

export default () => {
  const [clickTable, setClickTable] = React.useState(false);

  const [top, setTop] = React.useState(0);

  const [left, setLeft] = React.useState(0);

  const topRef = React.useRef(0); // Ref to store the updated top value

  const updateTop = () => {
    if (editor && editor.isActive("table") && clickTable) {
      let { top, left } = editor.view.coordsAtPos(
        editor.view.state.selection.from
      );
      setClickTable(false);
      if (top > 60) {
        top = top - (top - 50);
      }
      console.log("before:", left);

      if (left > 100 && left < 300) {
        console.log("sao kh work");
        left = left + 20;
      } else if (left > 300 && left < 600) {
      } else if (left > 600) {
        left = left - left + 30;
      }

      setTop(top);
      setLeft(left);
      console.log("Top, left:", top, left);
    }
  };
  React.useEffect(() => {
    updateTop();
  }, [clickTable]);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Gapcursor,

      Table.configure({
        resizable: true,
      }),
      StarterKit,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
    <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th colspan="3">Description</th>
      </tr>
      <tr>
        <td>Cyndi Lauper</td>
        <td>singer</td>
        <td>songwriter</td>
        <td>actress</td>
      </tr>
    </tbody>
  </table>
  <p>hello</p>
  <table>
    <tbody>
      <tr>
        <th>Name</th>
        <th colspan="3">Description</th>
      </tr>
      <tr>
        <td>Cyndi Lauper</td>
        <td>singer</td>
        <td>songwriter</td>
        <td>actress</td>
      </tr>
    </tbody>
  </table>
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <FloatingMenu
        className="style-floating-menu"
        shouldShow={({ editor }) => {
          if (editor.isActive("table")) {
            setClickTable(true);
          }
          return editor.isActive("table");
        }}
        editor={editor}
        tippyOptions={{ duration: 100 }}
      >
        {top > 0 && left > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              border: "solid 2px",
              gap: "1px",
              marginTop: `${-top}px`,
              marginLeft: `${left}px`,
              // position: "absolute",
              // top: `${-top}px`,
              // left: `-150px`,
            }}
          >
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              addColumnBefore
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              addColumnAfter
            </button>
            <button onClick={() => editor.chain().focus().addRowBefore().run()}>
              addRowBefore
            </button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()}>
              addRowAfter
            </button>
            <button onClick={() => editor.chain().focus().deleteRow().run()}>
              deleteRow
            </button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()}>
              deleteColumn
            </button>
            <button onClick={() => editor.chain().focus().deleteTable().run()}>
              deleteTable
            </button>
            <button onClick={() => editor.chain().focus().mergeCells().run()}>
              mergeCells
            </button>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
            >
              insertTable
            </button>
          </div>
        )}
      </FloatingMenu>

      <EditorContent editor={editor} />
    </>
  );
};
