import hljs from 'highlight.js';
import { marked } from 'marked';
marked.setOptions({ gfm: true, breaks: true });
export function renderMarkdown(content: string) {
  marked.setOptions({ highlight(code, lang) { return lang && hljs.getLanguage(lang) ? hljs.highlight(code, { language: lang }).value : hljs.highlightAuto(code).value; } });
  return marked.parse(content) as string;
}
