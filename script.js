(function(){
	"use strict";

	var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHN30ikgbL3HXTwLG_hnECN5F_kz0lwyLjtIrKX5tAmE-TBkF3fcP2KFvgeDI-PdRiGA/exec"; // TODO: paste your deployed Apps Script Web App URL here

	// Vehicle data: Make -> Models
	var vehicleData = {
		"Acura": ["ADX", "ILX", "Integra", "MDX", "RDX", "RLX", "TL", "TLX", "TSX", "ZDX", "CL", "Legend", "NSX", "RL", "RSX", "Vigor"],
		"Alfa Romeo": ["Giulia", "Stelvio", "Tonale", "164", "4C", "8C Competizione", "Giulietta", "GTV", "Montreal", "Spider"],
		"Audi": ["A3", "A4", "A4 Allroad", "A5", "A5 Sportback", "A6", "A6 Allroad", "A6 e-tron Sportback", "A7", "A8", "e-tron", "e-tron GT", "Q3", "Q4 e-tron", "Q4 e-tron Sportback", "Q5", "Q5 Hybrid Plug-in", "Q5 Sportback", "Q6 e-tron", "Q6 e-tron Sportback", "Q7", "Q8", "Q8 e-tron", "Q8 e-tron Sportback", "R8", "RS 3", "RS 5", "RS 5 Sportback", "RS 6 Avant", "RS 7", "RS e-tron GT", "RS Q8", "S e-tron GT", "S3", "S4", "S5", "S5 Sportback", "S6", "S6 e-tron Sportback", "S7", "S8", "SQ5", "SQ5 Sportback", "SQ6 e-tron", "SQ6 e-tron Sportback", "SQ7", "SQ8", "SQ8 e-tron", "SQ8 e-tron Sportback", "TT", "100", "A3 Sportback", "A4 Avant", "Allroad", "Cabriolet", "e-tron S", "Q5 Hybrid", "RS 4", "RS 6", "S4 Avant", "TT RS", "TTS"],
		"Bentley": ["Bentayga", "Bentayga Hybrid", "Continental Flying Spur", "Continental GT", "Continental GTC", "Flying Spur", "Arnage", "Azure", "Continental R", "Continental Supersports", "Continental T", "Eight", "Mark VI", "Mulsanne", "R-Type", "S1", "T1", "Turbo R"],
		"BMW": ["1 Series", "2 Series", "3 Series", "3 Series Gran Turismo", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i4", "i5", "i7", "i8", "iX", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X3 M", "X4", "X4 M", "X5", "X5 M", "X6", "X6 M", "X7", "XM", "Z3", "Z4", "1M", "2000", "2002", "3.0 CSL", "3.0CS", "5 Series Gran Turismo", "6 Series Gran Turismo", "ActiveHybrid 7", "Bavaria", "Isetta", "M", "Z3 M", "Z4 M", "Z8"],
		"Buick": ["Cascada", "Enclave", "Encore", "Encore GX", "Envision", "Envista", "LaCrosse", "LeSabre", "Lucerne", "Regal", "Regal Sportback", "Verano", "Allure", "Centurion", "Century", "Electra", "Gran Sport", "Park Avenue", "Rainier", "Reatta", "Regal TourX", "Rendezvous", "Riviera", "Roadmaster", "Skylark", "Special", "Super", "Terraza"],
		"Cadillac": ["ATS", "CT4", "CT4-V Blackwing", "CT5", "CT5-V Blackwing", "CT6", "CTS", "CTS Coupe", "CTS-V", "DeVille", "DTS", "Eldorado", "Escalade", "Escalade ESV", "Escalade IQ", "Escalade IQL", "Escalade-V", "LYRIQ", "LYRIQ-V", "OPTIQ", "SRX", "VISTIQ", "XLR", "XT4", "XT5", "XT6", "XTS", "355A", "Allante", "ATS Coupe", "ATS-V", "ATS-V Coupe", "Brougham", "Catera", "CT6 Hybrid Plug-In ", "CT6-V", "CTS Sport Wagon", "CTS-V Coupe", "CTS-V Wagon", "ELR", "Escalade EXT", "Escalade Hybrid", "Fleetwood", "LaSalle", "Series 62", "Series 75", "Seville", "Sixty Special", "STS", "STS-V", "XLR-V"],
		"Chevrolet": ["Avalanche", "Aveo", "Blazer", "Blazer EV", "Bolt EUV", "Bolt EV", "BrightDrop", "C/K 1500", "Camaro", "Captiva Sport", "Chevelle", "City Express", "Cobalt", "Colorado", "Corvette", "Corvette E-Ray", "Cruze", "Equinox", "Equinox EV", "Express", "Express Cargo", "Express Chassis", "HHR", "Impala", "Impala Limited", "Malibu", "Monte Carlo", "S-10", "Silverado 1500", "Silverado 2500HD", "Silverado 3500", "Silverado 3500HD", "Silverado 3500HD Chassis", "Silverado 4500HD Chassis", "Silverado 5500HD Chassis", "Silverado 6500HD Chassis", "Silverado EV", "Sonic", "Spark", "SS", "SSR", "Suburban", "Tahoe", "Trailblazer", "Traverse", "Trax", "Volt", "150", "210", "3100", "3600", "4400", "Apache", "Astro", "Astro Cargo", "Bel Air", "Beretta", "Biscayne", "Brookwood", "C/K 10", "C/K 20", "C/K 2500", "C/K 30", "C/K 3500", "Caprice", "Cavalier", "Celebrity", "Chevy II", "Chevy Van", "Classic", "Confederate", "Corsica", "Corvair", "Delray", "Deluxe", "El Camino", "Fleetline", "Fleetmaster", "Lumina", "Lumina Minivan", "LUV", "Malibu Hybrid", "Malibu Maxx", "Master", "Master 85", "Master Deluxe", "Metro", "Nomad", "Nova", "Prizm", "R/V 10", "R/V 20", "R/V 3500", "S-10 Blazer", "Series AE Independence", "Silverado 1500 Hybrid", "Silverado 1500HD", "Silverado 2500", "Silverado 4500HD", "Silverado 5500HD", "Silverado 6500HD", "Silverado Classic 1500", "Silverado Classic 1500HD", "Silverado Classic 2500HD", "Silverado Classic 3500", "Silverado Hybrid", "Silverado SS", "Spark EV", "Special Deluxe", "Superior", "Tahoe Hybrid", "Tracker", "Trailblazer EXT", "Uplander", "Vega", "Venture"],
		"Chrysler": ["200", "300", "Crossfire", "Pacifica", "Pacifica Hybrid", "PT Cruiser", "Sebring", "Town & Country", "Voyager", "300M", "Aspen", "Cirrus", "Concorde", "Conquest", "Cordoba", "Crossfire SRT-6", "Fifth Avenue", "Imperial", "Le Baron", "LHS", "New Yorker", "Newport", "Prowler", "TC"],
		"Dodge": ["Avenger", "Caliber", "Challenger", "Charger", "Charger Daytona", "Dakota", "Dart", "Durango", "Grand Caravan", "Hornet", "Journey", "Nitro", "RAM 1500", "RAM 2500", "RAM 3500", "Viper", "330", "400", "440", "600", "Aspen", "B-Series", "Caravan", "Colt", "Coronet", "D100", "Daytona", "Diplomat", "Intrepid", "Magnum", "Monaco", "Neon", "Neon SRT-4", "Omni", "Polara", "Power Wagon", "RAM", "RAM 100", "RAM 150", "RAM 250", "RAM 350", "RAM 3500 Chassis ", "RAM 4500 Chassis ", "RAM 50 Pickup", "RAM Van", "RAM Wagon", "Ramcharger", "Shadow", "Sprinter Cargo", "Sprinter Passenger", "Stealth", "Stratus", "Super Bee"],
		"Ferrari": ["296 GTB", "296 GTS", "488", "812", "F8", "Portofino", "Roma", "SF90", "250 GTE", "275 GTB/4", "308", "328", "348", "360", "360 Spider", "365", "365 GTC/4", "430 Scuderia", "456", "456M", "458", "512TR", "550", "575M", "599 GTB Fiorano", "612 Scaglietti", "California", "California T", "Dino 246", "Dino 308", "F12 Berlinetta", "F12TDF", "F355", "F40", "F430", "F430 Spider", "FF", "GTC4Lusso", "GTC4Lusso T", "LaFerrari", "Mondial", "Purosangue", "Superamerica", "Testarossa"],
		"Ford": ["Bronco", "Bronco Raptor", "Bronco Sport", "C-Max Energi", "C-Max Hybrid", "Crown Victoria", "E-Series", "E-Series Chassis", "E-Transit", "EcoSport", "Edge", "Escape", "Escape Hybrid", "Escape Hybrid Plug-in", "Excursion", "Expedition", "Explorer", "Explorer Hybrid", "Explorer Sport Trac", "F-150", "F-150 Lightning", "F-250", "F-250 Super Duty", "F-350 Super Duty", "F-350 Super Duty Chassis", "F-450 Super Duty", "F-450 Super Duty Chassis", "F-550 Super Duty Chassis", "F-600 Super Duty", "F-650 Super Duty", "Fiesta", "Flex", "Focus", "Focus RS", "Fusion", "Fusion Energi", "Fusion Hybrid", "Maverick", "Model A", "Mustang", "Mustang Mach-E", "Mustang Shelby GT350", "Mustang Shelby GT500", "Mustang SVT Cobra", "Ranger", "Taurus", "Thunderbird", "Transit Cargo", "Transit Chassis", "Transit Connect", "Transit Passenger", "Aerostar", "Bronco II", "Contour", "Contour SVT", "Country Squire", "Coupe", "Courier", "Crestline", "Custom", "Customline", "Deluxe", "Econoline Chassis", "Econoline Pickup", "Econoline Wagon", "Escort", "Explorer Sport", "F-100", "F-150 Heritage", "F-150 SVT Lightning", "F-350", "F-550 Super Duty", "F1", "Fairlane", "Fairlane 500", "Falcon", "Five Hundred", "Focus Electric", "Focus SVT", "Freestar", "Freestyle", "Futura", "Galaxie", "Galaxie 500", "Granada", "GT", "GT40", "LTD", "LTD Crown Victoria", "Mainline", "Model 18", "Model 40", "Model 48", "Model 68", "Model B", "Model BB", "Model T", "Pick Up", "Probe", "Ranch Wagon", "Ranchero", "Ranger Chassis", "Sierra", "Super Deluxe", "Taurus X", "Tempo", "Torino", "Transit Connect Electric", "Victoria", "Windstar"],
		"Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80", "GV80 Coupe"],
		"GMC": ["Acadia", "Canyon", "Envoy", "Hummer EV Pickup", "Hummer EV SUV", "Savana", "Savana Cargo", "Savana Chassis", "Sierra 1500", "Sierra 1500 Limited", "Sierra 2500HD", "Sierra 3500HD", "Sierra 3500HD Chassis", "Sierra EV", "Terrain", "Yukon", "Yukon XL", "100", "1000", "C/K 1500 Series", "C/K 2500 Series", "C/K 3500 Series", "Caballero", "Envoy XL", "Envoy XUV", "Jimmy", "R/V 1500 Series", "S-15", "S-15 Jimmy", "Safari", "Safari Cargo", "Sierra", "Sierra 1500 Hybrid", "Sierra 1500HD", "Sierra 2500", "Sierra 2500HD Classic", "Sierra 3500", "Sierra C/K 3500", "Sierra C3", "Sierra Classic 1500", "Sierra Classic 2500", "Sierra Classic 3500", "Sonoma", "Suburban", "Syclone", "Typhoon", "Vandura"],
		"Honda": ["Accord", "Accord Coupe", "Accord Crosstour", "Accord Hybrid", "Civic", "Civic Coupe", "Civic Hatchback", "Civic Hybrid", "Civic Type R", "Clarity Hybrid Plug-In", "CR-V", "CR-V Hybrid", "CR-Z", "Crosstour", "Element", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prologue", "Ridgeline", "S2000", "Accord Hybrid Plug-In ", "Beat", "Civic CRX", "Civic del Sol", "Prelude", "S800", "STEPWGN", "Vamos", "Z"],
		"Hyundai": ["Accent", "Azera", "Elantra", "Elantra GT", "Elantra Hybrid", "Elantra N", "Elantra Touring", "Equus", "Genesis", "Genesis Coupe", "Ioniq 5", "Ioniq 5 N", "Ioniq 6", "Ioniq 9", "Ioniq Hybrid", "Kona", "Kona Electric", "Kona N", "Palisade", "Palisade Hybrid", "Santa Cruz", "Santa Fe", "Santa Fe Hybrid", "Santa Fe Hybrid Plug-In", "Santa Fe Sport", "Sonata", "Sonata Hybrid", "Tucson", "Tucson Hybrid", "Tucson Hybrid Plug-In", "Veloster", "Veloster N", "Venue", "Elantra Coupe", "Entourage", "Ioniq Electric", "Ioniq Hybrid Plug-In ", "Nexo", "Santa Fe XL", "Sonata Hybrid Plug-In ", "Tiburon", "Veracruz", "XG300", "XG350"],
		"INFINITI": ["EX35", "FX35", "G35", "G37", "JX35", "M35", "M37", "Q50", "Q60", "Q70", "Q70L", "QX30", "QX50", "QX55", "QX56", "QX60", "QX70", "QX80", "EX37", "FX37", "FX45", "FX50", "G20", "G25", "I30", "I35", "J30", "M30", "M35h", "M45", "M56", "Q40", "Q45", "Q50 Hybrid", "Q60 IPL", "Q70 Hybrid", "QX4", "QX60 Hybrid"],
		"Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF", "XJ-Series", "XK-Series", "E-TYPE", "Mark V", "S-TYPE", "S-TYPE R", "X-TYPE", "XF Sportbrake"],
		"Jeep": ["Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Grand Cherokee 4xe", "Grand Cherokee L", "Grand Wagoneer", "Grand Wagoneer L", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wagoneer L", "Wagoneer S", "Wrangler", "Wrangler 4xe", "CJ-5", "CJ-7", "CJ-8", "Comanche", "Commando", "J-10", "Jeepster"],
		"Kia": ["Cadenza", "Carnival", "Carnival Hybrid", "EV6", "EV9", "Forte", "Forte Koup", "Forte5", "K4", "K5", "Niro", "Niro EV", "Niro Hybrid Plug-In", "Optima", "Optima Hybrid", "Rio", "Rio5", "Sedona", "Seltos", "Sorento", "Sorento Hybrid", "Sorento Hybrid Plug-In", "Soul", "Sportage", "Sportage Hybrid", "Sportage Hybrid Plug-In", "Stinger", "Telluride", "Amanti", "Borrego", "K900", "Optima Hybrid Plug-In ", "Rondo", "Sephia", "Soul EV", "Spectra"],
		"Land Rover": ["Defender", "Discovery", "Discovery Sport", "LR2", "LR4", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar", "Discovery Series II", "Freelander", "LR3", "Series II", "Series IIA", "Series III"],
		"Lexus": ["CT Hybrid", "ES", "ES Hybrid", "GS", "GX", "HS 250h", "IS", "LC", "LC Hybrid", "LS", "LS Hybrid", "LX", "LX Hybrid", "NX", "NX Hybrid", "RC", "RC F", "RX", "RX Hybrid", "RZ", "SC", "TX", "TX Hybrid", "UX", "UX Hybrid", "GS F", "GS Hybrid", "LFA"],
		"Lincoln": ["Aviator", "Continental", "Corsair", "MKC", "MKS", "MKT", "MKX", "MKZ", "MKZ Hybrid", "Nautilus", "Navigator", "Town Car", "Blackwood", "Capri", "LS", "Mark IV", "Mark LT", "Mark VI", "Mark VII", "Mark VIII", "Premiere", "Zephyr"],
		"Maserati": ["Ghibli", "GranCabrio", "GranTurismo", "Grecale", "Levante", "MC20", "Quattroporte", "3500", "Biturbo", "Bora", "Coupe", "GranSport", "Merak", "Mistral", "Spyder"],
		"Mazda": ["CX-3", "CX-30", "CX-5", "CX-50", "CX-7", "CX-70", "CX-9", "CX-90", "MAZDA2", "MAZDA3", "MAZDA5", "MAZDA6", "MX-5 Miata", "626", "B-Series", "Bongo", "MAZDASPEED MX-5 Miata", "MAZDASPEED Protege", "MAZDASPEED3", "Miata", "Millenia", "MPV", "MX-30", "MX-6", "Protege", "Protege5", "RX-7", "RX-8", "Tribute", "Tribute Hybrid"],
		"Mercedes-Benz": ["A-Class", "AMG GT", "C-Class", "CL-Class", "CLA", "CLE", "CLK", "CLS", "E-Class", "E-Class All-Terrain", "EQB", "EQE", "EQE SUV", "EQS", "EQS SUV", "eSprinter", "G-Class", "GL-Class", "GLA", "GLB", "GLC", "GLE", "GLK", "GLS", "M-Class", "Metris", "S-Class", "SL-Class", "SLK", "Sprinter", "Sprinter Cab Chassis", "Sprinter Cargo", "190-Class", "200", "219", "220", "230SL", "240", "280-Class", "300-Class", "350-Class", "380-Class", "400-Class", "420-Class", "450-Class", "500-Class", "560-Class", "600-Class", "B-Class", "Metris Cargo", "R-Class", "S-Class Coupe", "SLC", "SLR McLaren", "SLS", "SSK"],
		"MINI": ["Cooper", "Cooper Clubman", "Countryman", "Cooper Coupe", "Cooper Paceman", "Countryman Hybrid Plug-in", "Roadster"],
		"Mitsubishi": ["Eclipse Cross", "Lancer", "Lancer Evolution", "Mirage", "Mirage G4", "Outlander", "Outlander Hybrid Plug-in", "Outlander Sport", "3000GT", "Delica", "Diamante", "Eclipse", "Eclipse Spyder", "Endeavor", "Galant", "i-MiEV", "Lancer Sportback", "Mighty Max", "Montero", "Montero Sport", "Pajero", "Raider", "Toppo"],
		"Nissan": ["350Z", "370Z", "Altima", "Altima Coupe", "Ariya", "Armada", "Cube", "Frontier", "GT-R", "Juke", "Kicks", "Kicks Play", "LEAF", "Maxima", "Murano", "NV Cargo", "NV Passenger", "NV200", "Pathfinder", "Quest", "Rogue", "Rogue Select", "Rogue Sport", "Sentra", "Titan", "Versa", "Versa Note", "Xterra", "Z", "200SX", "240SX", "300ZX", "Altima Hybrid", "BE-1", "Cedric", "Elgrand", "Galue", "Gloria", "Laurel", "March", "Murano CrossCabriolet", "Murano Hybrid", "NX", "Pathfinder Hybrid", "Rogue Hybrid", "Safari", "Silvia", "Skyline", "Stagea", "Truck"],
		"Porsche": ["718 Boxster", "718 Cayman", "911", "Boxster", "Cayenne", "Cayenne Coupe", "Cayenne E-Hybrid", "Cayman", "Macan", "Macan Electric", "Panamera", "Panamera E-Hybrid", "Taycan", "356", "550 Spyder", "912", "914", "918 Spyder", "924", "928", "944", "968", "Carrera GT"],
		"RAM": ["1500", "2500", "3500", "3500 Chassis", "4500 Chassis", "5500 Chassis", "ProMaster", "ProMaster Chassis", "ProMaster City", "C/V", "Dakota"],
		"Subaru": ["Ascent", "BRZ", "Crosstrek", "Crosstrek Hybrid", "Forester", "Impreza", "Impreza WRX", "Impreza WRX STI", "Legacy", "Outback", "Solterra", "WRX", "WRX STI", "B9 Tribeca", "Baja", "Sambar", "SVX", "Tribeca", "XT"],
		"Tesla": ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"],
		"Toyota": ["4Runner", "4Runner Hybrid", "Avalon", "Avalon Hybrid", "bZ", "bZ4X", "C-HR", "Camry", "Camry Hybrid", "Camry Solara", "Corolla", "Corolla Cross", "Corolla Cross Hybrid", "Corolla Hatchback", "Corolla Hybrid", "Crown", "Crown Signia", "FJ Cruiser", "GR Corolla", "GR86", "Grand Highlander", "Grand Highlander Hybrid", "Highlander", "Highlander Hybrid", "Land Cruiser", "Matrix", "Mirai", "Prius", "Prius c", "Prius Plug-In Hybrid", "Prius Prime", "Prius v", "RAV4", "RAV4 Hybrid", "RAV4 Plug-in Hybrid", "RAV4 Prime", "Sequoia", "Sienna", "Supra", "Tacoma", "Tacoma Hybrid", "Tundra", "Tundra Hybrid", "Venza", "Yaris", "Yaris iA", "Altezza", "Aristo", "Caldina", "Carina", "Celica", "Century", "Corolla iM", "Corona", "ECHO", "HiAce", "Hilux", "Land Cruiser Prado", "MR2", "MR2 Spyder", "Paseo", "Pickup", "Previa", "Progres", "QuickDelivery", "Raum", "Soarer", "Sprinter", "T100", "Tercel"],
		"Volkswagen": ["Arteon", "Atlas", "Atlas Cross Sport", "Beetle", "CC", "e-Golf", "Eos", "Golf", "Golf Alltrack", "Golf GTI", "Golf R", "Golf SportWagen", "ID.4", "ID.Buzz", "Jetta", "Jetta GLI", "Jetta SportWagen", "Passat", "Taos", "Tiguan", "Touareg", "Cabrio", "Cabriolet", "Corrado", "EuroVan", "GLI", "Jetta Hybrid", "Karmann Ghia", "Phaeton", "Pickup", "R32", "Rabbit", "Routan", "Super Beetle", "Thing", "Touareg 2", "Touareg Hybrid", "Transporter", "Type 3", "Vanagon"],
		"Volvo": ["C40 Recharge", "C70", "EX30", "EX40", "EX90", "S40", "S60", "S80", "S90", "V60", "V60 Hybrid Plug-in", "V90", "XC40", "XC40 Recharge", "XC60", "XC70", "XC90", "122", "240", "245", "740", "850", "940", "960", "Amazon", "C30", "Duett", "EC40", "P1800", "PV544", "S60 R", "S70", "V40", "V50", "V70", "XC"],
		"Other": ["Other"]
	};

	var form = document.getElementById("signup-form");
	var statusEl = document.getElementById("form-status");
	var submitBtn = document.getElementById("submit-btn");
	var yearEl = document.getElementById("year");
	var makeSelect = document.getElementById("make");
	var modelSelect = document.getElementById("model");
	if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

	// Populate make dropdown (in the order defined in vehicleData)
	function populateMakes(){
		var makes = Object.keys(vehicleData);
		makes.forEach(function(make){
			var option = document.createElement("option");
			option.value = make;
			option.textContent = make;
			makeSelect.appendChild(option);
		});
	}

	// Update model dropdown based on selected make
	function updateModels(){
		var selectedMake = makeSelect.value;
		modelSelect.innerHTML = '<option value="">Select Model</option>';
		
		if(selectedMake && vehicleData[selectedMake]){
			modelSelect.disabled = false;
			vehicleData[selectedMake].forEach(function(model){
				var option = document.createElement("option");
				option.value = model;
				option.textContent = model;
				modelSelect.appendChild(option);
			});
		} else {
			modelSelect.disabled = true;
			modelSelect.innerHTML = '<option value="">Select Make First</option>';
		}
		
		// Trigger lights update
		updateLightsBasedOnForm();
	}

	// Initialize make dropdown and add event listener
	if(makeSelect){
		populateMakes();
		makeSelect.addEventListener("change", updateModels);
	}

	// Enforce numbers-only input and formatting for phone and zip code
	var phoneInput = document.getElementById("phone");
	var zipCodeInput = document.getElementById("zipCode");
	
	// Format phone number as (xxx) xxx-xxxx
	function formatPhoneNumber(value){
		// Strip all non-numeric characters
		var numbers = value.replace(/[^0-9]/g, '');
		
		// Limit to 10 digits
		numbers = numbers.substring(0, 10);
		
		// Format based on length
		if(numbers.length === 0){
			return '';
		} else if(numbers.length <= 3){
			return '(' + numbers;
		} else if(numbers.length <= 6){
			return '(' + numbers.substring(0, 3) + ') ' + numbers.substring(3);
		} else {
			return '(' + numbers.substring(0, 3) + ') ' + numbers.substring(3, 6) + '-' + numbers.substring(6);
		}
	}
	
	// Format zip code (5 digits max)
	function formatZipCode(value){
		// Strip all non-numeric characters and limit to 5 digits
		return value.replace(/[^0-9]/g, '').substring(0, 5);
	}
	
	if(phoneInput){
		phoneInput.addEventListener("input", function(e){
			var formatted = formatPhoneNumber(e.target.value);
			e.target.value = formatted;
		});
		
		phoneInput.addEventListener("paste", function(e){
			setTimeout(function(){
				phoneInput.value = formatPhoneNumber(phoneInput.value);
			}, 0);
		});
	}
	
	if(zipCodeInput){
		zipCodeInput.addEventListener("input", function(e){
			e.target.value = formatZipCode(e.target.value);
		});
		
		zipCodeInput.addEventListener("paste", function(e){
			setTimeout(function(){
				zipCodeInput.value = formatZipCode(zipCodeInput.value);
			}, 0);
		});
	}

	function updateLightsBasedOnForm(){
		var leftLights = document.querySelectorAll('.left-tree .light');
		var rightLights = document.querySelectorAll('.right-tree .light');
		var formInputs = document.querySelectorAll('input[required], select[required]');
		var filledInputs = 0;
		
		// Count filled required fields
		formInputs.forEach(input => {
			if(input.type === 'checkbox'){
				if(input.checked) filledInputs++;
			} else {
				if(input.value.trim() !== '') filledInputs++;
			}
		});
		
		// Calculate how many lights should be active
		var lightsToActivate = Math.floor((filledInputs / formInputs.length) * 5);
		
		// Reset all lights
		leftLights.forEach(light => light.classList.remove('active'));
		rightLights.forEach(light => light.classList.remove('active'));
		
		// Activate lights based on form completion
		for(var i = 0; i < lightsToActivate && i < 5; i++){
			leftLights[i].classList.add('active');
			rightLights[i].classList.add('active');
		}
	}
	
	// Add event listeners to all form inputs with mobile optimization
	var formInputs = document.querySelectorAll('input, select');
	formInputs.forEach(input => {
		// Use both input and change events for better mobile compatibility
		input.addEventListener('input', updateLightsBasedOnForm, { passive: true });
		input.addEventListener('change', updateLightsBasedOnForm, { passive: true });
		
		// Add touch event support for better mobile interaction
		if ('ontouchstart' in window) {
			input.addEventListener('touchstart', function() {
				this.style.transform = 'scale(1.02)';
			}, { passive: true });
			input.addEventListener('touchend', function() {
				this.style.transform = 'scale(1)';
			}, { passive: true });
		}
	});
	
	// Initial update
	updateLightsBasedOnForm();

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
		// Strip formatting from phone number before sending (keep only digits)
		var phone = (formData.get("phone") || "").toString().replace(/[^0-9]/g, '');
		var consent = formData.get("consent");

		if(!firstName || !lastName){
			setStatus("First name and last name are required.", "error");
			return;
		}
		if(!consent){
			setStatus("You must agree to the privacy terms to continue.", "error");
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
		// Validate zip code is exactly 5 digits
		if(zipCode.length !== 5){
			setStatus("Zip code must be exactly 5 digits.", "error");
			return;
		}
		// Validate phone number is exactly 10 digits (after stripping formatting)
		if(phone.length !== 10){
			setStatus("Phone number must be exactly 10 digits.", "error");
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

	// Mobile-specific optimizations
	if ('ontouchstart' in window) {
		// Add mobile-specific optimizations
		document.body.classList.add('touch-device');
		
		// Optimize button interactions for touch
		var submitBtn = document.getElementById('submit-btn');
		if (submitBtn) {
			submitBtn.addEventListener('touchstart', function() {
				this.style.transform = 'scale(0.98)';
			}, { passive: true });
			submitBtn.addEventListener('touchend', function() {
				this.style.transform = 'scale(1)';
			}, { passive: true });
		}
	}

	if(form){
		form.addEventListener("submit", handleSubmit);
	}
})();

