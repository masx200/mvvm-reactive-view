import Virtualdom from "./CreateElement/VirtualElement";
import {
    ElementAttributes,
    styleprop,
    classprop
} from "./CreateElement/create-element";
type Attributes = ElementAttributes;
interface LinkHTMLAttributes extends HTMLAttributes {
    as?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    integrity?: string;
    media?: string;
    rel?: string;
    sizes?: string;
    type?: string;
}
interface LiHTMLAttributes extends HTMLAttributes {
    value?: string | string[] | number;
}
interface LabelHTMLAttributes extends HTMLAttributes {
    for?: string;
    form?: string;
}
interface InsHTMLAttributes extends HTMLAttributes {
    cite?: string;
    datetime?: string;
}
interface InputHTMLAttributes extends HTMLAttributes {
    accept?: string;
    alt?: string;
    autocomplete?: string;
    autofocus?: boolean;
    capture?: boolean;
    checked?: boolean;
    crossorigin?: string;
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxlength?: number;
    min?: number | string;
    minlength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean | string;
    size?: number | string;
    src?: string;
    step?: number | string;
    type?: string;
    value?: string | string[] | number;
    width?: number | string;
}
interface HtmlHTMLAttributes extends HTMLAttributes {
    manifest?: string;
}
interface ImgHTMLAttributes extends HTMLAttributes {
    alt?: string;
    crossorigin?: "anonymous" | "use-credentials" | "";
    decoding?: "async" | "auto" | "sync";
    height?: number | string;
    sizes?: string;
    src?: string;
    srcset?: string;
    usemap?: string;
    width?: number | string;
}
interface IframeHTMLAttributes extends HTMLAttributes {
    allow?: string;
    allowfullscreen?: boolean;
    allowtransparency?: boolean;
    frameborder?: number | string;
    height?: number | string;
    marginheight?: number;
    marginwidth?: number;
    name?: string;
    referrerpolicy?: string;
    sandbox?: string;
    scrolling?: string;
    seamless?: boolean;
    src?: string;
    srcdoc?: string;
    width?: number | string;
}

