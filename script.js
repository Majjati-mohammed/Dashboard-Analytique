async function analyseData() {

	const response = await fetch("data.json");
	const data = await response.json();

	const segment = data.map(item => item.segment);
	const revenue = data.map(item => item.revenue);
	const clients = data.map(item => item.clients);
	const cost = data.map(item => item.cost);
	const growth = data.map(item => item.growth);
	var profitMargins = [];
	for (let i = 0; i < cost.length; i++) {
		const margin = (parseInt(revenue[i]) - parseInt(cost[i])) * 100 / parseInt(cost[i]);
		profitMargins.push(margin);

	}


	const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
	const moyRevenue = totalRevenue / revenue.length;


	const totalCost = data.reduce((sum, item) => sum + item.cost, 0);
	const moyCost = totalCost / cost.length;

	const totalprofitMargins = profitMargins.reduce((sum, item) => sum + item, 0);
	const moyMarg = totalprofitMargins / profitMargins.length;


	const totalGrowth = data.reduce((sum, item) => sum + item.growth, 0);
	const moyGrowth = totalGrowth / growth.length;

	totalClient = data.reduce((sum, item) => sum + item.clients, 0);


	document.getElementById("segment").innerHTML = data.length;
	document.getElementById("moyenneRevenue").innerHTML = moyRevenue;
	document.getElementById("moyenneCost").innerHTML = moyCost.toFixed(2);
	document.getElementById("moyenneMarge").innerHTML = moyMarg.toFixed(2) + ' %';
	document.getElementById("moyenneGrowth").innerHTML = moyGrowth.toFixed(2) + ' %';
	document.getElementById("NombreClients").innerHTML = totalClient;


	const barColors = ["#19001bff", "#60006bff", "#9000a0ff", "#e600ffff", "#ec45ffff", "#f494ffff"];

	new Chart("mychart1", {
		type: "pie",
		data: {
			labels: segment,
			datasets: [{
				label: "Revenue de chaque produit",
				backgroundColor: barColors,
				data: growth,
			}]
		},
		options: {
			legend: {
				display: true,
				responsive: false,
				maintainAspectRatio: false
			},

		}
	});



	new Chart("mychart2", {
		type: "bar",
		data: {
			labels: segment,
			datasets: [{
				label: "le cout de chaque catégorie",
				backgroundColor: barColors,
				data: profitMargins,
			}]
		},
		options: {
			legend: {
				display: false,
				responsive: false,
				maintainAspectRatio: false
			},

		}
	});

	new Chart("mychart3", {
		type: "line",
		data: {
			labels: segment,
			datasets: [{
					label: "Revenue pour chaque catégorie",
					backgroundColor: "#360074ff",
					pointRadius: 5,
					borderColor: "#9f4affff",
					data: revenue,
				},
				{
					label: "Cout pour chaque catégorie",
					backgroundColor: "#6b0032ff",
					pointRadius: 5,
					borderColor: "#ff7cb9ff",
					data: cost,
				}
			]
		},
		options: {
			legend: {
				display: false,
				responsive: false,
				maintainAspectRatio: false
			},

		}
	});



	new Chart("mychart4", {
		type: "line",
		data: {
			labels: segment,
			datasets: [{
					label: "Revenue pour chaque catégorie",
					backgroundColor: "#740083ff",
					pointRadius: 5,
					borderColor: "#e993ffff",
					data: growth,
				}

			]
		},
		options: {
			legend: {
				display: false,
				responsive: false,
				maintainAspectRatio: false
			},

		}
	});



}

analyseData();