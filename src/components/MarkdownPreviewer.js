import { useState, useEffect, useCallback } from 'react';
import {marked} from 'marked';

function MarkdownPreviewer() {

    const defaultMarkdown = `# Heading 1
## Heading 2

[Link to Google](https://www.google.com/)

Inline code: \`const x = 10;\`

\`\`\`javascript
// Code block
function greet() {
  return "Hello!";
}
\`\`\`

- List item 1
- List item 2
- List item 3

> Blockquote: This is a blockquote.

![Image Alt Text](https://via.placeholder.com/150)

**Bolded Text**`;
    

    const [markdown, setMarkdown] = useState(defaultMarkdown);

    const renderMarkdown = useCallback(() => {
    const previewElement = document.getElementById('preview');
        if (previewElement) {
            previewElement.innerHTML = marked(markdown, { breaks: true, gfm: true });
        }
    }, [markdown]);

    useEffect(() => {
        renderMarkdown();
    }, [renderMarkdown]);

    const handleInputChange = useCallback((e) => {
    const newMarkdown = e.target.value;
        setMarkdown(newMarkdown);
        renderMarkdown();
    }, [setMarkdown, renderMarkdown]);
  
    return (
        <div className="markdown-previewer d-flex gap-3 p-5" style={{minHeight: "100vh", maxHeight: "100vh"}}>
            <div className="input-area" style={{border: "2px solid gray"}}>
                <h2 style={{backgroundColor: "gray", color: "white", paddingLeft: "20px"}}>Editor</h2>
                <textarea
                    value={markdown}
                    onChange={handleInputChange}
                    placeholder="Enter your Markdown text here..."
                    id="editor"
                    style={{ width: "500px", height: "80%", border: "none", padding: "20px"}}
                />
            </div>
            <div className="preview-area" 
                style={{width: "100%", minHeight: "100%", border: "2px solid gray"}}
                >
                <h2 style={{backgroundColor: "gray", color: "white", paddingLeft: "20px"}}>Previewer</h2>
                <div id="preview" style={{width: "100%", height: "80%", padding: "20px", overflow: "auto"}}></div>
            </div>
        </div>
    );
}

export default MarkdownPreviewer;