interface MapHTMLAttributes extends HTMLAttributes {
    name?: string;
}
interface KeygenHTMLAttributes extends HTMLAttributes {
    autofocus?: boolean;
    challenge?: string;
    disabled?: boolean;
    form?: string;
    keytype?: string;
    keyparams?: string;
    name?: string;
}
interface MetaHTMLAttributes extends HTMLAttributes {
    charset?: string;
    content?: string;
    httpequiv?: string;
    name?: string;
}
interface MenuHTMLAttributes extends HTMLAttributes {
    type?: string;
}
interface ObjectHTMLAttributes extends HTMLAttributes {
    classid?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    usemap?: string;
    width?: number | string;
    wmode?: string;
}
interface FieldsetHTMLAttributes extends HTMLAttributes {
    disabled?: boolean;
    form?: string;
    name?: string;
}
interface FormHTMLAttributes extends HTMLAttributes {
    acceptcharset?: string;
    action?: string;
    autocomplete?: string;
    enctype?: string;
    method?: string;
    name?: string;
    novalidate?: boolean;
    target?: string;
}
interface EmbedHTMLAttributes extends HTMLAttributes {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
}
interface DetailsHTMLAttributes extends HTMLAttributes {
    open?: boolean;
}
interface DialogHTMLAttributes extends HTMLAttributes {
    open?: boolean;
}
interface DelHTMLAttributes extends HTMLAttributes {
    cite?: string;
    datetime?: string;
}
interface DataHTMLAttributes extends HTMLAttributes {
    value?: string | string[] | number;
}
interface OptgroupHTMLAttributes extends HTMLAttributes {
    disabled?: boolean;
    label?: string;
}
interface OutputHTMLAttributes extends HTMLAttributes {
    for?: string;
    form?: string;
    name?: string;
}
interface MeterHTMLAttributes extends HTMLAttributes {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | string[] | number;
}
interface ParamHTMLAttributes extends HTMLAttributes {
    name?: string;
    value?: string | string[] | number;
}
interface QuoteHTMLAttributes extends HTMLAttributes {
    cite?: string;
}
interface BlockquoteHTMLAttributes extends HTMLAttributes {
    cite?: string;
}
interface OptionHTMLAttributes extends HTMLAttributes {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string | string[] | number;
}
interface SourceHTMLAttributes extends HTMLAttributes {
    media?: string;
    sizes?: string;
    src?: string;
    srcset?: string;
    type?: string;
}
interface StyleHTMLAttributes extends HTMLAttributes {
    media?: string;
    nonce?: string;
    scoped?: boolean;
    type?: string;
}
interface OlHTMLAttributes extends HTMLAttributes {
    reversed?: boolean;
    start?: number;
    type?: "1" | "a" | "A" | "i" | "I";
}
interface SelectHTMLAttributes extends HTMLAttributes {
    autocomplete?: string;
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean | string;
    size?: number;
    value?: string | string[] | number;
}
interface TableHTMLAttributes extends HTMLAttributes {
    cellpadding?: number | string;
    cellspacing?: number | string;
    summary?: string;
}
interface ProgressHTMLAttributes extends HTMLAttributes {
    max?: number | string;
    value?: string | string[] | number;
}
interface TimeHTMLAttributes extends HTMLAttributes {
    datetime?: string;
}
interface TextareaHTMLAttributes extends HTMLAttributes {
    autocomplete?: string;
    autofocus?: boolean;
    cols?: number;
    dirname?: string;
    disabled?: boolean;
    form?: string;
    maxlength?: number;
    minlength?: number;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | string[] | number;
    wrap?: string;
}
interface TrackHTMLAttributes extends HTMLAttributes {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srclang?: string;
}
interface ScriptHTMLAttributes extends HTMLAttributes {
    async?: boolean;
    charset?: string;
    crossorigin?: string;
    defer?: boolean;
    integrity?: string;
    nomodule?: boolean;
    nonce?: string;
    src?: string;
    type?: string;
}
interface TdHTMLAttributes extends HTMLAttributes {
    align?: "left" | "center" | "right" | "justify" | "char";
    colspan?: number;
    headers?: string;
    rowspan?: number;
    scope?: string;
    valign?: "top" | "middle" | "bottom" | "baseline";
}
interface ThHTMLAttributes extends HTMLAttributes {
    align?: "left" | "center" | "right" | "justify" | "char";
    colspan?: number;
    headers?: string;
    rowspan?: number;
    scope?: string;
}
interface ColgroupHTMLAttributes extends HTMLAttributes {
    span?: number;
}
interface ColHTMLAttributes extends HTMLAttributes {
    span?: number;
    width?: number | string;
}
interface ButtonHTMLAttributes extends HTMLAttributes {
    autofocus?: boolean;
    disabled?: boolean;
    form?: string;
    formaction?: string;
    formenctype?: string;
    formmethod?: string;
    formnovalidate?: boolean;
    formtarget?: string;
    name?: string;
    type?: "submit" | "reset" | "button";
    value?: string | string[] | number;
}
interface CanvasHTMLAttributes extends HTMLAttributes {
    height?: number | string;
    width?: number | string;
}
interface BlockquoteHTMLAttributes extends HTMLAttributes {
    cite?: string;
}
interface BaseHTMLAttributes extends HTMLAttributes {
    href?: string;
    target?: string;
}
interface MediaHTMLAttributes extends HTMLAttributes {
    autoplay?: boolean;
    controls?: boolean;
    controlslist?: string;
    crossorigin?: string;
    loop?: boolean;
    mediagroup?: string;
    muted?: boolean;
    playsinline?: boolean;
    preload?: string;
    src?: string;
}
interface VideoHTMLAttributes extends MediaHTMLAttributes {
    height?: number | string;
    playsinline?: boolean;
    poster?: string;
    width?: number | string;
    disablePictureInPicture?: boolean;
}
interface AudioHTMLAttributes extends MediaHTMLAttributes {}
interface AreaHTMLAttributes extends HTMLAttributes {
    alt?: string;
    coords?: string;
    download?: any;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    shape?: string;
    target?: string;
}
interface WebViewHTMLAttributes extends HTMLAttributes {
    allowfullscreen?: boolean;
    allowpopups?: boolean;
    autoFocus?: boolean;
    autosize?: boolean;
    blinkfeatures?: string;
    disableblinkfeatures?: string;
    disableguestresize?: boolean;
    disablewebsecurity?: boolean;
    guestinstance?: string;
    httpreferrer?: string;
    nodeintegration?: boolean;
    partition?: string;
    plugins?: boolean;
    preload?: string;
    src?: string;
    useragent?: string;
    webpreferences?: string;
}
interface SVGAttributes extends AriaAttributes {
    xmlns?: string;
    class?: string;
    domPropsInnerHTML?: string;

