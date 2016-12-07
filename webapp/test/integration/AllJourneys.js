jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 KanbanTickets in the list

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/bcone/hackathon/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/bcone/hackathon/test/integration/pages/App",
	"com/bcone/hackathon/test/integration/pages/Browser",
	"com/bcone/hackathon/test/integration/pages/Master",
	"com/bcone/hackathon/test/integration/pages/Detail",
	"com/bcone/hackathon/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.bcone.hackathon.view."
	});

	sap.ui.require([
		"com/bcone/hackathon/test/integration/MasterJourney",
		"com/bcone/hackathon/test/integration/NavigationJourney",
		"com/bcone/hackathon/test/integration/NotFoundJourney",
		"com/bcone/hackathon/test/integration/BusyJourney"
	], function () {
		QUnit.start();
	});
});