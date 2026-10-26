var e="https://github.com/hondzik/grohe-blue-features";function t(e,t,o,i){var r,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(n<3?r(s):n>3?r(t,o,s):r(t,o))||s);return n>3&&s&&Object.defineProperty(t,o,s),s}"function"==typeof SuppressedError&&SuppressedError;const o=globalThis,i=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;let s=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new s(o,e,r)},l=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,r))(t)})(e):e,{is:c,defineProperty:d,getOwnPropertyDescriptor:u,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:f}=Object,v=globalThis,b=v.trustedTypes,m=b?b.emptyScript:"",g=v.reactiveElementPolyfillSupport,_=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},y=(e,t)=>!c(e,t),k={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=k){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&d(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:r}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);r?.call(this,t),this.requestUpdate(e,n,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??k}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(i)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),r=o.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const r=(void 0!==o.converter?.toAttribute?o.converter:$).toAttribute(t,o.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=i;const n=r.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,o,i=!1,r){if(void 0!==e){const n=this.constructor;if(!1===i&&(r=this[e]),o??=n.getPropertyOptions(e),!((o.hasChanged??y)(r,t)||o.useDefault&&o.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:r},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==r||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[_("elementProperties")]=new Map,z[_("finalized")]=new Map,g?.({ReactiveElement:z}),(v.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,C=e=>e,A=w.trustedTypes,x=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,O="$lit$",j=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+j,E=`<${S}>`,P=document,R=()=>P.createComment(""),M=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,L="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,F=/>/g,T=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,G=/"/g,D=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...o)=>({_$litType$:e,strings:t,values:o}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),B=new WeakMap,K=P.createTreeWalker(P,129);function Z(e,t){if(!U(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const Q=(e,t)=>{const o=e.length-1,i=[];let r,n=2===t?"<svg>":3===t?"<math>":"",s=N;for(let t=0;t<o;t++){const o=e[t];let a,l,c=-1,d=0;for(;d<o.length&&(s.lastIndex=d,l=s.exec(o),null!==l);)d=s.lastIndex,s===N?"!--"===l[1]?s=I:void 0!==l[1]?s=F:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),s=T):void 0!==l[3]&&(s=T):s===T?">"===l[0]?(s=r??N,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?T:'"'===l[3]?G:H):s===G||s===H?s=T:s===I||s===F?s=N:(s=T,r=void 0);const u=s===T&&e[t+1].startsWith("/>")?" ":"";n+=s===N?o+E:c>=0?(i.push(a),o.slice(0,c)+O+o.slice(c)+j+u):o+j+(-2===c?t:u)}return[Z(e,n+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class J{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let r=0,n=0;const s=e.length-1,a=this.parts,[l,c]=Q(e,t);if(this.el=J.createElement(l,o),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=K.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(O)){const t=c[n++],o=i.getAttribute(e).split(j),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:s[2],strings:o,ctor:"."===s[1]?oe:"?"===s[1]?ie:"@"===s[1]?re:te}),i.removeAttribute(e)}else e.startsWith(j)&&(a.push({type:6,index:r}),i.removeAttribute(e));if(D.test(i.tagName)){const e=i.textContent.split(j),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],R()),K.nextNode(),a.push({type:2,index:++r});i.append(e[t],R())}}}else if(8===i.nodeType)if(i.data===S)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(j,e+1));)a.push({type:7,index:r}),e+=j.length-1}r++}}static createElement(e,t){const o=P.createElement("template");return o.innerHTML=e,o}}function X(e,t,o=e,i){if(t===W)return t;let r=void 0!==i?o._$Co?.[i]:o._$Cl;const n=M(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=r:o._$Cl=r),void 0!==r&&(t=X(e,r._$AS(e,t.values),r,i)),t}class Y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??P).importNode(t,!0);K.currentNode=i;let r=K.nextNode(),n=0,s=0,a=o[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new ne(r,this,e)),this._$AV.push(t),a=o[++s]}n!==a?.index&&(r=K.nextNode(),n++)}return K.currentNode=P,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),M(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>U(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=J.createElement(Z(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Y(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=B.get(e.strings);return void 0===t&&B.set(e.strings,t=new J(e)),t}k(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const r of e)i===t.length?t.push(o=new ee(this.O(R()),this.O(R()),this,this.options)):o=t[i],o._$AI(r),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(e,t=this,o,i){const r=this.strings;let n=!1;if(void 0===r)e=X(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==W,n&&(this._$AH=e);else{const i=e;let s,a;for(e=r[0],s=0;s<r.length-1;s++)a=X(this,i[o+s],t,s),a===W&&(a=this._$AH[s]),n||=!M(a)||a!==this._$AH[s],a===q?e=q:e!==q&&(e+=(a??"")+r[s+1]),this._$AH[s]=a}n&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oe extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ie extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends te{constructor(e,t,o,i,r){super(e,t,o,i,r),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??q)===W)return;const o=this._$AH,i=e===q&&o!==q||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const se=w.litHtmlPolyfillSupport;se?.(J,ee),(w.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;class le extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=o?.renderBefore??null;i._$litPart$=r=new ee(t.insertBefore(R(),e),e,void 0,o??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}le._$litElement$=!0,le.finalized=!0,ae.litElementHydrateSupport?.({LitElement:le});const ce=ae.litElementPolyfillSupport;ce?.({LitElement:le}),(ae.litElementVersions??=[]).push("4.2.2");const de=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:y},he=(e=ue,t,o)=>{const{kind:i,metadata:r}=o;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const r=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,r,e,!0,o)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const r=this[i];t.call(this,o),this.requestUpdate(i,r,e,!0,o)}}throw Error("Unsupported decorator location: "+i)};function pe(e){return(t,o)=>"object"==typeof o?he(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}const fe=a`
  .combined {
    display: grid;
    grid-template-columns: auto 1fr 1fr auto;
    align-items: center;
    column-gap: 8px;
    height: var(--feature-height, 42px);
    padding: 0 4px;
    box-sizing: border-box;
  }

  /* items only group the cells and carry the bar color */
  .item {
    display: contents;
    --level-color: var(--primary-color);
  }

  .item.unavailable .level {
    opacity: 0.4;
  }

  .edge {
    display: flex;
    align-items: center;
    font-size: var(--ha-font-size-s);
    letter-spacing: 0.4px;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .edge.first {
    justify-content: flex-start;
  }

  .edge.second {
    justify-content: flex-end;
  }

  ha-icon {
    --mdc-icon-size: 20px;
    color: var(--level-color);
  }

  .bar {
    min-width: 0;
    border: 1px solid color-mix(in srgb, var(--level-color) 80%, transparent);
    border-radius: 5px;
    height: 8px;
    background-color: color-mix(in srgb, var(--level-color) 30%, transparent);
    overflow: hidden;
  }

  /* extra space between the two bars */
  .item + .item .bar:first-child {
    margin-left: 8px;
  }

  /* the right bar is anchored to the right edge, so it shrinks from the middle of the card */
  .item + .item .level {
    margin-left: auto;
  }

  .level {
    height: 100%;
    background-color: color-mix(in srgb, var(--level-color) 70%, transparent);
    transition: width 0.4s ease;
  }
  /* clickable bars: pointer, hover highlight, keyboard focus, no text selection / callout on long-press */
  .interactive {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
  }

  .interactive:hover .bar {
    filter: brightness(1.2);
  }

  .bar:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;var ve={unit:{label:"Zobrazená jednotka",description:"Jednotka hodnoty vedle ukazatele. Ukazatel vždy odpovídá procentům.",percent:"Procenta (%)",liter:"Litry (L)"},color:{label:"Barva ukazatele",description:"Barva ukazatele průběhu."},value_position:{label:"Umístění hodnoty",description:"Kde se hodnota zobrazí vzhledem k ukazateli.",left:"Vlevo",right:"Vpravo"},show_icon:{label:"Zobrazit ikonu",description:"Zobrazí ikonu před ukazatelem."},icon:{label:"Ikona"},sources:{title:"Zdroje",mode_auto:"Senzory automaticky rozpoznány ze zařízení Grohe",mode_none:"Nebyly rozpoznány žádné senzory — přiřaďte je ručně",auto:"Auto",manual:"Ručně",reset:"Obnovit rozpoznaný senzor",percent_sensor:"Senzor procent",liters_sensor:"Senzor litrů"},edge_content:{label:"Obsah na kraji",description:"Co se zobrazí na kraji vedle každého ukazatele.",icon:"Ikona"},sections:{co2:"CO₂",filter:"Filtr"},order:{label:"Pořadí",description:"Který ukazatel je první (vlevo)."},tap_action:{label:"Akce při klepnutí",description:"Co se stane po klepnutí na ukazatel. Více informací otevře senzor ve zvolené jednotce."},hold_reset:{label:"Reset podržením",description:"Dlouhým podržením ukazatele vynulujete počítadlo po výměně CO₂ bombičky nebo filtru. Vyžaduje potvrzení."}},be={unsupported:"Nepodporováno",name:{co2:"CO₂",filter:"Filtr"},reset_confirm:{co2:"Vynulovat počítadlo CO₂? Udělejte to jen po výměně CO₂ bombičky. Nová hodnota se zobrazí až po nějaké době, jakmile zařízení odešle do cloudu Grohe další měření.",filter:"Vynulovat počítadlo filtru? Udělejte to jen po výměně filtru. Nová hodnota se zobrazí až po nějaké době, jakmile zařízení odešle do cloudu Grohe další měření."}},me={editor:ve,feature:be},ge={unit:{label:"Angezeigte Einheit",description:"Einheit des Wertes neben der Anzeige. Die Anzeige folgt immer dem Prozentwert.",percent:"Prozent (%)",liter:"Liter (L)"},color:{label:"Farbe der Anzeige",description:"Farbe des Fortschrittsbalkens."},value_position:{label:"Position des Wertes",description:"Wo der Wert relativ zur Anzeige dargestellt wird.",left:"Links",right:"Rechts"},show_icon:{label:"Symbol anzeigen",description:"Zeigt ein Symbol vor der Anzeige."},icon:{label:"Symbol"},sources:{title:"Quellen",mode_auto:"Sensoren automatisch vom Grohe-Gerät erkannt",mode_none:"Keine Sensoren erkannt — manuell zuweisen",auto:"Auto",manual:"Manuell",reset:"Auf erkannten Sensor zurücksetzen",percent_sensor:"Prozent-Sensor",liters_sensor:"Liter-Sensor"},edge_content:{label:"Inhalt am Rand",description:"Was am Rand neben jeder Anzeige dargestellt wird.",icon:"Symbol"},sections:{co2:"CO₂",filter:"Filter"},order:{label:"Reihenfolge",description:"Welche Anzeige zuerst (links) steht."},tap_action:{label:"Tipp-Aktion",description:"Was beim Tippen auf die Anzeige passiert. Weitere Infos öffnet den Sensor in der gewählten Einheit."},hold_reset:{label:"Zurücksetzen durch Halten",description:"Langes Drücken der Anzeige setzt den Zähler nach dem Wechsel der CO₂-Flasche oder des Filters zurück. Mit Bestätigung."}},_e={unsupported:"Nicht unterstützte Funktion",name:{co2:"CO₂",filter:"Filter"},reset_confirm:{co2:"CO₂-Zähler zurücksetzen? Nur nach dem Wechsel der CO₂-Flasche. Der neue Wert erscheint erst nach einiger Zeit, sobald das Gerät seine nächste Messung an die Grohe-Cloud meldet.",filter:"Filterzähler zurücksetzen? Nur nach dem Filterwechsel. Der neue Wert erscheint erst nach einiger Zeit, sobald das Gerät seine nächste Messung an die Grohe-Cloud meldet."}},$e={editor:ge,feature:_e},ye={unit:{label:"Displayed unit",description:"Unit of the value next to the bar. The bar always follows the percentage.",percent:"Percent (%)",liter:"Liters (L)"},color:{label:"Bar color",description:"Color of the progress bar."},value_position:{label:"Value position",description:"Where the value is shown relative to the bar.",left:"Left",right:"Right"},show_icon:{label:"Show icon",description:"Show an icon in front of the bar."},icon:{label:"Icon"},sources:{title:"Sources",mode_auto:"Sensors detected automatically from the Grohe device",mode_none:"No sensors detected — assign them manually",auto:"Auto",manual:"Manual",reset:"Reset to detected sensor",percent_sensor:"Percentage sensor",liters_sensor:"Liters sensor"},edge_content:{label:"Edge content",description:"What is shown at the edge next to each bar.",icon:"Icon"},sections:{co2:"CO₂",filter:"Filter"},order:{label:"Order",description:"Which bar comes first (left)."},tap_action:{label:"Tap action",description:"What happens when you tap the bar. More info opens the sensor in the selected unit."},hold_reset:{label:"Reset on hold",description:"Long-press the bar to reset the counter after replacing the CO₂ cylinder or the filter. Asks for confirmation."}},ke={unsupported:"Unsupported feature",name:{co2:"CO₂",filter:"Filter"},reset_confirm:{co2:"Reset the CO₂ counter? Do this only after replacing the CO₂ cylinder. The new value appears only after a while, once the device reports its next measurement to the Grohe cloud.",filter:"Reset the filter counter? Do this only after replacing the filter. The new value appears only after a while, once the device reports its next measurement to the Grohe cloud."}},ze={editor:ye,feature:ke},we={unit:{label:"Unidad mostrada",description:"Unidad del valor junto a la barra. La barra siempre sigue el porcentaje.",percent:"Porcentaje (%)",liter:"Litros (L)"},color:{label:"Color de la barra",description:"Color de la barra de progreso."},value_position:{label:"Posición del valor",description:"Dónde se muestra el valor respecto a la barra.",left:"Izquierda",right:"Derecha"},show_icon:{label:"Mostrar icono",description:"Muestra un icono delante de la barra."},icon:{label:"Icono"},sources:{title:"Fuentes",mode_auto:"Sensores detectados automáticamente desde el dispositivo Grohe",mode_none:"No se detectaron sensores — asígnelos manualmente",auto:"Auto",manual:"Manual",reset:"Restablecer al sensor detectado",percent_sensor:"Sensor de porcentaje",liters_sensor:"Sensor de litros"},edge_content:{label:"Contenido del borde",description:"Qué se muestra en el borde junto a cada barra.",icon:"Icono"},sections:{co2:"CO₂",filter:"Filtro"},order:{label:"Orden",description:"Qué barra va primero (a la izquierda)."},tap_action:{label:"Acción al tocar",description:"Qué ocurre al tocar la barra. Más información abre el sensor en la unidad seleccionada."},hold_reset:{label:"Restablecer al mantener",description:"Mantén pulsada la barra para restablecer el contador tras cambiar la bombona de CO₂ o el filtro. Pide confirmación."}},Ce={unsupported:"Función no compatible",name:{co2:"CO₂",filter:"Filtro"},reset_confirm:{co2:"¿Restablecer el contador de CO₂? Hazlo solo tras cambiar la bombona de CO₂. El nuevo valor aparecerá pasado un tiempo, cuando el dispositivo envíe su siguiente medición a la nube de Grohe.",filter:"¿Restablecer el contador del filtro? Hazlo solo tras cambiar el filtro. El nuevo valor aparecerá pasado un tiempo, cuando el dispositivo envíe su siguiente medición a la nube de Grohe."}},Ae={editor:we,feature:Ce},xe={unit:{label:"Unité affichée",description:"Unité de la valeur à côté de la barre. La barre suit toujours le pourcentage.",percent:"Pourcentage (%)",liter:"Litres (L)"},color:{label:"Couleur de la barre",description:"Couleur de la barre de progression."},value_position:{label:"Position de la valeur",description:"Où la valeur est affichée par rapport à la barre.",left:"Gauche",right:"Droite"},show_icon:{label:"Afficher l’icône",description:"Affiche une icône devant la barre."},icon:{label:"Icône"},sources:{title:"Sources",mode_auto:"Capteurs détectés automatiquement depuis l’appareil Grohe",mode_none:"Aucun capteur détecté — assignez-les manuellement",auto:"Auto",manual:"Manuel",reset:"Revenir au capteur détecté",percent_sensor:"Capteur de pourcentage",liters_sensor:"Capteur de litres"},edge_content:{label:"Contenu du bord",description:"Ce qui s’affiche au bord à côté de chaque barre.",icon:"Icône"},sections:{co2:"CO₂",filter:"Filtre"},order:{label:"Ordre",description:"Quelle barre vient en premier (à gauche)."},tap_action:{label:"Action au toucher",description:"Ce qui se passe lorsque vous touchez la barre. Plus d’infos ouvre le capteur dans l’unité choisie."},hold_reset:{label:"Réinitialiser par appui long",description:"Un appui long sur la barre réinitialise le compteur après le remplacement de la bouteille de CO₂ ou du filtre. Demande une confirmation."}},Oe={unsupported:"Fonctionnalité non prise en charge",name:{co2:"CO₂",filter:"Filtre"},reset_confirm:{co2:"Réinitialiser le compteur de CO₂ ? Uniquement après le remplacement de la bouteille de CO₂. La nouvelle valeur n’apparaît qu’après un certain temps, lorsque l’appareil envoie sa prochaine mesure au cloud Grohe.",filter:"Réinitialiser le compteur du filtre ? Uniquement après le remplacement du filtre. La nouvelle valeur n’apparaît qu’après un certain temps, lorsque l’appareil envoie sa prochaine mesure au cloud Grohe."}},je={editor:xe,feature:Oe},Se={unit:{label:"Megjelenített mértékegység",description:"A sáv melletti érték mértékegysége. A sáv mindig a százalékot követi.",percent:"Százalék (%)",liter:"Liter (L)"},color:{label:"A sáv színe",description:"Az előrehaladási sáv színe."},value_position:{label:"Az érték helye",description:"Hol jelenjen meg az érték a sávhoz képest.",left:"Balra",right:"Jobbra"},show_icon:{label:"Ikon megjelenítése",description:"Ikon megjelenítése a sáv előtt."},icon:{label:"Ikon"},sources:{title:"Források",mode_auto:"Az érzékelők automatikusan felismerve a Grohe eszközről",mode_none:"Nem található érzékelő — rendelje hozzá kézzel",auto:"Auto",manual:"Kézi",reset:"Visszaállítás a felismert érzékelőre",percent_sensor:"Százalék érzékelő",liters_sensor:"Liter érzékelő"},edge_content:{label:"Szélső tartalom",description:"Mi jelenjen meg a sávok melletti szélen.",icon:"Ikon"},sections:{co2:"CO₂",filter:"Szűrő"},order:{label:"Sorrend",description:"Melyik sáv legyen az első (bal oldalon)."},tap_action:{label:"Koppintási művelet",description:"Mi történjen a sávra koppintáskor. A további információ a kiválasztott mértékegységű érzékelőt nyitja meg."},hold_reset:{label:"Visszaállítás nyomva tartással",description:"A sáv hosszú megnyomásával nullázhatja a számlálót a CO₂-palack vagy a szűrő cseréje után. Megerősítést kér."}},Ee={unsupported:"Nem támogatott funkció",name:{co2:"CO₂",filter:"Szűrő"},reset_confirm:{co2:"Nullázza a CO₂-számlálót? Csak a CO₂-palack cseréje után. Az új érték csak egy idő után jelenik meg, amikor az eszköz elküldi a következő mérést a Grohe felhőbe.",filter:"Nullázza a szűrőszámlálót? Csak a szűrő cseréje után. Az új érték csak egy idő után jelenik meg, amikor az eszköz elküldi a következő mérést a Grohe felhőbe."}},Pe={editor:Se,feature:Ee},Re={unit:{label:"Unità visualizzata",description:"Unità del valore accanto alla barra. La barra segue sempre la percentuale.",percent:"Percentuale (%)",liter:"Litri (L)"},color:{label:"Colore della barra",description:"Colore della barra di avanzamento."},value_position:{label:"Posizione del valore",description:"Dove viene mostrato il valore rispetto alla barra.",left:"Sinistra",right:"Destra"},show_icon:{label:"Mostra icona",description:"Mostra un’icona davanti alla barra."},icon:{label:"Icona"},sources:{title:"Fonti",mode_auto:"Sensori rilevati automaticamente dal dispositivo Grohe",mode_none:"Nessun sensore rilevato — assegnali manualmente",auto:"Auto",manual:"Manuale",reset:"Ripristina il sensore rilevato",percent_sensor:"Sensore percentuale",liters_sensor:"Sensore litri"},edge_content:{label:"Contenuto del bordo",description:"Cosa viene mostrato sul bordo accanto a ogni barra.",icon:"Icona"},sections:{co2:"CO₂",filter:"Filtro"},order:{label:"Ordine",description:"Quale barra viene per prima (a sinistra)."},tap_action:{label:"Azione al tocco",description:"Cosa succede toccando la barra. Più informazioni apre il sensore nell’unità selezionata."},hold_reset:{label:"Azzera tenendo premuto",description:"Tieni premuta la barra per azzerare il contatore dopo aver sostituito la bombola di CO₂ o il filtro. Richiede conferma."}},Me={unsupported:"Funzione non supportata",name:{co2:"CO₂",filter:"Filtro"},reset_confirm:{co2:"Azzerare il contatore della CO₂? Solo dopo aver sostituito la bombola di CO₂. Il nuovo valore compare solo dopo un po’, quando il dispositivo invia la misurazione successiva al cloud Grohe.",filter:"Azzerare il contatore del filtro? Solo dopo aver sostituito il filtro. Il nuovo valore compare solo dopo un po’, quando il dispositivo invia la misurazione successiva al cloud Grohe."}},Ue={editor:Re,feature:Me},Le={unit:{label:"Weergegeven eenheid",description:"Eenheid van de waarde naast de balk. De balk volgt altijd het percentage.",percent:"Procent (%)",liter:"Liter (L)"},color:{label:"Kleur van de balk",description:"Kleur van de voortgangsbalk."},value_position:{label:"Positie van de waarde",description:"Waar de waarde ten opzichte van de balk wordt getoond.",left:"Links",right:"Rechts"},show_icon:{label:"Pictogram tonen",description:"Toont een pictogram voor de balk."},icon:{label:"Pictogram"},sources:{title:"Bronnen",mode_auto:"Sensoren automatisch gedetecteerd op het Grohe-apparaat",mode_none:"Geen sensoren gedetecteerd — wijs ze handmatig toe",auto:"Auto",manual:"Handmatig",reset:"Terug naar gedetecteerde sensor",percent_sensor:"Percentagesensor",liters_sensor:"Litersensor"},edge_content:{label:"Inhoud aan de rand",description:"Wat aan de rand naast elke balk wordt getoond.",icon:"Pictogram"},sections:{co2:"CO₂",filter:"Filter"},order:{label:"Volgorde",description:"Welke balk eerst komt (links)."},tap_action:{label:"Tikactie",description:"Wat er gebeurt als je op de balk tikt. Meer info opent de sensor in de gekozen eenheid."},hold_reset:{label:"Resetten door vasthouden",description:"Houd de balk lang ingedrukt om de teller te resetten na het vervangen van de CO₂-cilinder of het filter. Vraagt om bevestiging."}},Ne={unsupported:"Niet-ondersteunde functie",name:{co2:"CO₂",filter:"Filter"},reset_confirm:{co2:"CO₂-teller resetten? Alleen na het vervangen van de CO₂-cilinder. De nieuwe waarde verschijnt pas na een tijdje, zodra het apparaat zijn volgende meting naar de Grohe-cloud stuurt.",filter:"Filterteller resetten? Alleen na het vervangen van het filter. De nieuwe waarde verschijnt pas na een tijdje, zodra het apparaat zijn volgende meting naar de Grohe-cloud stuurt."}},Ie={editor:Le,feature:Ne},Fe={unit:{label:"Vist enhet",description:"Enheten for verdien ved siden av linjen. Linjen følger alltid prosenten.",percent:"Prosent (%)",liter:"Liter (L)"},color:{label:"Farge på linjen",description:"Fargen på fremdriftslinjen."},value_position:{label:"Plassering av verdi",description:"Hvor verdien vises i forhold til linjen.",left:"Venstre",right:"Høyre"},show_icon:{label:"Vis ikon",description:"Viser et ikon foran linjen."},icon:{label:"Ikon"},sources:{title:"Kilder",mode_auto:"Sensorer oppdaget automatisk fra Grohe-enheten",mode_none:"Ingen sensorer oppdaget — tilordne dem manuelt",auto:"Auto",manual:"Manuell",reset:"Tilbakestill til oppdaget sensor",percent_sensor:"Prosentsensor",liters_sensor:"Litersensor"},edge_content:{label:"Innhold i kanten",description:"Hva som vises i kanten ved siden av hver linje.",icon:"Ikon"},sections:{co2:"CO₂",filter:"Filter"},order:{label:"Rekkefølge",description:"Hvilken linje som kommer først (til venstre)."},tap_action:{label:"Trykkhandling",description:"Hva som skjer når du trykker på linjen. Mer info åpner sensoren i valgt enhet."},hold_reset:{label:"Tilbakestill ved å holde",description:"Hold linjen inne for å nullstille telleren etter bytte av CO₂-patron eller filter. Ber om bekreftelse."}},Te={unsupported:"Funksjonen støttes ikke",name:{co2:"CO₂",filter:"Filter"},reset_confirm:{co2:"Nullstille CO₂-telleren? Bare etter bytte av CO₂-patronen. Den nye verdien vises først etter en stund, når enheten sender neste måling til Grohe-skyen.",filter:"Nullstille filtertelleren? Bare etter bytte av filteret. Den nye verdien vises først etter en stund, når enheten sender neste måling til Grohe-skyen."}},He={editor:Fe,feature:Te},Ge={unit:{label:"Wyświetlana jednostka",description:"Jednostka wartości obok paska. Pasek zawsze odpowiada procentom.",percent:"Procenty (%)",liter:"Litry (L)"},color:{label:"Kolor paska",description:"Kolor paska postępu."},value_position:{label:"Położenie wartości",description:"Gdzie wyświetlana jest wartość względem paska.",left:"Po lewej",right:"Po prawej"},show_icon:{label:"Pokaż ikonę",description:"Wyświetla ikonę przed paskiem."},icon:{label:"Ikona"},sources:{title:"Źródła",mode_auto:"Czujniki wykryte automatycznie z urządzenia Grohe",mode_none:"Nie wykryto czujników — przypisz je ręcznie",auto:"Auto",manual:"Ręcznie",reset:"Przywróć wykryty czujnik",percent_sensor:"Czujnik procentów",liters_sensor:"Czujnik litrów"},edge_content:{label:"Zawartość na brzegu",description:"Co jest wyświetlane na brzegu obok każdego paska.",icon:"Ikona"},sections:{co2:"CO₂",filter:"Filtr"},order:{label:"Kolejność",description:"Który pasek jest pierwszy (po lewej)."},tap_action:{label:"Akcja po dotknięciu",description:"Co się stanie po dotknięciu paska. Więcej informacji otwiera czujnik w wybranej jednostce."},hold_reset:{label:"Reset przytrzymaniem",description:"Przytrzymaj pasek, aby wyzerować licznik po wymianie butli CO₂ lub filtra. Wymaga potwierdzenia."}},De={unsupported:"Nieobsługiwana funkcja",name:{co2:"CO₂",filter:"Filtr"},reset_confirm:{co2:"Wyzerować licznik CO₂? Tylko po wymianie butli CO₂. Nowa wartość pojawi się dopiero po pewnym czasie, gdy urządzenie wyśle kolejny pomiar do chmury Grohe.",filter:"Wyzerować licznik filtra? Tylko po wymianie filtra. Nowa wartość pojawi się dopiero po pewnym czasie, gdy urządzenie wyśle kolejny pomiar do chmury Grohe."}},Ve={editor:Ge,feature:De},We={unit:{label:"Unidade apresentada",description:"Unidade do valor junto à barra. A barra segue sempre a percentagem.",percent:"Percentagem (%)",liter:"Litros (L)"},color:{label:"Cor da barra",description:"Cor da barra de progresso."},value_position:{label:"Posição do valor",description:"Onde o valor é apresentado em relação à barra.",left:"Esquerda",right:"Direita"},show_icon:{label:"Mostrar ícone",description:"Mostra um ícone antes da barra."},icon:{label:"Ícone"},sources:{title:"Fontes",mode_auto:"Sensores detetados automaticamente a partir do dispositivo Grohe",mode_none:"Nenhum sensor detetado — atribua-os manualmente",auto:"Auto",manual:"Manual",reset:"Repor para o sensor detetado",percent_sensor:"Sensor de percentagem",liters_sensor:"Sensor de litros"},edge_content:{label:"Conteúdo da margem",description:"O que é apresentado na margem junto a cada barra.",icon:"Ícone"},sections:{co2:"CO₂",filter:"Filtro"},order:{label:"Ordem",description:"Qual barra vem primeiro (à esquerda)."},tap_action:{label:"Ação ao tocar",description:"O que acontece ao tocar na barra. Mais informações abre o sensor na unidade selecionada."},hold_reset:{label:"Repor ao manter premido",description:"Mantenha a barra premida para repor o contador após substituir a garrafa de CO₂ ou o filtro. Pede confirmação."}},qe={unsupported:"Funcionalidade não suportada",name:{co2:"CO₂",filter:"Filtro"},reset_confirm:{co2:"Repor o contador de CO₂? Apenas após substituir a garrafa de CO₂. O novo valor só aparece passado algum tempo, quando o dispositivo enviar a medição seguinte para a nuvem Grohe.",filter:"Repor o contador do filtro? Apenas após substituir o filtro. O novo valor só aparece passado algum tempo, quando o dispositivo enviar a medição seguinte para a nuvem Grohe."}},Be={editor:We,feature:qe},Ke={unit:{label:"Zobrazená jednotka",description:"Jednotka hodnoty vedľa ukazovateľa. Ukazovateľ vždy zodpovedá percentám.",percent:"Percentá (%)",liter:"Litre (L)"},color:{label:"Farba ukazovateľa",description:"Farba ukazovateľa priebehu."},value_position:{label:"Umiestnenie hodnoty",description:"Kde sa hodnota zobrazí voči ukazovateľu.",left:"Vľavo",right:"Vpravo"},show_icon:{label:"Zobraziť ikonu",description:"Zobrazí ikonu pred ukazovateľom."},icon:{label:"Ikona"},sources:{title:"Zdroje",mode_auto:"Senzory automaticky rozpoznané zo zariadenia Grohe",mode_none:"Neboli rozpoznané žiadne senzory — priraďte ich ručne",auto:"Auto",manual:"Ručne",reset:"Obnoviť rozpoznaný senzor",percent_sensor:"Senzor percent",liters_sensor:"Senzor litrov"},edge_content:{label:"Obsah na kraji",description:"Čo sa zobrazí na kraji vedľa každého ukazovateľa.",icon:"Ikona"},sections:{co2:"CO₂",filter:"Filter"},order:{label:"Poradie",description:"Ktorý ukazovateľ je prvý (vľavo)."},tap_action:{label:"Akcia pri ťuknutí",description:"Čo sa stane po ťuknutí na ukazovateľ. Viac informácií otvorí senzor vo zvolenej jednotke."},hold_reset:{label:"Reset podržaním",description:"Dlhým podržaním ukazovateľa vynulujete počítadlo po výmene CO₂ bombičky alebo filtra. Vyžaduje potvrdenie."}},Ze={unsupported:"Nepodporované",name:{co2:"CO₂",filter:"Filter"},reset_confirm:{co2:"Vynulovať počítadlo CO₂? Urobte to len po výmene CO₂ bombičky. Nová hodnota sa zobrazí až po nejakom čase, keď zariadenie odošle do cloudu Grohe ďalšie meranie.",filter:"Vynulovať počítadlo filtra? Urobte to len po výmene filtra. Nová hodnota sa zobrazí až po nejakom čase, keď zariadenie odošle do cloudu Grohe ďalšie meranie."}},Qe={editor:Ke,feature:Ze},Je={unit:{label:"Visad enhet",description:"Enhet för värdet bredvid fältet. Fältet följer alltid procenten.",percent:"Procent (%)",liter:"Liter (L)"},color:{label:"Fältets färg",description:"Förloppsfältets färg."},value_position:{label:"Värdets placering",description:"Var värdet visas i förhållande till fältet.",left:"Vänster",right:"Höger"},show_icon:{label:"Visa ikon",description:"Visar en ikon framför fältet."},icon:{label:"Ikon"},sources:{title:"Källor",mode_auto:"Sensorer upptäckta automatiskt från Grohe-enheten",mode_none:"Inga sensorer upptäcktes — tilldela dem manuellt",auto:"Auto",manual:"Manuell",reset:"Återställ till upptäckt sensor",percent_sensor:"Procentsensor",liters_sensor:"Litersensor"},edge_content:{label:"Innehåll i kanten",description:"Vad som visas i kanten bredvid varje fält.",icon:"Ikon"},sections:{co2:"CO₂",filter:"Filter"},order:{label:"Ordning",description:"Vilket fält som kommer först (till vänster)."},tap_action:{label:"Tryckåtgärd",description:"Vad som händer när du trycker på fältet. Mer info öppnar sensorn i vald enhet."},hold_reset:{label:"Återställ genom att hålla",description:"Håll ned fältet för att nollställa räknaren efter byte av CO₂-cylinder eller filter. Kräver bekräftelse."}},Xe={unsupported:"Funktionen stöds inte",name:{co2:"CO₂",filter:"Filter"},reset_confirm:{co2:"Nollställa CO₂-räknaren? Endast efter byte av CO₂-cylindern. Det nya värdet visas först efter en stund, när enheten skickar nästa mätning till Grohe-molnet.",filter:"Nollställa filterräknaren? Endast efter byte av filtret. Det nya värdet visas först efter en stund, när enheten skickar nästa mätning till Grohe-molnet."}},Ye={editor:Je,feature:Xe},et={unit:{label:"Одиниця відображення",description:"Одиниця значення поруч зі смугою. Смуга завжди відповідає відсоткам.",percent:"Відсотки (%)",liter:"Літри (л)"},color:{label:"Колір смуги",description:"Колір смуги прогресу."},value_position:{label:"Розташування значення",description:"Де показується значення відносно смуги.",left:"Ліворуч",right:"Праворуч"},show_icon:{label:"Показати значок",description:"Показує значок перед смугою."},icon:{label:"Значок"},sources:{title:"Джерела",mode_auto:"Датчики автоматично виявлено з пристрою Grohe",mode_none:"Датчики не виявлено — призначте їх вручну",auto:"Авто",manual:"Вручну",reset:"Скинути до виявленого датчика",percent_sensor:"Датчик відсотків",liters_sensor:"Датчик літрів"},edge_content:{label:"Вміст на краю",description:"Що показується на краю поруч з кожною смугою.",icon:"Значок"},sections:{co2:"CO₂",filter:"Фільтр"},order:{label:"Порядок",description:"Яка смуга перша (ліворуч)."},tap_action:{label:"Дія при натисканні",description:"Що відбувається при натисканні на смугу. «Детальніше» відкриває датчик у вибраній одиниці."},hold_reset:{label:"Скидання утриманням",description:"Утримуйте смугу, щоб скинути лічильник після заміни балона CO₂ або фільтра. Потрібне підтвердження."}},tt={unsupported:"Непідтримувана функція",name:{co2:"CO₂",filter:"Фільтр"},reset_confirm:{co2:"Скинути лічильник CO₂? Лише після заміни балона CO₂. Нове значення з’явиться лише через деякий час, коли пристрій надішле наступне вимірювання в хмару Grohe.",filter:"Скинути лічильник фільтра? Лише після заміни фільтра. Нове значення з’явиться лише через деякий час, коли пристрій надішле наступне вимірювання в хмару Grohe."}},ot={editor:et,feature:tt};const it={cs:Object.freeze({__proto__:null,default:me,editor:ve,feature:be}),de:Object.freeze({__proto__:null,default:$e,editor:ge,feature:_e}),en:Object.freeze({__proto__:null,default:ze,editor:ye,feature:ke}),es:Object.freeze({__proto__:null,default:Ae,editor:we,feature:Ce}),fr:Object.freeze({__proto__:null,default:je,editor:xe,feature:Oe}),hu:Object.freeze({__proto__:null,default:Pe,editor:Se,feature:Ee}),it:Object.freeze({__proto__:null,default:Ue,editor:Re,feature:Me}),nl:Object.freeze({__proto__:null,default:Ie,editor:Le,feature:Ne}),no:Object.freeze({__proto__:null,default:He,editor:Fe,feature:Te}),pl:Object.freeze({__proto__:null,default:Ve,editor:Ge,feature:De}),pt:Object.freeze({__proto__:null,default:Be,editor:We,feature:qe}),sk:Object.freeze({__proto__:null,default:Qe,editor:Ke,feature:Ze}),sv:Object.freeze({__proto__:null,default:Ye,editor:Je,feature:Xe}),uk:Object.freeze({__proto__:null,default:ot,editor:et,feature:tt})};function rt(e,t){const o=e.split(".").reduce((e,t)=>e&&"object"==typeof e?e[t]:void 0,it[t]);return"string"==typeof o?o:void 0}function nt(e){return function(t){let o=rt(t,e?.locale.language??"en");return o||(o=rt(t,"en")),o||t}}const st={action:"more-info"};function at(e){return"none"!==(e?.action??st.action)}const lt=["co2","filter"],ct={co2:"co2",filter:"filter"},dt=new Set(["l","L","ℓ"]);function ut(e){return!e||"unavailable"===e.state||"unknown"===e.state}function ht(e){return e.slice(e.indexOf(".")+1)}function pt(e){return ht(e).replace(/_\d+$/,"")}function ft(e){return e.entities}function vt(e,t,o){const i=ft(e),r=t?i?.[t]?.device_id:void 0;if(!i||!r)return{};const n=ct[o],s=Object.values(i).filter(e=>e.device_id===r&&e.entity_id.startsWith("sensor.")).map(t=>({id:t.entity_id,stateObj:e.states[t.entity_id]})).filter(({id:e,stateObj:t})=>!!t&&(ht(e).includes(n)||`${t.attributes?.friendly_name??""}`.toLowerCase().includes(n))).sort((e,t)=>e.id.localeCompare(t.id)),a=s.filter(({id:e,stateObj:t})=>function(e,t){const o=t?.attributes?.unit_of_measurement;return"string"==typeof o&&""!==o?"%"===o:ut(t)&&!pt(e).endsWith("_total")}(e,t)),l=s.filter(({id:e,stateObj:t})=>function(e,t){const o=t?.attributes?.unit_of_measurement;return"string"==typeof o&&""!==o?dt.has(o):ut(t)&&pt(e).endsWith("_total")}(e,t)),c=a.find(({id:e})=>pt(e).endsWith(`_remaining_${n}`)),d=a.find(({id:e})=>!ht(e).includes("_app")),u=l.find(({id:e})=>pt(e).endsWith(`_remaining_${n}_total`));return{percent:(c??d??a[0])?.id,liters:(u??l[0])?.id}}function bt(e,t,o){if(!t)return!1;const i=function(e,t){return t?ft(e)?.[t]?.platform:void 0}(e,t);return i?"grohe_smarthome"===i:!!vt(e,t,o).percent}function mt(e,t,o){if(!t)return;const i=e.states[t],r=i?Number(i.state):NaN,n=i?.attributes?.unit_of_measurement;return{origin:o,entityId:t,value:Number.isFinite(r)?r:void 0,unit:"string"==typeof n?n:void 0}}function gt(e,t,o,i){const r=vt(e,t,o);return{percent:i?.entity?mt(e,i.entity,"manual"):mt(e,r.percent,"auto"),liters:i?.liters_entity?mt(e,i.liters_entity,"manual"):mt(e,r.liters,"auto")}}class _t{constructor(e){this.callbacks=e,this.held=!1,this.pressed=!1,this.onPointerDown=e=>{if(e.stopPropagation(),0!==e.button)return;this.pressed=!0,this.held=!1;const{hold:t}=this.callbacks();t&&(this.timer=window.setTimeout(()=>{this.timer=void 0,this.held=!0,t()},500))},this.onPointerUp=e=>{e.stopPropagation(),this.pressed&&(this.pressed=!1,this.clearTimer(),this.held||this.callbacks().tap?.())},this.onPointerCancel=()=>{this.pressed=!1,this.clearTimer()},this.onClick=e=>{e.stopPropagation()},this.onContextMenu=e=>{this.callbacks().hold&&e.preventDefault()},this.onKeyDown=e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),e.stopPropagation(),this.callbacks().tap?.())}}clearTimer(){void 0!==this.timer&&(window.clearTimeout(this.timer),this.timer=void 0)}}function $t(e,t){e.dispatchEvent(new CustomEvent("hass-action",{detail:t,bubbles:!0,composed:!0}))}function yt(e){const{host:t,hass:o,kind:i,sources:r,unit:n,tapAction:s}=e,a=e.holdReset?function(e,t,o){const i=ft(e),r=t?i?.[t]?.device_id:void 0;if(!i||!r)return;const n=ct[o],s=Object.values(i).filter(e=>e.device_id===r&&e.entity_id.startsWith("button.")).map(e=>e.entity_id).sort();return s.find(e=>pt(e).endsWith(`_reset_${n}`))??s.find(e=>ht(e).includes("reset")&&ht(e).includes(n))}(o,e.contextEntityId,i):void 0;return{tap:at(s)?()=>$t(t,function(e,t){return{config:{entity:e,tap_action:t??st},action:"tap"}}(function(e,t){return"liter"===t&&e.liters?.entityId?e.liters.entityId:e.percent?.entityId??e.liters?.entityId}(r,n),s)):void 0,hold:a?()=>{var n,s;e.onReset?.(a,[r.percent?.entityId,r.liters?.entityId]),$t(t,(n=a,s=nt(o)(`feature.reset_confirm.${i}`),{config:{entity:n,hold_action:{action:"perform-action",perform_action:"button.press",target:{entity_id:n},confirmation:{text:s}}},action:"hold"}))}:void 0}}function kt(e){return!!e.tap||!!e.hold}const zt={co2:"blue",filter:"green"},wt={co2:"mdi:molecule-co2",filter:"mdi:air-filter"};function Ct(e,t,o){const i=e?.[t];return void 0!==i?!!i:o}function At(e){return"liter"===e?.unit?"liter":"percent"}function xt(e){return"left"===e?.value_position?"left":"right"}function Ot(e,t){const o=(e??"").trim()||zt[t];return/^[a-z]+(-[a-z]+)*$/i.test(o)&&!["transparent","currentcolor","inherit"].includes(o.toLowerCase())?`var(--${o.toLowerCase()}-color, ${o})`:o}function jt(e){const t=e?.edge_content;return"percent"===t||"liter"===t?t:"value"===t?"liter"===e?.unit?"liter":"percent":"icon"}function St(e,t){return{unit:e?.unit,color:e?.[`${t}_color`],icon:e?.[`${t}_icon`],entity:e?.[`${t}_entity`],liters_entity:e?.[`${t}_liters_entity`]}}function Et(e,t){return new Intl.NumberFormat(t,{maximumFractionDigits:1}).format(e)}function Pt(e,t,o){const i=e.percent?.value,r=void 0===i?0:Math.min(100,Math.max(0,i)),n=e.liters?.value;return"liter"===t&&void 0!==n?{percent:r,text:`${Et(n,o)} ${e.liters?.unit??"L"}`,available:!0}:void 0===i?{percent:r,text:"–",available:!1}:{percent:r,text:`${Et(i,o)} %`,available:!0}}function Rt(e,t,o){const i=t.percent?.value,r=t.liters?.value,n=[void 0===i?"–":`${Et(i,o)} %`];return void 0!==r&&n.push(`${Et(r,o)} l`),`${e}: ${n.join(" / ")}`}const Mt=[5e3,6e4];class Ut{constructor(e){this.getHass=e,this.timers=[]}arm(e,t){const o=this.getHass(),i=t.filter(e=>!!e);o&&0!==i.length&&(this.pending={button:e,buttonState:o.states[e]?.state,entities:i,until:Date.now()+12e4})}check(){const e=this.pending,t=this.getHass();if(e&&t)if(Date.now()>e.until)this.pending=void 0;else if(t.states[e.button]?.state!==e.buttonState){this.pending=void 0;for(const t of Mt)this.timers.push(setTimeout(()=>this.refresh(e.entities),t))}}dispose(){this.timers.forEach(e=>clearTimeout(e)),this.timers=[],this.pending=void 0}refresh(e){this.getHass()?.callService("homeassistant","update_entity",{entity_id:e}).catch(()=>{})}}function Lt(e,t,o,i){return V`
    <div class="field">
      <ha-selector
        .hass=${e}
        .selector=${{ui_action:{default_action:st.action}}}
        .value=${t.tap_action}
        .label=${o("editor.tap_action.label")}
        .helper=${o("editor.tap_action.description")}
        .required=${!1}
        @value-changed=${e=>{e.stopPropagation(),i("tap_action",e.detail?.value||void 0)}}
      ></ha-selector>
    </div>
    <ha-settings-row>
      <span slot="heading">${o("editor.hold_reset.label")}</span>
      <span slot="description">${o("editor.hold_reset.description")}</span>
      <ha-switch .checked=${!!t.hold_reset} @change=${e=>i("hold_reset",e.target.checked||void 0)}></ha-switch>
    </ha-settings-row>
  `}const Nt=a`
  .section-label {
    font-size: var(--ha-font-size-s, 12px);
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--secondary-text-color);
    margin: 8px 0;
  }
  .source-banner {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 12px;
    font-size: var(--ha-font-size-m, 14px);
    background-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.12);
    color: var(--primary-text-color);
  }
  .source-banner .secondary {
    font-size: var(--ha-font-size-s, 12px);
    color: var(--secondary-text-color);
  }
  .source-row {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .row-tail {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-end;
    min-width: 92px;
  }
  .chip {
    font-size: 11px;
    font-weight: 500;
    border-radius: 999px;
    padding: 3px 9px;
    white-space: nowrap;
  }
  .chip.auto {
    background-color: rgba(76, 175, 80, 0.16);
    color: var(--success-color, #2e7d32);
  }
  .chip.manual {
    background-color: rgba(255, 152, 0, 0.16);
    color: var(--warning-color, #b26a00);
  }
  .reset-button {
    border: none;
    background: none;
    cursor: pointer;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    padding: 0;
    color: var(--secondary-text-color);
  }
  .reset-button:hover {
    background-color: rgba(127, 127, 127, 0.15);
  }
  .reset-button:focus-visible {
    outline: 2px solid var(--primary-color);
  }
  .reset-button svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  ha-selector {
    display: block;
    min-width: 0;
  }
  .options {
    border-top: 1px solid var(--divider-color);
    margin-top: 8px;
    padding-top: 8px;
  }
  .field {
    margin-bottom: 12px;
  }
`;let It=class extends le{constructor(){super(...arguments),this.config={}}setConfig(e){this.config={...e}}static get styles(){return Nt}render(){const e=nt(this.hass),t=[{value:"co2_filter",label:`${e("editor.sections.co2")} → ${e("editor.sections.filter")}`},{value:"filter_co2",label:`${e("editor.sections.filter")} → ${e("editor.sections.co2")}`}];return V`
      <div class="field">
        ${this.renderSelect("edge_content",jt(this.config),(o=[["icon","editor.edge_content.icon"],["percent","editor.unit.percent"],["liter","editor.unit.liter"]],o.map(([t,o])=>({value:t,label:e(o)}))),"editor.edge_content",e)}
      </div>
      <div class="field">${this.renderSelect("order",this.config.order??"co2_filter",t,"editor.order",e)}</div>
      ${Lt(this.hass,this.config,e,(e,t)=>this._setKey(e,t))}
      ${("filter_co2"===this.config.order?[...lt].reverse():lt).map(t=>this.renderKind(t,e))}
    `;var o}renderSelect(e,t,o,i,r){return V`
      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{mode:"dropdown",options:o}}}
        .value=${t}
        .label=${r(`${i}.label`)}
        .helper=${r(`${i}.description`)}
        .required=${!0}
        @value-changed=${t=>this._onValueChange(e,t)}
      ></ha-selector>
    `}renderKind(e,t){const o=this.hass?vt(this.hass,this.context?.entity_id,e):{},i=`${e}_color`,r=`${e}_icon`;return V`
      <div class="options">
        <div class="section-label">${t(`editor.sections.${e}`)}</div>
        ${this.renderSource(`${e}_entity`,o.percent,t("editor.sources.percent_sensor"),t)}
        ${this.renderSource(`${e}_liters_entity`,o.liters,t("editor.sources.liters_sensor"),t)}
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ui_color:{include_none:!1,include_state:!1}}}
            .value=${this.config[i]??zt[e]}
            .label=${t("editor.color.label")}
            .required=${!0}
            @value-changed=${e=>this._onValueChange(i,e)}
          ></ha-selector>
        </div>
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{icon:{placeholder:wt[e]}}}
            .value=${this.config[r]??""}
            .label=${t("editor.icon.label")}
            .required=${!1}
            @value-changed=${e=>this._onValueChange(r,e)}
          ></ha-selector>
        </div>
      </div>
    `}renderSource(e,t,o,i){const r=this.config[e];let n=q;return r?n=V`<span class="chip manual">${i("editor.sources.manual")}</span>`:t&&(n=V`<span class="chip auto">${i("editor.sources.auto")}</span>`),V`
      <div class="source-row">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"sensor"}}}
          .value=${r??t??""}
          .label=${o}
          .required=${!1}
          @value-changed=${o=>this._onSourceChange(e,t,o)}
        ></ha-selector>
        <div class="row-tail">
          ${n}
          ${r?V`
                  <button class="reset-button" title=${i("editor.sources.reset")} aria-label=${i("editor.sources.reset")} @click=${()=>this._setKey(e,void 0)}>
                    <svg viewBox="0 0 24 24"><path d="M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z" /></svg>
                  </button>
                `:q}
        </div>
      </div>
    `}_onSourceChange(e,t,o){o.stopPropagation();const i=o.detail?.value||void 0;this._setKey(e,i===t?void 0:i)}_onValueChange(e,t){t.stopPropagation(),this._setKey(e,t.detail?.value||void 0)}_setKey(e,t){const o={...this.config};void 0===t?delete o[e]:o[e]=t,this.config=o,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}};t([pe({attribute:!1})],It.prototype,"hass",void 0),t([pe({attribute:!1})],It.prototype,"context",void 0),t([pe({type:Object})],It.prototype,"config",void 0),It=t([de("grohe-blue-combined-feature-config")],It);let Ft=class extends le{constructor(){super(...arguments),this._actions={co2:new _t(()=>this._actionCallbacks("co2")),filter:new _t(()=>this._actionCallbacks("filter"))},this._refresher=new Ut(()=>this.hass)}updated(e){e.has("hass")&&this._refresher.check()}disconnectedCallback(){super.disconnectedCallback(),this._refresher.dispose()}_sources(e){return this.hass?gt(this.hass,this.context?.entity_id,e,St(this.config,e)):{}}_actionCallbacks(e){return this.hass?yt({host:this,hass:this.hass,contextEntityId:this.context?.entity_id,kind:e,sources:this._sources(e),unit:"liter"===jt(this.config)?"liter":"percent",tapAction:this.config?.tap_action,holdReset:this.config?.hold_reset,onReset:(e,t)=>this._refresher.arm(e,t)}):{}}static getConfigElement(){return document.createElement("grohe-blue-combined-feature-config")}static getStubConfig(){return{type:"custom:grohe-blue-combined-feature"}}get stateObj(){return this.context?.entity_id?this.hass?.states[this.context.entity_id]:void 0}set stateObj(e){}getCardSize(){return 1}setConfig(e){this.config=e}render(){const e=this.hass;if(!e||!this.context||!bt(e,this.context.entity_id,"co2"))return V`<div class="combined"><div class="edge">${nt(e)("feature.unsupported")}</div></div>`;const t="filter_co2"===this.config?.order?["filter","co2"]:["co2","filter"];return V`<div class="combined">${this.renderItem(e,t[0],!0)} ${this.renderItem(e,t[1],!1)}</div>`}renderItem(e,t,o){const i=St(this.config,t),r=this._sources(t),n=jt(this.config),s=Pt(r,"liter"===n?"liter":"percent",e.locale?.language),a=Rt("co2"===t?"CO₂":nt(e)("feature.name.filter"),r,e.locale?.language),l=V`<div class="edge ${o?"first":"second"}">
      ${"icon"===n?V`<ha-icon icon=${i.icon?.trim()||wt[t]}></ha-icon>`:s.text}
    </div>`,c=kt(this._actionCallbacks(t)),d=this._actions[t],u=V`<div class="bar" title=${a} role=${c?"button":q} tabindex=${c?"0":q} aria-label=${a}>
      <div class="level" style="width: ${s.percent}%;"></div>
    </div>`;return V`
      <div
        class="item${s.available?"":" unavailable"}${c?" interactive":""}"
        style="--level-color: ${Ot(i.color,t)}"
        @pointerdown=${d.onPointerDown}
        @pointerup=${d.onPointerUp}
        @pointerleave=${d.onPointerCancel}
        @pointercancel=${d.onPointerCancel}
        @click=${d.onClick}
        @contextmenu=${d.onContextMenu}
        @keydown=${d.onKeyDown}
      >
        ${o?l:u} ${o?u:l}
      </div>
    `}static get styles(){return fe}};t([pe({attribute:!1})],Ft.prototype,"hass",void 0),t([pe({attribute:!1})],Ft.prototype,"config",void 0),t([pe({attribute:!1})],Ft.prototype,"context",void 0),Ft=t([de("grohe-blue-combined-feature")],Ft),window.customCardFeatures||=[],window.customCardFeatures.push({type:"grohe-blue-combined-feature",name:"Grohe Blue CO₂ + filter level",isSupported:(e,t)=>bt(e,t.entity_id,"co2"),configurable:!0});const Tt=a`
  .level-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: var(--feature-height, 42px);
    padding: 0 4px;
    box-sizing: border-box;
    --level-color: var(--primary-color);
  }

  .level-row.unavailable .level {
    opacity: 0.4;
  }

  ha-icon {
    flex: none;
    --mdc-icon-size: 20px;
    color: var(--level-color);
  }

  .bar {
    flex: 1;
    min-width: 0;
    border: 1px solid color-mix(in srgb, var(--level-color) 80%, transparent);
    border-radius: 5px;
    height: 8px;
    background-color: color-mix(in srgb, var(--level-color) 30%, transparent);
    overflow: hidden;
  }

  .level {
    height: 100%;
    background-color: color-mix(in srgb, var(--level-color) 70%, transparent);
    transition: width 0.4s ease;
  }

  .value {
    flex: none;
    min-width: 45px;
    font-size: var(--ha-font-size-s);
    font-weight: var(--ha-font-weight-normal);
    letter-spacing: 0.4px;
    color: var(--primary-text-color);
    white-space: nowrap;
  }

  .value.right {
    text-align: right;
  }

  .value.left {
    text-align: left;
  }

  /* clickable bars: pointer, hover highlight, keyboard focus, no text selection / callout on long-press */
  .interactive {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    touch-action: manipulation;
  }

  .interactive:hover .bar {
    filter: brightness(1.2);
  }

  .level-row:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    border-radius: 8px;
  }
