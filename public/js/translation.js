const translation = () => {
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
        updateTranslations();

        // Handle language switch
        document.querySelectorAll('.change-language').forEach((element) => {
          element.addEventListener('click', () => {
            const selectedLang = element.getAttribute('data-lang');
            i18next.changeLanguage(selectedLang, updateTranslations);
            localStorage.setItem('language', selectedLang); 
          });
        });
      }
    );

  function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      element.textContent = i18next.t(key);
    });
  }
};

export default translation;
