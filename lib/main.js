"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NAME = 'cognito';
function log(msg, output) {
    console.log(`<@${NAME}>: ${msg}`, output);
}
// @ts-ignore
function start({ arc, cloudformation, inventory, stage }) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = arc[NAME];
        if (config) {
            let defaultStages = ['staging'];
            const configuredPragmas = [];
            // Parse project manifest @cognito options
            for (const option of config) {
                if (Array.isArray(option)) {
                    if (option[0] === 'environments') {
                        defaultStages = [...option.slice(1)];
                    }
                    else {
                        log('Invalid config:', option);
                    }
                }
                else if (typeof option === 'string') {
                    configuredPragmas.push(option);
                }
                else {
                    log('Invalid config:', option);
                }
            }
            if (!defaultStages.includes(stage)) {
                log(`"${stage}" environment not included in configuration.`);
                return;
            }
        }
    });
}
exports.default = { deploy: { start } };
