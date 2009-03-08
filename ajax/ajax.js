if (!gadgets.io.makeRequest) {
	throw new Exception('Only use this plugin in a Google Gadgets container!');
};

MVC.Ajax.factory = function() {
	return new MVC.Opensocial.Ajax.transport();
};

MVC.Opensocial = {
	Ajax: {
		transport: function () {
			this.options = {};
			this.options[gadgets.io.RequestParameters.HEADERS] = {};
			this.url = null;
			this.onreadystatechange = function() {};
			this.responseText = null;
			this.responseXML = null;
			this.status = null;
			this.statusText = null;
			this.headers = null;
		}
	}
}

MVC.Opensocial.Ajax.transport.prototype = {
	open: function(method, url, async, user, password) {
		this.options[gadgets.io.RequestParameters.METHOD] = method.toUpperCase();
		this.url = url;
	},
	setRequestHeader: function(header, value) {
		this.options[gadgets.io.RequestParameters.HEADERS][header] = value;
	},
	send: function(data) {
		if (data && this.options[gadgets.io.RequestParameters.METHOD].toLowerCase() == 'post') {
			this.options[gadgets.io.RequestParameters.POST_DATA] = data;
		};
		return gadgets.io.makeRequest(this.url, MVC.Function.bind(this.callback, this), this.options);
	},
	abort: function() {
		return false;
	},
	getAllResponseHeaders: function() {
		return this.headers;
	},
	getResponseHeader: function(header) {
		if (!this.headers[header]) {
			return null;
		};
		return this.headers[header];
	},
	callback: function(data) {
		this.headers = data.headers;
		this.status = data.rc;
		this.statusText = data.rc; //TODO: Get the real statusText
		this.responseXML = data.data || null;
		this.responseText = data.text || null;
		this.onreadystatechange();
	}
}