    color?: string;
    height?: number | string;
    id?: string;
    lang?: string;
    max?: number | string;
    media?: string;
    method?: string;
    min?: number | string;
    name?: string;
    target?: string;
    type?: string;
    width?: number | string;

    role?: string;
    tabindex?: number | string;

    "accent-height"?: number | string;
    accumulate?: "none" | "sum";
    additive?: "replace" | "sum";
    "alignment-baseline"?:
        | "auto"
        | "baseline"
        | "before-edge"
        | "text-before-edge"
        | "middle"
        | "central"
        | "after-edge"
        | "text-after-edge"
        | "ideographic"
        | "alphabetic"
        | "hanging"
        | "mathematical"
        | "inherit";
    allowReorder?: "no" | "yes";
    alphabetic?: number | string;
    amplitude?: number | string;
    "arabic-form"?: "initial" | "medial" | "terminal" | "isolated";
    ascent?: number | string;
    attributeName?: string;
    attributeType?: string;
    autoReverse?: number | string;
    azimuth?: number | string;
    baseFrequency?: number | string;
    "baseline-shift"?: number | string;
    baseProfile?: number | string;
    bbox?: number | string;
    begin?: number | string;
    bias?: number | string;
    by?: number | string;
    calcMode?: number | string;
    "cap-height"?: number | string;
    clip?: number | string;
    "clip-path"?: string;
    clipPathUnits?: number | string;
    "clip-rule"?: number | string;
    "color-interpolation"?: number | string;
    "color-interpolation-filters"?: "auto" | "sRGB" | "linearRGB" | "inherit";
    "color-profile"?: number | string;
    "color-rendering"?: number | string;
    contentScriptType?: number | string;
    contentStyleType?: number | string;
    cursor?: number | string;
    cx?: number | string;
    cy?: number | string;
    d?: string;
    decelerate?: number | string;
    descent?: number | string;
    diffuseConstant?: number | string;
    direction?: number | string;
    display?: number | string;
    divisor?: number | string;
    "dominant-baseline"?: number | string;
    dur?: number | string;
    dx?: number | string;
    dy?: number | string;
    edgeMode?: number | string;
    elevation?: number | string;
    "enable-background"?: number | string;
    end?: number | string;
    exponent?: number | string;
    externalResourcesRequired?: number | string;
    fill?: string;
    "fill-opacity"?: number | string;
    "fill-rule"?: "nonzero" | "evenodd" | "inherit";
    filter?: string;
    filterRes?: number | string;
    filterUnits?: number | string;
    "flood-color"?: number | string;
    "flood-opacity"?: number | string;
    focusable?: number | string;
    "font-family"?: string;
    "font-size"?: number | string;
    "font-size-adjust"?: number | string;
    "font-stretch"?: number | string;
    "font-style"?: number | string;
    "font-variant"?: number | string;
    "font-weight"?: number | string;
    format?: number | string;
    from?: number | string;
    fx?: number | string;
    fy?: number | string;
    g1?: number | string;
    g2?: number | string;
    "glyph-name"?: number | string;
    "glyph-orientation-horizontal"?: number | string;
    "glyph-orientation-vertical"?: number | string;
    glyphRef?: number | string;
    gradientTransform?: string;
    gradientUnits?: string;
    hanging?: number | string;
    "horiz-adv-x"?: number | string;
    "horiz-origin-x"?: number | string;
    href?: string;
    ideographic?: number | string;
    "image-rendering"?: number | string;
    in2?: number | string;
    in?: string;
    intercept?: number | string;
    k1?: number | string;
    k2?: number | string;
    k3?: number | string;
    k4?: number | string;
    k?: number | string;
    kernelMatrix?: number | string;
    kernelUnitLength?: number | string;
    kerning?: number | string;
    keyPoints?: number | string;
    keySplines?: number | string;
    keyTimes?: number | string;
    lengthAdjust?: number | string;
    "letter-spacing"?: number | string;
    "lighting-color"?: number | string;
    limitingConeAngle?: number | string;
    local?: number | string;
    "marker-end"?: string;
    markerHeight?: number | string;
    "marker-mid"?: string;
    "marker-start"?: string;
    markerUnits?: number | string;
    markerWidth?: number | string;
    mask?: string;
    maskContentUnits?: number | string;
    maskUnits?: number | string;
    mathematical?: number | string;
    mode?: number | string;
    numOctaves?: number | string;
    offset?: number | string;
    opacity?: number | string;
    operator?: number | string;
    order?: number | string;
    orient?: number | string;
    orientation?: number | string;
    origin?: number | string;
    overflow?: number | string;
    "overline-position"?: number | string;
    "overline-thickness"?: number | string;
    "paint-order"?: number | string;
    "panose-1"?: number | string;
    pathLength?: number | string;
    patternContentUnits?: string;
    patternTransform?: number | string;
    patternUnits?: string;
    "pointer-events"?: number | string;
    points?: string;
    pointsAtX?: number | string;
    pointsAtY?: number | string;
    pointsAtZ?: number | string;
    preserveAlpha?: number | string;
    preserveAspectRatio?: string;
    primitiveUnits?: number | string;
    r?: number | string;
    radius?: number | string;
    refX?: number | string;
    refY?: number | string;
    renderingIntent?: number | string;
    repeatCount?: number | string;
    repeatDur?: number | string;
    requiredExtensions?: number | string;
    requiredFeatures?: number | string;
    restart?: number | string;
    result?: string;
    rotate?: number | string;
    rx?: number | string;
    ry?: number | string;
    scale?: number | string;
    seed?: number | string;
    "shape-rendering"?: number | string;
    slope?: number | string;
    spacing?: number | string;
    specularConstant?: number | string;
    specularExponent?: number | string;
    speed?: number | string;
    spreadMethod?: string;
    startOffset?: number | string;
    stdDeviation?: number | string;
    stemh?: number | string;
    stemv?: number | string;
    stitchTiles?: number | string;
    "stop-color"?: string;
    "stop-opacity"?: number | string;
    "strikethrough-position"?: number | string;
    "strikethrough-thickness"?: number | string;
    string?: number | string;
    stroke?: string;
    "stroke-dasharray"?: string | number;
    "stroke-dashoffset"?: string | number;
    "stroke-linecap"?: "butt" | "round" | "square" | "inherit";
    "stroke-linejoin"?: "miter" | "round" | "bevel" | "inherit";
    "stroke-miterlimit"?: number | string;
    "stroke-opacity"?: number | string;
    "stroke-width"?: number | string;
    surfaceScale?: number | string;
    systemLanguage?: number | string;
    tableValues?: number | string;
    targetX?: number | string;
    targetY?: number | string;
    "text-anchor"?: string;
    "text-decoration"?: number | string;
    textLength?: number | string;
    "text-rendering"?: number | string;
    to?: number | string;
    transform?: string;
    u1?: number | string;
    u2?: number | string;
    "underline-position"?: number | string;
    "underline-thickness"?: number | string;
    unicode?: number | string;
    "unicode-bidi"?: number | string;
    "unicode-range"?: number | string;
    "unitsPer-em"?: number | string;
    "v-alphabetic"?: number | string;
    values?: string;
    "vector-effect"?: number | string;
    version?: string;
    "vert-adv-y"?: number | string;
    "vert-origin-x"?: number | string;
    "vert-origin-y"?: number | string;
    "v-hanging"?: number | string;
    "v-ideographic"?: number | string;
    viewBox?: string;
    viewTarget?: number | string;
    visibility?: number | string;
    "v-mathematical"?: number | string;
    widths?: number | string;
    "word-spacing"?: number | string;
    "writing-mode"?: number | string;
    x1?: number | string;
    x2?: number | string;
    x?: number | string;
    xChannelSelector?: string;
    "x-height"?: number | string;
    xlinkActuate?: string;
    xlinkArcrole?: string;
    xlinkHref?: string;
    xlinkRole?: string;
    xlinkShow?: string;
    xlinkTitle?: string;
    xlinkType?: string;
    y1?: number | string;
    y2?: number | string;
    y?: number | string;
    yChannelSelector?: string;
    z?: number | string;
    zoomAndPan?: string;
}
interface AriaAttributes {
    "aria-activedescendant"?: string;

