import { Injectable } from '@angular/core'
import { ScriptStore } from './script-store'

// defered script loader implementation
// https://stackoverflow.com/questions/34489916/how-to-load-external-scripts-dynamically-in-angular

declare var document: any;
@Injectable()
export class ScriptLoader {
  private scripts: any = {}

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        src: script.src,
        name: script.name
      }
    })
  }

  public load(scripts: string[], node: string) {
    scripts.forEach(async(script) => {
      await this.loadScript(script, node);
    })
  }

  private loadScript(name: string, node: string) {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = this.scripts[name].src
      if (script.readyState) {
        script.onreadystatechange = () => {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null
          }
        }
    }
    // when no node is specified, append it to the body tag
    var nd = (node == "") || (node == undefined) ? "body" : node;
    document.getElementsByTagName(nd)[0].appendChild(script)
  }
}


@Injectable()
export class StyleLoader {
  private styles: any = {}

  constructor() {
    //StyleStore.forEach((style: any) => {
    //  this.styles[style.name] = {
    //    href: style.href,
    //    name: style.name
    //  }
    //})
  }

  public load(styles: string[], node: string) {
    styles.forEach(async (style) => {
      await this.loadStyle(style, node);
    })
  }

  private loadStyle(name: string, node: string) {
    let style = document.createElement('link')
    style.type = 'text/css'
    style.rel= 'stylesheet'
    style.href = this.styles[name].href
    if (style.readyState) {
      style.onreadystatechange = () => {
        if (style.readyState === "loaded" || style.readyState === "complete") {
          style.onreadystatechange = null
        }
      }
    }
    // when no node is specified, append it to the body tag
    var nd = (node == "") || (node == undefined) ? "head" : node;
    document.getElementsByTagName(nd)[0].prepend(style)
  }
}
