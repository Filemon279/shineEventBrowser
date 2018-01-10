import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Scene } from './scene.js'
import { CsvData } from '/mongo/collections.js'
import './eventBrowser.html';


Template.eventBrowserLayout.onCreated(function helloOnCreated() {
	this.loading = new ReactiveVar(true);
	this.size = 1
	this.colorInfo = {}
	this.scene = new Scene()
	var self = this
		this.scene.addPointLight(0xFFFFFF,100)
		this.scene.addPointLight(0xFFFFFF,-100)
		this.scene.addCube();
	Meteor.subscribe('getEvent',function(){
		
	results = CsvData.findOne({})
	self.scene.addLines(results.data)
	
	})

	

});

Template.eventBrowserLayout.helpers({
  'isLoading' : function(){
  	return Template.instance().loading.get();
  }
});


Template.eventBrowserLayout.events({
  'click button': function()
  {
  	console.log("no")
  }
});