    "aria-atomic"?: boolean | "false" | "true";
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    "aria-autocomplete"?: "none" | "inline" | "list" | "both";

    "aria-busy"?: boolean | "false" | "true";
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     *  aria-pressed  aria-selected.
     */
    "aria-checked"?: boolean | "false" | "mixed" | "true";
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     *  aria-colindex.
     */
    "aria-colcount"?: number;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     *  aria-colcount  aria-colspan.
     */
    "aria-colindex"?: number;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     *  aria-colindex  aria-rowspan.
     */
    "aria-colspan"?: number;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     *  aria-owns.
     */
    "aria-controls"?: string;

    "aria-current"?:
        | boolean
        | "false"
        | "true"
        | "page"
        | "step"
        | "location"
        | "date"
        | "time";
    /**
     * Identifies the element (or elements) that describes the object.
     *  aria-labelledby
     */
    "aria-describedby"?: string;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     *  aria-describedby.
     */
    "aria-details"?: string;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     *  aria-hidden  aria-readonly.
     */
    "aria-disabled"?: boolean | "false" | "true";
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup";
    /**
     * Identifies the element that provides an error message for the object.
     *  aria-invalid  aria-describedby.
     */
    "aria-errormessage"?: string;

    "aria-expanded"?: boolean | "false" | "true";
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    "aria-flowto"?: string;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    "aria-grabbed"?: boolean | "false" | "true";

