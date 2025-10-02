(function(){
	"use strict";

	var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHN30ikgbL3HXTwLG_hnECN5F_kz0lwyLjtIrKX5tAmE-TBkF3fcP2KFvgeDI-PdRiGA/exec"; // TODO: paste your deployed Apps Script Web App URL here

	var form = document.getElementById("signup-form");
	var statusEl = document.getElementById("form-status");
	var submitBtn = document.getElementById("submit-btn");
	var yearEl = document.getElementById("year");
	if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

	function setStatus(message, type){
		statusEl.textContent = message || "";
		statusEl.className = "form-msg" + (type ? " " + type : "");
	}

	function validateEmail(email){
		return /.+@.+\..+/.test(email);
	}

	function disableForm(disabled){
		if(disabled){
			submitBtn.disabled = true;
			submitBtn.style.opacity = 0.8;
		}else{
			submitBtn.disabled = false;
			submitBtn.style.opacity = 1;
		}
	}

	async function handleSubmit(e){
		e.preventDefault();
		setStatus("", "");

		var formData = new FormData(form);
		var name = (formData.get("name") || "").toString().trim();
		var email = (formData.get("email") || "").toString().trim();
		var company = (formData.get("company") || "").toString().trim();
		var notes = (formData.get("notes") || "").toString().trim();

		if(!email){
			setStatus("Email is required.", "error");
			return;
		}
		if(!validateEmail(email)){
			setStatus("Please enter a valid email.", "error");
			return;
		}
		if(!APPS_SCRIPT_URL){
			setStatus("Configuration needed. Add your Apps Script URL in script.js.", "error");
			return;
		}

		var payload = {
			name: name,
			email: email,
			company: company,
			notes: notes,
			userAgent: navigator.userAgent,
			timestamp: new Date().toISOString()
		};

		try{
			disableForm(true);
			setStatus("Submitting…", "");

			var res = await fetch(APPS_SCRIPT_URL, {
				method: "POST",
				headers: {"Content-Type":"application/json"},
				body: JSON.stringify(payload),
				mode: "no-cors"
			});

			// Treat opaque responses (common for Apps Script) as success because the request reaches the script
			var isSuccess = !!res && (res.ok || res.type === "opaque" || res.status === 0);

			if(isSuccess){
				// Best-effort read; ignore errors if CORS prevents reading the body
				try{ await res.clone().json(); }catch(_){ /* ignore */ }
				form.reset();
				setStatus("Thanks! You're on the list.", "success");
				return;
			}

			// If not success, try to surface any available error text
			var msg = "";
			try{ msg = await res.text(); }catch(_){ }
			throw new Error("Request failed: " + (res && res.status) + (msg ? (" - " + msg) : ""));
		} catch(err){
			console.error(err);
			setStatus("Something went wrong. Please try again.", "error");
		} finally{
			disableForm(false);
		}
	}

	if(form){
		form.addEventListener("submit", handleSubmit);
	}
})();

