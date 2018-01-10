import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Scene } from './scene.js'
import './eventBrowser.html';


Template.eventBrowserLayout.onCreated(function helloOnCreated() {
	this.loading = new ReactiveVar(true);
	this.size = 1
	this.colorInfo = {}
	var self = this
	this.scene = new Scene()
	this.scene.addPointLight(0xFFFFFF,100)
	this.scene.addPointLight(0xFFFFFF,-100)
			this.scene.addCube();


	

});

Template.eventBrowserLayout.helpers({
  'isLoading' : function(){
  	return Template.instance().loading.get();
  }
});


Template.eventBrowserLayout.events({
  'click button'(event, instance) {


  }
});