    "aria-haspopup"?:
        | boolean
        | "false"
        | "true"
        | "menu"
        | "listbox"
        | "tree"
        | "grid"
        | "dialog";
    /**
     * Indicates whether the element is exposed to an accessibility API.
     *  aria-disabled.
     */
    "aria-hidden"?: boolean | "false" | "true";
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     *  aria-errormessage.
     */
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";

    "aria-keyshortcuts"?: string;
    /**
     * Defines a string value that labels the current element.
     *  aria-labelledby.
     */
    "aria-label"?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     *  aria-describedby.
     */
    "aria-labelledby"?: string;

    "aria-level"?: number;

    "aria-live"?: "off" | "assertive" | "polite";

    "aria-modal"?: boolean | "false" | "true";

    "aria-multiline"?: boolean | "false" | "true";

    "aria-multiselectable"?: boolean | "false" | "true";

    "aria-orientation"?: "horizontal" | "vertical";
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     *  aria-controls.
     */
    "aria-owns"?: string;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    "aria-placeholder"?: string;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     *  aria-setsize.
     */
    "aria-posinset"?: number;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     *  aria-checked  aria-selected.
     */
    "aria-pressed"?: boolean | "false" | "mixed" | "true";
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     *  aria-disabled.
     */
    "aria-readonly"?: boolean | "false" | "true";
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     *  aria-atomic.
     */
    "aria-relevant"?:
        | "additions"
        | "additions text"
        | "all"
        | "removals"
        | "text";

    "aria-required"?: boolean | "false" | "true";

    "aria-roledescription"?: string;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     *  aria-rowindex.
     */
    "aria-rowcount"?: number;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     *  aria-rowcount  aria-rowspan.
     */
    "aria-rowindex"?: number;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     *  aria-rowindex  aria-colspan.
     */
    "aria-rowspan"?: number;
    /**
     * Indicates the current "selected" state of various widgets.
     *  aria-checked  aria-pressed.
     */
    "aria-selected"?: boolean | "false" | "true";
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     *  aria-posinset.
     */
    "aria-setsize"?: number;

    "aria-sort"?: "none" | "ascending" | "descending" | "other";

    "aria-valuemax"?: number;

    "aria-valuemin"?: number;
    /**
     * Defines the current value for a range widget.
     *  aria-valuetext.
     */
    "aria-valuenow"?: number;

    "aria-valuetext"?: string;
}

type Booleanish = boolean | "true" | "false";

interface HTMLAttributes extends AriaAttributes {
    domPropsInnerHTML?: string;

    class?: classprop;
    style?: styleprop;

    accesskey?: string;
    contenteditable?: Booleanish | "inherit";
    contextmenu?: string;
    dir?: string;
    draggable?: Booleanish;
    hidden?: boolean;
    id?: string;
    lang?: string;
    placeholder?: string;
    spellcheck?: Booleanish;
    tabindex?: number | string;
    title?: string;
    translate?: "yes" | "no";

    radiogroup?: string;

    role?: string;

    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;

