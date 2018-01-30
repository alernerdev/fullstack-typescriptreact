	export function getOrders(success :any) {
	  return fetch('/api/orders', {
			headers: {
			  Accept: 'application/json',
			},
	  }).then(checkStatus)
		.then(parseJSON)
		.then(success);
	}

	export function saveOrders(orders: any) {
		const s = JSON.stringify(orders);
		console.log(`sending orders ${s}`);

	  return fetch('/api/orders', {
			method: 'post',
			body: s,
			headers: {
		  	'Accept': 'application/json',
		  	'Content-Type': 'application/json',
			},
	  }).then(checkStatus);
	}

	function checkStatus(response :any) {
	  if (response.status >= 200 && response.status < 300) {
		return response;
	  } else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		//error.status = response.statusText;
		//error.response = response;
		console.log(error);
		throw error;
	  }
	}

	function parseJSON(response :any) {
	  return response.json();
	}


