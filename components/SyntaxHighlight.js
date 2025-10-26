export default function SyntaxHighlight({ code }) {
  const highlightPython = (code) => {
    let highlighted = code
      // Strings first
      .replace(/"([^"]+)"/g, '"<span style="color: #f1fa8c">$1</span>"')
      // Keywords
      .replace(/\b(class|def|return)\b/g, '<span style="color: #ff79c6">$1</span>')
      // self keyword
      .replace(/\bself\b/g, '<span style="color: #bd93f9">$1</span>')
      // Function names (before parenthesis)
      .replace(/\b(__init__|build)\b/g, '<span style="color: #8be9fd">$1</span>')
      // Class names (after class keyword)
      .replace(/(class\s+<span[^>]+>class<\/span>\s+)(\w+)/g, '$1<span style="color: #50fa7b">$2</span>')
    
    return highlighted
  }

  return (
    <pre 
      className="snippet"
      dangerouslySetInnerHTML={{ __html: highlightPython(code) }}
    />
  )
}
