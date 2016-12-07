/*global location */
sap.ui.define([
		"com/bcone/hackathon/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"com/bcone/hackathon/model/formatter",
		'sap/ui/model/Filter',
		"com/bcone/hackathon/JS/Formatter",
	], function (BaseController, JSONModel, formatter, Filter, CustomerFormat) {
		"use strict";
		var detail;
		return BaseController.extend("com.bcone.hackathon.controller.Detail", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			onInit : function () {
				detail = this;
				 this.initCustomFormat();		
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var oViewModel = new JSONModel({
					busy : false,
					delay : 0
				});

/*			var o3DData = {
					"names": [{
						Temp: 2642,
						Temp2: 2754,
						kanban_Id: "TCS",
						Place: "HYD"
					}, {
						Temp: 2091,
						Temp2: 2754,
						kanban_Id: "Info",
						Place: "Bangalore"
					}, {
						Temp: 6890,
						Temp2: 2754,
						kanban_Id: "iGate",
						Place: "Mumbai"
					}, {
						Temp:4533,
						Temp2: 2754,
						kanban_Id: "TATA",
						Place: "USA"
					}]
			};
			
			var vizFrame = this.getView().byId("vizframe");
			vizFrame.setVizProperties({
				plotArea: {
//					colorPalette : ['#00FF00','#FFC200','#FF0000'],
					dataLabel: {
						formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
						visible: true
					}
				},
				valueAxis: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: false
					}
				},
				valueAxis2: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: false,
					text: 'Temperature'
				}
			});

				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(o3DData);
				vizFrame.setModel(oModel);*/

//------------------------------------------

// //      1.Get the id of the VizFrame		
// 		var oVizFrame = this.getView().byId("vizframe");
		
// //      2.Create a JSON Model and set the data
// 		var oModel = new sap.ui.model.json.JSONModel();
// 		var data = {
// 				'Population' : [
// 		            {"Year": "2010","Value": "158626687"},
// 		            {"Year": "2011","Value": "531160986"},
// 		            {"Year": "2012","Value": "915105168"},
// 		            {"Year": "2013","Value": "1093786762"},
// 		            {"Year": "2014","Value": "1274018495"},
// 		           ]};
// 		oModel.setData(data);
		
// //      3. Create Viz dataset to feed to the data to the graph
// 		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
// 			dimensions : [{
// 				name : 'Year',
// 				value : "{Year}"}],
			               
// 			measures : [{
// 				name : 'Population',
// 				value : '{Value}'} ],
			             
// 			data : {
// 				path : "/Population"
// 			}
// 		});		
// 		oVizFrame.setDataset(oDataset);
// 		oVizFrame.setModel(oModel);	
// 		oVizFrame.setVizType('column');
		
// //      4.Set Viz properties
// 		oVizFrame.setVizProperties({
//             plotArea: {
//             	colorPalette : d3.scale.category20().range()
//                 }});
		
// 		var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
// 		      'uid': "valueAxis",
// 		      'type': "Measure",
// 		      'values': ["Population"]
// 		    }), 
// 		    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
// 		      'uid': "categoryAxis",
// 		      'type': "Dimension",
// 		      'values': ["Year"]
// 		    });
// 		oVizFrame.addFeed(feedValueAxis);
// 		oVizFrame.addFeed(feedCategoryAxis);
		
//--------------------------------------------
				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				this.setModel(oViewModel, "detailView");

				this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Event handler when the share by E-Mail button has been clicked
			 * @public
			 */
			onShareEmailPress : function () {
				var oViewModel = this.getModel("detailView");

				sap.m.URLHelper.triggerEmail(
					null,
					oViewModel.getProperty("/shareSendEmailSubject"),
					oViewModel.getProperty("/shareSendEmailMessage")
				);
			},



			/* =========================================================== */
			/* begin: internal methods                                     */
			/* =========================================================== */

			/**
			 * Binds the view to the object path and expands the aggregated line items.
			 * @function
			 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
			 * @private
			 */
			_onObjectMatched : function (oEvent) {
				var that = this;
				var jmodel = new sap.ui.model.json.JSONModel();
				var oTable = this.getView().byId("idKanbanTable");
				oTable.setModel(jmodel);
				var sObjectId =  oEvent.getParameter("arguments").objectId;
				
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("KanbanTickets", {
						GEN_ID :  sObjectId
					});
					this.sObjectId = sObjectPath;
					// this.sValue1 = this.getModel().getProperty("/KanbanTickets('11234125347246462')").WORKSTAT;
					// this.sValue1 = this.getModel().getProperty("/KanbanTickets('11234125347246462')").WORKSTAT;
					this._bindView("/" + sObjectPath);
				}.bind(this));
				
				
				
				var model = this.getModel();
				var oModel = new sap.ui.model.json.JSONModel();
				var vizFrame = this.getView().byId("vizframe");

			vizFrame.setVizProperties({
				plotArea: {
//					colorPalette : ['#00FF00','#FFC200','#FF0000'],
					dataLabel: {
						formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
						visible: true
					},
					dataPointStyle: {
                        "rules":
                        [
                            {
                                "dataContext": {"Quantity": {"max": 50}},
                                "properties": {
                                    "color":"sapUiChartPaletteSemanticCritical"
                                },
                                "displayName":"Quantity < 50%"
                            },
                            {
                                "dataContext": {"Quantity": {"max": 25}},
                                "properties": {
                                    "color":"sapUiChartPaletteSemanticBad"
                                },
                                "displayName":"Quantity < 25%"
                            }
                        ],
                        "others":
                        {
                            "properties": {
                                 "color": "sapUiChartPaletteSemanticGood"
                            },
                            "displayName": "Quantity > 50%"
                        }
				}
					
				},
				valueAxis: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: false
					}
				},
				valueAxis2: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: true,
					text: 'Kanban Details'
				}
			});
			
				model.read("/KanbanReports",{context: true,
				urlParameters: "",
				async: false,
				filters: null,
				success: function(oCycleData) {
					var results;
				// for(var i=0;i<oCycleData.length;i++)
					jmodel.setData(oCycleData);
					// alert("s");
					var sValue1 = that.getModel().getProperty("/" + that.sObjectId).WORKSTAT;
					var aFilters = [new sap.ui.model.Filter("WORKSTAT", "EQ",sValue1)];
				
				var oTable = that.getView().byId("idKanbanTable");
				var oBinding = oTable.getBinding("items");
				oBinding.filter(aFilters);
				
				var GraphData = {results1:[]};
				var GraphDataComplete = {results1:[]};
				oCycleData.results.forEach(function(obj){
		
					if(sValue1 === obj.WORKSTAT){
							if(parseFloat(obj.TEMPERATURE) >= 92 && parseFloat(obj.TEMPERATURE) <= 94){
								obj.Quantity = 50;
							}else if(parseFloat(obj.TEMPERATURE) < 92){
								obj.Quantity = 100;
							}
							else{
								obj.Quantity = 25;
							}
							GraphData.results1.push(obj);
					}
							if(parseFloat(obj.TEMPERATURE) >= 92 && parseFloat(obj.TEMPERATURE) <= 94){
								obj.Quantity = 50;
							}else if(parseFloat(obj.TEMPERATURE) < 92){
								obj.Quantity = 100;
							}
							else{
								obj.Quantity = 25;
							}
							GraphDataComplete.results1.push(obj);
						});
						oModel.setData(GraphData);
						vizFrame.setModel(oModel);
						var jsonModel = new sap.ui.model.json.JSONModel();
						jsonModel.setData(GraphDataComplete);
						detail.getView().setModel(jsonModel,"Graph");
				},
				error: function(error){
					//alert("error");
				}
				});
				
				/*var sObjectPath = this.getModel().createKey("KanbanTickets", {
						GEN_ID :  this.sObjectId
					});
				var sValue1 = model.getProperty("WORKSTAT","/" + sObjectPath);
				
				var aFilters = [new Filter("KanbanReports", "EQ", sValue1)];
				
				var oTable = this.getView().byId("idKanbanTable");
				var oBinding = oTable.getBinding("items");
				oBinding.filter(aFilters);*/
				
			},
			initCustomFormat : function(){
			CustomerFormat.registerCustomFormat();
		},
			
			onUpdateFinished : function (oEvent) {
				// var model = this.getModel();
				
				// var sObjectPath = this.getModel().createKey("KanbanTickets", {
				// 		GEN_ID :  this.sObjectId
				// 	});
				// var sValue1 = model.getProperty("WORKSTAT","/" + sObjectPath);
				
				// var aFilters = [new Filter("KanbanReports", "EQ", sValue1)];
				
				// var oTable = this.getView().byId("idKanbanTable");
				// var oBinding = oTable.getBinding("items");
				// oBinding.filter(aFilters);
				
			},

			/**
			 * Binds the view to the object path. Makes sure that detail view displays
			 * a busy indicator while data for the corresponding element binding is loaded.
			 * @function
			 * @param {string} sObjectPath path to the object to be bound to the view.
			 * @private
			 */
			_bindView : function (sObjectPath) {
				// Set busy indicator during view binding
				var oViewModel = this.getModel("detailView");

				// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
				oViewModel.setProperty("/busy", false);

				this.getView().bindElement({
					path : sObjectPath,
					events: {
						change : this._onBindingChange.bind(this),
						dataRequested : function () {
							oViewModel.setProperty("/busy", true);
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
				var oView = this.getView(),
					oElementBinding = oView.getElementBinding();

				// No data for the binding
				if (!oElementBinding.getBoundContext()) {
					this.getRouter().getTargets().display("detailObjectNotFound");
					// if object could not be found, the selection in the master list
					// does not make sense anymore.
					this.getOwnerComponent().oListSelector.clearMasterListSelection();
					return;
				}

				var sPath = oElementBinding.getPath(),
					oResourceBundle = this.getResourceBundle(),
					oObject = oView.getModel().getObject(sPath),
					sObjectId = oObject.GEN_ID,
					sObjectName = oObject.WORKSTAT,
					oViewModel = this.getModel("detailView");

				this.getOwnerComponent().oListSelector.selectAListItem(sPath);

				oViewModel.setProperty("/shareSendEmailSubject",
					oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
				oViewModel.setProperty("/shareSendEmailMessage",
					oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			},

			_onMetadataLoaded : function () {
				// Store original busy indicator delay for the detail view
				var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
					oViewModel = this.getModel("detailView");

				// Make sure busy indicator is displayed immediately when
				// detail view is displayed for the first time
				oViewModel.setProperty("/delay", 0);

				// Binding the view will set it to not busy - so the view is always busy if it is not bound
				oViewModel.setProperty("/busy", true);
				// Restore original busy indicator delay for the detail view
				oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
			},
			
			onOverviewPress : function(oEvent){
			var fragment = 	sap.ui.xmlfragment("com.bcone.hackathon.Fragment.Chart",this.getView().getController());
			var viz = fragment.getAggregation("content")[0];
			detail.setVizProperties(viz);
			viz.setModel(detail.getView().getModel("Graph"));
			fragment.open();
			},
			
			setVizProperties : function(vizFrame){
				vizFrame.setVizProperties({
				plotArea: {
//					colorPalette : ['#00FF00','#FFC200','#FF0000'],
					dataLabel: {
						formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
						visible: true
					},
					dataPointStyle: {
                        "rules":
                        [
                            {
                                "dataContext": {"Quantity": {"max": 50}},
                                "properties": {
                                    "color":"sapUiChartPaletteSemanticCritical"
                                },
                                "displayName":"Quantity < 50%"
                            },
                            {
                                "dataContext": {"Quantity": {"max": 25}},
                                "properties": {
                                    "color":"sapUiChartPaletteSemanticBad"
                                },
                                "displayName":"Quantity < 25%"
                            }
                        ],
                        "others":
                        {
                            "properties": {
                                 "color": "sapUiChartPaletteSemanticGood"
                            },
                            "displayName": "Quantity > 50%"
                        }
				}
					
				},
				valueAxis: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: false
					}
				},
				valueAxis2: {
					label: {
						formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
					},
					title: {
						visible: false
					}
				},
				categoryAxis: {
					title: {
						visible: false
					}
				},
				title: {
					visible: true,
					text: 'Kanban Details'
				}
			});
			}

		});

	}
);