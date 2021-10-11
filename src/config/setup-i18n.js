/* eslint-disable no-unused-vars */
import VueI18n from 'vue-i18n';


export function setupAndGetI18n(Vue, _isProduction) {
    Vue.use(VueI18n);

    const i18n = new VueI18n({
        locale: 'pt-br',
        fallbackLocale: 'pt-br',
        fallbackRoot: false,
        silentTranslationWarn: true,

        missing(_locale, key, _vm) {
            // TODO
            return key;
        }
    });

    i18n.setLocaleMessage('en', require('../../src/i18n/en.json'));
    i18n.setLocaleMessage('de', require('../../src/i18n/de.json'));
    i18n.setLocaleMessage('pt-br', require('../../src/i18n/pt-br.json'));

    return i18n;
}
