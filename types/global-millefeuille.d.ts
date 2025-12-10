// @ts-check
import {LayerSystem} from "./millefeuille.d.ts"

declare global {
    function createLayerSystem(options?: object): LayerSystem;
    // type CreateLayerSystemResult = ReturnType<typeof createLayerSystem>;
}