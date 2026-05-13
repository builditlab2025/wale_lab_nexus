// components/admin/stories/RichTextEditor.tsx
import React, { useRef, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline as UnderlineIcon,
  Loader2,
} from "lucide-react";
import { fileUploadService } from "../../services/fileUploadService";
import { authService } from "../../services/authService";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  enableImageUpload?: boolean;
  enableLink?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your story here...",
  error,
  touched,
  disabled = false,
  enableImageUpload = false,
  enableLink = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Check if user is admin/editor for advanced features
  const isAdminOrEditor = authService.isAdmin();

  // Only enable advanced features for admin/editor users
  const canUseAdvancedFeatures = isAdminOrEditor && !disabled;
  const canUploadImages = canUseAdvancedFeatures && enableImageUpload;
  const canAddLinks = canUseAdvancedFeatures && enableLink;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: canUseAdvancedFeatures ? [1, 2, 3] : [1, 2],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-primary-600 hover:text-primary-700 underline",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: !canUploadImages, // Only allow base64 if user can't upload (fallback)
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-2",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: canUseAdvancedFeatures
          ? ["left", "center", "right"]
          : ["left"],
      }),
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !disabled,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-w-none focus:outline-none",
      },
    },
  });

  // Update content when value prop changes (for form reset/edit)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const addLink = () => {
    if (!editor || !canAddLinks) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Auto-add https:// if no protocol is specified
    let finalUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      finalUrl = "https://" + url;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: finalUrl })
      .run();
  };

  const removeLink = () => {
    if (!editor || !canAddLinks) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  };

  const addImage = () => {
    if (!canUploadImages) {
      // Fallback to URL prompt if image upload is disabled
      const url = window.prompt("Enter image URL:");
      if (url && editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
      return;
    }

    // Trigger file input for image upload
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file || !editor) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Use the file upload service to upload the image
      const uploadResult = await fileUploadService.uploadSingleFile(file);
      const imageUrl = uploadResult.url;

      // Insert the image into the editor
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      // Clear file input
      event.target.value = "";
    }
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    active = false,
    disabled: btnDisabled = false,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={btnDisabled || disabled}
      className={`p-2 rounded transition-colors ${
        active
          ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      } ${btnDisabled || disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-1">
      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      <div
        className={`border rounded-lg overflow-hidden 
            border-gray-300 bg-white
         ${error && touched ? "border-red-500 dark:border-red-400" : ""}`}
      >
        {/* Toolbar - Show different tools based on user role */}
        <div className="flex flex-wrap gap-1 p-2 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {/* Headings - Limited to H1/H2 for non-admin */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </ToolbarButton>

          {/* H3 only for admin/editor */}
          {canUseAdvancedFeatures && (
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor.isActive("heading", { level: 3 })}
              title="Heading 3"
            >
              <Heading3 size={18} />
            </ToolbarButton>
          )}

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Text formatting - Available to all */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>

          {/* Text alignment - Only for admin/editor */}
          {canUseAdvancedFeatures && (
            <>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                active={editor.isActive({ textAlign: "left" })}
                title="Align Left"
              >
                <AlignLeft size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                active={editor.isActive({ textAlign: "center" })}
                title="Align Center"
              >
                <AlignCenter size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                active={editor.isActive({ textAlign: "right" })}
                title="Align Right"
              >
                <AlignRight size={18} />
              </ToolbarButton>
            </>
          )}

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Lists - Available to all */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          {/* Block elements - Available to all */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Code size={18} />
          </ToolbarButton>

          {/* Links and Images - Only for admin/editor */}
          {canAddLinks && (
            <>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
              <ToolbarButton
                onClick={addLink}
                active={editor.isActive("link")}
                title="Add Link"
              >
                <LinkIcon size={18} />
              </ToolbarButton>
              {editor.isActive("link") && (
                <ToolbarButton onClick={removeLink} title="Remove Link">
                  <Unlink size={18} />
                </ToolbarButton>
              )}
            </>
          )}

          {canUploadImages && (
            <>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
              <ToolbarButton
                onClick={addImage}
                title="Insert Image"
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ImageIcon size={18} />
                )}
              </ToolbarButton>
            </>
          )}

          <div className="flex-1" />

          {/* Undo/Redo - Available to all */}
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo size={18} />
          </ToolbarButton>
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} className="p-4 min-h-[200px]" />
      </div>

      {error && touched && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      {/* Role indicator for non-admin users */}
      {!canUseAdvancedFeatures && !disabled && (
        <p className="text-xs text-gray-500 mt-1">
          Basic editor mode. Some formatting options are limited.
        </p>
      )}

      <style>{`
        .ProseMirror {
          outline: none;
          min-height: 200px;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        
        .dark .ProseMirror p.is-editor-empty:first-child::before {
          color: #6b7280;
        }
        
        .ProseMirror blockquote {
          border-left: 3px solid #e5e7eb;
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
        }
        
        .dark .ProseMirror blockquote {
          border-left-color: #374151;
        }
        
        .ProseMirror pre {
          background-color: #f3f4f6;
          padding: 0.75rem;
          border-radius: 0.375rem;
          overflow-x: auto;
        }
        
        .dark .ProseMirror pre {
          background-color: #1f2937;
        }
        
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
        
        .ProseMirror img.ProseMirror-selectednode {
          outline: 2px solid #018c01;
        }
        
        .ProseMirror a {
          color: #018c01;
          text-decoration: underline;
        }
        
        .ProseMirror a:hover {
          color: #016b01;
        }
        
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        
        .ProseMirror p {
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