    autocapitalize?: string;
    autocorrect?: string;
    autocave?: string;
    color?: string;
    itemprop?: string;
    itemscope?: boolean;
    itemtype?: string;
    itemid?: string;
    itemref?: string;
    results?: number;
    security?: string;
    unselectable?: "on" | "off";

    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     *  https:
     */
    inputmode?:
        | "none"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal"
        | "search";
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     *  https:
     */
    is?: string;
}
export interface AnchorHTMLAttributes extends HTMLAttributes {
    download?: any;
    href?: string;
    hreflang?: string;
    media?: string;
    ping?: string;
    rel?: string;
    target?: string;
    type?: string;
    referrerpolicy?: string;
}
interface IntrinsicElementAttributes {
    a: AnchorHTMLAttributes;
    abbr: HTMLAttributes;
    address: HTMLAttributes;
    area: AreaHTMLAttributes;
    article: HTMLAttributes;
    aside: HTMLAttributes;
    audio: AudioHTMLAttributes;
    b: HTMLAttributes;
    base: BaseHTMLAttributes;
    bdi: HTMLAttributes;
    bdo: HTMLAttributes;
    big: HTMLAttributes;
    blockquote: BlockquoteHTMLAttributes;
    body: HTMLAttributes;
    br: HTMLAttributes;
    button: ButtonHTMLAttributes;
    canvas: CanvasHTMLAttributes;
    caption: HTMLAttributes;
    cite: HTMLAttributes;
    code: HTMLAttributes;
    col: ColHTMLAttributes;
    colgroup: ColgroupHTMLAttributes;
    data: DataHTMLAttributes;
    datalist: HTMLAttributes;
    dd: HTMLAttributes;
    del: DelHTMLAttributes;
    details: DetailsHTMLAttributes;
    dfn: HTMLAttributes;
    dialog: DialogHTMLAttributes;
    div: HTMLAttributes;
    dl: HTMLAttributes;
    dt: HTMLAttributes;
    em: HTMLAttributes;
    embed: EmbedHTMLAttributes;
    fieldset: FieldsetHTMLAttributes;
    figcaption: HTMLAttributes;
    figure: HTMLAttributes;
    footer: HTMLAttributes;
    form: FormHTMLAttributes;
    h1: HTMLAttributes;
    h2: HTMLAttributes;
    h3: HTMLAttributes;
    h4: HTMLAttributes;
    h5: HTMLAttributes;
    h6: HTMLAttributes;
    head: HTMLAttributes;
    header: HTMLAttributes;
    hgroup: HTMLAttributes;
    hr: HTMLAttributes;
    html: HtmlHTMLAttributes;
    i: HTMLAttributes;
    iframe: IframeHTMLAttributes;
    img: ImgHTMLAttributes;
    input: InputHTMLAttributes;
    ins: InsHTMLAttributes;
    kbd: HTMLAttributes;
    keygen: KeygenHTMLAttributes;
    label: LabelHTMLAttributes;
    legend: HTMLAttributes;
    li: LiHTMLAttributes;
    link: LinkHTMLAttributes;
    main: HTMLAttributes;
    map: MapHTMLAttributes;
    mark: HTMLAttributes;
    menu: MenuHTMLAttributes;
    menuitem: HTMLAttributes;
    meta: MetaHTMLAttributes;
    meter: MeterHTMLAttributes;
    nav: HTMLAttributes;
    noindex: HTMLAttributes;
    noscript: HTMLAttributes;
    object: ObjectHTMLAttributes;
    ol: OlHTMLAttributes;
    optgroup: OptgroupHTMLAttributes;
    option: OptionHTMLAttributes;
    output: OutputHTMLAttributes;
    p: HTMLAttributes;
    param: ParamHTMLAttributes;
    picture: HTMLAttributes;
    pre: HTMLAttributes;
    progress: ProgressHTMLAttributes;
    q: QuoteHTMLAttributes;
    rp: HTMLAttributes;
    rt: HTMLAttributes;
    ruby: HTMLAttributes;
    s: HTMLAttributes;
    samp: HTMLAttributes;
    script: ScriptHTMLAttributes;
    section: HTMLAttributes;
    select: SelectHTMLAttributes;
    small: HTMLAttributes;
    source: SourceHTMLAttributes;
    span: HTMLAttributes;
    strong: HTMLAttributes;
    style: StyleHTMLAttributes;
    sub: HTMLAttributes;
    summary: HTMLAttributes;
    sup: HTMLAttributes;
    table: TableHTMLAttributes;
    template: HTMLAttributes;
    tbody: HTMLAttributes;
    td: TdHTMLAttributes;
    textarea: TextareaHTMLAttributes;
    tfoot: HTMLAttributes;
    th: ThHTMLAttributes;
    thead: HTMLAttributes;
    time: TimeHTMLAttributes;
    title: HTMLAttributes;
    tr: HTMLAttributes;
    track: TrackHTMLAttributes;
    u: HTMLAttributes;
    ul: HTMLAttributes;
    var: HTMLAttributes;
    video: VideoHTMLAttributes;
    wbr: HTMLAttributes;
    webview: WebViewHTMLAttributes;

