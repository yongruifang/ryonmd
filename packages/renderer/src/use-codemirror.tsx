import {useEffect, useState, useRef} from 'react';
import {EditorState} from '@codemirror/state';
import {EditorView,keymap, highlightActiveLine,lineNumbers, highlightActiveLineGutter} from '@codemirror/view';
import {defaultKeymap, history, historyKeymap}  from '@codemirror/commands';
import {indentOnInput,bracketMatching, HighlightStyle, syntaxHighlighting} from '@codemirror/language';
import { tags} from '@lezer/highlight';
import { javascript } from '@codemirror/lang-javascript';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark'
import type React from 'react'
export const transparentTheme = EditorView.theme({
    '&': {
      backgroundColor: 'transparent !important',
      height: '100%'
    }
  })
  const myHighLightStyle = HighlightStyle.define([
    {tag: tags.heading1, color: '#f07178', fontWeight: 'bold', fontSize: '1.6em'},
    {tag: tags.heading2, color: '#f07178', fontWeight: 'bold', fontSize: '1.4em'},
    {tag: tags.heading3, color: '#f07178', fontWeight: 'bold', fontSize: '1.2em'}
  ]);
interface Props{
    initialDoc: string,
    onChange?: (state: EditorState)=>void
  }
  
  const useCodeMirror = < T extends Element>(
  props: Props
  ): [React.MutableRefObject<T | null> , EditorView?]=>{
    const refContainer = useRef<T>(null)
    const [editorView,setEditorView] = useState<EditorView>()
    const { onChange } = props
  
    useEffect(()=>{
      if(!refContainer.current) return
      const startState = EditorState.create({
       doc: props.initialDoc,
       extensions: [
          keymap.of(Array.prototype.concat(defaultKeymap , historyKeymap)),
          lineNumbers(),
          highlightActiveLineGutter(),
          history(),
          bracketMatching(),
          syntaxHighlighting(myHighLightStyle),
          indentOnInput(),
          highlightActiveLine(),
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
            addKeymap: true
          }),
          oneDark,
          transparentTheme,
          javascript(),
          EditorView.lineWrapping,
          EditorView.updateListener.of(update=>{
            if(update.changes){
              onChange && onChange(update.state)
            }
          })
       ]
      })
      const view = new EditorView({
        state: startState,
        parent: refContainer.current
      })
      setEditorView(view)
    },[refContainer])
    return [refContainer,editorView]
  }
  export default useCodeMirror
  