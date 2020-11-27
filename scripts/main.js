/* DATA CONTROLLER */
const dataController = (() => {
	const data = {
		projectName: "Hackaton Project",
		APIDATA: '',
	};

	const getData = async () => {
	try {
		let obj = await fetch(
			"https://rickandmortyapi.com/api/character",
		);

		let json = await obj.json();

		if (!obj.ok) throw { status: obj.status, statusText: obj.statusText };

		return json;

	} catch (err) {
		return {
			status: err.status || "ERROR: ",
			statusText: err.statusText || "UNKNOWN",
		};
	}
};

	return {
		getData: () => {
			return data;
		},
		getAPIData: async (data) => {
			let obj = await getData();

			data.APIDATA = await obj;
		},
	}


})();

/* UI CONTROLLER */
const UIController = (() => {
	const DOMStrings = {
		titleElement: "title",
	};


	return {
		getDOM: () => {
			return DOMStrings;
		},
		modifyTitleProject: (data) => {
			document.getElementById(DOMStrings.titleElement).textContent = data.projectName;
		},
	};

})();

/* MAIN CONTROLLER */
const controller = ((UI, DATA) => {
	const DOM = UI.getDOM();
	const allData = DATA.getData();


	/* ADD DOM EVENTS */
	const addEvents = () => {
		
	};

	return {
		init: () => {
			console.log("App has started...");
			UI.modifyTitleProject(allData);
			DATA.getAPIData(allData);
			console.log(allData);
		},
	};
})(UIController, dataController);

controller.init();