    svg: SVGAttributes;

    animate: SVGAttributes;
    animateMotion: SVGAttributes;
    animateTransform: SVGAttributes;
    circle: SVGAttributes;
    clipPath: SVGAttributes;
    defs: SVGAttributes;
    desc: SVGAttributes;
    ellipse: SVGAttributes;
    feBlend: SVGAttributes;
    feColorMatrix: SVGAttributes;
    feComponentTransfer: SVGAttributes;
    feComposite: SVGAttributes;
    feConvolveMatrix: SVGAttributes;
    feDiffuseLighting: SVGAttributes;
    feDisplacementMap: SVGAttributes;
    feDistantLight: SVGAttributes;
    feDropShadow: SVGAttributes;
    feFlood: SVGAttributes;
    feFuncA: SVGAttributes;
    feFuncB: SVGAttributes;
    feFuncG: SVGAttributes;
    feFuncR: SVGAttributes;
    feGaussianBlur: SVGAttributes;
    feImage: SVGAttributes;
    feMerge: SVGAttributes;
    feMergeNode: SVGAttributes;
    feMorphology: SVGAttributes;
    feOffset: SVGAttributes;
    fePointLight: SVGAttributes;
    feSpecularLighting: SVGAttributes;
    feSpotLight: SVGAttributes;
    feTile: SVGAttributes;
    feTurbulence: SVGAttributes;
    filter: SVGAttributes;
    foreignObject: SVGAttributes;
    g: SVGAttributes;
    image: SVGAttributes;
    line: SVGAttributes;
    linearGradient: SVGAttributes;
    marker: SVGAttributes;
    mask: SVGAttributes;
    metadata: SVGAttributes;
    mpath: SVGAttributes;
    path: SVGAttributes;
    pattern: SVGAttributes;
    polygon: SVGAttributes;
    polyline: SVGAttributes;
    radialGradient: SVGAttributes;
    rect: SVGAttributes;
    stop: SVGAttributes;
    switch: SVGAttributes;
    symbol: SVGAttributes;
    text: SVGAttributes;
    textPath: SVGAttributes;
    tspan: SVGAttributes;
    use: SVGAttributes;
    view: SVGAttributes;
}

export interface Events {
    onCopy: ClipboardEvent;
    onCut: ClipboardEvent;
    onPaste: ClipboardEvent;

    onCompositionend: CompositionEvent;
    onCompositionstart: CompositionEvent;
    onCompositionupdate: CompositionEvent;

    onDrag: DragEvent;
    onDragend: DragEvent;
    onDragenter: DragEvent;
    onDragexit: DragEvent;
    onDragleave: DragEvent;
    onDragover: DragEvent;
    onDragstart: DragEvent;
    onDrop: DragEvent;

    onFocus: FocusEvent;
    onBlur: FocusEvent;

    onChange: Event;
    onBeforeinput: Event;
    onInput: Event;
    onReset: Event;
    onSubmit: Event;
    onInvalid: Event;

    onLoad: Event;
    onError: Event;

    onKeydown: KeyboardEvent;
    onKeypress: KeyboardEvent;
    onKeyup: KeyboardEvent;

    onAuxclick: MouseEvent;
    onClick: MouseEvent;
    onContextmenu: MouseEvent;
    onDblclick: MouseEvent;
    onMousedown: MouseEvent;
    onMouseenter: MouseEvent;
    onMouseleave: MouseEvent;
    onMousemove: MouseEvent;
    onMouseout: MouseEvent;
    onMouseover: MouseEvent;
    onMouseup: MouseEvent;

    onAbort: Event;
    onCanplay: Event;
    onCanplaythrough: Event;
    onDurationchange: Event;
    onEmptied: Event;
    onEncrypted: Event;
    onEnded: Event;
    onLoadeddata: Event;
    onLoadedmetadata: Event;
    onLoadstart: Event;
    onPause: Event;
    onPlay: Event;
    onPlaying: Event;
    onProgress: Event;
    onRatechange: Event;
    onSeeked: Event;
    onSeeking: Event;
    onStalled: Event;
    onSuspend: Event;
    onTimeupdate: Event;
    onVolumechange: Event;
    onWaiting: Event;

