	export default function ordersAppAPI() {
	function getTimers(success :any) {
	  return fetch('/timersapp/api/timers', {
		headers: {
		  Accept: 'application/json',
		},
	  }).then(checkStatus)
		.then(parseJSON)
		.then(success);
	}

	/*
	function saveOrders(orders) {
	  return fetch('/api/orders', {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
	  }).then(checkStatus);
	}

	function updateTimer(data) {
	  return fetch('/timersapp/api/timers', {
		method: 'put',
		body: JSON.stringify(data),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
	  }).then(checkStatus);
	}

	function deleteTimer(data) {
	  return fetch('/timersapp/api/timers', {
		method: 'delete',
		body: JSON.stringify(data),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
	  }).then(checkStatus);
	}

	function startTimer(data) {
	  return fetch('/timersapp/api/timers/start', {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
	  }).then(checkStatus);
	}

	function stopTimer(data) {
	  return fetch('/timersapp/api/timers/stop', {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
	  }).then(checkStatus);
	}
  */
	function checkStatus(response :any) {
	  if (response.status >= 200 && response.status < 300) {
		return response;
	  } else {
		const error = new Error(`HTTP Error ${response.statusText}`);
		error.status = response.statusText;
		error.response = response;
		console.log(error);
		throw error;
	  }
	}

	function parseJSON(response :any) {
	  return response.json();
	}

	return {
	  getTimers
	};
  }

