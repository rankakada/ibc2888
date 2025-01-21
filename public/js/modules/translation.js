export const translation = () => {
  const savedLang = localStorage.getItem('language') || 'en';

  i18next
    .use(i18nextHttpBackend)
    .init(
      {
        lng: savedLang, 
        fallbackLng: 'en',
        backend: {
          loadPath: '/locales/{{lng}}.json',
        },
      },
      function () {
        // Handle language switch
        $('.change-language').on('click', function () {
          const selectedLang = $(this).data('lang');
          i18next.changeLanguage(selectedLang, () => {
            updateTranslations();
            updatePlaceholders();
          });
          localStorage.setItem('language', selectedLang);
        });

        updateTranslations();
        updatePlaceholders();
      }
    );

  function updateTranslations() {
    $('[data-i18n]').each(function () {
      const key = $(this).data('i18n');
      $(this).text(i18next.t(key));
    });
  }

  function updatePlaceholders() {
    $('[data-i18n-placeholder]').each(function () {
      const key = $(this).data('i18n-placeholder');
      $(this).attr('placeholder', i18next.t(key));
    });
  }

  window.handleLanguageChange = () => {
    $("[data-i18n]").each(function () {
      const i18nKey = $(this).data("i18n");
      if (i18nKey) {
        $(this).html(i18next.t(i18nKey));
      }
    });
    $('[data-i18n-error]').each(function () {
      const errorKey = $(this).data('i18n-error');
      if (errorKey) {
        $(this).html(i18next.t(errorKey));
      }
    });
  };
};
