import type { RefObject } from "react";
import type { Dataset } from "../../types/Dataset";
import type { VisMapping } from "../../types/Visualization";

export default abstract class VisHandler {
    protected abstract constructVisSpec(dataset: Dataset, visMapping: VisMapping): unknown;
    public abstract renderVis(dataset: Dataset, visMapping: VisMapping, containerRef?: RefObject<HTMLDivElement | null>): unknown;
}