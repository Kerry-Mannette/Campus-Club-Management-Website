// Global JS for Campus Club site success modals & form handling

function initSuccessModal(formSelector, modalSelector, autoCloseMs = 2500) {
	const form = document.querySelector(formSelector);
	const modal = document.querySelector(modalSelector);
	if (!form || !modal) return; 

	function open() {
		modal.classList.add('is-open');
		modal.setAttribute('aria-hidden', 'false');
		window.addEventListener('keydown', escHandler);
		if (autoCloseMs) setTimeout(close, autoCloseMs);
	}
	function close() {
		modal.classList.remove('is-open');
		modal.setAttribute('aria-hidden', 'true');
		window.removeEventListener('keydown', escHandler);
	}
	function escHandler(e) { if (e.key === 'Escape') close(); }

	form.addEventListener('submit', e => {
		e.preventDefault();
		if (!form.checkValidity()) { form.reportValidity(); return; }
		open();
		form.reset();
	});
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
	// Sync year across pages if span#year exists
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();

	// Contact page
	initSuccessModal('.contact-form', '#successModal');
	// Registration page
	initSuccessModal('#registrationForm', '#regSuccessModal');

	// Dynamic year options for registration select#year (e.g. from current year backwards)
	const yearSelect = document.getElementById('year');
	if (yearSelect && yearSelect.tagName === 'SELECT') {
		const current = new Date().getFullYear();
		const start = current - 6; // show last 7 years incl current
		for (let yr = start; yr <= current + 1; yr++) {
			const opt = document.createElement('option');
			opt.value = String(yr);
			opt.textContent = yr === current + 1 ? yr + '+' : String(yr);
			yearSelect.appendChild(opt);
		}
	}
});
