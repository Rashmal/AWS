import { DisplayModule } from "src/app/modules/common/core/displayModule";
import { ViewBugFix } from "./viewBugFix";

export interface DisplayTable {
    Module: DisplayModule;
    ExpandedContent: ViewBugFix[];
    TotalList: number;
}