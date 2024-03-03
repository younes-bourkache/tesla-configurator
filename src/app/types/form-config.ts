import { Color } from "./color";
import { Config } from "./config";
import { Model } from "./model";

export type FormConfig = {
    model: Model;
    color: Color;
    config: Config;
    towHitch: boolean,
    yoke: boolean
}