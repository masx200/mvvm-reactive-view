import * as CSS from "csstype";
interface Htmlelementconstructor {
    new (): HTMLElement;
    prototype: HTMLElement;
    defaultProps?: Record<string, any>;
    css?: string;
}
declare const createComponent: (
    custfun: Htmlelementconstructor | Custom
) => Htmlelementconstructor;
type Primitivetype = string | number | boolean | undefined | bigint;
interface Listener {
    (): any;
}
declare const addonelistner: unique symbol;
declare const removeonelistner: unique symbol;
declare const cancelsubscribe: unique symbol;
declare const debouncedispatch: unique symbol;
declare const Targetsymbol: unique symbol;
declare const memlisteners: unique symbol;
declare const dispatchsymbol: unique symbol;
declare const subscribesymbol: unique symbol;
declare const removeallistenerssymbol: unique symbol;
declare const addallistenerssymbol: unique symbol;
declare const tagtypesym: unique symbol;
declare class ReactiveState<T> {
    constructor(init: { value: T });
    constructor(init: { get: () => T; set?: (v: T) => void });
    private [tagtypesym];
    value: T extends Array<any>
        ? Array<any>
        : T extends Function
        ? Function
        : T extends string
        ? string
        : T extends number
        ? number
        : T extends boolean
        ? boolean
        : T extends void
        ? void
        : T extends symbol
        ? symbol
        : T extends bigint
        ? bigint
        : T extends object
        ? T
        : never;
    readonly [Symbol.toStringTag] = "ReactiveState";
    private [debouncedispatch];
    [removeallistenerssymbol](): void;
    [removeonelistner](callback: Listener): void;
    [addonelistner](callback: Listener): void;
    [addallistenerssymbol](): void;
    private [Targetsymbol];
    private [memlisteners];
    valueOf: () => T extends any[]
        ? any[]
        : T extends Function
        ? Function
        : T extends string
        ? string
        : T extends number
        ? number
        : T extends boolean
        ? boolean
        : T extends void
        ? void
        : T extends symbol
        ? symbol
        : T extends bigint
        ? bigint
        : T extends object
        ? T
        : never;
    toString(): string;
    [dispatchsymbol](): void;
    [subscribesymbol](eventlistener: Listener): void;
    [cancelsubscribe](eventlistener: Listener): void;
    [Symbol.toPrimitive](): string | undefined | Primitivetype;
}
type VaildVDom =
    | Virtualdom<any>
    | string
    | number
    | Vdomchildren
    | ReactiveState<any>;
interface Custom {
    (
        props?: Record<string, ReactiveState<string>>,
        children?: Vdomchildren
    ): VaildVDom;
    defaultProps?: Record<string, string>;
    css?: string;
}
type styleprop =
    | string
    | object
    | ReactiveState<string>
    | ReactiveState<object>;
type classprop =
    | string
    | Set<string>
    | Array<string>
    | ReactiveState<string | Set<string> | Array<string>>;
interface ElementAttrs {
    style?: styleprop;
    class?: classprop;
    [key: string]: any;
}
declare function h<T extends Htmlelementconstructor | string | Custom>(
    type: T,
    propsorchildren?: Vdomchildren,
    ...children: Vdomchildren
): Virtualdom<T>;
declare function h<T extends Vdomchildren>(
    type: "",
    propsorchildren?: T,
    ...children: T
): T;
declare function h<T extends Vdomchildren>(
    type: "",
    props?: ElementAttrs,
    ...children: T
): T;
declare function h<T extends Htmlelementconstructor | string | Custom>(
    type: T,
    props?: ElementAttrs,
    ...children: Vdomchildren
): Virtualdom<T>;
type Vdomchildren = Array<VaildVDom>;
interface Virtualdom<T extends Htmlelementconstructor | string | Function> {
    readonly [Symbol.toStringTag]: "VirtualElement";
    readonly type: T;
    readonly props: ElementAttrs;
    readonly children: Vdomchildren;
    readonly directives: Record<string, any>;
    readonly onevent: Record<string, Array<EventListener>>;
    readonly bindattr: Record<string, ReactiveState<any>>;
}
interface attrfor<T> extends Array<any> {
    0: ReactiveState<Array<T>>;
    1: (v: ReactiveState<T>, i: number) => Virtualdom<any>;
}
interface Attributes {
    $ref?:
        | {
              value?: Element;
          }
        | ((value: Element) => void);
    $html?: string | ReactiveState<string>;
    $text?: string | ReactiveState<string>;
    $value?: ReactiveState<string>;
    $checked?: ReactiveState<boolean>;
    $mounted?: () => void;
    $unmounted?: () => void;
    $updated?: () => void;
    $created?: () => void;
    $for?: attrfor<any>;
}
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
interface BlockquoteHTMLAttributes$0 extends HTMLAttributes {
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
    "aria-autocomplete"?: "none" | "inline" | "list" | "both";
    "aria-busy"?: boolean | "false" | "true";
    "aria-checked"?: boolean | "false" | "mixed" | "true";
    "aria-colcount"?: number;
    "aria-colindex"?: number;
    "aria-colspan"?: number;
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
    "aria-describedby"?: string;
    "aria-details"?: string;
    "aria-disabled"?: boolean | "false" | "true";
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup";
    "aria-errormessage"?: string;
    "aria-expanded"?: boolean | "false" | "true";
    "aria-flowto"?: string;
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
    "aria-hidden"?: boolean | "false" | "true";
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling";
    "aria-keyshortcuts"?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-level"?: number;
    "aria-live"?: "off" | "assertive" | "polite";
    "aria-modal"?: boolean | "false" | "true";
    "aria-multiline"?: boolean | "false" | "true";
    "aria-multiselectable"?: boolean | "false" | "true";
    "aria-orientation"?: "horizontal" | "vertical";
    "aria-owns"?: string;
    "aria-placeholder"?: string;
    "aria-posinset"?: number;
    "aria-pressed"?: boolean | "false" | "mixed" | "true";
    "aria-readonly"?: boolean | "false" | "true";
    "aria-relevant"?:
        | "additions"
        | "additions text"
        | "all"
        | "removals"
        | "text";
    "aria-required"?: boolean | "false" | "true";
    "aria-roledescription"?: string;
    "aria-rowcount"?: number;
    "aria-rowindex"?: number;
    "aria-rowspan"?: number;
    "aria-selected"?: boolean | "false" | "true";
    "aria-setsize"?: number;
    "aria-sort"?: "none" | "ascending" | "descending" | "other";
    "aria-valuemax"?: number;
    "aria-valuemin"?: number;
    "aria-valuenow"?: number;
    "aria-valuetext"?: string;
}
type CSSProperties = CSS.Properties<string | number>;
type Booleanish = boolean | "true" | "false";
type styleprop$0 =
    | CSSProperties
    | string
    | object
    | ReactiveState<string>
    | ReactiveState<object>;
