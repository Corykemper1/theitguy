export const metadata = {
  title: 'Privacy Notice | The IT Guy',
  description: 'How The IT Guy handles website and service-request information.',
};

export default function Privacy() {
  return <main className="legal-page"><div className="legal-wrap">
    <a className="brand" href="/"><img src="/translogo.png" alt="" width="52" height="52" /><span><strong>The IT Guy</strong><small>Commercial IT field services</small></span></a>
    <p className="eyebrow dark"><span /> Privacy notice</p><h1>Your information should have one job: helping us respond.</h1><p className="legal-updated">Last updated September 1, 2026</p>
    <h2>Information we collect</h2><p>When you request service, we may collect your name, company, phone number, email address, site location, requested service, and the information you include in your message. We also capture basic attribution information such as referral page, landing page, advertising click ID, and campaign tags when they are present.</p>
    <h2>How we use it</h2><p>We use this information to evaluate and respond to service requests, coordinate work, maintain business records, improve the website, measure advertising results, and prevent abuse. We do not sell personal information.</p>
    <h2>Service providers</h2><p>Formspree processes website forms, and Google provides advertising measurement. These providers may process information under their own privacy and security terms.</p>
    <h2>Retention and choices</h2><p>We retain service-request information as reasonably needed for communication, operations, records, and legal obligations. You may ask us to correct or delete information you submitted, subject to records we must retain.</p>
    <a className="button" href="/#request-service">Return to service request</a>
  </div></main>;
}
