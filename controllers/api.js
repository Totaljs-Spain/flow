exports.install = function() {

	// REST API
	ROUTE('-POST    /auth/        *Auth       --> exec');
	ROUTE('+GET     /logout/      *Auth       --> logout');
	ROUTE('+POST    /password/    *Auth       --> save');

	// FlowStream
	ROUTE('+API    @api    -streams                          *Streams      --> query');
	ROUTE('+API    @api    -streams_read/{id}                *Streams      --> read');
	ROUTE('+API    @api    +streams_save                     *Streams      --> save');
	ROUTE('+API    @api    -streams_remove/{id}              *Streams      --> remove');
	ROUTE('+API    @api    -streams_stats                    *Streams      --> stats');
	ROUTE('+API    @api    -streams_pause/{id}               *Streams      --> pause');
	ROUTE('+API    @api    -streams_restart/{id}             *Streams      --> restart');

	// Common
	ROUTE('+API    @api    -auth                             *Auth         --> read');

	// Variables
	ROUTE('+API    @api    -settings                         *Settings     --> read');
	ROUTE('+API    @api    +settings_save                    *Settings     --> save');

	// Variables
	ROUTE('+API    @api    -variables                        *Variables    --> read');
	ROUTE('+API    @api    +variables_save                   *Variables    --> save');

	// Clipboard
	ROUTE('+API    @api    -clipboard_export/id              *Clipboard    --> export');
	ROUTE('+API    @api    +clipboard_import                 *Clipboard    --> import', [60000 * 5]);

	// Socket
	ROUTE('+SOCKET  /api/  @api', 1024 * 8); // max. 8 MB
	ROUTE('+SOCKET  /flows/{id}/', socket, 1024 * 8); // max. 8 MB

};

function socket(id) {
	var self = this;
	MODULE('flowstream').socket(id, self);
}