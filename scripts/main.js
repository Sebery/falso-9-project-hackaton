/* DATA CONTROLLER */
const dataController = (() => {
	const data = {
		projectName: "Dengue TRC.",
		APIDATA: '',
	};

	const getData = async () => {
	try {
		let obj = await fetch(
			"https://newsapi.org/v2/everything?q=dengue&language=es&apiKey=41b7d7559d8541d69d5e128f3471bcd0",
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
		getAPIData: async (data, ui) => {
			let obj = await getData();

			data.APIDATA = await obj;
			/*data['APIDATA'].articles.forEach(e => {
				console.log(e['urlToImage']);
			});*/
			ui.displayNews(data);
		},
	}


})();

/* UI CONTROLLER */
const UIController = (() => {
	const DOMStrings = {
		titleElement: "title",
		mainContainer: 'content',
	};




	return {
		getDOM: () => {
			return DOMStrings;
		},
		modifyTitleProject: (data) => {
			document.getElementById(DOMStrings.titleElement).textContent = data.projectName;
		},
		displayNews: (data) => {
			data['APIDATA'].articles.forEach(e => {
				let template = `<div class="col mb-4">
									<div class="card">
										<img src="${e['urlToImage']}" class="card-img-top" alt="...">
										<div class="card-body">
											<h5 class="card-title">${e.title}</h5>
											<p class="card-text">${e.description}</p>
											<a href="#" class="btn btn-danger">Contactar Organizacion</a>
										</div>
									</div>
								</div>`;

				document.getElementById(DOMStrings.mainContainer).innerHTML += template;
			});
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
			UI.modifyTitleProject(allData);
			DATA.getAPIData(allData, UI);
		},
	};
})(UIController, dataController);

controller.init();