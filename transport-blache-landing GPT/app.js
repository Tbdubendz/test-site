(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var quoteForm = document.getElementById('quoteForm');
  var formStatus = document.getElementById('formStatus');

  if (quoteForm) {
    quoteForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(quoteForm);
      var name = (formData.get('name') || '').toString().trim();
      var phone = (formData.get('phone') || '').toString().trim();
      var service = (formData.get('service') || '').toString().trim();
      var details = (formData.get('details') || '').toString().trim();

      if (!name || !phone || !details) {
        if (formStatus) {
          formStatus.textContent = 'Merci de compléter les champs obligatoires.';
        }
        return;
      }

      var subject = encodeURIComponent('Demande de devis - ' + service);
      var body = encodeURIComponent(
        'Nom : ' + name + '\n' +
        'Téléphone : ' + phone + '\n' +
        'Prestation : ' + service + '\n\n' +
        'Détails :\n' + details
      );

      window.location.href = 'mailto:transportblache@gmail.com?subject=' + subject + '&body=' + body;

      if (formStatus) {
        formStatus.textContent = 'Votre application email va s\'ouvrir pour envoyer la demande.';
      }
    });
  }

  if (!prefersReduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
