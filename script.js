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
		var firstName = (formData.get("firstName") || "").toString().trim();
		var lastName = (formData.get("lastName") || "").toString().trim();
		var year = (formData.get("year") || "").toString().trim();
		var make = (formData.get("make") || "").toString().trim();
		var model = (formData.get("model") || "").toString().trim();
		var state = (formData.get("state") || "").toString().trim();
		var streetAddress = (formData.get("streetAddress") || "").toString().trim();
		var city = (formData.get("city") || "").toString().trim();
		var zipCode = (formData.get("zipCode") || "").toString().trim();
		var email = (formData.get("email") || "").toString().trim();
		var phone = (formData.get("phone") || "").toString().trim();

		if(!firstName || !lastName){
			setStatus("First name and last name are required.", "error");
			return;
		}
		if(!email){
			setStatus("Email is required.", "error");
			return;
		}
		if(!validateEmail(email)){
			setStatus("Please enter a valid email.", "error");
			return;
		}
		if(!year || !make || !model || !state || !streetAddress || !city || !zipCode || !phone){
			setStatus("All fields are required.", "error");
			return;
		}
		if(!APPS_SCRIPT_URL){
			setStatus("Configuration needed. Add your Apps Script URL in script.js.", "error");
			return;
		}

		var payload = {
			firstName: firstName,
			lastName: lastName,
			year: year,
			make: make,
			model: model,
			state: state,
			streetAddress: streetAddress,
			city: city,
			zipCode: zipCode,
			email: email,
			phone: phone,
			userAgent: navigator.userAgent,
			timestamp: new Date().toISOString()
		};

		// Debug: Log the payload being sent
		console.log("Form data being sent:", payload);

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
			setStatus("Thanks! Your information has been submitted.", "success");
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