type classprop$0 =
    | string
    | Set<string>
    | Array<string>
    | ReactiveState<string | Set<string> | Array<string>>;
interface HTMLAttributes extends AriaAttributes {
    domPropsInnerHTML?: string;
    class?: classprop$0;
    style?: styleprop$0;
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
    inputmode?:
        | "none"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal"
        | "search";
    is?: string;
}
interface AnchorHTMLAttributes extends HTMLAttributes {
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
    blockquote: BlockquoteHTMLAttributes$0;
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
interface Events {
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
type ElementAttrs$0<T> = T & EventHandlers<Events> & Attributes;
type NativeElements = {
    [K in StringKeyOf<IntrinsicElementAttributes>]: ElementAttrs$0<
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
declare const Condition: (
    conditon: boolean | ReactiveState<boolean>,
    iftrue?: string | Virtualdom<any> | undefined,
    iffalse?: string | Virtualdom<any> | undefined
) => Virtualdom<Htmlelementconstructor>;
declare function Switchable(
    funstate: ReactiveState<Htmlelementconstructor | Custom>
): Virtualdom<Htmlelementconstructor>;
declare function html(
    ...args: any[]
): Virtualdom<any> | Vdomchildren | string | number | ReactiveState<any>;
interface Ref<T = any | undefined> {
    value: T | undefined;
}
declare function createRef<T = any | undefined>(value?: T): Ref<T>;
interface Extendfun {
    (
        value: unknown,
        element: Element,
        vdom: Virtualdom<any>,
        onmounted: (call: () => void) => void,
        onunmounted: (call: () => void) => void,
        onupdated: (call: () => void) => void
    ): void;
}
declare function extenddirectives(name: string, fun: Extendfun): void;
declare const Directives: typeof extenddirectives;
declare function useCreated(fun: () => void): void;
declare function useUpdated(fun: () => void): void;
declare function useMounted(fun: () => void): void;
declare function useUnMounted(fun: () => void): void;
declare function MountElement<T extends Element>(
    vdom: VaildVDom | Node | Element | Array<Node | Element>,
    container: T
): T;
type CancelWatchfun = () => void;
type any = any;
interface gettercallback<T> {
    (...args: any[]): T;
}
declare function watch<T extends any>(
    state: ReactiveState<T> | Array<ReactiveState<T>>,
    callback: gettercallback<void>
): CancelWatchfun;
declare const computed: <T extends any>(
    state: ReactiveState<T> | ReactiveState<T>[],
    callback: gettercallback<T>,
    setter?: SetterFun | undefined
) => ReactiveState<T>;
type SetterFun = (v: any) => void;
declare function createState<T extends any>(
    init: ReactiveState<T>
): ReactiveState<T>;
declare function createState<T extends any>(
    init: Exclude<T, ReactiveState<any>> | undefined
): ReactiveState<T>;
declare function render(
    vdom: Virtualdom<any> | string,
    namespace?: string
): Node;
declare function render(
    vdom: Virtualdom<string | Function>,
    namespace?: string
): Element;
declare function render(
    vdom: Virtualdom<"script" | "" | "html">,
    namespace?: string
): Node;
declare function render(
    vdom: Vdomchildren,
    namespace?: string
): Array<Node | Element>;
declare function render(
    vdom: string | ReactiveState<any> | number,
    namespace?: string
): Node;
declare function render(
    vdom: Array<Virtualdom<any>>,
    namespace?: string
): Array<Element>;
declare function render(
    vdom: Array<string | ReactiveState<any> | number>,
    namespace?: string
): Array<Node>;
export {
    render,
    computed,
    useMounted,
    useUnMounted,
    createComponent,
    html,
    h,
    h as createElement,
    MountElement,
    createRef,
    createState,
    watch,
    Directives,
    Condition,
    Switchable,
    useUpdated,
    useCreated,
    JSX
};