`;class Ht extends le{constructor(){super(...arguments),this.config={}}setConfig(e){this.config={...e}}static get styles(){return Nt}get _auto(){return this.hass?vt(this.hass,this.context?.entity_id,this.kind):{}}get _deviceName(){const e=this.hass,t=this.context?.entity_id?e?.entities?.[this.context.entity_id]?.device_id:void 0,o=t?e?.devices?.[t]:void 0;return o?.name_by_user??o?.name}render(){const e=nt(this.hass),t=this._auto,o=!!t.percent||!!t.liters,i=o?this._deviceName:void 0,r=[{value:"percent",label:e("editor.unit.percent")},{value:"liter",label:e("editor.unit.liter")}],n=[{value:"left",label:e("editor.value_position.left")},{value:"right",label:e("editor.value_position.right")}],s=Ct(this.config,"show_icon",!0);return V`
      <div class="section-label">${e("editor.sources.title")}</div>
      <div class="source-banner">
        <div>
          <div>${e(o?"editor.sources.mode_auto":"editor.sources.mode_none")}</div>
          ${i?V`<div class="secondary">${i}</div>`:q}
        </div>
      </div>
      ${this.renderSourceRow("entity",t.percent,e("editor.sources.percent_sensor"),e)}
      ${this.renderSourceRow("liters_entity",t.liters,e("editor.sources.liters_sensor"),e)}

      <div class="options">
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:r}}}
            .value=${At(this.config)}
            .label=${e("editor.unit.label")}
            .helper=${e("editor.unit.description")}
            .required=${!0}
            @value-changed=${e=>this._onValueChange("unit",e)}
          ></ha-selector>
        </div>
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{ui_color:{include_none:!1,include_state:!1}}}
            .value=${this.config.color??zt[this.kind]}
            .label=${e("editor.color.label")}
            .helper=${e("editor.color.description")}
            .required=${!0}
            @value-changed=${e=>this._onValueChange("color",e)}
          ></ha-selector>
        </div>
        <div class="field">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:n}}}
            .value=${xt(this.config)}
            .label=${e("editor.value_position.label")}
            .helper=${e("editor.value_position.description")}
            .required=${!0}
            @value-changed=${e=>this._onValueChange("value_position",e)}
          ></ha-selector>
        </div>
        <ha-settings-row>
          <span slot="heading">${e("editor.show_icon.label")}</span>
          <span slot="description">${e("editor.show_icon.description")}</span>
          <ha-switch @change=${this._onShowIconChange} .checked=${s} name="show_icon"></ha-switch>
        </ha-settings-row>
        ${s?V`
                <div class="field">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{icon:{placeholder:wt[this.kind]}}}
                    .value=${this.config.icon??""}
                    .label=${e("editor.icon.label")}
                    .required=${!1}
                    @value-changed=${e=>this._onValueChange("icon",e)}
                  ></ha-selector>
                </div>
              `:q}
        ${Lt(this.hass,this.config,e,(e,t)=>this._setOption(e,t))}
      </div>
    `}_setOption(e,t){const o={...this.config};void 0===t?delete o[e]:o[e]=t,this._updateConfig(o)}renderSourceRow(e,t,o,i){const r=this.config[e],n=r??t??"";let s=q;return r?s=V`<span class="chip manual">${i("editor.sources.manual")}</span>`:t&&(s=V`<span class="chip auto">${i("editor.sources.auto")}</span>`),V`
      <div class="source-row">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"sensor"}}}
          .value=${n}
          .label=${o}
          .required=${!1}
          @value-changed=${o=>this._onSourceChange(e,t,o)}
        ></ha-selector>
        <div class="row-tail">
          ${s}
          ${r?V`
                  <button class="reset-button" title=${i("editor.sources.reset")} aria-label=${i("editor.sources.reset")} @click=${()=>this._onSourceReset(e)}>
                    <svg viewBox="0 0 24 24"><path d="M12,5V1L7,6L12,11V7A6,6 0 0,1 18,13A6,6 0 0,1 12,19A6,6 0 0,1 6,13H4A8,8 0 0,0 12,21A8,8 0 0,0 20,13A8,8 0 0,0 12,5Z" /></svg>
                  </button>
                `:q}
        </div>
      </div>
    `}_onSourceChange(e,t,o){o.stopPropagation();const i=o.detail?.value||void 0,r={...this.config};i&&i!==t?r[e]=i:delete r[e],this._updateConfig(r)}_onSourceReset(e){const t={...this.config};delete t[e],this._updateConfig(t)}_onValueChange(e,t){t.stopPropagation();const o=t.detail?.value||void 0,i={...this.config};void 0===o?delete i[e]:i[e]=o,this._updateConfig(i)}_onShowIconChange(e){const t=e.target.checked;this._updateConfig({...this.config,show_icon:t})}_updateConfig(e){this.config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}}t([pe({attribute:!1})],Ht.prototype,"hass",void 0),t([pe({attribute:!1})],Ht.prototype,"context",void 0),t([pe({type:Object})],Ht.prototype,"config",void 0);let Gt=class extends Ht{constructor(){super(...arguments),this.kind="co2"}};Gt=t([de("grohe-blue-co2-feature-config")],Gt);let Dt=class extends Ht{constructor(){super(...arguments),this.kind="filter"}};Dt=t([de("grohe-blue-filter-feature-config")],Dt);class Vt extends le{constructor(){super(...arguments),this._actions=new _t(()=>this._actionCallbacks()),this._refresher=new Ut(()=>this.hass)}updated(e){e.has("hass")&&this._refresher.check()}disconnectedCallback(){super.disconnectedCallback(),this._refresher.dispose()}_actionCallbacks(){return this.hass?yt({host:this,hass:this.hass,contextEntityId:this.context?.entity_id,kind:this.kind,sources:this.sources,unit:At(this.config),tapAction:this.config?.tap_action,holdReset:this.config?.hold_reset,onReset:(e,t)=>this._refresher.arm(e,t)}):{}}get stateObj(){return this.context?.entity_id?this.hass?.states[this.context.entity_id]:void 0}set stateObj(e){}get sources(){return this.hass?gt(this.hass,this.context?.entity_id,this.kind,this.config):{}}getCardSize(){return 1}setConfig(e){this.config=e}render(){if(!this.hass||!this.context||!this.sources.percent)return V`<div class="level-row"><span class="value">${nt(this.hass)("feature.unsupported")}</span></div>`;const e=Pt(this.sources,At(this.config),this.hass.locale?.language),t=xt(this.config),o=function(e,t){if(Ct(e,"show_icon",!0))return e?.icon?.trim()||wt[t]}(this.config,this.kind),i=V`<div class="value ${t}">${e.text}</div>`,r=Rt("co2"===this.kind?"CO₂":nt(this.hass)("feature.name.filter"),this.sources,this.hass.locale?.language),n=kt(this._actionCallbacks()),s=this._actions;return V`
      <div
        class="level-row${e.available?"":" unavailable"}${n?" interactive":""}"
        style="--level-color: ${Ot(this.config?.color,this.kind)}"
        role=${n?"button":q}
        tabindex=${n?"0":q}
        aria-label=${r}
        @pointerdown=${s.onPointerDown}
        @pointerup=${s.onPointerUp}
        @pointerleave=${s.onPointerCancel}
        @pointercancel=${s.onPointerCancel}
        @click=${s.onClick}
        @contextmenu=${s.onContextMenu}
        @keydown=${s.onKeyDown}
      >
        ${o?V`<ha-icon icon=${o}></ha-icon>`:q} ${"left"===t?i:q}
        <div class="bar" title=${r}>
          <div class="level" style="width: ${e.percent}%;"></div>
        </div>
        ${"right"===t?i:q}
      </div>
    `}static get styles(){return Tt}}t([pe({attribute:!1})],Vt.prototype,"hass",void 0),t([pe({attribute:!1})],Vt.prototype,"config",void 0),t([pe({attribute:!1})],Vt.prototype,"context",void 0);let Wt=class extends Vt{constructor(){super(...arguments),this.kind="co2"}static getConfigElement(){return document.createElement("grohe-blue-co2-feature-config")}static getStubConfig(){return{type:"custom:grohe-blue-co2-feature"}}};Wt=t([de("grohe-blue-co2-feature")],Wt);let qt=class extends Vt{constructor(){super(...arguments),this.kind="filter"}static getConfigElement(){return document.createElement("grohe-blue-filter-feature-config")}static getStubConfig(){return{type:"custom:grohe-blue-filter-feature"}}};qt=t([de("grohe-blue-filter-feature")],qt),window.customCardFeatures||=[],window.customCardFeatures.push({type:"grohe-blue-co2-feature",name:"Grohe Blue CO₂ level",isSupported:(e,t)=>bt(e,t.entity_id,"co2"),configurable:!0},{type:"grohe-blue-filter-feature",name:"Grohe Blue filter level",isSupported:(e,t)=>bt(e,t.entity_id,"filter"),configurable:!0}),function(){const t="padding: 2px 4px; font-family: Roboto,Verdana,Geneva,sans-serif;",o=`background-color: rgb(0, 147, 214); color: rgb(0, 0, 49); ${t}`,i=`background-color: rgb(0, 0, 49); color: rgb(0, 147, 214); ${t}`;console.groupCollapsed("%cGrohe Blue Tile card features%c1.1.0-beta1",o,i),console.info("Home Assistant Lovelace custom card features showing GROHE Blue CO₂ and filter levels"),console.info(`Github: ${e}`),console.groupEnd()}();
