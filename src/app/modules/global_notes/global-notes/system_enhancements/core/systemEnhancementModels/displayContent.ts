import { DisplayModule } from "src/app/modules/common/core/displayModule";
import { ViewSystemEnhancement } from "./viewSystemEnhancement";

export interface DisplayTable {
    Module: DisplayModule;
    ExpandedContent: ViewSystemEnhancement[];
}