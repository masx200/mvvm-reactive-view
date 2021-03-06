import extenddirectives from "./extend-directive";
import { Localchecked } from "./Localchecked";
import { Localcreated } from "./Localcreated";
import { localfor } from "./localfor";
import { Localhtml } from "./Localhtml";
import { Localmounted } from "./Localmounted";
import { Localref } from "./Localref";
import { Localtext } from "./Localtext";
import { Localunmounted } from "./Localunmounted";
import { Localupdated } from "./Localupdated";
import { Localvalue } from "./Localvalue";
extenddirectives("ref", Localref);
extenddirectives("html", Localhtml);
extenddirectives("text", Localtext);
extenddirectives("value", Localvalue);
extenddirectives("checked", Localchecked);
const Directives = extenddirectives;
Directives("mounted", Localmounted);
Directives("unmounted", Localunmounted);
Directives("updated", Localupdated);
Directives("created", Localcreated);
extenddirectives("for", localfor);
