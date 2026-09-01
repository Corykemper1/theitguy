const attributionKeys = ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function leadAttribution() {
  const params = new URLSearchParams(window.location.search);
  const values = {};
  attributionKeys.forEach((key) => {
    const value = params.get(key) || sessionStorage.getItem(`lead_${key}`) || '';
    if (value) {
      values[key] = value;
      sessionStorage.setItem(`lead_${key}`, value);
    }
  });
  values.landing_page = window.location.href;
  values.referrer = document.referrer;
  return values;
}

function sendLeadEvent(eventName, details) {
  if (typeof gtag !== 'function') return;
  gtag('event', eventName, Object.assign({ event_category: 'lead', page_location: window.location.href }, details || {}));
}

document.querySelectorAll('.track-call').forEach((link) => {
  link.addEventListener('click', () => {
    sendLeadEvent('phone_call_click', { phone_number: '+16205913188', link_text: (link.textContent || '').trim() });
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => sendLeadEvent('email_link_click', { link_url: link.href }));
});

document.querySelectorAll('a[href="#request-service"]').forEach((link) => {
  link.addEventListener('click', () => sendLeadEvent('request_service_click', { link_text: (link.textContent || '').trim() }));
});

document.querySelectorAll('.service-form').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';
    status.classList.remove('error');
    status.textContent = '';

    const data = new FormData(form);
    Object.entries(leadAttribution()).forEach(([key, value]) => data.set(key, value));

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Request failed');
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          send_to: 'AW-18358813765/WWzoCIShzt8cEMWIlbJE'
        });
      }
      form.reset();
      status.textContent = 'Thanks — your request was sent. We’ll be in touch.';
    } catch {
      status.classList.add('error');
      status.textContent = 'That did not go through. Please try again.';
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});
