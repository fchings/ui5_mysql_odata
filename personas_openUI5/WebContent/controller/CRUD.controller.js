sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/m/MessageToast",
		"sap/m/MessageBox" ], function(Controller, MessageToast, MessageBox) {
	"use strict";
	return Controller.extend("e2e.ui5.controller.CRUD", {

		onInit : function() {
		},

		onAdd : function() {
			var oModel = this.getView().getModel();

			if (this.getView().byId("input01").getValue() == ""
					|| this.getView().byId("input02").getValue() == ""
					|| this.getView().byId("input03").getValue() == ""
					|| this.getView().byId("input04").getValue() == "") {
				MessageBox.warning("All fields are Obligatory");

			} else {
				var oEntry = {};
				oEntry.Cedula = this.getView().byId("input01").getValue();
				oEntry.Nombre = this.getView().byId("input02").getValue();
				oEntry.Apellidos = this.getView().byId("input03").getValue();
				oEntry.Telefono = this.getView().byId("input04").getValue();

				oModel.create('/Personas', oEntry, {
					success : function(oData, oResponse) {
						MessageBox.success(oEntry.Cedula + " was Created");
					},
					error : function() {
						MessageBox.error("Insert Error");
					}
				});

				this.getView().byId("input01").setValue("");
				this.getView().byId("input02").setValue("");
				this.getView().byId("input03").setValue("");
				this.getView().byId("input04").setValue("");
				this.getView().getModel().refresh();
			}
		},

		onDelete : function(oEvent) {
			var oModel = this.getView().getModel();
			var src = oEvent.getSource();
			var path = src.getBindingContext().getPath();
			var oData = oModel.getProperty(path);
			var sCedula = oData['Cedula'];

			oModel.remove(path, {
				success : function(oData, oResponse) {
					MessageBox.success(sCedula + " was Deleted");
				},
				error : function() {
					MessageBox.error("Delete Error");
				}
			});
			this.getView().getModel().refresh();
		},

		onUpdate : function(oEvent) {
			var oModel = this.getView().getModel();
			var oEntry = {};
			oEntry.Nombre = this.getView().byId("input12").getValue();
			oEntry.Apellidos = this.getView().byId("input13").getValue();
			oEntry.Telefono = this.getView().byId("input14").getValue();

			var sCedula = this.getView().byId("input11").getText();
			var path = this.getView().byId("myModel").getText();

			oModel.update(path, oEntry, {
				success : function(oData, oResponse) {
					MessageBox.success(sCedula + " was Updated");
				},
				error : function() {
					MessageBox.error("Update Error");
				}
			});
			this.getView().getModel().refresh();
			this.onCloseDialog();
		},

		onOpenDialog : function(oEvent) {
			var oView = this.getView();
			var oDialog = oView.byId("updateDialog");

			var oModel = this.getView().getModel();
			var src = oEvent.getSource();
			var path = src.getBindingContext().getPath();

			var oData = oModel.getProperty(path);
			var sCedula = oData['Cedula'];
			var sNombre = oData['Nombre'];
			var sApellidos = oData['Apellidos'];
			var sTelefono = oData['Telefono'];

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(),
						"e2e.ui5.view.UpdateDialog", this);
				oDialog.setModel(this.getView().getModel());
				oView.addDependent(oDialog);

				this.getView().byId("input11").setText(sCedula);
				this.getView().byId("input12").setValue(sNombre);
				this.getView().byId("input13").setValue(sApellidos);
				this.getView().byId("input14").setValue(sTelefono);
				this.getView().byId("myModel").setText(path);
			}
			oDialog.open();
		},

		onCloseDialog : function() {
			this.getView().byId("updateDialog").close();
			this.afterClose();
		},

		afterClose : function() {
			this.getView().byId("updateDialog").destroy();
		}

	});
});