    onSelect: Event;

    onScroll: UIEvent;

    onTouchcancel: TouchEvent;
    onTouchend: TouchEvent;
    onTouchmove: TouchEvent;
    onTouchstart: TouchEvent;

    onPointerdown: PointerEvent;
    onPointermove: PointerEvent;
    onPointerup: PointerEvent;
    onPointercancel: PointerEvent;
    onPointerenter: PointerEvent;
    onPointerleave: PointerEvent;
    onPointerover: PointerEvent;
    onPointerout: PointerEvent;

    onWheel: WheelEvent;

    onAnimationstart: AnimationEvent;
    onAnimationend: AnimationEvent;
    onAnimationiteration: AnimationEvent;

    onTransitionend: TransitionEvent;
    onTransitionstart: TransitionEvent;

    oncopy: ClipboardEvent;
    oncut: ClipboardEvent;
    onpaste: ClipboardEvent;

    oncompositionend: CompositionEvent;
    oncompositionstart: CompositionEvent;
    oncompositionupdate: CompositionEvent;

    ondrag: DragEvent;
    ondragend: DragEvent;
    ondragenter: DragEvent;
    ondragexit: DragEvent;
    ondragleave: DragEvent;
    ondragover: DragEvent;
    ondragstart: DragEvent;
    ondrop: DragEvent;

    onfocus: FocusEvent;
    onblur: FocusEvent;

    onchange: Event;
    onbeforeinput: Event;
    oninput: Event;
    onreset: Event;
    onsubmit: Event;
    oninvalid: Event;

    onload: Event;
    onerror: Event;

    onkeydown: KeyboardEvent;
    onkeypress: KeyboardEvent;
    onkeyup: KeyboardEvent;

    onauxclick: MouseEvent;
    onclick: MouseEvent;
    oncontextmenu: MouseEvent;
    ondblclick: MouseEvent;
    onmousedown: MouseEvent;
    onmouseenter: MouseEvent;
    onmouseleave: MouseEvent;
    onmousemove: MouseEvent;
    onmouseout: MouseEvent;
    onmouseover: MouseEvent;
    onmouseup: MouseEvent;

    onabort: Event;
    oncanplay: Event;
    oncanplaythrough: Event;
    ondurationchange: Event;
    onemptied: Event;
    onencrypted: Event;
    onended: Event;
    onloadeddata: Event;
    onloadedmetadata: Event;
    onloadstart: Event;
    onpause: Event;
    onplay: Event;
    onplaying: Event;
    onprogress: Event;
    onratechange: Event;
    onseeked: Event;
    onseeking: Event;
    onstalled: Event;
    onsuspend: Event;
    ontimeupdate: Event;
    onvolumechange: Event;
    onwaiting: Event;

    onselect: Event;

    onscroll: UIEvent;

    ontouchcancel: TouchEvent;
    ontouchend: TouchEvent;
    ontouchmove: TouchEvent;
    ontouchstart: TouchEvent;

    onpointerdown: PointerEvent;
    onpointermove: PointerEvent;
    onpointerup: PointerEvent;
    onpointercancel: PointerEvent;
    onpointerenter: PointerEvent;
    onpointerleave: PointerEvent;
    onpointerover: PointerEvent;
    onpointerout: PointerEvent;

    onwheel: WheelEvent;

    onanimationstart: AnimationEvent;
    onanimationend: AnimationEvent;
    onanimationiteration: AnimationEvent;

    ontransitionend: TransitionEvent;
    ontransitionstart: TransitionEvent;
}
type StringKeyOf<T> = Extract<keyof T, string>;
type EventHandlers<E> = {
    [K in StringKeyOf<E>]?: E[K] extends Function
        ? E[K]
        : (payload: E[K]) => void;
};
type ElementAttrs<T> = T & EventHandlers<Events> & Attributes;

type NativeElements = {
    [K in StringKeyOf<IntrinsicElementAttributes>]: ElementAttrs<
        IntrinsicElementAttributes[K]
    >;
};

declare global {
    namespace JSX {
        interface Element extends Virtualdom<any> {}
        interface ElementClass {}
        interface ElementAttributesProperty {}
        interface ElementChildrenAttribute {}
        interface IntrinsicClassAttributes {}
        interface IntrinsicAttributes extends Attributes {}
        interface IntrinsicElements extends NativeElements {
            [name: string]: any;
        }
    }
}

export {};
export default JSX;
