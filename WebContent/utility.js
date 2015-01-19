/**
 * It will create HashTable data structure.
 * 
 * @param obj
 * @returns
 */
function mHashTable(obj) {
	this.length = 0;
	this.items = {};
	for ( var p in obj) {
		if (obj.hasOwnProperty(p)) {
			this.items[p] = obj[p];
			this.length++;
		}
	};

	this.setItem = function(key, value) {
		var previous = undefined;
		if (this.hasItem(key)) {
			previous = this.items[key];
		} else {
			this.length++;
		}
		this.items[key] = value;
		return previous;
	};

	this.getItem = function(key) {
		return this.hasItem(key) ? this.items[key] : undefined;
	};

	this.hasItem = function(key) {
		return this.items.hasOwnProperty(key);
	};

	this.removeItem = function(key) {
		if (this.hasItem(key)) {
			previous = this.items[key];
			this.length--;
			delete this.items[key];
			return previous;
		} else {
			return undefined;
		}
	};

	this.keys = function() {
		var keys = [];
		for ( var k in this.items) {
			if (this.hasItem(k)) {
				keys.push(k);
			}
		}
		return keys;
	};

	this.values = function() {
		var values = [];
		for ( var k in this.items) {
			if (this.hasItem(k)) {
				values.push(this.items[k]);
			}
		}
		return values;
	};

	// New added
	this.key = function(value) {
		var key = 0;
		for ( var k in this.items) {
			if (this.hasItem(k)) {
				if (this.items[k][0] == value) {
					key = k;
					break;
				}
			}
		}
		return key;
	};

	this.each = function(fn) {
		for ( var k in this.items) {
			if (this.hasItem(k)) {
				fn(k, this.items[k]);
			}
		}
	};

	this.clear = function() {
		this.items = {};
		this.length = 0;
	};
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
/*End change: bug-948*/
}

function getSchema(){
	var schema = {	"title" : "startSchema","type" : "object",
			"properties" : {
		 		"id": {
		                       "description": "The unique identifier for a product",
		                       "type": "number"
		                   },
				"firstName" : {
					"type" : "string"
				},
				"lastName" : {
					"type" : "string"
				},
				"accountNo" : {
					"type" : "number"
				},
				"isValid" : {
					"type" : "boolean"
				},
				"tags": {
				   "type": "array",
				   "items": {
					   "type": "string"
				   },
				   "minItems": 1,
				   "uniqueItems": true
		                   },
			   "testtags": {
				   "type": "array",
				   "items": {
					   "type": "number"
				   },
				   "minItems": 1,
				   "uniqueItems": true
		                   },
			   "dimensions": {
				   "type": "object",
				   "properties": {
					   "size": {"type": "number"},
					   "width": {"type": "number"},
					   "height": {"type": "number"}
				   }
				  
			   }
			}
			
		};
	return schema;
}

function setText(el, str) {
    if (typeof el.innerText === 'string') {
        el.innerText =  str;
    } else {
        el.textContent = str;
    }
}

function success(source, total) {
    var reportValue, element;
    reportValue = document.getElementById('report');
    element = document.createElement('pre');
    element.setAttribute('class', 'success-alert-box');
    setText(element, total + ": "+source);
    reportValue.appendChild(element);
}

function failure(code, expected, actual, total) {
    var reportValue, element;
    reportValue = document.getElementById('report');

    element = document.createElement('p');
    element.setAttribute('class', 'failure-alert-box');
    setText(element, total + ": "+'Case:');
    reportValue.appendChild(element);

    element = document.createElement('pre');
    element.setAttribute('class', 'failure-alert-code');
    setText(element, code);
    reportValue.appendChild(element);

    element = document.createElement('p');
    element.setAttribute('class', 'failure-alert-box');
    setText(element, 'Expected Result:');
    reportValue.appendChild(element);

    element = document.createElement('pre');
    element.setAttribute('class', 'failure-alert-code');
    setText(element, expected);
    reportValue.appendChild(element);

    element = document.createElement('p');
    element.setAttribute('class', 'failure-alert-box');
    setText(element, 'Actual Result:');
    reportValue.appendChild(element);

    element = document.createElement('pre');
    element.setAttribute('class', 'failure-alert-code');
    setText(element, actual);
    reportValue.appendChild(element);
}
