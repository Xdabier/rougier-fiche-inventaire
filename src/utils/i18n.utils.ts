import I18n, {TranslateOptions} from 'i18n-js';
import memoize from 'lodash.memoize';
import syncStorage from '../core/services/sync-storage.service';
import CURRENT_LANGUAGE from '../core/constants/storage-keys.constant';

const translationGetters: {
    [local: string]: object;
} = {
    en: require('../assets/json/i18n/en.json'),
    fr: require('../assets/json/i18n/fr.json')
};

const translate = memoize(
    (key, config?: TranslateOptions) =>
        config ? I18n.t(key, config) : I18n.t(key),
    (key, config?: TranslateOptions) =>
        config ? key + JSON.stringify(config) : key
);

const setI18nConfig = (lang?: string) => {
    const fallback = {languageTag: 'fr'};
    const bestLang = syncStorage.get(CURRENT_LANGUAGE)
        ? {languageTag: syncStorage.get(CURRENT_LANGUAGE)}
        : {languageTag: 'fr'};
    const {languageTag} = bestLang || fallback;

    if (translate && translate.cache && translate.cache.clear) {
        translate.cache.clear();
    }

    I18n.translations = {
        [lang || languageTag]: translationGetters[lang || languageTag]
    };
    I18n.locale = lang || languageTag;
};

export {setI18nConfig, translate, I18n};
